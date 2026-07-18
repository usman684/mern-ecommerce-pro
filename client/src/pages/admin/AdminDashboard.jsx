import { useEffect, useState } from "react";
import api from "../../api/axios";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          api.get("/products?limit=1"),
          api.get("/orders"),
        ]);

        const orders = ordersRes.data;
        const totalRevenue = orders.reduce(
          (sum, order) => sum + order.totalPrice,
          0,
        );
        const pendingOrders = orders.filter(
          (o) => o.orderStatus === "Pending",
        ).length;

        setStats({
          totalProducts: productsRes.data.total,
          totalOrders: orders.length,
          totalRevenue,
          pendingOrders,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      color: "bg-blue-500",
    },
    { label: "Total Orders", value: stats.totalOrders, color: "bg-green-500" },
    {
      label: "Total Revenue",
      value: `Rs. ${stats.totalRevenue.toLocaleString()}`,
      color: "bg-purple-500",
    },
    {
      label: "Pending Orders",
      value: stats.pendingOrders,
      color: "bg-yellow-500",
    },
  ];

  if (loading) {
    return <p className="text-gray-500">Loading dashboard...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className={`w-10 h-10 ${card.color} rounded-md mb-4`} />
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
