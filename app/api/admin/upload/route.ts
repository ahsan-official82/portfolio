import { randomBytes } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCookieName, verifyAdminCookie } from "@/lib/admin-auth";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "projects");
const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_MIME = new Map<string, string>([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/gif", "gif"],
  ["image/webp", "webp"],
]);

function sanitizeBaseName(name: string): string {
  const withoutExt = name.replace(/\.[^.]+$/, "");
  const s = withoutExt.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return (s || "image").slice(0, 80);
}

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName())?.value;
  if (!(await verifyAdminCookie(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function POST(request: Request) {
  const deny = await requireAdmin();
  if (deny) return deny;

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const files = formData.getAll("files").filter((x): x is File => x instanceof File && x.size > 0);
  if (!files.length) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const saved: { src: string }[] = [];

  for (const file of files) {
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: `File too large (max 8 MB): ${file.name}` }, { status: 400 });
    }
    const mime = file.type || "application/octet-stream";
    const ext = ALLOWED_MIME.get(mime);
    if (!ext) {
      return NextResponse.json(
        { error: `Unsupported type for “${file.name}”. Use JPEG, PNG, GIF, or WebP.` },
        { status: 400 }
      );
    }
    const base = sanitizeBaseName(file.name);
    const filename = `${Date.now()}-${randomBytes(4).toString("hex")}-${base}.${ext}`;
    const buf = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(UPLOAD_DIR, filename), buf);
    saved.push({ src: `/uploads/projects/${filename}` });
  }

  return NextResponse.json({ files: saved });
}
