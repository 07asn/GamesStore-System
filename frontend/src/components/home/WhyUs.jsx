import React from "react";

const WhyUs = () => {
  return (
    <section className="relative bg-black py-24 text-center overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-[#FFDF00]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-16 tracking-tight">
          Why Choose Us?
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <Card icon="bi bi-people" title="+2,000" description="Happy Customers" />
          <Card icon="bi bi-graph-up" title="+250" description="Premium Products" />
          <Card icon="bi bi-star" title="4.8" description="Average Rating" />
          <Card icon="bi bi-clock-history" title="30 Min" description="Avg. Delivery Time" />
        </div>
      </div>
    </section>
  );
};

const Card = ({ icon, title, description }) => {
  return (
    <div className="bg-[#1a1a1a]/70 border border-[#2a2a2a] rounded-3xl p-8 shadow-lg backdrop-blur-sm group hover:-translate-y-2 hover:shadow-[0_0_25px_#FFDF00]/50 transition-all duration-300">
      <div className="text-[#FFDF00] text-6xl mb-4 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_6px_#FFDF00aa]">
        <i className={icon}></i>
      </div>
      <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-[#FFDF00] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-400 text-base">{description}</p>
      <div className="mt-4 h-1 w-12 mx-auto bg-gradient-to-r from-[#DFBF00] to-[#FFDF00] rounded-full group-hover:w-24 transition-all duration-500" />
    </div>
  );
};

export default WhyUs;
