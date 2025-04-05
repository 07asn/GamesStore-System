import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Joystick, Gamepad2, Trophy, Sword, Ghost } from 'lucide-react';

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
  glowGold: '0 0 15px rgba(223, 191, 0, 0.7)',
  scanline: `repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  )`
};

// Icon mapping for game categories
const CATEGORY_ICONS = {
  action: <Sword size={20} color={COLORS.brightGold} />,
  adventure: <Gamepad2 size={20} color={COLORS.brightGold} />,
  sports: <Trophy size={20} color={COLORS.brightGold} />,
  horror: <Ghost size={20} color={COLORS.brightGold} />,
  default: <Joystick size={20} color={COLORS.brightGold} />
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
      scale: 1.03,
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
        <div 
          className="rounded-lg overflow-hidden border-2 transition-all duration-300 h-full flex flex-col"
          style={{
            backgroundColor: COLORS.darkGray,
            borderColor: COLORS.mediumGray,
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Scanline overlay effect */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: COLORS.scanline,
            mixBlendMode: 'overlay',
            opacity: 0.3,
            zIndex: 2
          }}></div>
          
          {/* Gold border accent */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{
            background: COLORS.goldGradient
          }}></div>
          
          <div className="relative overflow-hidden h-48 flex-shrink-0">
            <img
              src={imageSrc || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              style={{
                filter: 'brightness(0.9) contrast(1.1)'
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div 
                className="px-6 py-3 rounded-full backdrop-blur-sm transform translate-y-8 hover:translate-y-0 transition-transform duration-500 flex items-center"
                style={{
                  backgroundColor: 'rgba(42, 42, 42, 0.85)',
                  color: COLORS.offWhite,
                  border: `1px solid ${COLORS.mediumGray}`
                }}
              >
                <span className="flex items-center font-medium tracking-wider text-sm">
                  <ShoppingBag className="w-4 h-4 mr-2" color={COLORS.brightGold} />
                  BROWSE COLLECTION
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-5 flex-grow flex flex-col" style={{
            backgroundColor: 'rgba(30, 30, 30, 0.7)',
            borderTop: `1px solid ${COLORS.mediumGray}`
          }}>
            <div className="flex items-center justify-between mb-3">
              <h3
                className="text-xl font-bold transition-all duration-300"
                style={{ 
                  color: COLORS.offWhite,
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  fontFamily: '"Teko", sans-serif',
                  fontSize: '1.4rem',
                  letterSpacing: '1px',
                  lineHeight: '1.2'
                }}
              >
                {title.toUpperCase()}
              </h3>
              <div className="ml-3">
                {getCategoryIcon()}
              </div>
            </div>
            
            <div className="mt-auto">
              <motion.button 
                className="w-full py-3 px-6 rounded-md text-sm font-bold uppercase tracking-wider flex items-center justify-center transition-all duration-300"
                style={{
                  background: COLORS.goldGradient,
                  color: COLORS.black,
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  textShadow: '0 1px 2px rgba(255,255,255,0.3)'
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: COLORS.glowGold
                }}
                whileTap={{
                  scale: 0.98
                }}
              >
                <span className="flex items-center">
                  <Gamepad2 className="mr-2" size={16} />
                  EXPLORE NOW
                </span>
              </motion.button>
            </div>
          </div>
          
          {/* Corner accents */}
          <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2" style={{
            borderColor: COLORS.gold
          }}></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2" style={{
            borderColor: COLORS.gold
          }}></div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
