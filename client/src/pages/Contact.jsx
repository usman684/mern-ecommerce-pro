import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import toast from "react-hot-toast";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "musmanbhutta65@gmail.com",
      href: "mailto:musmanbhutta65@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+92 328 6894500",
      href: "https://wa.me/923286894500",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "Barkat Market, Lahore, Punjab, Pakistan",
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        "Barkat Market, Lahore, Punjab, Pakistan",
      )}`,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Get In Touch
        </h1>
        <p className="text-gray-500">
          Have a question or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          {contactInfo.map((info) => (
            <a
              key={info.label}
              href={info.href}
              target={info.label !== "Email" ? "_blank" : undefined}
              rel={info.label !== "Email" ? "noopener noreferrer" : undefined}
              className="flex items-start gap-3 group"
            >
              <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors">
                <info.icon
                  size={18}
                  className="text-indigo-600 group-hover:text-white transition-colors"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {info.label}
                </p>
                <p className="text-sm text-gray-500 group-hover:text-indigo-600 transition-colors">
                  {info.value}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
