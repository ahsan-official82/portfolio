import type { Project } from "@/lib/project-model";

/** URL-safe project id (keeps case: e.g. ARINS, product-1). */
export function slugifyId(input: string): string {
  return input
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "");
}

export function parseImagesFromText(text: string): Project["images"] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  return lines.map((line) => {
    const pipe = line.indexOf("|");
    if (pipe === -1) return { src: line, alt: "" };
    return { src: line.slice(0, pipe).trim(), alt: line.slice(pipe + 1).trim() };
  });
}

export function imagesToText(images: Project["images"] | undefined): string {
  if (!images?.length) return "";
  return images
    .map((im) => {
      if (typeof im === "string") return im;
      const alt = im.alt || "";
      return alt ? `${im.src}|${alt}` : im.src;
    })
    .join("\n");
}
