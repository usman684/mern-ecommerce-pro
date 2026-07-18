import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import OrderTimeline from "../components/OrderTimeline.jsx";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load order");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Order not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Details</h1>
      <p className="text-gray-500 font-mono text-sm mb-8">{order._id}</p>

      {/* Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
        <OrderTimeline currentStatus={order.orderStatus} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Info */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Shipping Address</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {order.shippingAddress.fullName}
            <br />
            {order.shippingAddress.address}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            <br />
            Phone: {order.shippingAddress.phone}
          </p>
        </div>

        {/* Order Info */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Order Info</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Placed On</span>
              <span className="text-gray-800">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method</span>
              <span className="text-gray-800">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Status</span>
              <span
                className={order.isPaid ? "text-green-600" : "text-yellow-600"}
              >
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </div>
            {order.trackingId && (
              <div className="flex justify-between">
                <span className="text-gray-500">Tracking ID</span>
                <span className="font-mono text-gray-800">
                  {order.trackingId}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
        <h3 className="font-semibold text-gray-800 mb-4">Order Items</h3>
        <div className="space-y-4">
          {order.orderItems.map((item) => (
            <div key={item._id} className="flex items-center gap-4">
              <img
                src={item.image || "https://via.placeholder.com/60"}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-gray-800">
                Rs. {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Items Price</span>
            <span>Rs. {order.itemsPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span>
              {order.shippingPrice === 0
                ? "Free"
                : `Rs. ${order.shippingPrice}`}
            </span>
          </div>
          <div className="flex justify-between font-bold text-gray-800 text-lg border-t pt-2">
            <span>Total</span>
            <span>Rs. {order.totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
