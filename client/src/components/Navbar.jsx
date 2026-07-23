import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import SearchBar from "./SearchBar";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function Navbar() {
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowCategoryMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowMobileMenu(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        {/* Top Row: Logo + Icons + Hamburger */}
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            onClick={() => setShowMobileMenu(false)}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center">
              <ShoppingBag size={16} className="text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
              Shopwave
            </span>
          </Link>

          {/* Categories Dropdown — desktop only */}
          <div className="relative hidden lg:block" ref={menuRef}>
            <button
              onClick={() => setShowCategoryMenu((prev) => !prev)}
              className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Categories
              <ChevronDown size={16} />
            </button>

            {showCategoryMenu && (
              <div className="absolute top-full left-0 mt-3 w-56 bg-white border border-gray-100 rounded-lg shadow-lg py-2 z-50">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    to={`/category/${category._id}`}
                    onClick={() => setShowCategoryMenu(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Search — hidden on small mobile, shown on sm+ */}
          <div className="flex-1 max-w-lg hidden sm:block">
            <SearchBar />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <Link
              to="/wishlist"
              className="relative text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <Heart size={20} className="sm:w-[22px] sm:h-[22px]" />
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
              <ShoppingBag size={20} className="sm:w-[22px] sm:h-[22px]" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Desktop-only user section */}
            <div className="hidden md:flex items-center gap-4 pl-4 border-l border-gray-200">
              {user ? (
                <>
                  <Link
                    to="/my-orders"
                    className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
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
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setShowMobileMenu((prev) => !prev)}
              className="md:hidden text-gray-600"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search — always visible below logo on small screens */}
        <div className="sm:hidden mt-3">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase">
            Categories
          </p>
          <div className="flex flex-col gap-2 mb-3">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/category/${category._id}`}
                onClick={() => setShowMobileMenu(false)}
                className="text-sm text-gray-700 hover:text-indigo-600 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-3 space-y-3">
            {user ? (
              <>
                <p className="text-sm text-gray-600">Hi, {user.name}</p>
                <Link
                  to="/my-orders"
                  onClick={() => setShowMobileMenu(false)}
                  className="block text-sm text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  My Orders
                </Link>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setShowMobileMenu(false)}
                    className="inline-block text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-red-500"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setShowMobileMenu(false)}
                className="block bg-indigo-600 text-white text-center px-5 py-2 rounded-full text-sm font-semibold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
