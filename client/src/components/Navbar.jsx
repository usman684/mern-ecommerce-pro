import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

function Navbar() {
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 text-white shadow-md">
      <Link to="/" className="text-2xl font-bold tracking-tight">
        MERN Shop
      </Link>

      <SearchBar />

      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-gray-300 transition-colors">
          Home
        </Link>
        <Link to="/" className="hover:text-gray-300 transition-colors">
          Products
        </Link>
        <Link
          to="/wishlist"
          className="relative hover:text-gray-300 transition-colors"
        >
          Wishlist
          {wishlistItems.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {wishlistItems.length}
            </span>
          )}
        </Link>
        <Link to="/cart" className="hover:text-gray-300 transition-colors">
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
        <Link
          to="/login"
          className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
