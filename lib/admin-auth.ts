function toBase64Url(bytes: Uint8Array): string {
  let bin = "";
  bytes.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

const COOKIE_NAME = "portfolio_admin";

export function getCookieName() {
  return COOKIE_NAME;
}

export function getAdminSecret() {
  return process.env.ADMIN_SECRET || "";
}

export function isAdminConfigured(): boolean {
  return Boolean(getAdminSecret() && process.env.ADMIN_PASSWORD);
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !password) return false;
  return password === expected;
}

export async function createAdminCookieValue(): Promise<string | null> {
  const secret = getAdminSecret();
  if (!secret) return null;
  const payload = { v: 1 as const, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 };
  const data = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const key = await importHmacKey(secret);
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  const sig = toBase64Url(new Uint8Array(sigBuf));
  return `${data}.${sig}`;
}

export async function verifyAdminCookie(raw: string | undefined): Promise<boolean> {
  if (!raw) return false;
  const secret = getAdminSecret();
  if (!secret) return false;
  const i = raw.lastIndexOf(".");
  if (i === -1) return false;
  const data = raw.slice(0, i);
  const sig = raw.slice(i + 1);
  try {
    const key = await importHmacKey(secret);
    const expectedBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
    const expected = toBase64Url(new Uint8Array(expectedBuf));
    if (sig.length !== expected.length) return false;
    for (let j = 0; j < sig.length; j++) {
      if (sig.charCodeAt(j) !== expected.charCodeAt(j)) return false;
    }
  } catch {
    return false;
  }
  try {
    const json = new TextDecoder().decode(fromBase64Url(data));
    const payload = JSON.parse(json) as { exp?: number };
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return false;
  } catch {
    return false;
  }
  return true;
}
