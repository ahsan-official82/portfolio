import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminCookie, getCookieName } from "@/lib/admin-auth";
import { slugifyId } from "@/lib/project-utils";
import { readProjectsFile, writeProjectsFile } from "@/lib/projects-store";
import { parseProjectFiltersFromBody, type Project } from "@/lib/project-model";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName())?.value;
  if (!(await verifyAdminCookie(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

function normalizeSkillsField(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return [...new Set(raw.map((s) => String(s ?? "").trim()).filter(Boolean))];
}

function normalizeProjectBody(raw: Record<string, unknown>, fixedId?: string): Project | null {
  const name = String(raw.name ?? "").trim();
  if (!name) return null;
  const idRaw = fixedId ?? String(raw.id ?? "").trim();
  const id = idRaw ? slugifyId(idRaw) : slugifyId(name);
  if (!id) return null;

  const images = Array.isArray(raw.images) ? (raw.images as Project["images"]) : [];

  const skills = normalizeSkillsField(raw.skills);
  const filters = parseProjectFiltersFromBody(raw);

  return {
    id,
    name,
    projectUrl: String(raw.projectUrl ?? "").trim(),
    title: String(raw.title ?? "").trim(),
    description: String(raw.description ?? "").trim(),
    images,
    skills: skills.length ? skills : undefined,
    filters,
    subtitle: String(raw.subtitle ?? "").trim() || undefined,
  };
}

export async function GET() {
  const deny = await requireAdmin();
  if (deny) return deny;
  const data = await readProjectsFile();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const deny = await requireAdmin();
  if (deny) return deny;
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const project = normalizeProjectBody(body);
  if (!project) {
    return NextResponse.json({ error: "Invalid project: need name and a valid id (or derive from name)." }, { status: 400 });
  }
  const data = await readProjectsFile();
  if (data.projects.some((p) => p.id === project.id)) {
    return NextResponse.json({ error: "A project with this id already exists." }, { status: 409 });
  }
  data.projects.push(project);
  await writeProjectsFile(data);
  revalidatePath("/");
  revalidatePath("/portfolio/[slug]", "page");
  return NextResponse.json({ ok: true, project });
}

export async function PUT(request: Request) {
  const deny = await requireAdmin();
  if (deny) return deny;
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const existingId = String(body.id ?? "").trim();
  if (!existingId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const project = normalizeProjectBody(body, existingId);
  if (!project || project.id !== slugifyId(existingId)) {
    return NextResponse.json({ error: "Invalid project body or id mismatch." }, { status: 400 });
  }
  const data = await readProjectsFile();
  const idx = data.projects.findIndex((p) => p.id === existingId);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  data.projects[idx] = project;
  await writeProjectsFile(data);
  revalidatePath("/");
  revalidatePath("/portfolio/[slug]", "page");
  revalidatePath(`/portfolio/${encodeURIComponent(existingId)}`);
  return NextResponse.json({ ok: true, project: data.projects[idx] });
}

export async function DELETE(request: Request) {
  const deny = await requireAdmin();
  if (deny) return deny;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const data = await readProjectsFile();
  const next = data.projects.filter((p) => p.id !== id);
  if (next.length === data.projects.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await writeProjectsFile({ projects: next });
  revalidatePath("/");
  revalidatePath("/portfolio/[slug]", "page");
  return NextResponse.json({ ok: true });
}
