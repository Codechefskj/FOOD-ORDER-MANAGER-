import { useState } from "react";
import toast from "react-hot-toast";
import { assignNearestOrder } from "../utils/assignDelivery";

const AssignDeliveryPanel = ({ orders, setOrders, onResult }) => {
  const [maxDistance, setMaxDistance] = useState("");

  const handleAssign = () => {
    const distance = Number(maxDistance);
    if (!maxDistance || !Number.isFinite(distance) || distance <= 0) {
      toast.error("Enter a maximum distance greater than 0");
      return;
    }

    const nearestOrder = assignNearestOrder(orders, distance);

    if (!nearestOrder) {
      toast.error("No order available");
      onResult?.({ status: "none", maxDistance: distance });
      return;
    }

    setOrders((prev) =>
      prev.map((order) =>
        order.id === nearestOrder.id ? { ...order, isAssigned: true } : order
      )
    );

    toast.success(`${nearestOrder.orderId} sent to the nearest rider`);
    onResult?.({ status: "assigned", order: nearestOrder, maxDistance: distance });
  };

  return (
    <div>
      <span className="u-eyebrow">Dispatch</span>
      <h2
        className="u-display"
        style={{ fontSize: 22, fontWeight: 700, marginTop: 8, marginBottom: 6, color: "var(--ink)" }}
      >
        Assign the nearest order
      </h2>
      <p style={{ color: "var(--ink-soft)", fontSize: 14, marginBottom: 18, maxWidth: 440 }}>
        Picks the closest unpaid, unassigned order within your range and hands it
        to a rider.
      </p>

      <div className="flex items-end gap-3" style={{ flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 220px" }}>
          <label className="field-label">Maximum distance (km)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            className="field u-mono"
            placeholder="5"
            value={maxDistance}
            onChange={(e) => setMaxDistance(e.target.value)}
          />
        </div>
        <button onClick={handleAssign} className="btn btn-assign" style={{ height: 46 }}>
          Assign nearest
        </button>
      </div>
    </div>
  );
};

export default AssignDeliveryPanel;
