function Check() {
  return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 10 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Event() {
  return <svg viewBox="0 0 28 24" fill="none" aria-hidden="true"><rect x="2" y="3" width="24" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" /><path d="m3 5 11 8L25 5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>;
}

export function DeliveryScene() {
  return (
    <>
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
    </>
  );
}

export function TaskScene() {
  return (
    <>
      <div className="scene-topline"><span>customer_import</span><span className="scene-tag">3 activities</span></div>
      <div className="task-stack">
        <div className="task-activity task-activity-saved">
          <span className="task-marker"><Check /></span>
          <div><strong>Validate records</strong><span>Checkpoint saved</span></div>
          <span className="task-saved-label">Done</span>
        </div>
        <div className="task-activity task-activity-import">
          <span className="task-marker"><span className="task-check motion"><Check /></span><span className="task-step motion">2</span></span>
          <div><strong>Import records</strong><div className="task-progress"><i className="task-import-progress motion" /></div></div>
          <div className="task-worker"><span className="worker-old motion">Worker A</span><span className="worker-new motion">Worker B</span></div>
        </div>
        <div className="task-activity task-activity-notify">
          <span className="task-marker"><span className="task-check motion"><Check /></span><span className="task-step motion">3</span></span>
          <div><strong>Send confirmation</strong><div className="task-progress"><i className="task-notify-progress motion" /></div></div>
          <span className="task-finish motion">Done</span>
        </div>
        <div className="task-interruption motion"><span aria-hidden="true">!</span> Worker stopped. Progress is safe.</div>
      </div>
      <p className="scene-caption">Keep completed work. Retry the unfinished activity.</p>
    </>
  );
}

const inventory = [
  { sku: "TEE", source: "12", previous: "10", changed: true },
  { sku: "CAP", source: "8", previous: "8", changed: false },
  { sku: "TOTE", source: "24", previous: "—", changed: true },
] as const;

export function ReconcileScene() {
  return (
    <>
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
    </>
  );
}

// A fixed permutation keeps the same example users in every expanding cohort.
const cohort = Array.from({ length: 40 }, (_, index) => ({ id: index, group: Math.floor(((index * 17 + 7) % 40) / 10) + 1 }));

export function RolloutScene() {
  return (
    <>
      <div className="scene-topline"><span>new_checkout</span><span className="scene-tag">Gradual rollout</span></div>
      <div className="rollout-meter">
        <span>Available to</span>
        <div className="rollout-percentage"><strong className="rollout-quarter motion">25<span>%</span></strong><strong className="rollout-half motion">50<span>%</span></strong><strong className="rollout-most motion">75<span>%</span></strong></div>
        <span>of this example cohort</span>
      </div>
      <div className="rollout-people" aria-hidden="true">
        {cohort.map((person) => <span className={`rollout-person cohort-${person.group} motion`} data-user={person.id} key={person.id}><i /><b /></span>)}
      </div>
      <div className="rollout-track" aria-hidden="true"><span className="rollout-fill motion" /><i className="rollout-knob motion" /></div>
      <p className="scene-caption">A wider release. The same users stay selected.</p>
    </>
  );
}
