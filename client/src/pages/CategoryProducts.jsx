import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function CategoryProducts() {
  const { categoryId } = useParams();
  const [peoducts, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products?category=${categoryId}`);
        setProducts(data.products);
      } catch (error) {
        toast.error("Failed to load products");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading Products...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Category Products
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No Products found in this Category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;
