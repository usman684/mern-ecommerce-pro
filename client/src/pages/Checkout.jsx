import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import api from "../api/axios.jsx";
import toast from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "../stripe";
import StripePaymentForm from "../components/StripePaymentForm";

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Cash on Delivery order place karna
  const placeCODOrder = async () => {
    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      const { data } = await api.post("/orders", {
        orderItems,
        shippingAddress: formData,
        paymentMethod: "Cash on Delivery",
      });

      toast.success("Order placed successfully!");
      clearCart();
      navigate(`/order-success/${data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  // Online payment ke liye Stripe payment intent banana
  const initiateOnlinePayment = async () => {
    try {
      const { data } = await api.post("/payment/create-payment-intent", {
        amount: totalPrice,
      });
      setClientSecret(data.clientSecret);
    } catch (error) {
      toast.error("Failed to initialize payment");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    if (paymentMethod === "COD") {
      await placeCODOrder();
    } else {
      await initiateOnlinePayment();
    }
  };

  // Stripe payment successful hone ke baad order create karna
  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      const { data } = await api.post("/orders", {
        orderItems,
        shippingAddress: formData,
        paymentMethod: "Online Payment",
        paymentResult: { id: paymentIntentId, status: "succeeded" },
        isPaid: true,
      });

      toast.success("Payment successful! Order placed.");
      clearCart();
      navigate(`/order-success/${data._id}`);
    } catch (error) {
      toast.error(
        "Payment succeeded but order creation failed. Contact support.",
      );
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Your cart is empty
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {/* Shipping Form — sirf tab dikhega jab tak Stripe form activate na ho */}
          {!clientSecret && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Shipping Address
                </h3>

                <div className="space-y-4">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street Address"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Postal Code"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Payment Method
                </h3>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="text-gray-800">Cash on Delivery</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="ONLINE"
                      checked={paymentMethod === "ONLINE"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="text-gray-800">Pay Online (Card)</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              >
                {loading
                  ? "Processing..."
                  : paymentMethod === "COD"
                    ? "Place Order"
                    : "Continue to Payment"}
              </button>
            </form>
          )}

          {/* Stripe Payment Form — jab clientSecret mil jaye tab dikhega */}
          {clientSecret && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Enter Card Details
              </h3>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <StripePaymentForm
                  onSuccess={handlePaymentSuccess}
                  loading={loading}
                  setLoading={setLoading}
                />
              </Elements>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Order Summary
          </h3>

          <div className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.name} × {item.quantity}
                </span>
                <span className="text-gray-800 font-medium">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold text-gray-800 text-lg border-t pt-3">
            <span>Total</span>
            <span>Rs. {totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
