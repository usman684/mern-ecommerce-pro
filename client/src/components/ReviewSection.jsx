import { useState } from "react";
import api from "../api/axios.jsx";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import StarRating from "./StarRating.jsx";

function ReviewSection({ product, onReviewAdded }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const alreadyReviewed = product.reviews?.some((r) => r.user === user?._id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setLoading(true);

    try {
      await api.post(`/products/${product._id}/reviews`, { rating, comment });
      toast.success("Review added successfully");
      setRating(0);
      setComment("");
      onReviewAdded();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add review");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await api.delete(`/products/${product._id}/reviews/${reviewId}`);
      toast.success("Review deleted");
      onReviewAdded();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete review");
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Customer Reviews ({product.numReviews || 0})
      </h2>

      {/* Overall Rating Summary */}
      <div className="flex items-center gap-3 mb-8">
        <StarRating rating={product.rating || 0} size={24} />
        <span className="text-gray-600">
          {product.rating ? product.rating.toFixed(1) : "No ratings yet"}
        </span>
      </div>

      {/* Review Form */}
      {user ? (
        !alreadyReviewed ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-lg p-6 mb-8"
          >
            <h3 className="font-semibold text-gray-800 mb-4">Write a Review</h3>

            <div className="mb-4">
              <label className="text-sm text-gray-600 block mb-2">
                Your Rating
              </label>
              <StarRating
                rating={rating}
                size={28}
                interactive
                onRate={setRating}
              />
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        ) : (
          <p className="text-gray-500 mb-8 text-sm">
            You have already reviewed this product.
          </p>
        )
      ) : (
        <p className="text-gray-500 mb-8 text-sm">
          Please log in to write a review.
        </p>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {product.reviews?.length === 0 && (
          <p className="text-gray-500">
            No reviews yet. Be the first to review!
          </p>
        )}

        {product.reviews?.map((review) => (
          <div
            key={review._id}
            className="bg-white border border-gray-200 rounded-lg p-5"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800">{review.name}</p>
                <StarRating rating={review.rating} size={14} />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
                {(review.user === user?._id || user?.role === "admin") && (
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-red-500 hover:underline text-xs"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
            <p className="text-gray-600 mt-2 text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewSection;
