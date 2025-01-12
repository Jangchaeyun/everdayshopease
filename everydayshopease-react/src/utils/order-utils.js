export const createOrderRequest = (cartItems, userId, addressId) => {
  let request = {};
  request.userId = userId;
  request.addressId = addressId;
  request.orderDate = new Date().toISOString();
  let orderItems = [];
  let amount = 0;
  cartItems?.map((item) => {
    amount += item?.subTotal;
    orderItems.push({
      productId: item.productId,
      productVariantId: item?.variant?.id,
      discount: 0,
      quantity: item?.quantity,
    });
  });
  request.orderItemRequests = orderItems;
  request.totalAmount = amount;
  request.discount = 0;
  request.paymentMethod = "CARD";
  request.expectedDeliveryDate = "2024-01-12T21:11:46.202Z";
  request.currency = "krw";
  return request;
};
