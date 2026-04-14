import { promises as fs } from "fs";
import path from "path";
import type { Project } from "@/lib/project-model";

const DATA_PATH = path.join(process.cwd(), "data", "projects.json");

export type ProjectsFile = { projects: Project[] };

export async function readProjectsFile(): Promise<ProjectsFile> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  const data = JSON.parse(raw) as ProjectsFile;
  if (!data.projects || !Array.isArray(data.projects)) {
    return { projects: [] };
  }
  return data;
}

export async function writeProjectsFile(data: ProjectsFile): Promise<void> {
  const tmp = DATA_PATH + ".tmp";
  const json = JSON.stringify(data, null, 2) + "\n";
  await fs.writeFile(tmp, json, "utf-8");
  await fs.rename(tmp, DATA_PATH);
}
