import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Shimmer from "./components/Shimmer";

const Dashboard = lazy(() =>
  import("./pages/Dashboard")
);

const Orders = lazy(() =>
  import("./pages/Orders")
);

const Analytics = lazy(() =>
  import("./pages/Analytics")
);

function App() {
  return (
    <Suspense fallback={<Shimmer />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="/analytics"
            element={<Analytics />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;