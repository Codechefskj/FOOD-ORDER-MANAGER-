import { useMemo, useState } from "react";
import { INITIAL_ORDERS } from "../utils/constants";
import useLocalStorage from "../hooks/useLocalStorage";
import OrderForm from "../components/OrderForm";
import AssignDeliveryPanel from "../components/AssignDeliveryPanel";
import OutputPanel from "../components/OutputPanel";
import ExportButton from "../components/ExportButton";

const Orders = () => {
  // Persisted so the Analytics page reflects real data.
  const [orders, setOrders] = useLocalStorage("food-orders", INITIAL_ORDERS);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [maxDistance, setMaxDistance] = useState("");
  const [assignResult, setAssignResult] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchMatch =
        order.restaurantName.toLowerCase().includes(search.toLowerCase()) ||
        order.orderId.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "all"
          ? true
          : statusFilter === "paid"
            ? order.isPaid
            : !order.isPaid;

      const distanceMatch =
        maxDistance === ""
          ? true
          : order.deliveryDistance <= Number(maxDistance);

      return searchMatch && statusMatch && distanceMatch;
    });
  }, [orders, search, statusFilter, maxDistance]);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <span className="u-eyebrow">Orders · The pass</span>
        <h1
          className="u-display"
          style={{ fontSize: 46, fontWeight: 800, marginTop: 10, color: "var(--ink)" }}
        >
          Run the pass
        </h1>
        <p style={{ color: "var(--ink-soft)", marginTop: 12, fontSize: 16 }}>
          Add tickets, hand orders to riders, and keep an eye on what's paid.
        </p>
      </div>

      <div className="grid gap-5">
        {/* New order */}
        <OrderForm orders={orders} setOrders={setOrders} />

        {/* Dispatch + Output */}
        <div className="panel" style={{ padding: 26 }}>
          <AssignDeliveryPanel
            orders={orders}
            setOrders={setOrders}
            onResult={setAssignResult}
          />
        </div>

        <OutputPanel result={assignResult} />

        {/* Filters */}
        <div className="panel" style={{ padding: 26 }}>
          <span className="u-eyebrow">Filter</span>
          <h2
            className="u-display"
            style={{ fontSize: 22, fontWeight: 700, marginTop: 8, marginBottom: 18, color: "var(--ink)" }}
          >
            Find a ticket
          </h2>
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            <div>
              <label className="field-label">Search</label>
              <input
                type="text"
                placeholder="Order ID or restaurant"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="field"
              />
            </div>
            <div>
              <label className="field-label">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="field"
              >
                <option value="all">All orders</option>
                <option value="paid">Paid only</option>
                <option value="unpaid">Unpaid only</option>
              </select>
            </div>
            <div>
              <label className="field-label">Within distance (km)</label>
              <input
                type="number"
                min="0"
                placeholder="Any"
                value={maxDistance}
                onChange={(e) => setMaxDistance(e.target.value)}
                className="field u-mono"
              />
            </div>
          </div>
        </div>

        {/* Rail */}
        <div className="panel" style={{ overflow: "hidden" }}>
          <div
            className="flex items-center justify-between"
            style={{ padding: "20px 24px", borderBottom: "1.5px dashed var(--line-strong)", flexWrap: "wrap", gap: 12 }}
          >
            <div className="flex items-baseline gap-3">
              <h2 className="u-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)" }}>
                Orders list
              </h2>
              <span className="u-mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>
                {filteredOrders.length} shown
              </span>
            </div>
            <ExportButton orders={filteredOrders} />
          </div>

          <div className="overflow-x-auto">
            <table className="rail">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Restaurant</th>
                  <th>Items</th>
                  <th>Distance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "56px 20px" }}>
                      <div className="u-mono" style={{ fontSize: 13, letterSpacing: "0.1em", color: "var(--ink-soft)" }}>
                        — NO TICKETS MATCH —
                      </div>
                      <p style={{ color: "var(--ink-faint)", marginTop: 8, fontSize: 14 }}>
                        Clear the filters or add a new order above.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="u-mono" style={{ fontWeight: 500, color: "var(--ink)" }}>
                        {order.orderId}
                      </td>
                      <td style={{ color: "var(--ink)" }}>{order.restaurantName}</td>
                      <td className="u-mono" style={{ color: "var(--ink-soft)" }}>
                        {String(order.itemCount).padStart(2, "0")}
                      </td>
                      <td className="u-mono" style={{ color: "var(--ink-soft)" }}>
                        {order.deliveryDistance} km
                      </td>
                      <td>
                        <div className="flex items-center gap-2" style={{ flexWrap: "wrap" }}>
                          {order.isPaid ? (
                            <span className="chip chip-paid">
                              <span className="chip-dot" /> PAID
                            </span>
                          ) : (
                            <span className="chip chip-unpaid">
                              <span className="chip-dot" /> UNPAID
                            </span>
                          )}
                          {order.isAssigned && (
                            <span
                              className="u-mono"
                              style={{ fontSize: 10, letterSpacing: "0.08em", color: "var(--steel-ink)" }}
                            >
                              · ASSIGNED
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
