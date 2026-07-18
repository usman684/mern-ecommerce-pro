import { Link, Outlet, useLocation } from "react-router-dom";

function AdminLayout() {
  const location = useLocation();

  const links = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/products", label: "Manage Products" },
    { path: "/admin/categories", label: "Manage Categories" },
    { path: "/admin/orders", label: "Manage Orders" },
    { path: "/admin/users", label: "Manage Users" },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              to={link.path}
              key={link.path}
              className={`block px-4 py-2 rounded-md transition-colors ${
                location.pathname === link.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 bg-gray-50 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
