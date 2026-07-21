import { Link } from "react-router-dom";
import { PackageX } from "lucide-react";

function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <PackageX size={64} className="mx-auto text-gray-300 mb-6" />
      <h1 className="text-6xl font-extrabold text-gray-800 mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-2">Page Not Found</p>
      <p className="text-gray-400 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
