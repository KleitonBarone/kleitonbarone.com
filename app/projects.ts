export const featuredProjects = [
  {
    id: "customer-onboarding",
    name: "Relay customer onboarding",
    category: "B2B operations",
    headline: "From signed customer to ready to launch.",
    description:
      "A shared workspace for customers, reviewers, and account managers. Collect documents, resolve corrections, and activate an account when every requirement is approved.",
    tryThis: "Request a correction, switch to the customer, and submit a revision.",
    demo: "https://demo-customer-onboarding.kleitonbarone.com/",
    source: "https://github.com/KleitonBarone/customer-onboarding",
    image: "/projects/customer-onboarding.png",
    imageAlt:
      "Relay account manager queue with customer statuses and the next action for each account",
    knowledge: ["Access control", "Document versioning", "Approval workflows"],
  },
  {
    id: "returns-and-refunds",
    name: "Northline returns",
    category: "Commerce & payments",
    headline: "A return resolved. A refund accounted for.",
    description:
      "Follow a partial return through support, warehouse inspection, and finance. Recover a payment whose response was lost while keeping the original refund intact.",
    tryThis: "Explore refund recovery and check the original payment status.",
    demo: "https://demo-returns-and-refunds.kleitonbarone.com/",
    source: "https://github.com/KleitonBarone/returns-and-refunds",
    image: "/projects/returns-and-refunds.png",
    imageAlt:
      "Northline refund panel explaining an unknown payment outcome and how finance can check its status",
    knowledge: ["State machines", "Transaction boundaries", "Payment reconciliation"],
  },
  {
    id: "webhook-recovery",
    name: "Webhook recovery",
    category: "Event processing",
    headline: "Accepted is only the beginning.",
    description:
      "An incoming webhook inbox that separates receipt from processing. Investigate failed attempts, handle duplicate or older events, and replay a failure with its history preserved.",
    tryThis: "Select a failed event, repair its cause, and request a replay.",
    demo: "https://demo-webhook-recovery.kleitonbarone.com/",
    source: "https://github.com/KleitonBarone/webhook-recovery",
    image: "/projects/webhook-recovery.png",
    imageAlt:
      "Webhook recovery console showing a processed event and its original acceptance receipt",
    knowledge: ["Event deduplication", "Stale-event handling", "Audited replay"],
  },
] as const;

// Each illustration has its own composition; none calls a backend service.
export const engineeringProjects = [
  {
    id: "webhook-redrive",
    name: "Webhook Redrive",
    subject: "A failed delivery is not a lost event",
    description: "Signed webhook delivery with durable retries and a complete attempt history. The same saved event gets another chance when the receiving service recovers.",
    sceneDescription: "A signed event leaves the application, receives a 503 response, follows the retry route, and is delivered on its second attempt. Both attempts remain recorded.",
    knowledge: ["HMAC signatures", "Retry backoff", "Destination policies"],
    source: "https://github.com/KleitonBarone/webhook-redrive",
  },
  {
    id: "durable-task-runner",
    name: "Durable Task Runner",
    subject: "Progress that outlives a worker",
    description: "A Go library that saves completed activities and recovers abandoned work. A replacement worker retries the unfinished activity using a stable effect key.",
    sceneDescription: "Validation stays complete when a worker stops during import. A replacement retries the import activity, then completes the confirmation step.",
    knowledge: ["Worker leases", "Crash recovery", "Workflow compensation"],
    source: "https://github.com/KleitonBarone/durable-task-runner",
  },
  {
    id: "data-reconciler",
    name: "Data Reconciler",
    subject: "Make two systems agree again",
    description: "Compare records without changing either input. Review the differences, approve a bounded repair plan, and retain the evidence of every change.",
    sceneDescription: "Source and replica inventory disagree on two products. A scan finds the differences, a repair plan is approved, and only then do the replica values change to match.",
    knowledge: ["Conflict resolution", "Checkpointed syncs", "Conditional repairs"],
    source: "https://github.com/KleitonBarone/data-reconciler",
  },
  {
    id: "feature-rollout-service",
    name: "Feature Rollout Service",
    subject: "Release gradually, without reshuffling users",
    description: "Stable percentage targeting expands a feature to a wider cohort. A local SDK evaluates cached configuration and uses explicit defaults when it becomes stale.",
    sceneDescription: "A fixed group of forty example users expands from a twenty-five percent rollout to fifty and seventy-five percent. Previously selected users stay in each larger cohort.",
    knowledge: ["Deterministic targeting", "Percentage rollouts", "Offline evaluation"],
    source: "https://github.com/KleitonBarone/feature-rollout-service",
  },
] as const;
