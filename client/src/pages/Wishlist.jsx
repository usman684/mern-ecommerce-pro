import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

function Wishlist() {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Your wishlist is empty
        </h2>
        <Link
          to="/"
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
