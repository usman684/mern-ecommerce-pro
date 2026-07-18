import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Heart, User, LogOut } from "lucide-react";
import SearchBar from "./SearchBar";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-linear-to-br from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center">
            <ShoppingBag size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            Shopwave
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-lg">
          <SearchBar />
        </div>

        {/* Right Links */}
        <div className="flex items-center gap-5 shrink-0">
          <Link
            to="/wishlist"
            className="relative text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <Heart size={22} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
              <Link
                to="/my-orders"
                className="text-sm text-gray-600 hover:text-indigo-600 transition-colors hidden sm:block"
              >
                My Orders
              </Link>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors"
                >
                  Admin
                </Link>
              )}

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User size={16} className="text-indigo-600" />
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
