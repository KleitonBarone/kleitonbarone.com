import Image from "next/image";
import { profile } from "./profile";
import { DeliveryDemo } from "./delivery-demo";

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
                src="/kleiton-barone.jpg"
                alt="Kleiton Barone"
                width={460}
                height={460}
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
              <h2 id="work-title">A few things I’ve built.</h2>
              <p>Personal projects, with real problems behind them.</p>
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
          <article className="project featured-project">
            <DeliveryDemo />
            <div className="project-copy">
              <p className="project-category">Backend engineering</p>
              <h3>
                When a delivery fails,
                <br />
                the work shouldn’t.
              </h3>
              <p>
                Services go offline. Requests fail. Webhook Redrive keeps track
                of what happened and retries deliveries, with a way to replay
                those that still need attention.
              </p>
              <ul className="project-points">
                <li>Signed requests and durable delivery history</li>
                <li>Automatic retries and audited manual replay</li>
              </ul>
              <p className="technology">Go / PostgreSQL / Docker</p>
              <a
                className="text-link"
                href="https://github.com/KleitonBarone/webhook-redrive"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore Webhook Redrive <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
          <div className="secondary-projects">
            <article className="project">
              <div
                className="reconcile-visual"
                aria-label="Illustrated comparison of records from two systems"
              >
                <div className="visual-heading">
                  <span className="visual-brand">Data Reconciler</span>
                  <span className="visual-label">Comparison example</span>
                </div>
                <div className="comparison-table">
                  <div className="comparison-head">
                    <span>Record</span>
                    <span>System A</span>
                    <span>System B</span>
                  </div>
                  <div>
                    <span>Order 101</span>
                    <span>$125.00</span>
                    <span className="difference">$120.00</span>
                  </div>
                  <div>
                    <span>Order 102</span>
                    <span>Present</span>
                    <span className="difference">Missing</span>
                  </div>
                  <div>
                    <span>Order 103</span>
                    <span>Matched</span>
                    <span>Matched</span>
                  </div>
                </div>
                <div className="comparison-result">
                  <span className="result-symbol" aria-hidden="true">
                    ≠
                  </span>
                  <span>
                    Find the differences.
                    <br />
                    <strong>Before they become problems.</strong>
                  </span>
                </div>
              </div>
              <div className="project-copy">
                <p className="project-category">Data & systems</p>
                <h3>
                  Two systems.
                  <br />
                  One clearer picture.
                </h3>
                <p>
                  Compare records, find missing data, and flag conflicts. A
                  read-only reconciliation engine that reports differences
                  without changing either system.
                </p>
                <p className="technology">TypeScript / Node.js / SQLite</p>
                <a
                  className="text-link"
                  href="https://github.com/KleitonBarone/data-reconciler"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore Data Reconciler <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
            <article className="project">
              <div
                className="community-visual"
                aria-label="Conceptual preview of a community discussion feed"
              >
                <div className="community-browser">
                  <div className="community-top">
                    <span className="community-icon" aria-hidden="true">
                      t
                    </span>
                    <strong>TabNews</strong>
                    <span>Community, built together.</span>
                  </div>
                  <div className="discussion">
                    <span className="discussion-votes">↥</span>
                    <div>
                      <strong>A place to share what you know</strong>
                      <span>Ideas, questions, and useful discoveries</span>
                    </div>
                  </div>
                  <div className="discussion">
                    <span className="discussion-votes">↥</span>
                    <div>
                      <strong>Built one lesson at a time</strong>
                      <span>A hands-on journey through curso.dev</span>
                    </div>
                  </div>
                  <div className="discussion">
                    <span className="discussion-votes">↥</span>
                    <div>
                      <strong>Learning by making things</strong>
                      <span>From an idea to a working website</span>
                    </div>
                  </div>
                </div>
                <span className="concept-label">
                  Illustrative project preview
                </span>
              </div>
              <div className="project-copy">
                <p className="project-category">Web development</p>
                <h3>
                  Learning by building
                  <br />
                  the whole thing.
                </h3>
                <p>
                  A TabNews clone built through curso.dev. A practical
                  exploration of how the pieces of a community website come
                  together.
                </p>
                <p className="technology">JavaScript / Web development</p>
                <a
                  className="text-link"
                  href="https://github.com/KleitonBarone/clone-tabnews"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore the TabNews clone <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          </div>
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
