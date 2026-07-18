import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { Link } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/my-orders");
        setOrders(data);
      } catch (error) {
        toast.error("Failed to load orders");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          You have no orders yet
        </h2>
        <Link
          to="/"
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order._id}
            to={`/order/${order._id}`}
            className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-mono text-sm text-gray-800">{order._id}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Placed On</p>
                <p className="text-gray-800">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="font-bold text-blue-600">
                  Rs. {order.totalPrice.toLocaleString()}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-700"}`}
              >
                {order.orderStatus}
              </span>
            </div>

            {order.trackingId && (
              <p className="text-xs text-gray-500 mt-1">
                Tracking: <span className="font-mono">{order.trackingId}</span>
              </p>
            )}

            <div className="border-t pt-4 space-y-2">
              {order.orderItems.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="text-gray-800">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
