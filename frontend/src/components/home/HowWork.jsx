import React from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, CreditCard, Truck } from "lucide-react";
import { Link } from 'react-router-dom';

const steps = [
  {
    step: "Discover",
    description: "Browse our premium collection of curated products.",
    icon: Search,
  },
  {
    step: "Select",
    description: "Add your favorite items to your shopping cart.",
    icon: ShoppingCart,
  },
  {
    step: "Purchase",
    description: "Complete your purchase securely and swiftly.",
    icon: CreditCard,
  },
  {
    step: "Receive",
    description: "Instant access to your digital products—available for download right away.",
    icon: Truck,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HowItWorks = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-[#111] to-black overflow-hidden">
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FFDF00]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#DFBF00]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            How It Works
          </h2>
          <div className="h-1 w-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#FFDF00] to-[#DFBF00]" />
          <p className="text-gray-400 text-lg leading-relaxed">
            A luxurious and effortless 4-step experience for modern shopping.
          </p>
        </div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {steps.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-[#1a1a1a] border border-[#2a2a2a] rounded-3xl p-8 text-center transition-all duration-300 hover:shadow-[0_0_24px_#DFBF00]/50 hover:-translate-y-2"
            >
              <div className="relative mb-6 flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#DFBF00] to-[#FFDF00] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-black" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FFDF00] text-black font-bold text-sm rounded-full flex items-center justify-center shadow-md">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#FFDF00] transition-colors">
                {item.step}
              </h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors">
                {item.description}
              </p>
              <div className="mt-6 h-1 w-12 mx-auto bg-gradient-to-r from-gray-700 to-gray-900 group-hover:from-[#DFBF00] group-hover:to-[#FFDF00] transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
        <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    className="inline-block"
  >
    <Link
      to="/shop"
      className="px-8 py-4 rounded-full text-black font-semibold text-lg shadow-xl transition-all duration-300"
      style={{
        background: "linear-gradient(to right, #FFDF00, #DFBF00)",
        boxShadow: "0 0 24px #FFDF00AA",
      }}
    >
      Start Shopping Now
    </Link>
  </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
