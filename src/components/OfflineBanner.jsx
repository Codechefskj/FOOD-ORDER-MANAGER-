const OfflineBanner = () => {
  return (
    <div
      className="u-mono"
      style={{
        background: "var(--persimmon)",
        color: "#fdeee7",
        textAlign: "center",
        padding: "8px 12px",
        fontSize: 12,
        letterSpacing: "0.08em",
      }}
    >
      OFFLINE — CHANGES STAY ON THIS DEVICE UNTIL YOU RECONNECT
    </div>
  );
};

export default OfflineBanner;
