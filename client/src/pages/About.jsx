import { ShoppingBag, Users, Award, Truck } from "lucide-react";

function About() {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "10,000+" },
    { icon: ShoppingBag, label: "Products", value: "500+" },
    { icon: Award, label: "Years of Trust", value: "5+" },
    { icon: Truck, label: "Orders Delivered", value: "25,000+" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          About Shopwave
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Shopwave is your trusted destination for quality products at
          unbeatable prices. We're committed to delivering exceptional shopping
          experiences, from browsing to checkout to your doorstep.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <stat.icon size={24} className="text-indigo-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To make quality products accessible to everyone through a seamless,
            secure, and enjoyable online shopping experience. We believe great
            products shouldn't come with a great cost.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Our Promise</h2>
          <p className="text-gray-600 leading-relaxed">
            Every order is handled with care — from secure payments to fast
            shipping and responsive customer support. Your satisfaction is our
            top priority, every single time.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
