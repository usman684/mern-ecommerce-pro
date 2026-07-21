import { Link } from "react-router-dom";
import { ShoppingBag, Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  const email = "musmanbhutta65@gmail.com";
  const whatsappNumber = "923286894500";
  const displayPhone = "0328 6894500"; // apna real number yahan daalo, bina +, spaces ke
  const locationQuery = "Barkat Market, Lahore"; // apna asli area daal sakte ho

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

        {/* Company */}
        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/customer-service"
                className="hover:text-white transition-colors"
              >
                Customer Service
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="hover:text-white transition-colors">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-gray-500" />
                {email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone size={14} className="text-gray-500" />
                +92 328 6894500
              </a>
            </li>
            <li>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MapPin size={14} className="text-gray-500" />
                {locationQuery}
              </a>
            </li>
          </ul>
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
