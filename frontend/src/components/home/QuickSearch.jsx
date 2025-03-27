import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Gamepad, Globe, Brain, Timer, Volleyball, Joystick } from 'lucide-react';

const colors = {
  gold: '#DFBF00',
  brightGold: '#FFDF00',
  darkGold: '#C1A811',
  goldGradient: 'linear-gradient(135deg, #FFDF00, #C1A811)',
  black: '#000000',
  lightGray: '#DBDBDB',
  mediumGray: '#636362',
  darkGray: '#2A2A2A',
  offWhite: '#F6F6F6',
  glowGold: '0 0 15px rgba(223, 191, 0, 0.5)',
};

const QuickSearch = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const categories = [
    {
      name: "Story Mode Games",
      icon: Gamepad,
      description: "Immersive narratives",
    },
    {
      name: "Online Games",
      icon: Globe,
      description: "Compete worldwide",
    },
    {
      name: "Strategy Games",
      icon: Brain,
      description: "Plan and conquer",
    },
    {
      name: "Racing Games",
      icon: Timer,
      description: "Speed and adrenaline",
    },
    {
      name: "Sports Games",
      icon: Volleyball,
      description: "Authentic sports",
    },
    {
      name: "Simulator Games",
      icon: Joystick,
      description: "Realistic simulations",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-[color:var(--offWhite)] relative overflow-hidden" style={{ backgroundColor: colors.offWhite }}>
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: colors.brightGold, opacity: 0.15 }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: colors.darkGold, opacity: 0.15 }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full mb-4"
            style={{ backgroundColor: `${colors.gold}20` }}
          >
            <Search className="w-4 h-4 mr-2" style={{ color: colors.darkGold }} />
            <span className="text-sm font-medium" style={{ color: colors.mediumGray }}>
              Game Finder
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-extrabold mb-3"
            style={{ color: colors.darkGray }}
          >
            Quick Game Search
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1.5 rounded-full mx-auto mb-4"
            style={{ background: colors.goldGradient }}
          />
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              transition={{ duration: 0.4 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative"
            >
              <a
                href={`/shop/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="block h-full"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border p-6 h-full transition-all duration-300 shadow-md`}
                  style={{
                    backgroundColor: '#ffffff',
                    borderColor: hoveredIndex === idx ? colors.gold : colors.lightGray,
                    boxShadow: hoveredIndex === idx ? colors.glowGold : '0 4px 12px rgba(0,0,0,0.06)',
                    transform: hoveredIndex === idx ? 'scale(1.03)' : 'scale(1)',
                  }}
                >
                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300"
                    style={{
                      background: colors.goldGradient,
                      opacity: hoveredIndex === idx ? 0.08 : 0,
                      zIndex: 0,
                    }}
                  />

                  <div className="flex flex-col h-full relative z-10">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-sm transition-all duration-300"
                      style={{
                        background: hoveredIndex === idx ? colors.goldGradient : colors.brightGold,
                        color: colors.black,
                        transform: hoveredIndex === idx ? 'scale(1.1)' : 'scale(1)',
                      }}
                    >
                      <category.icon className="w-6 h-6" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-semibold mb-1" style={{ color: colors.darkGray }}>
                      {category.name}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: colors.mediumGray }}>
                      {category.description}
                    </p>

                    {/* Button */}
                    <div className="mt-auto">
                      <div
                        className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300"
                        style={{
                          background: hoveredIndex === idx ? colors.goldGradient : colors.lightGray,
                          color: hoveredIndex === idx ? colors.black : colors.darkGray,
                          boxShadow: hoveredIndex === idx ? colors.glowGold : 'none',
                        }}
                      >
                        Browse
                        <svg
                          className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                            hoveredIndex === idx ? 'translate-x-1' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-14"
        >
          <a
            href="/shop"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300"
            style={{
              background: colors.goldGradient,
              color: colors.black,
              boxShadow: colors.glowGold,
            }}
          >
            View All Games
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickSearch;
