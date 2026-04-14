"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteProjectButton({ projectId, projectName }: { projectId: string; projectName: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (!window.confirm(`Delete “${projectName}” (${projectId})? This cannot be undone.`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/projects?id=${encodeURIComponent(projectId)}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        window.alert(typeof data.error === "string" ? data.error : "Delete failed");
        return;
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button type="button" className="btn btn-sm btn-outline-danger" disabled={loading} onClick={() => void onDelete()}>
      {loading ? "…" : "Delete"}
    </button>
  );
}
