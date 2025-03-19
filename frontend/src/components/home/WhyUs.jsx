import React from "react";

const WhyUs = () => {
  return (
    <section className="bg-[#1a1a1a] py-20 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-white text-3xl font-bold mb-8">Why Us?</h2>
        <div className="py-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card
              icon="bi bi-people"
              iconColor="text-blue-500"
              title="+2,000"
              description="Customers Served"
            />
            <Card
              icon="bi bi-graph-up"
              iconColor="text-green-500"
              title="+250"
              description="Product"
            />
            <Card
              icon="bi bi-star"
              iconColor="text-yellow-500"
              title="4.8"
              description="Average Rating"
            />
            <Card
              icon="bi bi-clock-history"
              iconColor="text-red-500"
              title="30 Min"
              description="Average Delivery Time"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = ({ icon, iconColor, title, description }) => {
  return (
    <div
      className="bg-[#f9f9f9] shadow transition-all duration-300 ease group
                 hover:translate-y-[-5px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.12),_0_4px_8px_rgba(0,0,0,0.06)]"
    >
      <div className="p-4">
        <div
          className={`text-5xl mb-2 transition-transform duration-300 group-hover:scale-110 ${iconColor}`}
        >
          <i className={icon}></i>
        </div>
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default WhyUs;
