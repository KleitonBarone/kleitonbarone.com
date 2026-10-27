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
    caseStudy:
      "https://github.com/KleitonBarone/customer-onboarding/blob/main/docs/CASE_STUDY.md",
    image: "/projects/customer-onboarding.png",
    imageAlt:
      "Relay account manager queue with customer statuses and the next action for each account",
    technologies: "React, TypeScript, Fastify, PostgreSQL",
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
    caseStudy:
      "https://github.com/KleitonBarone/returns-and-refunds/blob/main/docs/case-study.md",
    image: "/projects/returns-and-refunds.png",
    imageAlt:
      "Northline refund panel explaining an unknown payment outcome and how finance can check its status",
    technologies: "React, TypeScript, Fastify, PostgreSQL",
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
    caseStudy:
      "https://github.com/KleitonBarone/webhook-recovery/blob/main/docs/case-study.md",
    image: "/projects/webhook-recovery.png",
    imageAlt:
      "Webhook recovery console showing a processed event and its original acceptance receipt",
    technologies: "TypeScript, React, PostgreSQL, workers",
  },
] as const;

type NodeState = {
  label: string;
  tone: "neutral" | "active" | "warning" | "success";
};

type StoryStep = {
  title: string;
  description: string;
  nodes: readonly [NodeState, NodeState, NodeState];
  connections: readonly ["idle" | "forward" | "backward", "idle" | "forward" | "backward"];
};

type EngineeringProject = {
  id: string;
  name: string;
  subject: string;
  description: string;
  technologies: string;
  source: string;
  guide: string;
  guideLabel: string;
  nodeNames: readonly [string, string, string];
  steps: readonly StoryStep[];
};

