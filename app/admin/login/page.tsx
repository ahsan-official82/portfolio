import { Suspense } from "react";
import { AdminLoginForm } from "./AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5 text-muted">
          Loading…
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
