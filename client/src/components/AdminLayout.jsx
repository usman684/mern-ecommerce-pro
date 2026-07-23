import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

function AdminLayout() {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  const links = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/products", label: "Manage Products" },
    { path: "/admin/categories", label: "Manage Categories" },
    { path: "/admin/orders", label: "Manage Orders" },
    { path: "/admin/users", label: "Manage Users" },
  ];

  return (
    <div className="flex min-h-screen relative">
      {/* Mobile toggle button */}
      <button
        onClick={() => setShowSidebar(true)}
        className="lg:hidden fixed top-4 left-4 z-30 bg-gray-900 text-white p-2 rounded-md"
      >
        <Menu size={20} />
      </button>

      {/* Overlay for mobile */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-gray-900 text-white p-6 fixed lg:sticky top-0 h-screen z-40 transition-transform duration-200 ${
          showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button onClick={() => setShowSidebar(false)} className="lg:hidden">
            <X size={20} />
          </button>
        </div>
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setShowSidebar(false)}
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

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6 lg:p-8 pt-20 lg:pt-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