// These finite, illustrative stories explain the projects. They run no backend code.
export const engineeringProjects = [
  {
    id: "webhook-redrive",
    name: "Webhook Redrive",
    subject: "Outbound delivery",
    description:
      "Signed webhook delivery with durable retries, attempt history, and audited replay. The sender keeps delivery intent when a receiving service goes offline.",
    technologies: "Go, PostgreSQL, Docker",
    source: "https://github.com/KleitonBarone/webhook-redrive",
    guide:
      "https://github.com/KleitonBarone/webhook-redrive/blob/main/docs/portfolio-demo.md",
    guideLabel: "Local walkthrough",
    nodeNames: ["Your application", "Delivery queue", "Receiving service"],
    steps: [
      {
        title: "Save before sending",
        connections: ["forward", "idle"],
        description:
          "The application submits an event. Its delivery intent is stored before the first request leaves.",
        nodes: [
          { label: "Event submitted", tone: "active" },
          { label: "Saved", tone: "success" },
          { label: "Waiting", tone: "neutral" },
        ],
      },
      {
        title: "The receiver is unavailable",
        connections: ["idle", "forward"],
        description:
          "A failed request becomes an attempt in the history. The event stays recorded for another try.",
        nodes: [
          { label: "Event retained", tone: "neutral" },
          { label: "Retry scheduled", tone: "warning" },
          { label: "503 unavailable", tone: "warning" },
        ],
      },
      {
        title: "Retry the same event",
        connections: ["idle", "forward"],
        description:
          "The worker sends the saved payload again after the retry delay. The receiving service has recovered.",
        nodes: [
          { label: "Same event", tone: "neutral" },
          { label: "Sending again", tone: "active" },
          { label: "Back online", tone: "active" },
        ],
      },
      {
        title: "Keep the complete history",
        connections: ["idle", "idle"],
        description:
          "Delivery succeeds. The earlier failure remains visible. Receivers still need to deduplicate business processing.",
        nodes: [
          { label: "Event retained", tone: "neutral" },
          { label: "History preserved", tone: "success" },
          { label: "Delivered", tone: "success" },
        ],
      },
    ],
  },
  {
    id: "durable-task-runner",
    name: "Durable Task Runner",
    subject: "Work that survives a crash",
    description:
      "A Go library for jobs with several activities. It saves progress, recovers abandoned work, and gives handlers stable keys for protecting repeated effects.",
    technologies: "Go, PostgreSQL, worker leases",
    source: "https://github.com/KleitonBarone/durable-task-runner",
    guide:
      "https://github.com/KleitonBarone/durable-task-runner/blob/main/docs/integration.md",
    guideLabel: "Integration guide",
    nodeNames: ["Import job", "Saved progress", "Worker"],
    steps: [
      {
        title: "Save the job and its plan",
        connections: ["forward", "idle"],
        description:
          "The import's activity plan is committed before a worker can claim its first step.",
        nodes: [
          { label: "Import queued", tone: "active" },
          { label: "Plan stored", tone: "success" },
          { label: "Ready", tone: "neutral" },
        ],
      },
      {
        title: "Finish the first activity",
        connections: ["idle", "backward"],
        description:
          "Completing validation and making the next activity ready happen in the same database transaction.",
        nodes: [
          { label: "Validation done", tone: "success" },
          { label: "Step committed", tone: "success" },
          { label: "Next activity", tone: "active" },
        ],
      },
      {
        title: "The worker stops",
        connections: ["idle", "idle"],
        description:
          "A worker disappears during the next activity. Its lease expires while the completed step stays saved.",
        nodes: [
          { label: "Import waiting", tone: "warning" },
          { label: "Progress intact", tone: "success" },
          { label: "Lease expired", tone: "warning" },
        ],
      },
      {
        title: "Recover unfinished work",
        connections: ["idle", "forward"],
        description:
          "A replacement claims the unfinished activity. Handlers use the same effect key to protect repeated side effects.",
        nodes: [
          { label: "Import resumes", tone: "success" },
          { label: "Same effect key", tone: "success" },
          { label: "New worker", tone: "active" },
        ],
      },
    ],
  },
  {
    id: "data-reconciler",
    name: "Data Reconciler",
    subject: "Find drift. Review the repair.",
    description:
      "A TypeScript library and CLI that compares systems, records differences, and applies explicitly approved repairs with preconditions and recovery history.",
    technologies: "TypeScript, Node.js, SQLite",
    source: "https://github.com/KleitonBarone/data-reconciler",
    guide:
      "https://github.com/KleitonBarone/data-reconciler/blob/main/docs/repairs.md",
    guideLabel: "Repair walkthrough",
    nodeNames: ["Source inventory", "Reconciliation", "Target inventory"],
    steps: [
      {
        title: "Two systems disagree",
        connections: ["idle", "idle"],
        description:
          "A fictional inventory item has twelve units in the source and ten in the target.",
        nodes: [
          { label: "12 units", tone: "neutral" },
          { label: "Not compared", tone: "neutral" },
          { label: "10 units", tone: "warning" },
        ],
      },
      {
        title: "Compare without changing data",
        connections: ["forward", "backward"],
        description:
          "The engine records the difference and its source evidence. Comparison leaves both inputs untouched.",
        nodes: [
          { label: "12 units", tone: "neutral" },
          { label: "Difference saved", tone: "warning" },
          { label: "Still 10 units", tone: "neutral" },
        ],
      },
      {
        title: "Review the exact repair",
        connections: ["idle", "backward"],
        description:
          "An operator approves a bounded repair plan. The writer checks ownership and the target precondition before applying it.",
        nodes: [
          { label: "Owner of quantity", tone: "neutral" },
          { label: "Plan approved", tone: "active" },
          { label: "Precondition checked", tone: "active" },
        ],
      },
      {
        title: "Apply and retain the evidence",
        connections: ["idle", "forward"],
        description:
          "The local SQLite target now has twelve units. Repair receipts make repeating the approved operation safe.",
        nodes: [
          { label: "12 units", tone: "neutral" },
          { label: "Repair recorded", tone: "success" },
          { label: "12 units", tone: "success" },
        ],
      },
    ],
  },
  {
    id: "feature-rollout-service",
    name: "Feature Rollout Service",
    subject: "Predictable decisions during outages",
    description:
      "A feature-flag service with stable percentage targeting and a local TypeScript SDK. Flag checks use cached configuration and explicit defaults when it becomes stale.",
    technologies: "TypeScript, Node.js, PostgreSQL",
    source: "https://github.com/KleitonBarone/feature-rollout-service",
    guide:
      "https://github.com/KleitonBarone/feature-rollout-service/blob/main/docs/sdk.md",
    guideLabel: "SDK behavior",
    nodeNames: ["Flag service", "Application SDK", "Feature decision"],
    steps: [
      {
        title: "Publish a gradual rollout",
        connections: ["forward", "idle"],
        description:
          "A new checkout is enabled for a stable 25% cohort. The SDK receives the published configuration.",
        nodes: [
          { label: "25% rollout", tone: "active" },
          { label: "Snapshot cached", tone: "success" },
          { label: "Ready to evaluate", tone: "neutral" },
        ],
      },
      {
        title: "Keep the same user in the same cohort",
        connections: ["idle", "forward"],
        description:
          "A selected example user receives the new checkout. Repeating the check with the same key gives the same assignment.",
        nodes: [
          { label: "25% rollout", tone: "neutral" },
          { label: "Stable user key", tone: "active" },
          { label: "New checkout", tone: "success" },
        ],
      },
      {
        title: "The flag service goes offline",
        connections: ["idle", "forward"],
        description:
          "Checks continue locally using the still-fresh cached snapshot. They make no network request for each decision.",
        nodes: [
          { label: "Unavailable", tone: "warning" },
          { label: "Cache still fresh", tone: "success" },
          { label: "New checkout", tone: "success" },
        ],
      },
      {
        title: "Use an explicit default when stale",
        connections: ["idle", "forward"],
        description:
          "If configuration becomes too old, the SDK returns the declared default. A disconnected client cannot receive an immediate remote kill.",
        nodes: [
          { label: "Still unavailable", tone: "warning" },
          { label: "Snapshot stale", tone: "warning" },
          { label: "Default checkout", tone: "active" },
        ],
      },
    ],
  },
] as const satisfies readonly EngineeringProject[];
