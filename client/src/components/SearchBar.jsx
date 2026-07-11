import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="w-full px-4 py-2 rounded-md text-gray-800 bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  );
}

export default SearchBar;
