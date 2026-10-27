import { useEffect, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type { engineeringProjects } from "./projects";

type SceneProps = {
  project: (typeof engineeringProjects)[number];
  allowMotion: boolean;
  running: boolean;
  enabled: boolean;
};

// Keep timed steps in sync with CSS motion, including time spent paused or offscreen.
function useTimedStep<Step extends string>(step: Step, next: Step | undefined, delay: number, running: boolean, setStep: Dispatch<SetStateAction<Step>>) {
  const clock = useRef({ step, delay, remaining: delay });

  useEffect(() => {
    if (clock.current.step !== step || clock.current.delay !== delay) {
      clock.current = { step, delay, remaining: delay };
    }
    if (next === undefined || !running) return;

    const current = clock.current;
    const started = performance.now();
    const timer = window.setTimeout(() => setStep(next), current.remaining);
    return () => {
      window.clearTimeout(timer);
      current.remaining = Math.max(0, current.remaining - (performance.now() - started));
    };
  }, [step, next, delay, running, setStep]);
}

function SceneFrame({ project, allowMotion, running, enabled, phase, children, controls }: SceneProps & {
  phase: string;
  children: ReactNode;
  controls: ReactNode;
}) {
  return (
    <>
      <div
        className={`system-scene scene-${project.id}`}
        data-project={project.id}
        data-motion={allowMotion}
        data-running={allowMotion && running}
        data-interactive={phase !== "loop"}
        data-state={phase}
        role="img"
        aria-label={project.sceneDescription}
      >
        {children}
      </div>
      <fieldset className="scene-controls" disabled={!enabled} aria-label={`Interact with ${project.name}`}>
        {controls}
      </fieldset>
    </>
  );
}

function SceneActions({ label, busy, onAction, onReset, interactive, children }: {
  label: string;
  busy?: boolean;
  onAction: () => void;
  onReset: () => void;
  interactive: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <div className="scene-action-row">
        <button type="button" className="scene-action" disabled={busy} onClick={onAction}>
          {label}<span aria-hidden="true">↗</span>
        </button>
        {interactive && <button type="button" className="scene-reset" onClick={onReset}>Watch loop <span aria-hidden="true">↻</span></button>}
      </div>
      <p className="scene-feedback" role="status" aria-live="polite" aria-atomic="true">{children}</p>
    </>
  );
}

function Check() {
  return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 10 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Event() {
  return <svg viewBox="0 0 28 24" fill="none" aria-hidden="true"><rect x="2" y="3" width="24" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" /><path d="m3 5 11 8L25 5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>;
}

type DeliveryPhase = "loop" | "sending" | "failed" | "retrying" | "delivered";

export function DeliveryScene(props: SceneProps) {
  const [phase, setPhase] = useState<DeliveryPhase>("loop");
  const next = phase === "sending" ? "failed" : phase === "retrying" ? "delivered" : undefined;
  const animate = props.allowMotion && props.running;
  useTimedStep(phase, next, props.allowMotion ? 900 : 0, props.running || !props.allowMotion, setPhase);

  const feedback = {
    loop: "Send an event while the partner API is offline.",
    sending: "Sending the signed event…",
    failed: "503. Your event is saved. Bring the API back and retry.",
    retrying: "The API is back. Retrying the same saved event…",
    delivered: "Delivered. Both attempts stay in the history.",
  };

  function sendEvent() {
    if (phase === "failed") {
      setPhase(animate ? "retrying" : "delivered");
      return;
    }
    setPhase(animate ? "sending" : "failed");
  }

  return (
    <SceneFrame {...props} phase={phase} controls={
      <SceneActions
        label={phase === "failed" ? "Retry delivery" : phase === "sending" || phase === "retrying" ? "Sending…" : "Send an event"}
        busy={phase === "sending" || phase === "retrying"}
        interactive={phase !== "loop"}
        onReset={() => setPhase("loop")}
        onAction={sendEvent}
      >{feedback[phase]}</SceneActions>
    }>
      <div className="scene-topline"><span>order.created</span><span className="scene-tag">Signed event</span></div>
      <div className="delivery-canvas">
        <svg className="delivery-routes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M17 43H83" />
          <path className="delivery-return-route" d="M83 43C83 84 17 84 17 43" />
        </svg>
        <div className="delivery-station delivery-origin"><span className="station-icon"><Event /></span><strong>Your app</strong></div>
        <div className="delivery-station delivery-destination"><span className="station-icon server-icon"><i /><i /><i /></span><strong>Partner API</strong></div>
        <span className="delivery-packet motion"><Event /></span>
        <span className="delivery-response delivery-error motion">503</span>
        <span className="delivery-response delivery-ok motion"><Check /> 200</span>
        <div className="delivery-retry-note motion"><span aria-hidden="true">↻</span> Saved for retry</div>
      </div>
      <div className="delivery-receipts">
        <span className="delivery-receipt motion receipt-failed"><i /> Attempt 1 <strong>Failed</strong></span>
        <span className="delivery-receipt motion receipt-delivered"><Check /> Attempt 2 <strong>Delivered</strong></span>
      </div>
      <p className="scene-caption">Same event. Another chance to arrive.</p>
    </SceneFrame>
  );
}

type TaskPhase = "loop" | "crashed" | "recovering" | "done";

export function TaskScene(props: SceneProps) {
  const [phase, setPhase] = useState<TaskPhase>("loop");
  const animate = props.allowMotion && props.running;
  useTimedStep(phase, phase === "recovering" ? "done" : undefined, props.allowMotion ? 2200 : 0, props.running || !props.allowMotion, setPhase);

  const feedback = {
    loop: "Stop the worker halfway through its import.",
    crashed: "Worker A stopped. Validation is still saved.",
    recovering: "Worker B retries import, then sends confirmation…",
    done: "All three activities complete. Validation never ran twice.",
  };

  function interruptOrRecover() {
    if (phase === "crashed") {
      setPhase(animate ? "recovering" : "done");
      return;
    }
    setPhase("crashed");
  }

  return (
    <SceneFrame {...props} phase={phase} controls={
      <SceneActions
        label={phase === "crashed" ? "Recover the job" : phase === "recovering" ? "Recovering…" : "Stop the worker"}
        busy={phase === "recovering"}
        interactive={phase !== "loop"}
        onReset={() => setPhase("loop")}
        onAction={interruptOrRecover}
      >{feedback[phase]}</SceneActions>
    }>
      <div className="scene-topline"><span>customer_import</span><span className="scene-tag">3 activities</span></div>
      <div className="task-stack">
        <div className="task-activity task-activity-saved">
          <span className="task-marker"><Check /></span>
          <div><strong>Validate records</strong><span>Checkpoint saved</span></div>
          <span className="task-saved-label">Done</span>
        </div>
        <div className="task-activity task-activity-import motion">
          <span className="task-marker"><span className="task-check motion"><Check /></span><span className="task-step motion">2</span></span>
          <div><strong>Import records</strong><div className="task-progress"><i className="task-import-progress motion" /></div></div>
          <div className="task-worker"><span className="worker-old motion">Worker A</span><span className="task-interruption motion">Stopped</span><span className="worker-new motion">Worker B</span></div>
        </div>
        <div className="task-activity task-activity-notify">
          <span className="task-marker"><span className="task-check motion"><Check /></span><span className="task-step motion">3</span></span>
          <div><strong>Send confirmation</strong><div className="task-progress"><i className="task-notify-progress motion" /></div></div>
          <span className="task-finish motion">Done</span>
        </div>
      </div>
      <p className="scene-caption">Keep completed work. Retry the unfinished activity.</p>
    </SceneFrame>
  );
}

const inventory = [
  { sku: "TEE", source: "12", previous: "10", changed: true },
  { sku: "CAP", source: "8", previous: "8", changed: false },
  { sku: "TOTE", source: "24", previous: "—", changed: true },
] as const;

type ReconcilePhase = "loop" | "drift" | "approved" | "repaired";

export function ReconcileScene(props: SceneProps) {
  const [phase, setPhase] = useState<ReconcilePhase>("loop");
  const animate = props.allowMotion && props.running;
  useTimedStep(phase, phase === "approved" ? "repaired" : undefined, props.allowMotion ? 650 : 0, props.running || !props.allowMotion, setPhase);

  const feedback = {
    loop: "Introduce a mismatch. You decide when to repair it.",
    drift: "Two differences found. No writes until you approve.",
    approved: "Approved. Applying only the two reviewed repairs…",
    repaired: "Both systems agree. Two repairs, with evidence kept.",
  };

  function introduceOrRepair() {
    if (phase === "drift") {
      setPhase(animate ? "approved" : "repaired");
      return;
    }
    setPhase("drift");
  }

  return (
    <SceneFrame {...props} phase={phase} controls={
      <SceneActions
        label={phase === "drift" ? "Approve 2 repairs" : phase === "approved" ? "Repairing…" : "Create a mismatch"}
        busy={phase === "approved"}
        interactive={phase !== "loop"}
        onReset={() => setPhase("loop")}
        onAction={introduceOrRepair}
      >{feedback[phase]}</SceneActions>
    }>
      <div className="scene-topline"><span>Inventory snapshot</span><span className="scene-tag">3 products</span></div>
      <div className="reconcile-ledgers">
        <div className="mini-ledger">
          <div className="ledger-heading">Source <span>Units</span></div>
          {inventory.map((row) => <div className="ledger-row" key={row.sku}><span>{row.sku}</span><strong>{row.source}</strong></div>)}
        </div>
        <div className="reconcile-bridge" aria-hidden="true"><span className="reconcile-different motion">≠</span><span className="reconcile-equal motion">=</span></div>
        <div className="mini-ledger target-ledger">
          <div className="ledger-heading">Replica <span>Units</span></div>
          {inventory.map((row) => (
            <div className={`ledger-row ${row.changed ? "ledger-changed motion" : ""}`} key={row.sku}>
              <span>{row.sku}</span>
              {row.changed ? <span className="ledger-value"><strong className="ledger-before motion">{row.previous}</strong><strong className="ledger-after motion">{row.source}</strong></span> : <strong>{row.source}</strong>}
            </div>
          ))}
        </div>
        <span className="reconcile-scan motion" aria-hidden="true" />
      </div>
      <div className="repair-gate">
        <span className="repair-compare motion">Compare without writes</span>
        <span className="repair-approve motion"><Check /> Repair plan approved</span>
        <span className="repair-complete motion"><Check /> Two repairs recorded</span>
      </div>
      <p className="scene-caption">Find the drift. Review it. Then repair it.</p>
    </SceneFrame>
  );
}

// A fixed permutation keeps the same example users in every expanding cohort.
const cohort = Array.from({ length: 40 }, (_, index) => {
  const rank = (index * 17 + 7) % 40;
  return { id: index, rank, group: Math.floor(rank / 10) + 1 };
});

export function RolloutScene(props: SceneProps) {
  const [percentage, setPercentage] = useState<number | null>(null);
  const interactive = percentage !== null;

  return (
    <SceneFrame {...props} phase={interactive ? "controlled" : "loop"} controls={
      <>
        <div className="scene-action-row rollout-control-heading">
          <label htmlFor={`${props.project.id}-percentage`}>Set your own rollout</label>
          {interactive && <button type="button" className="scene-reset" onClick={() => setPercentage(null)}>Watch loop <span aria-hidden="true">↻</span></button>}
        </div>
        <input
          className="rollout-input"
          id={`${props.project.id}-percentage`}
          type="range"
          min="0"
          max="100"
          step="5"
          value={percentage ?? 75}
          aria-valuetext={`${percentage ?? 75} percent, ${(percentage ?? 75) * 0.4} of 40 users`}
          onChange={(event) => setPercentage(event.currentTarget.valueAsNumber)}
          style={{ backgroundSize: `${percentage ?? 75}% 3px, 100% 3px` }}
        />
        <p className="scene-feedback" role="status" aria-live="polite" aria-atomic="true">
          {interactive ? `${percentage * 0.4} of 40 users. The same people stay selected as you expand.` : "Slide from 0% to 100%. The cohort never reshuffles."}
        </p>
      </>
    }>
      <div className="scene-topline"><span>new_checkout</span><span className="scene-tag">Gradual rollout</span></div>
      <div className="rollout-meter">
        <span>Available to</span>
        <div className="rollout-percentage">{interactive ? <strong>{percentage}<span>%</span></strong> : <><strong className="rollout-quarter motion">25<span>%</span></strong><strong className="rollout-half motion">50<span>%</span></strong><strong className="rollout-most motion">75<span>%</span></strong></>}</div>
        <span>of this example cohort</span>
      </div>
      <div className="rollout-people" aria-hidden="true">
        {cohort.map((person) => <span className={`rollout-person cohort-${person.group} motion`} data-user={person.id} data-selected={interactive ? person.rank < percentage * 0.4 : undefined} key={person.id}><i /><b /></span>)}
      </div>
      <div className="rollout-track" aria-hidden="true"><span className="rollout-fill motion" style={interactive ? { transform: `scaleX(${percentage / 100})` } : undefined} /><i className="rollout-knob motion" style={interactive ? { left: `${percentage}%` } : undefined} /></div>
      <p className="scene-caption">A wider release. The same users stay selected.</p>
    </SceneFrame>
  );
}
