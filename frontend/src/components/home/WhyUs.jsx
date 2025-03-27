import React from "react";

const WhyUs = () => {
  return (
    <section className="bg-black/85 py-20 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Card
            icon="bi bi-people"
            title="+2,000"
            description="Happy Customers"
          />
          <Card
            icon="bi bi-graph-up"
            title="+250"
            description="Premium Products"
          />
          <Card
            icon="bi bi-star"
            title="4.8"
            description="Average Rating"
          />
          <Card
            icon="bi bi-clock-history"
            title="30 Min"
            description="Avg. Delivery Time"
          />
        </div>
      </div>
    </section>
  );
};

const Card = ({ icon, title, description }) => {
  return (
    <div
      className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 text-center transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_0_15px_#FFDF00]"
    >
      <div
        className="text-5xl text-[#FFDF00] mb-4 transition-transform duration-300 group-hover:scale-110"
      >
        <i className={icon}></i>
      </div>
      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#FFDF00] transition-colors">
        {title}
      </h3>
      <p className="text-gray-400">{description}</p>
      <div className="mt-4 h-1 w-12 mx-auto bg-gradient-to-r from-[#DFBF00] to-[#FFDF00] rounded-full group-hover:w-full transition-all duration-500" />
    </div>
  );
};

export default WhyUs;
