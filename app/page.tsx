import { BodyClass } from "@/components/BodyClass";
import { HomeContent } from "@/components/home/HomeContent";
import { ScrollExtras } from "@/components/ScrollExtras";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getProjects } from "@/lib/projects";

export default async function HomePage() {
  const projects = await getProjects();
  return (
    <>
      <BodyClass className="index-page" />
      <SiteHeader />
      <HomeContent projects={projects} />
      <SiteFooter />
      <ScrollExtras />
    </>
  );
}
