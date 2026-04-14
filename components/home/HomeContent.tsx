import Link from "next/link";
import {
  cardImageSrc,
  detailPath,
  galleryForProject,
  normalizeProjectFilters,
  type Project,
} from "@/lib/project-model";

const SKILLS_TAGS = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PHP",
  "Laravel",
  "MySQL",
  "MongoDB",
  "WordPress",
  "REST APIs",
  "Git",
  "Photoshop",
  "SendGrid",
  "ChatGPT AI Integration",
  "Payment Gateways",
  "Rocket Chat Integration",
] as const;

export function HomeContent({ projects }: { projects: Project[] }) {
  return (
    <main className="main">
      <section id="hero" className="hero section dark-background">
        <img src="/assets/img/hero-bg.jpg" alt="" data-aos="fade-in" className="" />
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <h2>Ahmer Mairaj</h2>
          <p>
            I&apos;m{" "}
            <span className="typed" data-typed-items="Full Stack Developer, UI/UX Designer, Freelancer">
              Full Stack Developer
            </span>
            <span className="typed-cursor typed-cursor--blink" aria-hidden="true" />
            <span className="typed-cursor typed-cursor--blink" aria-hidden="true" />
          </p>
        </div>
      </section>

      <section id="about" className="about section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-10 mx-auto content">
              <h2>Full Stack Developer &amp; UI/UX Designer.</h2>
              <p className="py-3 mb-0">
                I&apos;m a Full Stack Developer with over 10+ years of experience building scalable, high-performance web
                applications and mobile solutions for startups, businesses, and enterprise clients. I specialize in
                creating reliable, secure, and user-focused systems that help businesses grow.
              </p>
              <p className="pb-3">
                My experience covers both backend architecture and modern frontend development, allowing me to deliver
                complete end-to-end solutions from planning to deployment.
              </p>
              <div className="row">
                <div className="col-lg-6">
                  <ul>
                    <li>
                      <i className="bi bi-chevron-right" /> <strong>Phone:</strong>{" "}
                      <span>
                        <a href="tel:+923368570422">+92 3368570422</a>
                      </span>
                    </li>
                    <li>
                      <i className="bi bi-chevron-right" /> <strong>City:</strong> <span>Gujranwala, Pakistan</span>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul>
                    <li>
                      <i className="bi bi-chevron-right" /> <strong>Email:</strong>{" "}
                      <span>
                        <a href="mailto:ahmer.official92@gmail.com">ahmer.official92@gmail.com</a>
                      </span>
                    </li>
                    <li>
                      <i className="bi bi-chevron-right" /> <strong>Freelance:</strong> <span>Available</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="stats section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-3 col-md-6">
              <div className="stats-item">
                <i className="bi bi-emoji-smile" />
                <span className="d-inline-flex align-items-baseline">
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="40"
                    data-purecounter-duration="1"
                    className="purecounter"
                  />
                  <span>+</span>
                </span>
                <p>
                  <strong>Happy Clients</strong>
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stats-item">
                <i className="bi bi-journal-richtext" />
                <span className="d-inline-flex align-items-baseline">
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="50"
                    data-purecounter-duration="1"
                    className="purecounter"
                  />
                  <span>+</span>
                </span>
                <p>
                  <strong>Projects</strong>
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stats-item">
                <i className="bi bi-headset" />
                <span className="d-inline-flex align-items-baseline">
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="5"
                    data-purecounter-duration="1"
                    className="purecounter"
                  />
                  <span>K+</span>
                </span>
                <p>
                  <strong>Hours</strong>
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stats-item">
                <i className="bi bi-people" />
                <span className="d-inline-flex align-items-baseline">
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="2"
                    data-purecounter-duration="1"
                    className="purecounter"
                  />
                </span>
                <p>
                  <strong>Hard Workers</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="skills section light-background">
        <div className="container section-title" data-aos="fade-up">
          <h2>Skills</h2>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="skills-tags skills-animation d-flex flex-wrap gap-3 justify-content-center">
            {SKILLS_TAGS.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="resume" className="resume section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Resume</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <h3 className="resume-title">Education</h3>
              <div className="resume-item">
                <h4>Bachelor of Science in Information Technology, Computer Science</h4>
                <h5>2010 - 2014</h5>
                <p>
                  <em>Punjab University College of Information Technology (PUCIT)</em>
                </p>
              </div>
              <div className="resume-item">
                <h4>ICS</h4>
                <h5>2009 - 2010</h5>
                <p>
                  <em>Punjab Group of Colleges</em>
                </p>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <h3 className="resume-title">Professional Experience</h3>
              <div className="resume-item">
                <h4>Full Stack Developer</h4>
                <h5>Dec 2015 - Feb 2025</h5>
                <p>
                  <em>Techleadz</em>
                </p>
                <p>
                  Experienced Full Stack Developer specializing in developing robust web applications from concept to
                  deployment. Proficient in front-end and back-end technologies, ensuring seamless functionality,
                  performance optimization, and responsive user experiences.
                </p>
              </div>
              <div className="resume-item">
                <h4>Internship (Web / App Development)</h4>
                <h5>July 2014 - December 2014</h5>
                <p>
                  <em>Microsoft Institute of Technology (MIC), Lahore</em>
                </p>
                <ul>
                  <li>Web application management (designing and development)</li>
                  <li>Database management</li>
                  <li>App development</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="portfolio section light-background">
        <div className="container section-title" data-aos="fade-up">
          <h2>Portfolio</h2>
        </div>
        <div className="container">
          <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
            <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
              <li data-filter="*" className="filter-active">
                All
              </li>
              <li data-filter=".filter-app">PHP</li>
              <li data-filter=".filter-product">Asp.Net</li>
              <li data-filter=".filter-branding">Coldfusion</li>
              <li data-filter=".filter-books">UI / UX Designs</li>
              <li data-filter=".filter-next-node">Next.js / Node.js</li>
            </ul>
            <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
              {projects.map((project) => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials section light-background">
        <div className="container section-title" data-aos="fade-up">
          <h2>Testimonials</h2>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="swiper init-swiper">
            {/* Swiper config must not be a <script> node — React 19 hydration (#418). */}
            <div
              className="swiper-config d-none"
              suppressHydrationWarning
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  loop: true,
                  speed: 600,
                  autoplay: { delay: 5000 },
                  slidesPerView: "auto",
                  pagination: { el: ".swiper-pagination", type: "bullets", clickable: true },
                  breakpoints: {
                    "320": { slidesPerView: 1, spaceBetween: 40 },
                    "1200": { slidesPerView: 3, spaceBetween: 1 },
                  },
                }),
              }}
            />
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="testimonial-item">
                  <p>
                    <i className="bi bi-quote quote-icon-left" />
                    <span>
                      understand everything with low explications, very smart worker that i ever seen before.. for people
                      from France and big business man like me is very good to work with! i will work long time with !
                    </span>
                    <i className="bi bi-quote quote-icon-right" />
                  </p>
                  <span className="testimonial-client-icon" aria-hidden>
                    <i className="bi bi-person-circle" />
                  </span>
                  <h3>snapstrong</h3>
                  <h4>Client</h4>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="testimonial-item">
                  <p>
                    <i className="bi bi-quote quote-icon-left" />
                    <span>
                      I highly recommend any business owner with limited IT skills to work with him. flexible and
                      understanding
                    </span>
                    <i className="bi bi-quote quote-icon-right" />
                  </p>
                  <span className="testimonial-client-icon" aria-hidden>
                    <i className="bi bi-person-circle" />
                  </span>
                  <h3>hillarymbabazi</h3>
                  <h4>Client</h4>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="testimonial-item">
                  <p>
                    <i className="bi bi-quote quote-icon-left" />
                    <span>
                      He was great to work with. He understand the type of app we are working on and consulted on the
                      gaps in our model. We&apos;ll definitely reach out again for our PHP/Angular Web Apps in the
                      future. His work is clear and easy to follow.
                    </span>
                    <i className="bi bi-quote quote-icon-right" />
                  </p>
                  <span className="testimonial-client-icon" aria-hidden>
                    <i className="bi bi-person-circle" />
                  </span>
                  <h3>brandonashby</h3>
                  <h4>Client</h4>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="testimonial-item">
                  <p>
                    <i className="bi bi-quote quote-icon-left" />
                    <span>
                      very efficient, its refreshing to work with a developer that is so responsive and quick to get
                      things complete.
                    </span>
                    <i className="bi bi-quote quote-icon-right" />
                  </p>
                  <span className="testimonial-client-icon" aria-hidden>
                    <i className="bi bi-person-circle" />
                  </span>
                  <h3>beasty1</h3>
                  <h4>Client</h4>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="testimonial-item">
                  <p>
                    <i className="bi bi-quote quote-icon-left" />
                    <span>
                      Working with Ahsan was a wonderful experience. He understood what my project goals were and
                      delivered everything I needed. He was extremely quick to fix little details and overall, I am very
                      pleased with the outcome. I would highly recommend his expertise to anyone who is looking for help
                      with web development.
                    </span>
                    <i className="bi bi-quote quote-icon-right" />
                  </p>
                  <span className="testimonial-client-icon" aria-hidden>
                    <i className="bi bi-person-circle" />
                  </span>
                  <h3>mirmir14</h3>
                  <h4>Client</h4>
                </div>
              </div>
            </div>
            <div className="swiper-pagination" />
          </div>
        </div>
      </section>

      <section id="contact" className="contact section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Contact</h2>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-5">
              <div className="info-wrap">
                <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
                  <i className="bi bi-geo-alt flex-shrink-0" />
                  <div>
                    <h3>Address</h3>
                    <p>Gujranwala, Pakistan</p>
                  </div>
                </div>
                <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                  <i className="bi bi-telephone flex-shrink-0" />
                  <div>
                    <h3>Call Us</h3>
                    <p>
                      <a href="tel:+923368570422">+92 3368570422</a>
                    </p>
                  </div>
                </div>
                <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                  <i className="bi bi-envelope flex-shrink-0" />
                  <div>
                    <h3>Email Us</h3>
                    <p>
                      <a href="mailto:ahmer.official92@gmail.com">ahmer.official92@gmail.com</a>
                    </p>
                  </div>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217760.38623271316!2d74.052502!3d32.187692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f27b59bf4c2b1%3A0x37e7dd08ac4bd0d0!2sGujranwala%2C%20Pakistan!5e0!3m2!1sen!2s!5m2!1sen!2s"
                  style={{ border: 0, width: "100%", height: "270px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map"
                />
              </div>
            </div>
            <div className="col-lg-7">
              <form action="/api/contact" method="post" className="php-email-form" data-aos="fade-up" data-aos-delay="200">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <label htmlFor="name-field" className="pb-2">
                      Your Name
                    </label>
                    <input type="text" name="name" id="name-field" className="form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email-field" className="pb-2">
                      Your Email
                    </label>
                    <input type="email" className="form-control" name="email" id="email-field" required />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="subject-field" className="pb-2">
                      Subject
                    </label>
                    <input type="text" className="form-control" name="subject" id="subject-field" required />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="message-field" className="pb-2">
                      Message
                    </label>
                    <textarea className="form-control" name="message" rows={10} id="message-field" required />
                  </div>
                  <div className="col-md-12 text-center">
                    <div className="loading">Loading</div>
                    <div className="error-message" />
                    <div className="sent-message">Your message has been sent. Thank you!</div>
                    <button type="submit">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PortfolioCard({ project }: { project: Project }) {
  const filterClasses = normalizeProjectFilters(project).join(" ");
  const img = cardImageSrc(project);
  const gallery = galleryForProject(project);
  const subtitle = project.subtitle ?? project.title;
  const glightboxTitle = project.title || project.name;
  const href = detailPath(project);
  return (
    <div className={`col-lg-4 col-md-6 portfolio-item isotope-item ${filterClasses}`}>
      <div className="portfolio-content h-100">
        <img src={img} className="img-fluid" alt="" />
        <div className="portfolio-info">
          <h4>{project.name}</h4>
          <p>{subtitle}</p>
          <a href={img} title={glightboxTitle} data-gallery={gallery} className="glightbox preview-link">
            <i className="bi bi-zoom-in" />
          </a>
          <Link href={href} title="More Details" className="details-link">
            <i className="bi bi-link-45deg" />
          </Link>
        </div>
      </div>
    </div>
  );
}
