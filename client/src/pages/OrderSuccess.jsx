import { Link, useParams } from "react-router-dom";

function OrderSuccess() {
  const { id } = useParams();

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <div className="text-6xl mb-4">✅</div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Oreder Placed Successfully
      </h1>
      <p className="text-gray-600 mb-1">
        Your order ID is: <span className="font-mono text-gray-800">{id}</span>
      </p>
      <p className="text-gray-500 mb-8">
        We'll process your order shortly and keep you updated.
      </p>

      <div>
        <Link
          to="/my-orders"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Order History
        </Link>
        <Link
          to="/"
          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
