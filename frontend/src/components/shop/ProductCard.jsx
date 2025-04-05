import React, { useState, useEffect, useRef } from 'react';
import { FaHeart, FaShoppingCart, FaGamepad, FaFire, FaTrophy, FaCrown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ProductCard = ({ name, price, discounted_price, productImage, product_id }) => {
  const finalPrice = discounted_price ? parseFloat(discounted_price) : parseFloat(price);
  const link = `/products/${product_id}`;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef(null);
  
  // Royal Gold Color Palette
  const colors = {
    primary: '#D4AF37',       // Royal Gold
    primaryLight: '#F5D76E',  // Light Gold
    primaryGlow: 'rgba(212, 175, 55, 0.5)', // Gold Glow
    secondary: '#FFD700',     // Bright Gold
    secondaryGlow: 'rgba(255, 215, 0, 0.5)', // Gold Glow
    accent: '#8B0000',        // Dark Red
    accentGlow: 'rgba(139, 0, 0, 0.3)', // Red Glow
    dark: '#121212',          // Nearly Black
    darkGrey: '#1E1E1E',      // Dark Grey
    light: '#FFFFFF',         // White
    lightGrey: '#B8B8B8',     // Light Grey
    rgbEffect: 'linear-gradient(90deg, #D4AF37, #F5D76E, #FFD700, #FDB931, #D4AF37)',
    shadow: 'rgba(212, 175, 55, 0.3)', // Shadow Color
    bronze: '#CD7F32',        // Bronze accent
    silverGrey: '#C0C0C0',    // Silver accent
  };

  // Calculate discount percentage
  const discountPercentage = discounted_price ? Math.round((1 - finalPrice/parseFloat(price))*100) : 0;
  
  // Gold shimmer animation
  const [shimmerPosition, setShimmerPosition] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setShimmerPosition(prev => (prev >= 100 ? 0 : prev + 0.5));
    }, 20);
    return () => clearInterval(interval);
  }, []);
  
  // 3D tilt effect with enhanced royal feel
  const handleMouseMove = (e) => {
    if (!cardRef.current || !isHovered) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15; // Reduced for subtler royal movement
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };
  
  const resetTilt = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

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
      toast.success('Removed from Royal Collection', { 
        icon: '👑',
        style: {
          borderRadius: '10px',
          background: colors.dark,
          color: colors.light,
          border: `1px solid ${colors.primary}`,
          boxShadow: `0 0 15px ${colors.primaryGlow}`
        }
      });
    } else {
      existingWishlist.push(product);
      toast.success('Added to Royal Collection', {
        icon: '👑',
        style: {
          borderRadius: '10px',
          background: colors.dark,
          color: colors.light,
          border: `1px solid ${colors.primary}`,
          boxShadow: `0 0 15px ${colors.primaryGlow}`
        }
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

    toast.success('ROYAL ACQUISITION', {
      position: 'top-center',
      duration: 2000,
      icon: '👑',
      style: {
        background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.darkGrey} 100%)`,
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: '1.2rem',
        border: `2px solid ${colors.primary}`,
        boxShadow: `0 0 20px ${colors.primaryGlow}`,
        textTransform: 'uppercase',
        fontFamily: 'serif',
        padding: '16px 24px',
        borderRadius: '8px'
      }
    });
  };

  return (
    <div 
      ref={cardRef}
      className="relative transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetTilt();
      }}
      onMouseMove={handleMouseMove}
      style={{
        background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.darkGrey} 100%)`,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: isHovered 
          ? `0 0 25px ${colors.primaryGlow}, 0 0 5px ${colors.secondaryGlow}`
          : `0 8px 20px rgba(0,0,0,0.5)`,
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: isAnimating 
          ? 'scale(1.05)' 
          : 'scale(1)',
        border: `1px solid ${colors.primary}40`
      }}
    >
      {/* Royal Gold Border Effect */}
      <div 
        className="absolute inset-0 rounded-xl pointer-events-none z-10"
        style={{
          background: 'transparent',
          borderRadius: '12px',
          boxShadow: isHovered ? `0 0 10px ${colors.primaryGlow}, 0 0 30px ${colors.secondaryGlow}` : 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
          border: isHovered ? `2px solid ${colors.primary}60` : 'none',
          zIndex: 0
        }}
      ></div>
      
      {/* Animated Gold Shimmer Border Top */}
      <div 
        className="absolute top-0 left-0 right-0 h-2 z-20"
        style={{
          background: colors.rgbEffect,
          backgroundSize: '500% 100%',
          backgroundPosition: `${shimmerPosition}% 0`,
          opacity: isHovered ? 1 : 0.5,
          transition: 'opacity 0.5s ease'
        }}
      ></div>

      {/* Royal Corner Decorations */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner => {
        const [vertical, horizontal] = corner.split('-');
        return (
          <div 
            key={corner}
            className="absolute z-20 w-6 h-6 pointer-events-none"
            style={{
              top: vertical === 'top' ? '-3px' : 'auto',
              bottom: vertical === 'bottom' ? '-3px' : 'auto',
              left: horizontal === 'left' ? '-3px' : 'auto',
              right: horizontal === 'right' ? '-3px' : 'auto',
              opacity: isHovered ? 1 : 0.5,
              transition: 'opacity 0.5s ease',
            }}
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path 
                d={
                  vertical === 'top' && horizontal === 'left' ? 
                    "M0 0 L12 0 L12 2 L2 2 L2 12 L0 12 Z" : 
                  vertical === 'top' && horizontal === 'right' ? 
                    "M24 0 L12 0 L12 2 L22 2 L22 12 L24 12 Z" : 
                  vertical === 'bottom' && horizontal === 'left' ? 
                    "M0 24 L12 24 L12 22 L2 22 L2 12 L0 12 Z" : 
                    "M24 24 L12 24 L12 22 L22 22 L22 12 L24 12 Z"
                } 
                fill={colors.primary} 
              />
            </svg>
          </div>
        );
      })}

      {/* LINK WRAPPER */}
      <Link to={link} className="block">
        {/* Product Image Container with Royal Gold Effects */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={productImage || 'img/product-4.jpg'}
            alt={name}
            className="w-full h-full object-cover"
            style={{
              transition: 'all 0.7s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              filter: isHovered ? 'brightness(1.1) contrast(1.1) saturate(1.2)' : 'brightness(0.95) contrast(1.05)',
            }}
          />
          
          {/* Royal Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${colors.dark}99 0%, ${colors.dark}60 100%)`,
              mixBlendMode: 'multiply',
              opacity: isHovered ? 0.7 : 0.85
            }}
          ></div>
          
          {/* Golden Vignette Effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle, transparent 30%, ${colors.dark}90 100%)`,
              opacity: 0.7,
              transition: 'opacity 0.3s ease'
            }}
          ></div>
          
          {/* Royal Gold Frame Effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              border: `1px solid ${colors.primary}50`,
              opacity: isHovered ? 0.9 : 0.4,
              transition: 'opacity 0.3s ease',
              background: `
                linear-gradient(90deg, ${colors.primary}00 40%, ${colors.primary}70 50%, ${colors.primary}00 60%),
                linear-gradient(180deg, ${colors.primary}00 40%, ${colors.primary}70 50%, ${colors.primary}00 60%)
              `,
              backgroundSize: '100% 100%, 100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>

          {/* Enhanced Royal Discount Badge */}
          {discounted_price && (
            <div 
              className="absolute top-4 left-4 z-10"
              style={{
                transition: 'all 0.3s ease',
                transform: isHovered ? 'scale(1.1) rotate(-2deg)' : 'scale(1) rotate(0)',
              }}
            >
              <div style={{
                background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.darkGrey} 100%)`,
                color: colors.primary,
                borderRadius: '5px',
                boxShadow: `0 0 15px ${colors.primaryGlow}`,
                border: `2px solid ${colors.primary}70`,
                padding: '8px 12px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg, ${colors.primaryGlow} 0%, transparent 70%)`,
                    opacity: isHovered ? 0.5 : 0.3,
                    transition: 'opacity 0.3s ease'
                  }}
                ></div>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    background: colors.primary,
                    boxShadow: `0 0 10px ${colors.primaryGlow}`,
                    zIndex: 2
                  }}
                ></div>
                <span style={{ 
                  fontSize: '12px', 
                  color: colors.primary,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontFamily: 'serif',
                  lineHeight: 1.2,
                  display: 'block',
                  textShadow: `0 0 5px ${colors.primaryGlow}`
                }}>
                  ROYAL OFFER
                </span>
                <span style={{ 
                  fontSize: '22px', 
                  color: colors.light,
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  fontFamily: 'serif',
                  lineHeight: 1.2,
                  textShadow: `0 0 5px ${colors.primaryGlow}`
                }}>
                  {discountPercentage}%
                </span>
              </div>
            </div>
          )}
          
          {/* Royal Emblem Watermark */}
          <div 
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            style={{
              opacity: isHovered ? 0.12 : 0.07,
              transition: 'opacity 0.5s ease',
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: `2px solid ${colors.primary}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <FaCrown size={40} color={colors.primary} />
            </div>
          </div>
        </div>

        {/* Status Bar / Card Footer */}
        <div 
          className="p-5"
          style={{
            background: `linear-gradient(to bottom, ${colors.darkGrey} 0%, ${colors.dark} 100%)`,
            borderTop: `1px solid ${colors.primary}40`,
            boxShadow: `0 -5px 15px rgba(0,0,0,0.3)`
          }}
        >
          {/* Product Name with Royal Typography */}
          <h3 
            className="font-bold text-lg mb-3 transition-all duration-300"
            style={{ 
              color: colors.light,
              fontFamily: 'serif',
              letterSpacing: '0.5px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textShadow: isHovered ? `0 0 5px ${colors.primaryGlow}` : 'none',
            }}
          >
            {name}
          </h3>

          {/* Royal Gold Divider */}
          <div 
            className="h-px w-full mb-4 transition-all duration-500 relative overflow-hidden"
            style={{ 
              background: colors.dark
            }}
          >
            <div 
              className="absolute top-0 left-0 h-full transition-all duration-500"
              style={{ 
                background: `linear-gradient(90deg, ${colors.bronze}, ${colors.primary}, ${colors.silverGrey})`,
                width: isHovered ? '100%' : '30%',
                boxShadow: `0 0 10px ${colors.primaryGlow}`,
              }}
            ></div>
          </div>

          {/* Bottom Action Row */}
          <div className="flex items-center justify-between">
            {/* Price Display */}
            <div className="flex items-baseline">
              {discounted_price ? (
                <div className="flex flex-col">
                  <div className="flex items-baseline">
                    <span 
                      className="text-xl font-bold"
                      style={{ 
                        color: colors.primary,
                        fontFamily: 'serif',
                        letterSpacing: '0.5px',
                        textShadow: `0 0 5px ${colors.primaryGlow}`
                      }}
                    >
                      ${finalPrice.toFixed(2)}
                    </span>
                    <span 
                      className="ml-2 text-sm line-through"
                      style={{ 
                        color: colors.lightGrey,
                        opacity: 0.7 
                      }}
                    >
                      ${parseFloat(price).toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                <span 
                  className="text-xl font-bold"
                  style={{ 
                    color: colors.primary,
                    fontFamily: 'serif',
                    letterSpacing: '0.5px',
                    textShadow: `0 0 5px ${colors.primaryGlow}`
                  }}
                >
                  ${finalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Action Buttons Group */}
            <div className="flex space-x-2">
              {/* Wishlist Button */}
              <button
                onClick={addToWishlist}
                className="flex items-center justify-center transition-all duration-300"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: isWishlisted ? colors.accent : colors.darkGrey,
                  color: colors.light,
                  border: `1px solid ${isWishlisted ? colors.accent : colors.primary}40`,
                  boxShadow: isWishlisted 
                    ? `0 0 15px ${colors.accentGlow}` 
                    : 'none',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                }}
              >
                <FaHeart 
                  className={isWishlisted ? 'animate-pulse' : ''}
                  size={16}
                  color={isWishlisted ? colors.light : colors.primary}
                />
              </button>
              
              {/* Add to Cart Button */}
              <button
                onClick={addToCart}
                className="flex items-center justify-center transition-all duration-300"
                style={{
                  background: isHovered 
                    ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`
                    : colors.primary,
                  color: colors.dark,
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontFamily: 'serif',
                  boxShadow: isHovered 
                    ? `0 0 20px ${colors.primaryGlow}` 
                    : 'none',
                  border: `1px solid ${colors.primary}90`,
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  letterSpacing: '1px',
                }}
              >
                <FaShoppingCart className="mr-2" size={14} />
                <span className="text-sm">ACQUIRE</span>
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Royal Feature Pills */}
      {isHovered && (
        <div 
          className="absolute top-4 right-4 flex flex-col space-y-3 z-20"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateX(0)' : 'translateX(20px)',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.darkGrey} 100%)`,
              color: colors.primary,
              padding: '4px 10px',
              borderRadius: '5px',
              fontSize: '12px',
              fontFamily: 'serif',
              fontWeight: 'bold',
              boxShadow: `0 0 15px ${colors.primaryGlow}`,
              border: `1px solid ${colors.primary}50`,
              display: 'flex',
              alignItems: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            <FaCrown size={10} className="mr-1" />
            <span>Premium</span>
          </div>
          
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.darkGrey} 100%)`,
              color: colors.primary,
              padding: '4px 10px',
              borderRadius: '5px',
              fontSize: '12px',
              fontFamily: 'serif',
              fontWeight: 'bold',
              boxShadow: `0 0 15px ${colors.primaryGlow}`,
              border: `1px solid ${colors.primary}50`,
              display: 'flex',
              alignItems: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            <FaFire size={10} className="mr-1" />
            <span>Exclusive</span>
          </div>
        </div>
      )}

      {/* Royal Quality Badge */}
      {isHovered && (
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-20 z-20 bg-opacity-80"
          style={{
            background: colors.dark + 'CC',
            borderRadius: '5px',
            padding: '5px 12px',
            border: `1px solid ${colors.primary}50`,
            boxShadow: `0 0 15px ${colors.primaryGlow}`,
            opacity: 0,
            animation: isHovered ? 'fadeIn 0.5s ease forwards 0.2s' : 'none',
            fontFamily: 'serif',
            maxWidth: '90%',
            backdropFilter: 'blur(5px)',
            transform: 'translate(-50%, 20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          <div className="flex items-center">
            <FaTrophy size={12} color={colors.primary} className="mr-1" />
            <span style={{color: colors.light, fontSize: '11px'}}>ROYAL QUALITY</span>
          </div>
          <div style={{width: '1px', height: '12px', background: colors.primary + '50'}}></div>
          <div className="flex items-center">
            <FaCrown size={12} color={colors.primary} className="mr-1" />
            <span style={{color: colors.light, fontSize: '11px'}}>ELITE CLASS</span>
          </div>
        </div>
      )}
      
      {/* Gold-leaf corner embellishments */}
      {isHovered && ['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner => {
        const [vertical, horizontal] = corner.split('-');
        return (
          <div 
            key={`embellish-${corner}`}
            className="absolute z-30 pointer-events-none"
            style={{
              width: '30px',
              height: '30px',
              top: vertical === 'top' ? '10px' : 'auto',
              bottom: vertical === 'bottom' ? '10px' : 'auto',
              left: horizontal === 'left' ? '10px' : 'auto',
              right: horizontal === 'right' ? '10px' : 'auto',
              opacity: 0,
              animation: 'fadeIn 0.5s ease forwards 0.3s',
            }}
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M12 2 L14 6 L18 8 L14 10 L12 14 L10 10 L6 8 L10 6 Z" 
                fill="none"
                stroke={colors.primary}
                strokeWidth="1"
                transform={
                  (vertical === 'bottom' && horizontal === 'right') ||
                  (vertical === 'bottom' && horizontal === 'left') ? 
                  'rotate(180)' : 'rotate(0)'
                }
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;