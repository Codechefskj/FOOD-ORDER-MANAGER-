// Mandatory output display panel: shows the result of the last AssignDelivery run.
const OutputPanel = ({ result }) => {
  const accent =
    result?.status === "assigned"
      ? "var(--moss)"
      : result?.status === "none"
        ? "var(--persimmon)"
        : "var(--ink-faint)";

  return (
    <div className="panel" style={{ padding: 26, borderLeft: `4px solid ${accent}` }}>
      <span className="u-eyebrow">Output</span>

      {/* Idle */}
      {!result && (
        <p style={{ color: "var(--ink-soft)", marginTop: 12, fontSize: 15 }}>
          Run an assignment above and the result shows here.
        </p>
      )}

      {/* Assigned */}
      {result?.status === "assigned" && (
        <div style={{ marginTop: 10 }}>
          <h2 className="u-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--moss-ink)" }}>
            Assigned to nearest rider
          </h2>
          <div
            className="u-mono"
            style={{ marginTop: 14, fontSize: 14, color: "var(--ink)", display: "grid", gap: 6 }}
          >
            <span><span style={{ color: "var(--ink-soft)" }}>ORDER&nbsp;&nbsp;&nbsp;</span>{result.order.orderId}</span>
            <span><span style={{ color: "var(--ink-soft)" }}>FROM&nbsp;&nbsp;&nbsp;&nbsp;</span>{result.order.restaurantName}</span>
            <span><span style={{ color: "var(--ink-soft)" }}>DISTANCE</span>&nbsp;{result.order.deliveryDistance} km (within {result.maxDistance} km)</span>
          </div>
        </div>
      )}

      {/* No match — exact required string */}
      {result?.status === "none" && (
        <div style={{ marginTop: 10 }}>
          <h2 className="u-display" style={{ fontSize: 24, fontWeight: 700, color: "var(--persimmon-ink)" }}>
            No order available
          </h2>
          <p style={{ color: "var(--ink-soft)", marginTop: 8, fontSize: 14 }}>
            No unpaid, unassigned order within {result.maxDistance} km.
          </p>
        </div>
      )}
    </div>
  );
};

export default OutputPanel;
