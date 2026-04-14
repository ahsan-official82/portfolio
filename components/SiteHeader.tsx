import Link from "next/link";
import { PROFILE_IMAGE_SRC } from "@/lib/site";

export function SiteHeader() {
  return (
    <header id="header" className="header dark-background d-flex flex-column">
      <i className="header-toggle d-xl-none bi bi-list" />

      <div className="profile-img">
        <img src={PROFILE_IMAGE_SRC} alt="" className="img-fluid rounded-circle" />
      </div>

      <Link href="/" className="logo d-flex align-items-center justify-content-center">
        <h1 className="sitename">Ahmer Mairaj</h1>
      </Link>

      <div className="social-links text-center">
        <a
          href="https://www.linkedin.com/in/ahmermairaj-syncops/"
          className="linkedin"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <i className="bi bi-linkedin" />
        </a>
        <a
          href="https://wa.me/923368570422"
          className="whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <i className="bi bi-whatsapp" />
        </a>
        <a href="mailto:ahmer.official92@gmail.com" className="email" aria-label="Email">
          <i className="bi bi-envelope" />
        </a>
      </div>

      <nav id="navmenu" className="navmenu">
        <ul>
          <li>
            <Link href="/#hero" className="active">
              <i className="bi bi-house navicon" />
              Home
            </Link>
          </li>
          <li>
            <Link href="/#about">
              <i className="bi bi-person navicon" /> About
            </Link>
          </li>
          <li>
            <Link href="/#resume">
              <i className="bi bi-file-earmark-text navicon" /> Resume
            </Link>
          </li>
          <li>
            <Link href="/#portfolio">
              <i className="bi bi-images navicon" /> Portfolio
            </Link>
          </li>
          <li>
            <Link href="/#contact">
              <i className="bi bi-envelope navicon" /> Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
