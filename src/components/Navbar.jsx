import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/orders", label: "Orders" },
  { to: "/analytics", label: "Analytics" },
];

const Navbar = () => {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(241, 236, 226, 0.82)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: "var(--pine)",
              clipPath: "polygon(0 0, 70% 0, 100% 30%, 100% 100%, 0 100%)",
              display: "inline-block",
            }}
          />
          <div className="leading-none">
            <span
              className="u-display"
              style={{ fontSize: 20, fontWeight: 800, color: "var(--ink)" }}
            >
              FoodFlow
            </span>
            <span
              className="u-mono block nav-tagline"
              style={{
                fontSize: 10,
                letterSpacing: "0.16em",
                color: "var(--ink-soft)",
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              Dispatch&nbsp;·&nbsp;The Pass
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-7">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
