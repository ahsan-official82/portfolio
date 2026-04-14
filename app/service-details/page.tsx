import Link from "next/link";
import { BodyClass } from "@/components/BodyClass";
import { ScrollExtras } from "@/components/ScrollExtras";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function ServiceDetailsPage() {
  return (
    <>
      <BodyClass className="service-details-page" />
      <SiteHeader />
      <main className="main">
        <div className="page-title dark-background">
          <div className="container d-lg-flex justify-content-between align-items-center">
            <h1 className="mb-2 mb-lg-0">Service Details</h1>
            <nav className="breadcrumbs">
              <ol>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li className="current">Service Details</li>
              </ol>
            </nav>
          </div>
        </div>
        <section className="section">
          <div className="container">
            <p className="mb-0">Replace this placeholder with your service content, or migrate the full HTML from the original template.</p>
            <p className="mt-3">
              <Link href="/">← Back to home</Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <ScrollExtras />
    </>
  );
}
