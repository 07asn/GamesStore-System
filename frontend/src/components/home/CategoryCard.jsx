import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const COLORS = {
  gold: '#DFBF00',
  brightGold: '#FFDF00',
  darkGold: '#C1A811',
  goldGradient: 'linear-gradient(135deg, #FFDF00, #C1A811)',
  black: '#000000',
  lightGray: '#DBDBDB',
  mediumGray: '#636362',
  darkGray: '#2A2A2A',
  offWhite: '#F6F6F6',
  glowGold: '0 0 15px rgba(223, 191, 0, 0.5)'
};

const CategoryCard = ({ imageSrc, title, id }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div variants={itemVariants}>
      <a href={`/shop/${id}`} className="block group h-full">
        <div 
          className="rounded-2xl overflow-hidden border transition-all duration-500 h-full transform hover:-translate-y-2"
          style={{
            backgroundColor: '#ffffff',
            borderColor: COLORS.lightGray,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = COLORS.glowGold;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div className="relative overflow-hidden h-64">
            <img
              src={imageSrc || 'https://via.placeholder.com/800x600'}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-white bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div 
                className="px-6 py-3 rounded-full transform translate-y-8 transition-transform duration-500"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  color: COLORS.darkGray,
                }}
              >
                <span className="flex items-center font-medium">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Browse Collection
                </span>
              </div>
            </div>
          </div>
          <div className="p-6 text-center">
            <h3
              className="text-xl font-bold mb-4 transition-all duration-300 group-hover:text-darkGold"
              style={{ color: COLORS.darkGray }}
            >
              {title}
            </h3>
            <button 
              className="w-full py-3 px-6 rounded-full text-sm font-semibold uppercase tracking-wide flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{
                background: COLORS.goldGradient,
                color: COLORS.black,
              }}
            >
              Explore Now
            </button>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default CategoryCard;
