"use client";

import { useState } from "react";

const attempts = [
  { label: "First attempt", result: "Service unavailable", tone: "failed" },
  { label: "Retry", result: "Service still unavailable", tone: "failed" },
  { label: "Delivered", result: "Service recovered", tone: "success" },
] as const;
const buttonLabels = [
  "Send example",
  "Try the next attempt",
  "Try the next attempt",
  "Reset example",
];
const summaries = [
  "Follow an example delivery through two failures and a successful retry.",
  "The service is unavailable. The event is saved for another attempt.",
  "Still unavailable. The event stays in the queue.",
  "The service recovered. The delivery succeeded, with its history intact.",
];

export function DeliveryDemo() {
  const [step, setStep] = useState(0);
  return (
    <div className="delivery-visual">
      <div className="visual-heading">
        <span className="visual-brand">Webhook Redrive</span>
        <span className="visual-label">Interactive example</span>
      </div>
      <div className="delivery-path" aria-hidden="true">
        <div className="system-node">Your app</div>
        <div className="connection" />
        <div className="system-node">Connected service</div>
      </div>
      <div className="attempts" aria-label="Delivery history">
        {attempts.map((attempt, index) => (
          <div
            key={attempt.label}
            className={index < step ? "" : "pending-attempt"}
          >
            <span
              className={`attempt-dot ${index < step ? attempt.tone : ""}`}
            />
            <span>{attempt.label}</span>
            <span>{index < step ? attempt.result : "Waiting"}</span>
          </div>
        ))}
      </div>
      <p
        className="demo-summary"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {summaries[step]}
      </p>
      <button
        className="demo-button"
        type="button"
        onClick={() => setStep((previous) => (previous + 1) % 4)}
      >
        {buttonLabels[step]}
        <span aria-hidden="true">{step === 3 ? "↺" : "→"}</span>
      </button>
      <noscript>
        <p className="visual-footnote">
          In this example, two failed requests are followed by a successful
          delivery. Enable JavaScript to step through it.
        </p>
      </noscript>
    </div>
  );
}
