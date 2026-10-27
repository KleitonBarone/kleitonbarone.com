import Image from "next/image";
import { EngineeringStories } from "./engineering-stories";
import { featuredProjects } from "./projects";

export function ProjectShowcase() {
  return (
    <>
      <div className="demo-projects">
        {featuredProjects.map((project) => (
          <article className="demo-project" key={project.id} aria-labelledby={`${project.id}-title`}>
            <a
              className={`project-screenshot screenshot-${project.id}`}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the ${project.name} demo`}
            >
              <div className="screenshot-topline" aria-hidden="true">
                <span className="screenshot-window-dots"><i /><i /><i /></span>
                <span>{project.name}</span>
              </div>
              <div className="screenshot-viewport">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1000px) 45vw, 360px"
                  unoptimized
                />
              </div>
              <span className="screenshot-open" aria-hidden="true">Open demo ↗</span>
            </a>
            <div className="demo-project-copy">
              <p className="project-category">{project.category}</p>
              <h3 id={`${project.id}-title`}>{project.name}</h3>
              <p className="project-headline">{project.headline}</p>
              <p className="project-description">{project.description}</p>
              <p className="project-try"><span>Try this</span>{project.tryThis}</p>
              <p className="project-knowledge">{project.knowledge.join(", ")}</p>
              <div className="project-links">
                <a className="demo-link" href={project.demo} target="_blank" rel="noopener noreferrer">
                  Open demo <span className="sr-only">for {project.name}</span><span aria-hidden="true">↗</span>
                </a>
                <a className="text-link" href={project.source} target="_blank" rel="noopener noreferrer">
                  Source <span className="sr-only">for {project.name}</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="demo-context">
        Explore with fictional data, no sign-up needed. The hosted demos run in your
        browser; the source code includes the full backend implementations.
      </p>
      <EngineeringStories />
    </>
  );
}
