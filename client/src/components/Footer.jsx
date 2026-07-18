import { Link } from "react-router-dom";
import { ShoppingBag, Mail, Globe, MessageCircle } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-linear-to-br from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center">
              <ShoppingBag size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-white">Shopwave</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your one-stop shop for quality products at the best prices. Fast
            delivery, secure payments, trusted service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-white transition-colors">
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/wishlist"
                className="hover:text-white transition-colors"
              >
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                to="/my-orders"
                className="hover:text-white transition-colors"
              >
                My Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-white font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Shipping Policy
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Returns & Refunds
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Contact Us
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                FAQs
              </span>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
          <div className="flex gap-3">
            <span className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
              <Mail size={16} />
            </span>
            <span className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
              <MessageCircle size={16} />
            </span>
            <span className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
              <Globe size={16} />
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Shopwave. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
