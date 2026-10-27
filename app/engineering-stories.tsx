"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { engineeringProjects } from "./projects";
import { DeliveryScene, TaskScene, ReconcileScene, RolloutScene } from "./system-scenes";

type EngineeringProject = (typeof engineeringProjects)[number];
const scenes = {
  "webhook-redrive": DeliveryScene,
  "durable-task-runner": TaskScene,
  "data-reconciler": ReconcileScene,
  "feature-rollout-service": RolloutScene,
};
const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(notify: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}

function prefersReducedMotion() {
  return window.matchMedia(motionQuery).matches;
}

function subscribeToVisibility(notify: () => void) {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
}

function documentIsVisible() {
  return document.visibilityState === "visible";
}

function SystemStudy({ project, allowMotion, playing }: {
  project: EngineeringProject;
  allowMotion: boolean;
  playing: boolean;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const Scene = scenes[project.id];

  useEffect(() => {
    const node = sceneRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry?.isIntersecting ?? false);
    }, { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <article className="system-study" aria-labelledby={`${project.id}-title`}>
      <div className="system-study-heading">
        <h4 id={`${project.id}-title`}>{project.name}</h4>
        <p>{project.subject}</p>
      </div>
      <div
        className={`system-scene scene-${project.id}`}
        data-project={project.id}
        data-motion={allowMotion}
        data-running={allowMotion && playing && inView}
        role="img"
        aria-label={project.sceneDescription}
        ref={sceneRef}
      >
        <Scene />
      </div>
      <p className="system-description">{project.description}</p>
      <p className="project-knowledge">{project.knowledge.join(", ")}</p>
      <a className="text-link" href={project.source} target="_blank" rel="noopener noreferrer">
        Source code <span className="sr-only">for {project.name}</span>
      </a>
    </article>
  );
}

export function EngineeringStories() {
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToMotionPreference, prefersReducedMotion, () => true);
  const visible = useSyncExternalStore(subscribeToVisibility, documentIsVisible, () => false);

  return (
    <section className="systems-section" id="systems" aria-labelledby="systems-title">
      <div className="systems-heading">
        <div>
          <h3 id="systems-title">Systems without a live demo.</h3>
          <p>See deliveries retry, jobs recover, records agree, and features reach more users.</p>
        </div>
        {reducedMotion ? <span className="motion-setting">Reduced motion enabled</span> : (
          <button className="motion-control" type="button" onClick={() => setPaused((value) => !value)}>
            <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
            {paused ? "Resume animations" : "Pause animations"}
          </button>
        )}
      </div>
      <div className="system-gallery">
        {engineeringProjects.map((project) => (
          <SystemStudy key={project.id} project={project} allowMotion={!reducedMotion} playing={!paused && visible} />
        ))}
      </div>
      <p className="systems-note">Illustrations of backend behavior. These scenes run entirely in your browser.</p>
    </section>
  );
}
