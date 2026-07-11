import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);
  if (categories.length === 0) return null;

  return (
    <div className="flex gap-4 px-6 py-4 overflow-x-auto bg-gray-50 border-b">
      {categories.map((category) => (
        <Link
          key={category._id}
          to={`/category/${category._id}`}
          className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors whitespace-nowrap"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}

export default CategoryList;
