import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Crown, Gamepad2, Trophy, Sword, Ghost } from 'lucide-react';

// Match the consistent color scheme across components
const COLORS = {
  primary: '#FFDF00',
  primaryDark: '#DFBF00',
  background: '#1a1a1a',
  backgroundAlt: '#121212',
  text: {
    primary: '#FFFFFF',
    secondary: '#9CA3AF',
    accent: '#FFDF00'
  },
  border: '#2a2a2a'
};

// Icon mapping for game categories
const CATEGORY_ICONS = {
  action: <Sword size={20} className="text-[#FFDF00]" />,
  adventure: <Gamepad2 size={20} className="text-[#FFDF00]" />,
  sports: <Trophy size={20} className="text-[#FFDF00]" />,
  horror: <Ghost size={20} className="text-[#FFDF00]" />,
  default: <Crown size={20} className="text-[#FFDF00]" />
};

const CategoryCard = ({ imageSrc, title, id, category }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3
      }
    }
  };

  const getCategoryIcon = () => {
    return CATEGORY_ICONS[category] || CATEGORY_ICONS.default;
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="h-full"
    >
      <Link to={`/shop?category=${id}`} className="block h-full">
        <div className="bg-gradient-to-b from-[#1a1a1a] to-[#121212] rounded-lg overflow-hidden shadow-lg border border-[#2a2a2a] hover:border-[#FFDF00]/30 transition-all duration-300 h-full flex flex-col group relative">
          {/* Decorative Top Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFDF00]/30 via-[#FFDF00] to-[#FFDF00]/30"></div>

          {/* Image Container */}
          <div className="relative overflow-hidden h-48">
            <img
              src={imageSrc || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-[#FFDF00] text-[#121212] text-sm font-medium rounded-full flex items-center gap-1">
                    <Crown size={14} />
                    View Games
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-grow flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white group-hover:text-[#FFDF00] transition-colors duration-300">
                {title}
              </h3>
              <div className="bg-[#FFDF00]/10 p-2 rounded-full">
                {getCategoryIcon()}
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-auto pt-4">
              <motion.button
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2a2a2a] hover:bg-[#FFDF00] text-[#FFDF00] hover:text-[#121212] rounded-lg transition-all duration-300 font-medium group-hover:shadow-[0_0_15px_rgba(223,191,0,0.3)]"
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingBag size={18} />
                Browse Collection
              </motion.button>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-[#2a2a2a] text-[#FFDF00] text-sm font-medium rounded-full flex items-center gap-1 border border-[#FFDF00]/30">
            {getCategoryIcon()}
            <span>{category || 'Premium'}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
