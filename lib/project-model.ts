export const ALL_PROJECT_FILTERS = [
  "filter-app",
  "filter-product",
  "filter-branding",
  "filter-books",
  "filter-next-node",
] as const;

export type ProjectFilter = (typeof ALL_PROJECT_FILTERS)[number];

const FILTER_SET = new Set<string>(ALL_PROJECT_FILTERS);

export type ProjectImage = string | { src: string; alt?: string };

export type Project = {
  id: string;
  name: string;
  projectUrl: string;
  title: string;
  description: string;
  images: ProjectImage[];
  /** Tech / topic tags shown on the project detail page */
  skills?: string[];
  /** Isotope / portfolio grid categories (item can appear under multiple filters) */
  filters?: ProjectFilter[];
  /**
   * Legacy single category from older JSON; merged into {@link normalizeProjectFilters}
   * when `filters` is absent or empty.
   */
  filter?: ProjectFilter;
  /** Short line on the home portfolio card (defaults to title) */
  subtitle?: string;
};

/** Valid, de-duplicated category list for grid + forms; defaults to PHP when empty. */
export function normalizeProjectFilters(project: Pick<Project, "filters" | "filter"> | undefined): ProjectFilter[] {
  const out: ProjectFilter[] = [];
  if (project?.filters?.length) {
    for (const f of project.filters) {
      if (FILTER_SET.has(f)) out.push(f);
    }
  }
  if (!out.length && project?.filter != null && FILTER_SET.has(project.filter)) {
    out.push(project.filter);
  }
  const deduped = [...new Set(out)];
  return deduped.length ? deduped : ["filter-app"];
}

/** Parse `filters` array and optional legacy `filter` from API/admin JSON. */
export function parseProjectFiltersFromBody(raw: Record<string, unknown>): ProjectFilter[] {
  const out: ProjectFilter[] = [];
  if (Array.isArray(raw.filters)) {
    for (const x of raw.filters) {
      const s = String(x ?? "").trim();
      if (FILTER_SET.has(s)) out.push(s as ProjectFilter);
    }
  }
  if (!out.length && raw.filter != null) {
    const s = String(raw.filter).trim();
    if (FILTER_SET.has(s)) out.push(s as ProjectFilter);
  }
  const deduped = [...new Set(out)];
  return deduped.length ? deduped : ["filter-app"];
}

export function galleryForProject(project: Pick<Project, "filters" | "filter"> | undefined): string {
  return galleryForFilter(normalizeProjectFilters(project)[0]);
}

/** Normalized, de-duplicated skill tags for display and forms. */
export function normalizeProjectSkills(project: Pick<Project, "skills"> | undefined): string[] {
  const raw = project?.skills;
  if (!Array.isArray(raw)) return [];
  return [...new Set(raw.map((s) => String(s ?? "").trim()).filter(Boolean))];
}

function normalizeSlug(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, "-");
}

export function findProjectBySlug(projects: Project[], slug: string): Project | undefined {
  if (!slug) return undefined;
  const q = decodeURIComponent(slug).trim();
  const lower = q.toLowerCase();
  const norm = normalizeSlug(q);
  return projects.find((p) => {
    if (p.id === q) return true;
    if (p.id.toLowerCase() === lower) return true;
    if (p.name && p.name.toLowerCase() === lower) return true;
    if (p.name && normalizeSlug(p.name) === norm) return true;
    return false;
  });
}

export function getSlugVariants(p: Project): string[] {
  const out: string[] = [p.id];
  if (p.name) {
    out.push(normalizeSlug(p.name));
    if (/^[a-zA-Z0-9_-]+$/.test(p.name)) {
      out.push(p.name);
    }
  }
  return [...new Set(out)];
}

export function galleryForFilter(filter: string | undefined): string {
  const f = filter || "filter-app";
  const map: Record<string, string> = {
    "filter-app": "portfolio-gallery-app",
    "filter-product": "portfolio-gallery-product",
    "filter-branding": "portfolio-gallery-branding",
    "filter-books": "portfolio-gallery-book",
    "filter-next-node": "portfolio-gallery-next-node",
  };
  return map[f] || "portfolio-gallery-app";
}

export function normalizeImages(images: ProjectImage[] | undefined) {
  if (!images?.length) return [] as { src: string; alt: string }[];
  return images.map((img) =>
    typeof img === "string" ? { src: img, alt: "" } : { src: img.src || "", alt: img.alt || "" }
  );
}

export function cardImageSrc(project: Project): string {
  const imgs = normalizeImages(project.images);
  const src = imgs[0]?.src || "/assets/img/portfolio/app-1.jpg";
  if (src.startsWith("/")) return src;
  return `/${src}`;
}

export function detailPath(project: Project): string {
  return `/portfolio/${encodeURIComponent(project.id)}`;
}
