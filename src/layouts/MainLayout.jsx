import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import OfflineBanner from "../components/OfflineBanner";
import useOffline from "../hooks/useOffline";

const MainLayout = () => {
  const offline = useOffline();

  return (
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      {offline && <OfflineBanner />}
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
