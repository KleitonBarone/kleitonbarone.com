import Image from "next/image";
import { profile } from "./profile";
import { ProjectShowcase } from "./project-showcase";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header wrap">
        <a className="wordmark" href="#" aria-label="Kleiton Barone home">
          kleiton<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href={profile.resume} download="Kleiton-Barone-Resume.pdf">
            Download resume <span aria-hidden="true">↓</span>
          </a>
          <a className="nav-contact" href={`mailto:${profile.email}`}>
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero wrap" aria-labelledby="intro-title">
          <div className="hero-copy">
            <p className="role">Senior Software Engineer</p>
            <h1 id="intro-title">
              Hi, I’m
              <br />
              Kleiton Barone.
            </h1>
            <p className="hero-description">
              I turn complex problems into software that works simply.
            </p>
            <p className="hero-detail">
              Backend engineering, thoughtful systems, and a habit of automating
              the repetitive stuff.
            </p>
            <div className="hero-actions">
              <a className="button" href="#work">
                Explore my work <span aria-hidden="true">↓</span>
              </a>
              <a
                className="text-link"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <figure className="portrait">
            <div className="portrait-frame">
              <Image
                src="/kleiton-barone.webp"
                alt="Kleiton Barone"
                width={900}
                height={1200}
                priority
                unoptimized
              />
            </div>
            <figcaption>
              <span>Based in São Paulo, Brazil</span>
              <span className="location-mark" aria-hidden="true">
                23° S / 46° W
              </span>
            </figcaption>
          </figure>
        </section>
        <section
          className="credentials wrap"
          aria-label="Background at a glance"
        >
          <div>
            <strong>6+ years</strong>
            <span>Professional engineering experience</span>
          </div>
          <div>
            <strong>Backend & systems</strong>
            <span>My main engineering focus</span>
          </div>
          <div>
            <strong>Computer Science</strong>
            <span>Bachelor’s degree</span>
          </div>
        </section>
        <section
          className="work-section wrap"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <h2 id="work-title">Projects you can try.</h2>
              <p>Business workflows you can explore, and the engineering behind them.</p>
            </div>
            <a
              className="text-link"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              All projects on GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
          <ProjectShowcase />
        </section>
        <section
          className="about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="wrap about-grid">
            <div>
              <p className="role">A little about me</p>
              <h2 id="about-title">
                Curious by nature.
                <br />
                Practical by choice.
              </h2>
              <p className="about-intro">
                I’m a software engineer who enjoys figuring things out, building
                useful tools, and making complicated work a little simpler.
              </p>
              <a
                className="text-link"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                My experience on LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="approach">
              <article>
                <h3>Build with a purpose.</h3>
                <p>
                  I start with the problem. The goal is a useful result and a
                  system people can understand and maintain.
                </p>
              </article>
              <article>
                <h3>Make room for better work.</h3>
                <p>
                  I look for repetitive tasks that software can take care of, so
                  people can focus on the parts that need their attention.
                </p>
              </article>
              <article>
                <h3>Keep learning, keep making.</h3>
                <p>
                  My focus is backend engineering and system design. I’m also
                  exploring Go and building across the stack.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section
          className="contact-section wrap"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div>
            <p className="role">Have a role or project in mind?</p>
            <h2 id="contact-title">
              Let’s build
              <br />
              something useful.
            </h2>
            <p>I’d like to hear what you’re working on.</p>
          </div>
          <div className="contact-actions">
            <a className="button" href={`mailto:${profile.email}`}>
              Get in touch <span aria-hidden="true">↗</span>
            </a>
            <a
              className="text-link"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a
              className="text-link"
              href={profile.resume}
              download="Kleiton-Barone-Resume.pdf"
            >
              Download résumé <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
      </main>
      <footer className="site-footer wrap">
        <a className="wordmark" href="#">
          kleiton<span>.</span>
        </a>
        <span>Built with care. Always a work in progress.</span>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </footer>
    </>
  );
}
