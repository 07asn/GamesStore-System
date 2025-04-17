import React from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, CreditCard, Truck } from "lucide-react";

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
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HowItWorks = () => {
  return (
    <section className="py-20 bg-black/85 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FFDF00] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#DFBF00] rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <div className="h-1 w-24 mx-auto mb-6 rounded-full" style={{ background: "linear-gradient(to right, #FFDF00, #DFBF00)" }} />
          <p className="text-gray-400 text-lg">
            A luxurious and effortless 4-step experience for modern shopping.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_#DFBF00]"
            >
              <div className="relative mb-6">
                <div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#DFBF00] to-[#FFDF00] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500"
                >
                  <item.icon className="w-8 h-8 text-black" />
                </div>
                <div className="absolute -right-2 -top-2 w-8 h-8 rounded-full bg-[#FFDF00] text-black font-bold flex items-center justify-center shadow-md text-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FFDF00] transition-colors duration-300">
                {item.step}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                {item.description}
              </p>
              <div className="mt-6 h-1 w-12 bg-gradient-to-r from-gray-600 to-gray-900 group-hover:bg-[#FFDF00] transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 text-black font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
            style={{
              background: "linear-gradient(to right, #FFDF00, #DFBF00)",
              boxShadow: "0 0 20px #FFDF00AA",
            }}
          >
            Start Shopping Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
