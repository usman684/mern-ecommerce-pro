import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { Link } from "react-router-dom";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products?limit=100");
      setProducts(data.products);
    } catch (error) {
      toast.error("Failed to Load products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product")) {
      return;
    }

    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading products...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Products </h1>
        <Link
          to="/admin/products/new"
          className="bg-blue-600 text-white px-5  py-2  rounded-md hover:bg-blue-700 transition-colors"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full text-left min-w-175">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t border-gray-100">
                <td className="px-4 py-3">
                  <img
                    src={
                      product.images?.[0] || "https://via.placeholder.com/50"
                    }
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  {product.name}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {product.category?.name || "N/A"}
                </td>
                <td className="px-4 py-3 text-gray-800">
                  Rs. {product.price.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-gray-600">{product.stock}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-center text-gray-500 py-8">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ManageProducts;
