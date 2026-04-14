"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link href="/admin" className="navbar-brand">
            Admin
          </Link>
          <div className="navbar-nav ms-auto flex-row gap-2 align-items-center">
            <Link href="/" className="nav-link text-white-50 small">
              View site
            </Link>
            <button type="button" className="btn btn-outline-light btn-sm" onClick={() => void logout()}>
              Log out
            </button>
          </div>
        </div>
      </nav>
      <div className="container py-4">{children}</div>
    </div>
  );
}
