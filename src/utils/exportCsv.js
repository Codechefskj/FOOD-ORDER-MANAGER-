export const exportOrdersToCSV = (
  orders
) => {
  if (!orders.length) return;

  const headers = [
    "Order ID",
    "Restaurant",
    "Items",
    "Distance",
    "Status",
  ];

  const rows = orders.map((order) => [
    order.orderId,
    order.restaurantName,
    order.itemCount,
    order.deliveryDistance,
    order.isPaid
      ? "Paid"
      : "Unpaid",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.join(",")
    ),
  ].join("\n");

  const blob = new Blob(
    [csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download = `orders_${Date.now()}.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};