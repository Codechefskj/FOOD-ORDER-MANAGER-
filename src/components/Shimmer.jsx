const Shimmer = () => {
  const box = (h) => ({
    height: h,
    borderRadius: 18,
    background:
      "linear-gradient(100deg, var(--paper-2) 30%, #f3ede2 50%, var(--paper-2) 70%)",
    backgroundSize: "200% 100%",
    animation: "ff-shimmer 1.3s ease-in-out infinite",
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <style>{`@keyframes ff-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
      <div style={{ ...box(48), width: "40%", marginBottom: 28 }} />
      <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={box(150)} />
        ))}
      </div>
      <div style={{ ...box(160), marginTop: 22 }} />
    </div>
  );
};

export default Shimmer;
