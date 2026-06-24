// Validates a single order against the existing list.
// Returns an object keyed by field; empty object means valid.
export const validateOrder = (order, existingOrders) => {
  const errors = {};

  const id = order.orderId.trim();
  if (!id) {
    errors.orderId = "Order ID is required";
  } else if (
    existingOrders.some(
      (item) => item.orderId.toLowerCase() === id.toLowerCase()
    )
  ) {
    errors.orderId = "That order ID already exists";
  }

  if (order.restaurantName.trim().length < 3) {
    errors.restaurantName = "Enter at least 3 characters";
  }

  const items = Number(order.itemCount);
  if (!Number.isFinite(items) || items <= 0) {
    errors.itemCount = "Items must be greater than 0";
  }

  const distance = Number(order.deliveryDistance);
  if (!Number.isFinite(distance) || distance <= 0) {
    errors.deliveryDistance = "Distance must be greater than 0";
  }

  return errors;
};
