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
    <div className="w-full md:w-64 bg-white border border-gray-200 rounded-lg p-5 h-fit">
      <h3 className="text-lg font-semibold text-gray-400 mb-4">
        Filter by Price
      </h3>
      <form onSubmit={handleApplyFilter} className="space-y-4">
        <div>
          <label className="text-sm text-gray-600 block mb-1">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 block mb-1">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="10000000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Apply Filter
        </button>
        <button
          type="submit"
          onClick={handleClearFilter}
          className="w-full bg-gray-100 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors"
        >
          Clear Filter
        </button>
      </form>
    </div>
  );
}

export default FilterSidebar;
