import Link from "next/link";
import { notFound } from "next/navigation";
import { BodyClass } from "@/components/BodyClass";
import { PortfolioDetailsSwiper } from "@/components/portfolio/PortfolioDetailsSwiper";
import { ScrollExtras } from "@/components/ScrollExtras";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getProjects } from "@/lib/projects";
import { findProjectBySlug, normalizeImages, normalizeProjectSkills } from "@/lib/project-model";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = findProjectBySlug(projects, slug);
  if (!project) return { title: "Portfolio" };
  return { title: `${project.name} — Portfolio Details` };
}

function assetPath(src: string) {
  if (src.startsWith("/")) return src;
  return `/${src}`;
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = findProjectBySlug(projects, slug);
  if (!project) notFound();

  const images = normalizeImages(project.images).map((im) => ({
    src: assetPath(im.src),
    alt: im.alt,
  }));

  const url = (project.projectUrl || "").trim();
  const skills = normalizeProjectSkills(project);

  return (
    <>
      <BodyClass className="portfolio-details-page" />
      <SiteHeader />

      <main className="main">
        <div className="page-title dark-background">
          <div className="container d-lg-flex justify-content-between align-items-center">
            <h1 className="mb-2 mb-lg-0">{project.name}</h1>
            <nav className="breadcrumbs">
              <ol>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li className="current">{project.name}</li>
              </ol>
            </nav>
          </div>
        </div>

        <section id="portfolio-details" className="portfolio-details section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              <div className="col-lg-8">
                <PortfolioDetailsSwiper images={images} />
              </div>
              <div className="col-lg-4">
                <div className="portfolio-info" data-aos="fade-up" data-aos-delay="200">
                  <h3>Project information</h3>
                  <ul className="mb-0">
                    <li>
                      <strong>Name</strong>: {project.name}
                    </li>
                    <li>
                      <strong>Project URL</strong>:{" "}
                      {url ? (
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {url}
                        </a>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </li>
                  </ul>
                  {skills.length > 0 ? (
                    <div className="mt-3 pt-3 border-top">
                      <strong className="d-block mb-2">Skills</strong>
                      <div className="d-flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <span key={skill} className="badge rounded-pill text-bg-primary">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="portfolio-description" data-aos="fade-up" data-aos-delay="300">
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ScrollExtras />
    </>
  );
}
