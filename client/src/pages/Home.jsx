import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard.jsx";
import FilterSidebar from "../components/FilterSidebar.jsx";
import Pagination from "../components/Pagiination.jsx";
import toast from "react-hot-toast";
import { ShoppingBag, Truck, ShieldCheck, Headphones } from "lucide-react";

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
        toast.error("Failed to load products");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword, minPrice, maxPrice, currentPage]);

  const perks = [
    { icon: Truck, title: "Free Shipping", desc: "On orders over Rs. 5,000" },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      desc: "100% protected checkout",
    },
    { icon: ShoppingBag, title: "Easy Returns", desc: "7-day return policy" },
    {
      icon: Headphones,
      title: "24/7 Support",
      desc: "Dedicated customer care",
    },
  ];

  return (
    <div>
      {/* Hero Section — sirf tab dikhega jab koi search/filter active na ho */}
      {!keyword && (
        <div className="bg-linear-to-br from-indigo-600 via-indigo-500 to-blue-500 text-white">
          <div className="max-w-7xl mx-auto px-6 py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Shop Smarter with Shopwave
            </h1>
            <p className="text-indigo-100 text-lg max-w-xl mx-auto mb-8">
              Discover quality products at unbeatable prices, delivered right to
              your doorstep.
            </p>

            <a
              href="#products"
              className="inline-block bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>
      )}

      {/* Perks Bar */}
      {!keyword && (
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {perks.map((perk) => (
              <div key={perk.title} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center shrink-0">
                  <perk.icon size={18} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {perk.title}
                  </p>
                  <p className="text-xs text-gray-500">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products Section */}
      <div id="products" className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          {keyword ? `Search results for "${keyword}"` : "Featured Products"}
        </h2>

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
}

export default Home;
