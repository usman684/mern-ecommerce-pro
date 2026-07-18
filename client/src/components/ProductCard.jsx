import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({ product }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <Link
      to={`/products/${product._id}`}
      className="group bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden block relative"
    >
      <button
        onClick={handleWishlistClick}
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur rounded-full p-2 shadow-sm hover:scale-110 transition-transform"
      >
        <Heart
          size={16}
          className={inWishlist ? "fill-red-500 text-red-500" : "text-gray-400"}
        />
      </button>

      {product.stock === 0 && (
        <span className="absolute top-3 left-3 z-10 bg-gray-900 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
          Out of Stock
        </span>
      )}

      <div className="w-full h-52 bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <p className="text-[11px] text-indigo-600 font-semibold uppercase tracking-wide">
          {product.category?.name || "Uncategorized"}
        </p>
        <h3 className="text-sm font-semibold text-gray-800 mt-1 truncate">
          {product.name}
        </h3>

        {product.numReviews > 0 && (
          <div className="flex items-center gap-1 mt-1.5">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-500">
              {product.rating.toFixed(1)} ({product.numReviews})
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <p className="text-lg font-bold text-gray-900">
            Rs. {product.price.toLocaleString()}
          </p>
          {product.stock > 0 && product.stock <= 5 && (
            <span className="text-[10px] text-orange-500 font-medium">
              Only {product.stock} left
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
