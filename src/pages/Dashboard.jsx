import StatsCard from "../components/StatsCard";

const stats = [
  { code: "TOT", label: "Total orders", value: "24", accent: "var(--pine)", hint: "On the pass today" },
  { code: "PD", label: "Paid", value: "16", accent: "var(--moss)", hint: "Settled & ready" },
  { code: "UNPD", label: "Unpaid", value: "08", accent: "var(--persimmon)", hint: "Awaiting payment" },
  { code: "ASGN", label: "Assigned", value: "12", accent: "var(--steel)", hint: "Out with riders" },
];

const Dashboard = () => {
  const rate = 92;

  return (
    <div>
      {/* Hero */}
      <div style={{ marginBottom: 32 }}>
        <span className="u-eyebrow">Today · Service board</span>
        <h1
          className="u-display"
          style={{ fontSize: 52, fontWeight: 800, marginTop: 10, color: "var(--ink)" }}
        >
          Everything on the pass,
          <br />
          at a glance.
        </h1>
        <p style={{ color: "var(--ink-soft)", marginTop: 14, fontSize: 16, maxWidth: 520 }}>
          A live read on orders moving through the kitchen — what's paid, what's
          waiting, and what's already out the door.
        </p>
      </div>

      {/* Ticket rail */}
      <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {stats.map((s) => (
          <StatsCard key={s.code} {...s} />
        ))}
      </div>

      {/* Performance panel */}
      <div className="panel" style={{ padding: 28, marginTop: 22 }}>
        <div className="flex items-start justify-between" style={{ flexWrap: "wrap", gap: 12 }}>
          <div>
            <span className="u-eyebrow">Assignment rate</span>
            <h2
              className="u-display"
              style={{ fontSize: 24, fontWeight: 700, marginTop: 8, color: "var(--ink)" }}
            >
              Riders are keeping pace
            </h2>
            <p style={{ color: "var(--ink-soft)", marginTop: 6, fontSize: 14.5, maxWidth: 460 }}>
              {rate} of every 100 eligible orders found a rider within range on the
              first call.
            </p>
          </div>
          <div
            className="u-mono"
            style={{ fontSize: 40, fontWeight: 700, color: "var(--pine)" }}
          >
            {rate}%
          </div>
        </div>

        <div
          style={{
            height: 12,
            background: "var(--paper-2)",
            borderRadius: 999,
            overflow: "hidden",
            marginTop: 20,
            border: "1px solid var(--line)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${rate}%`,
              background: "var(--pine)",
              borderRadius: 999,
            }}
          />
        </div>

        {/* scale ticks */}
        <div
          className="u-mono flex justify-between"
          style={{ fontSize: 10, color: "var(--ink-faint)", marginTop: 8 }}
        >
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
