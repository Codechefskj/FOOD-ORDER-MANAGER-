export const assignNearestOrder = (
  orders,
  maxDistance
) => {
  let nearest = null;

  for (const order of orders) {
    if (
      !order.isPaid &&
      !order.isAssigned &&
      order.deliveryDistance <= Number(maxDistance)
    ) {
      if (
        !nearest ||
        order.deliveryDistance <
          nearest.deliveryDistance
      ) {
        nearest = order;
      }
    }
  }

  return nearest;
};