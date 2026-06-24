import useLocalStorage from "../hooks/useLocalStorage";
import { INITIAL_ORDERS } from "../utils/constants";

const Analytics = () => {
  const [orders] = useLocalStorage("food-orders", INITIAL_ORDERS);

  const totalOrders = orders.length;
  const paidOrders = orders.filter((o) => o.isPaid).length;
  const unpaidOrders = orders.filter((o) => !o.isPaid).length;
  const assignedOrders = orders.filter((o) => o.isAssigned).length;
  const paidPct = totalOrders ? Math.round((paidOrders / totalOrders) * 100) : 0;

  const tiles = [
    { code: "TOT", label: "Total orders", value: totalOrders, accent: "var(--pine)" },
    { code: "PD", label: "Paid", value: paidOrders, accent: "var(--moss)" },
    { code: "UNPD", label: "Unpaid", value: unpaidOrders, accent: "var(--persimmon)" },
    { code: "ASGN", label: "Assigned", value: assignedOrders, accent: "var(--steel)" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 30 }}>
        <span className="u-eyebrow">Analytics · End of service</span>
        <h1
          className="u-display"
          style={{ fontSize: 46, fontWeight: 800, marginTop: 10, color: "var(--ink)" }}
        >
          The day in numbers
        </h1>
        <p style={{ color: "var(--ink-soft)", marginTop: 12, fontSize: 16 }}>
          A tally of every ticket that passed through, pulled from your saved orders.
        </p>
      </div>

      {totalOrders === 0 ? (
        <div className="panel" style={{ padding: 56, textAlign: "center" }}>
          <div className="u-mono" style={{ fontSize: 13, letterSpacing: "0.1em", color: "var(--ink-soft)" }}>
            — NOTHING ON THE BOOKS YET —
          </div>
          <p style={{ color: "var(--ink-faint)", marginTop: 8, fontSize: 14 }}>
            Add orders on the Orders page and they'll show up here.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            {tiles.map((t) => (
              <div key={t.code} className="ticket" style={{ "--accent": t.accent, padding: "20px 20px 18px" }}>
                <div className="flex items-center justify-between">
                  <span className="u-eyebrow">{t.label}</span>
                  <span className="u-mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>{t.code}</span>
                </div>
                <div className="u-mono" style={{ fontSize: 44, fontWeight: 700, lineHeight: 1, marginTop: 14, color: "var(--ink)" }}>
                  {String(t.value).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>

          <div className="panel" style={{ padding: 28, marginTop: 22 }}>
            <div className="flex items-baseline justify-between" style={{ flexWrap: "wrap", gap: 8 }}>
              <span className="u-eyebrow">Paid share</span>
              <span className="u-mono" style={{ fontSize: 28, fontWeight: 700, color: "var(--moss-ink)" }}>
                {paidPct}%
              </span>
            </div>
            <div
              style={{
                display: "flex",
                height: 14,
                borderRadius: 999,
                overflow: "hidden",
                marginTop: 16,
                border: "1px solid var(--line)",
                background: "var(--paper-2)",
              }}
            >
              <div style={{ width: `${paidPct}%`, background: "var(--moss)" }} />
              <div style={{ width: `${100 - paidPct}%`, background: "var(--persimmon)" }} />
            </div>
            <div className="flex gap-5" style={{ marginTop: 12 }}>
              <span className="flex items-center gap-2" style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--moss)" }} /> Paid
              </span>
              <span className="flex items-center gap-2" style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--persimmon)" }} /> Unpaid
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
