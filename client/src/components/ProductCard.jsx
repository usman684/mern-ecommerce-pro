import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { Heart } from "lucide-react";

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
      className="bg-white rounded-lg shadow-md hover:shadow-x1 transition-shadow overflow-hidden block"
    >
      <button
        onClick={handleWishlistClick}
        className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
      >
        <Heart
          size={18}
          className={inWishlist ? "fill-red-500 text-red-500" : "text-gray-400"}
        ></Heart>
      </button>

      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {product.category?.name || "Uncategorized"}
        </p>
        <h3 className="text-xl font-semibold text-gray-800 mt-1 truncate">
          {product.name}
        </h3>
        <p className="text-xl font-bold text-blue-600 mt-2">
          Rs. {product.price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
