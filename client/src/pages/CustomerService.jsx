import { Link } from "react-router-dom";
import { Truck, RotateCcw, ShieldCheck, HelpCircle } from "lucide-react";

function CustomerService() {
  const sections = [
    {
      icon: Truck,
      title: "Shipping Information",
      content:
        "We deliver across Pakistan within 3-5 business days. Orders over Rs. 5,000 qualify for free shipping. You'll receive a tracking ID once your order ships, which you can monitor from your 'My Orders' page.",
    },
    {
      icon: RotateCcw,
      title: "Returns & Refunds",
      content:
        "Not satisfied with your purchase? We offer a 7-day return window from the date of delivery. Items must be unused and in original packaging. Refunds are processed within 5-7 business days after we receive the returned item.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Shopping",
      content:
        "Your security is our priority. All payments are processed through Stripe's encrypted payment gateway. We never store your card details on our servers. Your personal information is protected under our privacy policy.",
    },
    {
      icon: HelpCircle,
      title: "Need More Help?",
      content:
        "Can't find what you're looking for? Our support team is here to help. Reach out via email, WhatsApp, or visit our FAQs page for quick answers to common questions.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Customer Service
        </h1>
        <p className="text-gray-500">
          We're here to make your shopping experience smooth and worry-free.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div className="w-11 h-11 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
              <section.icon size={20} className="text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              {section.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-500 mb-4">Still have questions?</p>
        <Link
          to="/contact"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}

export default CustomerService;
