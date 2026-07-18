import { Star } from "lucide-react";

function StarRating({ rating, size = 16, interactive = false, onRate }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          onClick={() => interactive && onRate(star)}
          className={`${
            star <= Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          } ${interactive ? "cursor-pointer" : ""}`}
        />
      ))}
    </div>
  );
}

export default StarRating;
