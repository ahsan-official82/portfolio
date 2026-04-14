import { NextResponse } from "next/server";
import { createAdminCookieValue, getCookieName, isAdminConfigured, verifyPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Admin is not configured. Set ADMIN_SECRET and ADMIN_PASSWORD in .env.local." }, { status: 503 });
  }
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const password = body.password ?? "";
  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  const value = await createAdminCookieValue();
  if (!value) {
    return NextResponse.json({ error: "Could not create session" }, { status: 500 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(getCookieName(), value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
