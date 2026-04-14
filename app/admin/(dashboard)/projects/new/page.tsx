import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="mx-auto w-100 px-2" style={{ maxWidth: 720 }}>
      <h1 className="h3 mb-4 text-center">Add project</h1>
      <ProjectForm mode="create" />
    </div>
  );
}
