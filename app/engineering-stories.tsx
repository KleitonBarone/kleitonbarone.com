"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { engineeringProjects } from "./projects";

const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(notify: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}

function prefersReducedMotion() {
  return window.matchMedia(motionQuery).matches;
}

export function EngineeringStories() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    prefersReducedMotion,
    () => true,
  );
  const project = engineeringProjects[selectedIndex];
  const step = project.steps[stepIndex];
  const atEnd = stepIndex === project.steps.length - 1;
  const advancing = playing && !reducedMotion && !atEnd;

  // A walkthrough runs once, only after a click. Changing projects clears its timer.
  useEffect(() => {
    if (!advancing) return;
    const timer = window.setTimeout(() => setStepIndex((index) => index + 1), 2600);
    return () => window.clearTimeout(timer);
  }, [advancing, selectedIndex, stepIndex]);

  // Do not keep a story running when the visitor leaves the panel or browser tab.
  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setPlaying(false);
    });
    if (panelRef.current) observer.observe(panelRef.current);
    return () => {
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      observer.disconnect();
    };
  }, []);

  function selectProject(index: number) {
    setSelectedIndex(index);
    setStepIndex(0);
    setPlaying(false);
  }

  function togglePlayback() {
    if (atEnd) {
      setStepIndex(0);
      setPlaying(!reducedMotion);
    } else {
      setPlaying(!playing);
    }
  }

  return (
    <div className="engineering-stories">
      <div className="engineering-picker" role="group" aria-label="Choose an engineering project">
        {engineeringProjects.map((item, index) => (
          <button
            key={item.id}
            id={`choose-${item.id}`}
            className="engineering-choice"
            type="button"
            aria-pressed={selectedIndex === index}
            aria-controls="engineering-story"
            onClick={() => selectProject(index)}
          >
            <span>{item.name}</span>
            <span>{item.subject}</span>
          </button>
        ))}
      </div>
      <section
        className="engineering-detail"
        id="engineering-story"
        aria-labelledby={`choose-${project.id}`}
        ref={panelRef}
      >
        <div className="story-scene" data-playing={advancing}>
          <div className="story-topline">
            <span>Inside {project.name}</span>
            <span className="story-example-label">Illustrated walkthrough</span>
          </div>
          <div className="story-nodes" role="group" aria-label="System state">
            {project.nodeNames.map((name, index) => (
              <div className="story-node-group" key={name}>
                {index > 0 && (
                  <div
                    className="story-connection"
                    data-direction={step.connections[index - 1]}
                    aria-hidden="true"
                  >
                    {advancing && step.connections[index - 1] !== "idle" && (
                      <span className="story-packet" key={`${project.id}-${stepIndex}`} />
                    )}
                  </div>
                )}
                <div className="story-node" data-tone={step.nodes[index].tone}>
                  <span>{name}</span>
                  <strong>{step.nodes[index].label}</strong>
                </div>
              </div>
            ))}
          </div>
          <ol className="story-progress" aria-label="Walkthrough steps">
            {project.steps.map((item, index) => (
              <li
                key={item.title}
                data-complete={index <= stepIndex}
                aria-current={index === stepIndex ? "step" : undefined}
              >
                <span className="sr-only">{item.title}</span>
              </li>
            ))}
          </ol>
          <div className="story-narrative" role="status" aria-live="polite" aria-atomic="true">
            <p className="story-step-number">Step {stepIndex + 1} of {project.steps.length}</p>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </div>
          <div className="story-controls">
            {!reducedMotion && (
              <button type="button" onClick={togglePlayback}>
                <span aria-hidden="true">{atEnd ? "↺" : advancing ? "Ⅱ" : "▷"}</span>
                {atEnd ? "Replay walkthrough" : advancing ? "Pause walkthrough" : "Play walkthrough"}
              </button>
            )}
            <button
              type="button"
              className="story-next"
              disabled={advancing}
              onClick={() => {
                setPlaying(false);
                setStepIndex(atEnd ? 0 : stepIndex + 1);
              }}
            >
              {atEnd ? "Back to start" : "Next step"}
            </button>
          </div>
          <noscript>
            <p className="story-noscript">Enable JavaScript for the walkthrough. All project links are available below.</p>
          </noscript>
        </div>
        <div className="engineering-description">
          <h4>{project.name}</h4>
          <p>{project.description}</p>
          <p className="project-knowledge">{project.knowledge.join(", ")}</p>
          <div className="project-links">
            <a className="text-link" href={project.source} target="_blank" rel="noopener noreferrer">
              Source code <span className="sr-only">for {project.name}</span>
            </a>
          </div>
        </div>
      </section>
      <noscript>
        <ul className="engineering-fallback">
          {engineeringProjects.slice(1).map((item) => (
            <li key={item.id}>
              <a href={item.source} target="_blank" rel="noopener noreferrer">{item.name}</a>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </noscript>
    </div>
  );
}
