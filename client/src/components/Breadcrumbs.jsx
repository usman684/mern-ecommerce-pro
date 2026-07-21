import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
      >
        <Home size={14} />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={14} className="text-gray-300" />
          {item.path ? (
            <Link
              to={item.path}
              className="hover:text-indigo-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-800 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

export default Breadcrumbs;
