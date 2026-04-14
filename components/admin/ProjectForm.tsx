"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  normalizeImages,
  normalizeProjectFilters,
  normalizeProjectSkills,
  type Project,
  type ProjectFilter,
} from "@/lib/project-model";

const PORTFOLIO_CATEGORIES: { value: ProjectFilter; label: string }[] = [
  { value: "filter-app", label: "PHP" },
  { value: "filter-product", label: "Asp.Net" },
  { value: "filter-branding", label: "Coldfusion" },
  { value: "filter-books", label: "UI / UX Designs" },
  { value: "filter-next-node", label: "Next.js / Node.js" },
];

type ImageRow = { src: string; alt: string };

type Props =
  | { mode: "create"; project?: undefined }
  | { mode: "edit"; project: Project };

export function ProjectForm(props: Props) {
  const router = useRouter();
  const p = props.mode === "edit" ? props.project : null;
  const [id, setId] = useState(p?.id ?? "");
  const [name, setName] = useState(p?.name ?? "");
  const [projectUrl, setProjectUrl] = useState(p?.projectUrl ?? "");
  const [title, setTitle] = useState(p?.title ?? "");
  const [description, setDescription] = useState(p?.description ?? "");
  const [subtitle, setSubtitle] = useState(p?.subtitle ?? "");
  const [categories, setCategories] = useState<ProjectFilter[]>(() =>
    props.mode === "edit" ? normalizeProjectFilters(props.project) : ["filter-app"]
  );
  const [imageRows, setImageRows] = useState<ImageRow[]>(() =>
    props.mode === "edit" ? normalizeImages(props.project.images) : []
  );
  const [manualPath, setManualPath] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>(() =>
    props.mode === "edit" ? normalizeProjectSkills(props.project) : []
  );
  const [skillInput, setSkillInput] = useState("");

  function displaySrc(src: string) {
    if (src.startsWith("/")) return src;
    return `/${src}`;
  }

  async function onFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list?.length) return;
    setUploadError("");
    setUploading(true);
    try {
      const fd = new FormData();
      Array.from(list).forEach((file) => fd.append("files", file));
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setUploadError(typeof data.error === "string" ? data.error : "Upload failed");
        return;
      }
      const files = data.files as { src: string }[];
      if (!Array.isArray(files)) {
        setUploadError("Unexpected response");
        return;
      }
      setImageRows((prev) => [
        ...prev,
        ...files.map((f) => ({
          src: f.src,
          alt: "",
        })),
      ]);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function addManualPath() {
    const s = manualPath.trim();
    if (!s) return;
    setImageRows((prev) => [...prev, { src: s, alt: "" }]);
    setManualPath("");
  }

  function removeImage(index: number) {
    setImageRows((prev) => prev.filter((_, i) => i !== index));
  }

  function updateAlt(index: number, alt: string) {
    setImageRows((prev) => prev.map((row, i) => (i === index ? { ...row, alt } : row)));
  }

  function addSkill() {
    const parts = skillInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!parts.length) return;
    setSkills((prev) => {
      const next = [...prev];
      for (const part of parts) {
        if (!next.includes(part)) next.push(part);
      }
      return next;
    });
    setSkillInput("");
  }

  function removeSkill(index: number) {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  }

  function toggleCategory(value: ProjectFilter) {
    setCategories((prev) => {
      if (prev.includes(value)) {
        if (prev.length <= 1) return prev;
        return prev.filter((x) => x !== value);
      }
      return [...prev, value];
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!categories.length) {
      setError("Select at least one portfolio category.");
      return;
    }
    setLoading(true);
    const images = imageRows.map((row) => ({
        src: row.src.trim(),
        alt: row.alt.trim(),
      }))
      .filter((row) => row.src.length > 0);

    const body: Record<string, unknown> = {
      name,
      projectUrl,
      title,
      description,
      subtitle: subtitle || undefined,
      filters: categories,
      images,
      skills,
    };
    if (props.mode === "create") {
      body.id = id.trim() || undefined;
    } else {
      body.id = p!.id;
    }
    try {
      const res = await fetch("/api/admin/projects", {
        method: props.mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Save failed");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={(e) => void onSubmit(e)} className="bg-white shadow-sm rounded p-4 w-100">
      {props.mode === "create" ? (
        <div className="mb-3">
          <label className="form-label">Id (optional)</label>
          <input
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="e.g. my-app — leave empty to derive from name"
          />
          <div className="form-text">Letters, numbers, hyphens, underscores only.</div>
        </div>
      ) : (
        <div className="mb-3">
          <label className="form-label">Id</label>
          <input className="form-control" value={p!.id} disabled readOnly />
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Name *</label>
        <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Skills</label>
        <div className="d-flex flex-wrap gap-2 mb-2">
          {skills.map((tag, index) => (
            <span key={`${tag}-${index}`} className="badge bg-secondary d-inline-flex align-items-center gap-1 py-2 px-2">
              {tag}
              <button
                type="button"
                className="btn-close btn-close-white ms-1"
                style={{ fontSize: "0.55rem" }}
                aria-label={`Remove ${tag}`}
                onClick={() => removeSkill(index)}
              />
            </span>
          ))}
        </div>
        <div className="input-group">
          <input
            className="form-control"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="e.g. React, Node.js"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
          />
          <button type="button" className="btn btn-outline-secondary" onClick={addSkill}>
            Add
          </button>
        </div>
        <div className="form-text">Add multiple skills as tags (technologies, tools, topics).</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Project URL</label>
        <input
          className="form-control"
          type="url"
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
          placeholder="https://"
        />
      </div>

      <div className="mb-3">
        <span className="form-label d-block">Portfolio categories *</span>
        <div className="d-flex flex-column gap-2">
          {PORTFOLIO_CATEGORIES.map((c) => (
            <div key={c.value} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`cat-${c.value}`}
                checked={categories.includes(c.value)}
                onChange={() => toggleCategory(c.value)}
              />
              <label className="form-check-label" htmlFor={`cat-${c.value}`}>
                {c.label}
              </label>
            </div>
          ))}
        </div>
        <div className="form-text">Select all that apply. The project appears when any selected category is filtered.</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Card subtitle</label>
        <input
          className="form-control"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Short line under the name on the home grid (optional)"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Title (detail page heading) *</label>
        <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Description *</label>
        <textarea
          className="form-control"
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Images</label>
        <div className="border rounded p-3 bg-light bg-opacity-50">
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              accept="image/jpeg,image/png,image/gif,image/webp"
              multiple
              disabled={uploading}
              onChange={(e) => void onFileInputChange(e)}
            />
            <div className="form-text">JPEG, PNG, GIF, or WebP — up to 8 MB each. You can select multiple files.</div>
            {uploading ? <div className="small text-muted mt-1">Uploading…</div> : null}
            {uploadError ? <div className="small text-danger mt-1 text-break">{uploadError}</div> : null}
          </div>

          {imageRows.length > 0 ? (
            <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
              {imageRows.map((row, index) => (
                <li key={`${row.src}-${index}`} className="d-flex gap-3 align-items-start border rounded p-2 bg-white">
                  <div
                    className="flex-shrink-0 rounded border overflow-hidden bg-secondary bg-opacity-10"
                    style={{ width: 96, height: 72 }}
                  >
                    <img src={displaySrc(row.src)} alt="" className="w-100 h-100" style={{ objectFit: "cover" }} />
                  </div>
                  <div className="flex-grow-1 min-w-0">
                    <div className="small font-monospace text-break mb-1" title={row.src}>
                      {row.src}
                    </div>
                    <label className="form-label small mb-0">Alt text</label>
                    <input
                      className="form-control form-control-sm"
                      value={row.alt}
                      onChange={(e) => updateAlt(index, e.target.value)}
                      placeholder="Describe the image (optional)"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger flex-shrink-0"
                    onClick={() => removeImage(index)}
                    aria-label="Remove image"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted small mb-0">No images yet. Upload files above or add a path manually.</p>
          )}

          <div className="mt-3 pt-3 border-top">
            <label className="form-label small text-muted mb-1">Or add image path manually</label>
            <div className="input-group input-group-sm">
              <input
                className="form-control font-monospace"
                value={manualPath}
                onChange={(e) => setManualPath(e.target.value)}
                placeholder="/uploads/projects/photo.jpg or assets/img/…"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addManualPath();
                  }
                }}
              />
              <button type="button" className="btn btn-outline-secondary" onClick={addManualPath}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {error ? <div className="alert alert-danger py-2 small mb-3 text-break">{error}</div> : null}

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={loading || uploading}>
          {loading ? "Saving…" : "Save"}
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={() => router.push("/admin")}>
          Cancel
        </button>
      </div>
    </form>
  );
}
