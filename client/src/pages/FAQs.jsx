import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Browse our products, add items to your cart, and proceed to checkout. Fill in your shipping details, choose a payment method (Cash on Delivery or Online Payment), and place your order.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Cash on Delivery (COD) and online card payments through our secure Stripe payment gateway.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you'll receive a tracking ID. You can view your order status and tracking details anytime from the 'My Orders' page.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 7-day return policy on most items. If you're not satisfied with your purchase, contact our support team within 7 days of delivery.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Standard delivery takes 3-5 business days depending on your location. Orders over Rs. 5,000 qualify for free shipping.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Yes, orders can be cancelled before they are shipped. Once shipped, cancellation may not be possible. Contact support for assistance.",
    },
    {
      question: "Is it safe to shop on Shopwave?",
      answer:
        "Absolutely. We use industry-standard encryption for all transactions, and your payment details are never stored on our servers.",
    },
    {
      question: "How do I create an account?",
      answer:
        "Click the 'Login' button in the top navigation, then select 'Sign Up' to create a new account with your name, email, and password.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-500">
          Find answers to common questions about shopping with Shopwave.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              <ChevronDown
                size={18}
                className={`text-gray-400 shrink-0 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {openIndex === index && (
              <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;
