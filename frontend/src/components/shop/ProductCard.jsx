import React, { useState, useEffect, useRef } from 'react';
import { FaHeart, FaShoppingCart, FaGamepad, FaFire, FaTrophy, FaCrown, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ProductCard = ({ name, price, discounted_price, productImage, product_id }) => {
  const finalPrice = discounted_price ? parseFloat(discounted_price) : parseFloat(price);
  const link = `/products/${product_id}`;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef(null);

  // Enhanced Luxury Color Palette
  const colors = {
    primary: '#D4AF37',       // Royal Gold
    primaryLight: '#F5E6B3',  // Light Gold
    primaryDark: '#996515',   // Dark Gold
    secondary: '#FFD700',     // Bright Gold
    accent: '#B71C1C',        // Royal Red
    light: '#FFFFFF',         // White
    dark: '#1A1A1A',          // Darker Text for better contrast
    mediumGray: '#6D6D6D',    // Medium Gray
    lightGray: '#F5F5F5',     // Light Gray
    goldGradient: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)',
    goldGradientHover: 'linear-gradient(135deg, #FFD700 20%, #D4AF37 80%)',
    subtleGlow: '0 0 20px rgba(212, 175, 55, 0.3)',
    royalBorder: '1px solid rgba(212, 175, 55, 0.5)'
  };

  // Calculate discount percentage
  const discountPercentage = discounted_price ? Math.round((1 - finalPrice / parseFloat(price)) * 100) : 0;

  // Check wishlist status
  useEffect(() => {
    const checkWishlistStatus = () => {
      try {
        const wishlistData = localStorage.getItem('wishlist');
        if (wishlistData) {
          const existingWishlist = JSON.parse(wishlistData);
          setIsWishlisted(existingWishlist.some(item => item.product_id === product_id));
        }
      } catch (error) {
        console.error('Error checking wishlist status', error);
      }
    };
    checkWishlistStatus();
  }, [product_id]);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const addToWishlist = (e) => {
    e.preventDefault();
    triggerAnimation();
    const product = { product_id, name, price, discounted_price, productImage, finalPrice };
    let existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    if (isWishlisted) {
      existingWishlist = existingWishlist.filter(item => item.product_id !== product_id);
      toast.success('Removed from Collection', {
        style: {
          background: colors.light,
          color: colors.dark,
          border: colors.royalBorder,
          boxShadow: colors.subtleGlow,
          fontFamily: "'Cinzel', serif",
        },
        icon: '❤️'
      });
    } else {
      existingWishlist.push(product);
      toast.success('Added to Collection', {
        style: {
          background: colors.light,
          color: colors.dark,
          border: colors.royalBorder,
          boxShadow: colors.subtleGlow,
          fontFamily: "'Cinzel', serif",
        },
        icon: '✨'
      });
    }

    localStorage.setItem('wishlist', JSON.stringify(existingWishlist));
    setIsWishlisted(!isWishlisted);
  };

  const addToCart = (e) => {
    e.preventDefault();
    triggerAnimation();
    const product = { product_id, name, price, discounted_price, productImage, finalPrice, quantity: 1 };
    let existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const productIndex = existingCart.findIndex(item => item.product_id === product_id);

    if (productIndex >= 0) {
      existingCart[productIndex].quantity += 1;
    } else {
      existingCart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    toast.success('Added to Cart', {
      position: 'top-center',
      duration: 2000,
      style: {
        background: colors.light,
        color: colors.dark,
        border: colors.royalBorder,
        boxShadow: colors.subtleGlow,
        fontFamily: "'Cinzel', serif",
        padding: '12px 24px'
      },
      icon: '🛒',
    });
  };

  return (
    <div
      ref={cardRef}
      className="relative transition-all duration-300 group h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: colors.light,
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: isHovered ? `0 15px 30px rgba(0,0,0,0.12), ${colors.subtleGlow}` : '0 5px 15px rgba(0,0,0,0.05)',
        border: colors.royalBorder,
        transform: isAnimating ? 'scale(1.03)' : 'scale(1)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
    >
      {/* Discount Badge - Enhanced with animation */}
      {discounted_price && (
        <div
          className="absolute top-4 left-4 z-10"
          style={{
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: isHovered ? 'scale(1.08) rotate(-2deg)' : 'scale(1)',
          }}
        >
          <div style={{
            background: colors.goldGradient,
            borderRadius: '8px',
            boxShadow: isHovered ? '0 6px 12px rgba(0,0,0,0.15)' : '0 4px 8px rgba(0,0,0,0.1)',
            padding: '7px 12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, ${colors.primaryLight}60 0%, transparent 70%)`,
                opacity: isHovered ? 0.8 : 0.4,
                transition: 'opacity 0.4s ease'
              }}
            ></div>
            <span style={{
              fontSize: '11px',
              color: colors.dark,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              fontFamily: "'Cinzel', serif",
              lineHeight: 1
            }}>
              Royal Deal
            </span>
            <span style={{
              fontSize: '20px',
              color: colors.dark,
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              fontFamily: "'Cinzel', serif",
              lineHeight: 1.2,
              marginTop: '3px'
            }}>
              {discountPercentage}% OFF
            </span>
          </div>
        </div>
      )}

      {/* Product Image Container - Enhanced with deeper hover effect */}
      <div className="relative h-72 overflow-hidden flex-shrink-0">
        <Link to={link} className="block h-full">
          <img
            src={productImage || '/img/default-game.jpg'}
            alt={name}
            className="w-full h-full object-cover"
            style={{
              transition: 'transform 0.7s ease, filter 0.5s ease',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              filter: isHovered ? 'brightness(1.05) contrast(1.05)' : 'brightness(1) contrast(1)'
            }}
          />

          {/* Enhanced Gradient Overlay */}
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              background: `linear-gradient(to top, ${colors.light} 0%, transparent 50%)`,
              opacity: isHovered ? 0.7 : 0.5,
            }}
          ></div>

          {/* Quick View Button - Appears on hover */}
          <div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.8)',
            }}
          >
            <Link to={link} className="flex items-center justify-center gap-2 px-4 py-2 rounded-full" style={{
              background: 'rgba(255, 255, 255, 0.9)',
              color: colors.dark,
              border: colors.royalBorder,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              fontFamily: "'Cinzel', serif",
              fontWeight: 'bold',
              fontSize: '14px',
              backdropFilter: 'blur(3px)'
            }}>
              <FaEye size={15} />
              Quick View
            </Link>
          </div>
        </Link>

        {/* Action Buttons - Enhanced with staggered animation */}
        <div
          className="absolute top-4 right-4 flex flex-col space-y-3"
          style={{
            transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
            opacity: isHovered ? 1 : 0,
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          <button
            onClick={addToWishlist}
            className="flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: isWishlisted ? colors.accent : colors.light,
              color: isWishlisted ? colors.light : colors.mediumGray,
              border: `1px solid ${isWishlisted ? colors.accent : colors.lightGray}`,
              boxShadow: '0 3px 8px rgba(0,0,0,0.12)'
            }}
          >
            <FaHeart
              className={isWishlisted ? 'animate-pulse' : ''}
              size={18}
            />
          </button>

          <button
            className="flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: colors.light,
              color: colors.mediumGray,
              border: `1px solid ${colors.lightGray}`,
              boxShadow: '0 3px 8px rgba(0,0,0,0.12)'
            }}
          >
            <FaGamepad size={18} className="hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>

      {/* Product Info - Refined with better spacing */}
      <div className="p-6 flex-1 flex flex-col" style={{
        borderTop: `1px solid ${colors.lightGray}`,
        transition: 'background-color 0.3s ease',
        backgroundColor: isHovered ? 'rgba(245, 245, 245, 0.5)' : 'transparent'
      }}>
        {/* Product Name */}
        <h3
          className="font-bold text-xl mb-3 transition-all duration-300"
          style={{
            color: colors.dark,
            fontFamily: "'Cinzel', serif",
            letterSpacing: '0.3px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
          }}
        >
          <Link to={link}>{name}</Link>
        </h3>

        {/* Animated Divider */}
        <div
          className="h-px w-full mb-5 transition-all duration-700"
          style={{
            background: isHovered ? colors.goldGradient : `linear-gradient(to right, ${colors.primary}, ${colors.primaryLight}20)`,
            width: isHovered ? '100%' : '40%',
            height: isHovered ? '2px' : '1px'
          }}
        ></div>

        {/* Price section - Now separate from Add to Cart */}
        <div className="flex items-baseline mb-4">
          {discounted_price ? (
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span
                  className="text-2xl font-bold"
                  style={{
                    color: colors.dark,
                    fontFamily: "'Cinzel', serif",
                    transition: 'all 0.3s ease',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  ${finalPrice.toFixed(2)}
                </span>
                <span
                  className="ml-2 text-sm line-through"
                  style={{
                    color: colors.mediumGray,
                    opacity: 0.7
                  }}
                >
                  ${parseFloat(price).toFixed(2)}
                </span>
              </div>
              <span
                style={{
                  fontSize: '13px',
                  color: colors.primaryDark,
                  marginTop: '3px',
                  fontWeight: 'medium'
                }}
              >
                You save ${(parseFloat(price) - finalPrice).toFixed(2)}
              </span>
            </div>
          ) : (
            <span
              className="text-2xl font-bold"
              style={{
                color: colors.dark,
                fontFamily: "'Cinzel', serif",
                transition: 'all 0.3s ease',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              ${finalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button - Now on its own line, full width */}
        <button
          onClick={addToCart}
          className="w-full flex items-center justify-center transition-all duration-400 group overflow-hidden relative mt-auto"
          style={{
            background: isHovered ? colors.goldGradientHover : colors.primaryLight,
            color: colors.dark,
            padding: '10px 18px',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontFamily: "'Cinzel', serif",
            boxShadow: isHovered ? '0 8px 20px rgba(212, 175, 55, 0.4)' : '0 4px 10px rgba(0,0,0,0.08)',
            border: `1px solid ${isHovered ? colors.primaryDark : colors.primary}`,
            transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
            transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          {/* Animated shine effect overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
              transform: 'translateX(-100%)',
              animation: isHovered ? 'shine 1.5s ease infinite' : 'none',
            }}
          ></div>

          {/* Cart icon with animation */}
          <FaShoppingCart
            className="mr-2 transition-transform duration-300"
            size={17}
            style={{
              transform: isHovered ? 'scale(1.2) translateX(-2px)' : 'scale(1)',
            }}
          />

          {/* Text with expanding effect */}
          <span
            className="text-sm tracking-wider overflow-hidden flex items-center"
            style={{
              transition: 'max-width 0.4s ease',
            }}
          >
            <span style={{
              display: 'inline-block',
              transform: isHovered ? 'translateY(0)' : 'translateY(0)',
              transition: 'transform 0.3s ease',
              textShadow: isHovered ? '0 0 5px rgba(255,215,0,0.5)' : 'none',
              letterSpacing: isHovered ? '0.8px' : '0.5px',
            }}>
              Add to Cart
            </span>
          </span>
        </button>
      </div>

      {/* Enhanced Premium Badge - With animation */}
      {isHovered && (
        <div
          className="absolute bottom-1 right-1 px-4 py-1.1 rounded-full text-xs font-medium flex items-center gap-1.5"
          style={{
            background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.primaryLight} 100%)`,
            color: colors.primaryDark,
            border: `1px solid ${colors.primary}`,
            boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
            fontFamily: "'Cinzel', serif",
            letterSpacing: '0.5px',
            opacity: 0,
            animation: 'fadeIn 0.4s ease 0.1s forwards'
          }}
        >
          <FaCrown size={13} className="text-gold animate-pulse" style={{ color: colors.primary }} />
          Royal Edition
        </div>
      )}

      {/* Global Styles - Enhanced animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          60% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;