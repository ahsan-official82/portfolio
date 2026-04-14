import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { findProjectBySlug, getProjects } from "@/lib/projects";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const id = decodeURIComponent(rawId);
  const projects = await getProjects();
  const project = projects.find((p) => p.id === id) ?? findProjectBySlug(projects, id);
  if (!project) notFound();

  return (
    <div className="mx-auto w-100 px-2" style={{ maxWidth: 720 }}>
      <h1 className="h3 mb-4 text-center">Edit project</h1>
      <ProjectForm mode="edit" project={project} />
    </div>
  );
}
