import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Your Cart is empty
        </h2>
        <Link
          to="/"
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.images?.[0] || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md shrink-0"
                />
                <div className="flex-1 sm:hidden">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-blue-600 font-bold mt-1">
                    Rs. {item.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex-1 hidden sm:block">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-blue-600 font-bold mt-1">
                  Rs. {item.price.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x border-gray-300">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <p className="font-semibold text-gray-800 w-20 text-right">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </p>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Order Summary
          </h3>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>Rs. {totalPrice.toLocaleString()}</span>
          </div>

          <div className="flex justify-between font-bold text-gray-800 text-lg border-t pt-3 mt-3">
            <span>Total</span>
            <span>Rs. {totalPrice.toLocaleString()}</span>
          </div>

          <Link
            to="/checkout"
            className="block text-center w-full bg-blue-600 text-white py-3 rounded-md font-semibold mt-6 hover:bg-blue-700 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
