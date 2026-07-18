import Order from "../models/Order.js";
import Product from "../models/Product.js";
import sendEmail from "../utils/sendEmail.js";
import orderEmailTemplate from "../utils/orderEmailTemplate.js";

export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentResult,
      isPaid,
    } = req.body;
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }
    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping Address is Required" });
    }

    let itemsPrice = 0;
    const verifiedItems = [];

    for (const item of orderItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.product} ` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}`,
        });
      }

      verifiedItems.push({
        product: product._id,
        name: product.name,
        image: product.images?.[0] || "",
        price: product.price,
        quantity: item.quantity,
      });

      itemsPrice += product.price * item.quantity;

      product.stock -= item.quantity;
      await product.save();
    }

    const shippingPrice = itemsPrice > 5000 ? 0 : 200;
    const totalPrice = itemsPrice + shippingPrice;

    const order = await Order.create({
      user: req.user._id,
      orderItems: verifiedItems,
      shippingAddress,
      paymentMethod: paymentMethod || "Cash on Delivery",
      paymentResult: paymentResult || undefined,
      isPaid: isPaid || false,
      paidAt: isPaid ? Date.now() : undefined,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    // Order confirmation email bhejo (fail ho to bhi order creation fail nahi hogi)
    try {
      await sendEmail({
        to: req.user.email,
        subject: `Order Confirmation - ${order._id}`,
        html: orderEmailTemplate(order),
      });
    } catch (emailError) {
      console.error(
        "Failed to send order confirmation email:",
        emailError.message,
      );
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this order" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = orderStatus || order.orderStatus;

    if (orderStatus === "Shipped" && !order.trackingId) {
      order.trackingId = `TRK-${Date.now().toString().slice(-8)}-${Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase()}`;
    }

    if (orderStatus === "Delivered") {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
