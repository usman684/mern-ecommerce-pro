import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard.jsx";
import api from "../api/axios.jsx";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar.jsx";
import Pagination from "../components/Pagiination.jsx";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const currentPage = searchParams.get("page") || "1";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (keyword) query.set("keyword", keyword);
        if (minPrice) query.set("minPrice", minPrice);
        if (maxPrice) query.set("maxPrice", maxPrice);
        query.set("page", currentPage);

        const { data } = await api.get(`/products?${query.toString()}`);
        setProducts(data.products);
        setPage(data.page);
        setPages(data.pages);
      } catch (error) {
        toast.error("Failed to Load Product");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword, minPrice, maxPrice, currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {keyword ? `Search Results for "${keyword}"` : "Featured Products"}
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar />

        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500 text-lg">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <Pagination currentPage={page} totalPages={pages} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
