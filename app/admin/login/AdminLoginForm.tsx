"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Login failed");
        return;
      }
      const dest = searchParams.get("from") || "/admin";
      router.push(dest);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div className="card shadow-sm" style={{ maxWidth: 420, width: "100%" }}>
        <div className="card-body p-4">
          <h1 className="h4 mb-4 text-center">Portfolio admin</h1>
          <p className="text-muted small mb-4">
            Sign in to manage projects. Configure <code>ADMIN_SECRET</code> and <code>ADMIN_PASSWORD</code> in{" "}
            <code>.env.local</code>.
          </p>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="admin-password" className="form-label">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            {error ? <div className="alert alert-danger py-2 small mb-3">{error}</div> : null}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
