import Link from "next/link";
import { getProjects } from "@/lib/projects";
import { normalizeProjectSkills } from "@/lib/project-model";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";

export default async function AdminDashboardPage() {
  const projects = await getProjects();

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h1 className="h3 mb-0">Projects</h1>
        <Link href="/admin/projects/new" className="btn btn-primary">
          Add project
        </Link>
      </div>
      <div className="table-responsive bg-white shadow-sm rounded">
        <table className="table table-hover mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Skills</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-muted text-center py-5">
                  No projects yet. Add one to get started.
                </td>
              </tr>
            ) : (
              projects.map((p) => {
                const skillList = normalizeProjectSkills(p);
                return (
                <tr key={p.id}>
                  <td>
                    <code>{p.id}</code>
                  </td>
                  <td>{p.name}</td>
                  <td className="small text-muted">
                    {skillList.length
                      ? skillList.slice(0, 4).join(", ") + (skillList.length > 4 ? "…" : "")
                      : "—"}
                  </td>
                  <td className="text-end">
                    <Link href={`/admin/projects/${encodeURIComponent(p.id)}/edit`} className="btn btn-sm btn-outline-primary me-2">
                      Edit
                    </Link>
                    <DeleteProjectButton projectId={p.id} projectName={p.name} />
                  </td>
                </tr>
              );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
