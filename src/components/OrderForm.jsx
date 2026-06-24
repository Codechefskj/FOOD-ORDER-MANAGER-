import { useState } from "react";
import toast from "react-hot-toast";
import { validateOrder } from "../utils/validators";

const EMPTY = {
  orderId: "",
  restaurantName: "",
  itemCount: "",
  deliveryDistance: "",
  isPaid: false,
};

const OrderForm = ({ orders, setOrders }) => {
  const [formData, setFormData] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const found = validateOrder(formData, orders);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    const newOrder = {
      id: Date.now(),
      ...formData,
      orderId: formData.orderId.trim(),
      restaurantName: formData.restaurantName.trim(),
      itemCount: Number(formData.itemCount),
      deliveryDistance: Number(formData.deliveryDistance),
      isAssigned: false,
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [...prev, newOrder]);
    toast.success(`${newOrder.orderId} added to the pass`);

    setFormData(EMPTY);
    setErrors({});
  };

  const set = (key) => (e) => {
    setFormData({ ...formData, [key]: e.target.value });
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
  };

  const fieldClass = (key, extra = "") =>
    `field ${extra} ${errors[key] ? "is-error" : ""}`.trim();

  return (
    <div className="panel" style={{ padding: 26 }}>
      <span className="u-eyebrow">New ticket</span>
      <h2
        className="u-display"
        style={{ fontSize: 22, fontWeight: 700, marginTop: 8, marginBottom: 20, color: "var(--ink)" }}
      >
        Add an order to the pass
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <div>
            <label className="field-label">Order ID</label>
            <input className={fieldClass("orderId", "u-mono")} placeholder="ORD003" value={formData.orderId} onChange={set("orderId")} />
            {errors.orderId && <span className="field-error-msg">{errors.orderId}</span>}
          </div>
          <div>
            <label className="field-label">Restaurant</label>
            <input className={fieldClass("restaurantName")} placeholder="e.g. Dominos" value={formData.restaurantName} onChange={set("restaurantName")} />
            {errors.restaurantName && <span className="field-error-msg">{errors.restaurantName}</span>}
          </div>
          <div>
            <label className="field-label">Items</label>
            <input type="number" min="1" className={fieldClass("itemCount", "u-mono")} placeholder="3" value={formData.itemCount} onChange={set("itemCount")} />
            {errors.itemCount && <span className="field-error-msg">{errors.itemCount}</span>}
          </div>
          <div>
            <label className="field-label">Distance (km)</label>
            <input type="number" min="0" step="0.1" className={fieldClass("deliveryDistance", "u-mono")} placeholder="4" value={formData.deliveryDistance} onChange={set("deliveryDistance")} />
            {errors.deliveryDistance && <span className="field-error-msg">{errors.deliveryDistance}</span>}
          </div>
        </div>

        <div
          className="flex items-center justify-between"
          style={{ marginTop: 22, flexWrap: "wrap", gap: 16 }}
        >
          <label className="flex items-center gap-2.5" style={{ cursor: "pointer", userSelect: "none" }}>
            <input
              type="checkbox"
              className="check"
              checked={formData.isPaid}
              onChange={(e) => setFormData({ ...formData, isPaid: e.target.checked })}
            />
            <span style={{ fontSize: 14, color: "var(--ink)" }}>Mark as paid</span>
          </label>

          <button type="submit" className="btn btn-go">Add to pass</button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
