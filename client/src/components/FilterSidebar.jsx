import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function FilterSidebar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const handleApplyFilter = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    params.set("page", "1");

    navigate(`/?${params.toString()}`);
  };

  const handleClearFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    navigate("/");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <form
        onSubmit={handleApplyFilter}
        className="flex flex-col sm:flex-row sm:items-end gap-4"
      >
        <div className="flex-1">
          <label className="text-sm text-gray-600 block mb-1">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex-1">
          <label className="text-sm text-gray-600 block mb-1">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="1000000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex gap-3 sm:shrink-0">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
          >
            Apply Filter
          </button>

          <button
            type="button"
            onClick={handleClearFilter}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default FilterSidebar;
