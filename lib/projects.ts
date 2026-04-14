import { unstable_noStore as noStore } from "next/cache";
import { readProjectsFile } from "@/lib/projects-store";
import type { Project } from "@/lib/project-model";

export * from "@/lib/project-model";

export async function getProjects(): Promise<Project[]> {
  noStore();
  const data = await readProjectsFile();
  return data.projects as Project[];
}
