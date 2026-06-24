const StatsCard = ({ label, value, accent, hint, code }) => {
  return (
    <div className="ticket" style={{ "--accent": accent, padding: "20px 20px 18px" }}>
      <div className="flex items-center justify-between">
        <span className="u-eyebrow">{label}</span>
        <span
          className="u-mono"
          style={{ fontSize: 11, color: "var(--ink-faint)" }}
        >
          {code}
        </span>
      </div>

      <div
        className="u-mono"
        style={{
          fontSize: 44,
          fontWeight: 700,
          lineHeight: 1,
          margin: "14px 0 14px",
          color: "var(--ink)",
        }}
      >
        {value}
      </div>

      <hr className="tear" />

      <div className="flex items-center gap-2" style={{ marginTop: 12 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: accent,
            display: "inline-block",
          }}
        />
        <span style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{hint}</span>
      </div>
    </div>
  );
};

export default StatsCard;
