import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Heart } from "lucide-react";
import ReviewSection from "../components/ReviewSection";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      toast.error("Product not found.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Product not found</p>
      </div>
    );
  }

  const inWishlist = isInWishlist(product._id);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.images?.[0] || "https://via.placeholder.com/500"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                {product.category?.name || "Uncategorized"}
              </p>
              <h1 className="text-3xl font-bold text-gray-800 mt-2">
                {product.name}
              </h1>
            </div>

            <button
              onClick={() => toggleWishlist(product)}
              className="bg-gray-100 rounded-full p-3 hover:scale-110 transition-transform"
            >
              <Heart
                size={22}
                className={
                  inWishlist ? "fill-red-500 text-red-500" : "text-gray-400"
                }
              />
            </button>
          </div>

          <p className="text-2xl font-bold text-blue-600 mt-4">
            Rs. {product.price.toLocaleString()}
          </p>
          <p className="text-gray-600 mt-6 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-500">
              Brand:{" "}
              <span className="text-gray-800">{product.brand || "N/A"}</span>
            </p>
            <p className="text-sm text-gray-500">
              Availability:{" "}
              <span
                className={
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            </p>
          </div>

          {product.stock > 0 && (
            <div className="mt-6 flex items-center gap-3">
              <label className="text-sm text-gray-600">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-4 py-1 border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="mt-8 w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>

      <ReviewSection product={product} onReviewAdded={fetchProduct} />
    </div>
  );
}

export default ProductDetails;
