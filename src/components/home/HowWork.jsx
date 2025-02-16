import React from "react";

const steps = [
  {
    step: "Step 1",
    icon: "bi-search", // Using Bootstrap Icons (ensure they're loaded)
    bg: "bg-blue-500", // Tailwind background color for primary
    text: "Discover our products",
  },
  {
    step: "Step 2",
    icon: "bi-cart-plus",
    bg: "bg-green-500", // Tailwind background color for success
    text: "Add items to your cart",
  },
  {
    step: "Step 3",
    icon: "bi-credit-card",
    bg: "bg-blue-400", // Tailwind background color for info
    text: "Make secure payment",
  },
  {
    step: "Step 4",
    icon: "bi-truck",
    bg: "bg-yellow-500", // Tailwind background color for warning
    text: "Receive your order",
  },
];

const HowItWorks = () => {
  return (
    <section className="steps-section py-5">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-5 quick-search-heading text-white">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((item, index) => (
            <div
              key={index}
              className="step-item relative text-center p-5 bg-[#f9f9f9] rounded-lg shadow transition-all duration-300 ease hover:-translate-y-[5px] hover:shadow-[0_5px_20px_rgba(0,0,0,0.15)]"
            >
              <div className="step-icon mb-3">
                <span
                  className={`${item.bg} text-white rounded-full inline-block p-3 w-[70px] h-[70px] flex items-center justify-center mx-auto`}
                >
                  <i className={`bi ${item.icon} text-2xl`}></i>
                </span>
              </div>
              <h3 className="text-lg font-medium">{item.step}</h3>
              <p className="text-gray-500">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
