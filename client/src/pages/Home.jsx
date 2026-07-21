import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import CategorySection from "../components/CategorySection";
import FilterSidebar from "../components/FilterSidebar";
import Pagination from "../components/Pagination";
import toast from "react-hot-toast";
import { ShoppingBag, Truck, ShieldCheck, Headphones } from "lucide-react";

function Home() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const currentPage = searchParams.get("page") || "1";

  const isFiltering = keyword || minPrice || maxPrice;

  // Filtered/searched products ke liye state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  // Category-wise homepage ke liye state
  const [categorySections, setCategorySections] = useState([]);
  const [homeLoading, setHomeLoading] = useState(true);

  // Jab search/filter active ho — normal filtered grid fetch karo
  useEffect(() => {
    if (!isFiltering) return;

    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (keyword) query.set("keyword", keyword);
        if (minPrice) query.set("minPrice", minPrice);
        if (maxPrice) query.set("maxPrice", maxPrice);
        query.set("page", currentPage);
        query.set("limit", "12");

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

    fetchFilteredProducts();
  }, [keyword, minPrice, maxPrice, currentPage, isFiltering]);

  // Jab koi filter na ho — har category ke products fetch karo
  useEffect(() => {
    if (isFiltering) return;

    const fetchCategorySections = async () => {
      setHomeLoading(true);
      try {
        const { data: categories } = await api.get("/categories");

        const sections = await Promise.all(
          categories.map(async (category) => {
            const { data } = await api.get(
              `/products?category=${category._id}&limit=4`,
            );
            return { category, products: data.products };
          }),
        );

        setCategorySections(sections);
      } catch (error) {
        console.error(error);
      } finally {
        setHomeLoading(false);
      }
    };

    fetchCategorySections();
  }, [isFiltering]);

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
      {/* Hero Section */}
      {!isFiltering && (
        <div className="relative bg-gray-900 text-white overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
            alt="Shopping"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Shop Smarter with Shopwave
            </h1>
            <p className="text-gray-200 text-lg max-w-xl mx-auto mb-8">
              Discover quality products at unbeatable prices, delivered right to
              your doorstep.
            </p>

            <a
              href="#products"
              className="inline-block bg-white text-gray-900 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>
      )}

      {/* Perks Bar */}
      {!isFiltering && (
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

      <div id="products" className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {keyword ? `Search results for "${keyword}"` : "Shop Our Products"}
        </h2>

        {/* Filter — hamesha dikhega, chahe category-wise ho ya filtered */}
        <FilterSidebar />

        {isFiltering ? (
          // Search/Filter active — normal grid dikhao
          loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500 text-lg">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <Pagination currentPage={page} totalPages={pages} />
            </>
          )
        ) : // Normal homepage — category-wise sections dikhao
        homeLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-lg">Loading products...</p>
          </div>
        ) : (
          categorySections.map(({ category, products }) => (
            <CategorySection
              key={category._id}
              category={category}
              products={products}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
