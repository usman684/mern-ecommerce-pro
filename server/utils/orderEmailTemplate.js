const orderEmailTemplate = (order) => {
  const itemsHtml = order.orderItems
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">Rs. ${item.price.toLocaleString()}</td>
      </tr>
    `,
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #333;">
      <h2 style="color: #2563eb;">Order Confirmed!</h2>
      <p>Thank you for your order. Here are your order details:</p>
      
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="padding: 10px; text-align: left;">Product</th>
            <th style="padding: 10px; text-align: center;">Qty</th>
            <th style="padding: 10px; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <div style="text-align: right; margin-top: 20px;">
        <p>Items: Rs. ${order.itemsPrice.toLocaleString()}</p>
        <p>Shipping: ${order.shippingPrice === 0 ? "Free" : `Rs. ${order.shippingPrice}`}</p>
        <p style="font-size: 18px; font-weight: bold; color: #2563eb;">
          Total: Rs. ${order.totalPrice.toLocaleString()}
        </p>
      </div>

      <h3 style="margin-top: 30px;">Shipping Address</h3>
      <p>
        ${order.shippingAddress.fullName}<br/>
        ${order.shippingAddress.address}<br/>
        ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}<br/>
        Phone: ${order.shippingAddress.phone}
      </p>

      <p style="margin-top: 30px; color: #888; font-size: 12px;">
        We'll notify you once your order ships. Thank you for shopping with us!
      </p>
    </div>
  `;
};

export default orderEmailTemplate;
