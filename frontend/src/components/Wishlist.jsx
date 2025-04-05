import React, { useState, useEffect } from 'react';
import { Heart, X, ShoppingCart, ArrowLeft, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Royal Gold color palette
const colors = {
  royalGold: '#D4AF37',
  brightGold: '#FFD700',
  darkGold: '#996515',
  paleGold: '#F5E6B3',
  richBlack: '#0A0A0A',
  velvetBlack: '#1A1A1A',
  parchment: '#F8F4E6',
  lightParchment: '#FFFDF5',
  charcoal: '#333333',
  silver: '#C0C0C0',
  goldGradient: 'linear-gradient(135deg, #D4AF37 0%, #FFDF00 100%)',
  deepShadow: '0 4px 24px rgba(212, 175, 55, 0.25)',
  royalBorder: '1px solid rgba(212, 175, 55, 0.3)'
};

// Component to render each wishlist item
const WishlistItem = ({ item, onRemove, onAddToCart }) => (
  <div 
    className="rounded-xl transition-all duration-300 overflow-hidden group"
    style={{
      background: colors.lightParchment,
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
      border: colors.royalBorder
    }}
  >
    <div className="flex flex-col sm:flex-row">
      {/* Product Image with royal overlay */}
      <div className="sm:w-1/5 h-48 sm:h-auto relative overflow-hidden">
        <img 
          src={item.productImage || 'img/default-product.jpg'} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div 
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, ${colors.richBlack}20 0%, transparent 50%)`,
            opacity: 0,
            mixBlendMode: 'multiply'
          }}
        ></div>
        <div 
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${colors.royalGold}10 0%, transparent 70%)`,
            opacity: 0,
            mixBlendMode: 'overlay'
          }}
        ></div>
      </div>
      
      {/* Content */}
      <div 
        className="p-6 flex-1 flex flex-col sm:flex-row items-center sm:items-start gap-4 relative"
        style={{ borderLeft: `1px solid ${colors.paleGold}` }}
      >
        {/* Remove button */}
        <button
          onClick={() => onRemove(item.product_id)}
          className=" rounded-full transition-all duration-200"
          style={{
            background: colors.parchment,
            color: colors.charcoal,
            border: `1px solid ${colors.paleGold}`
          }}
          aria-label="Remove from wishlist"
        >
          <X size={16} />
        </button>
        
        {/* Product Details */}
        <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
          <h3 
            className="text-xl font-bold mb-1"
            style={{ 
              color: colors.richBlack,
              fontFamily: "'Cinzel', serif"
            }}
          >
            {item.name}
          </h3>
          <p 
            className="text-sm mb-3"
            style={{ color: colors.charcoal }}
          >
            {item.description || 'Premium quality product'}
          </p>
          
          {/* Royal Badge */}
          <div className="flex flex-wrap gap-2 mb-3 justify-center sm:justify-start">
            <span 
              className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
              style={{
                background: colors.paleGold,
                color: colors.darkGold,
                border: `1px solid ${colors.royalGold}`
              }}
            >
              <Crown size={12} />
              Royal Collection
            </span>
          </div>
        </div>
        
        {/* Price and Action */}
        <div className="flex flex-col items-center sm:items-end gap-3">
          <div 
            className="text-2xl font-bold"
            style={{ color: colors.royalGold }}
          >
            ${item.finalPrice ? item.finalPrice.toFixed(2) : item.price.toFixed(2)}
          </div>
          <button 
            onClick={() => onAddToCart(item.product_id)}
            className="flex items-center gap-2 font-medium px-5 py-2.5 rounded-lg transition-all duration-300"
            style={{
              background: colors.goldGradient,
              color: colors.richBlack,
              boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
              border: `1px solid ${colors.darkGold}`,
              fontFamily: "'Cinzel', serif"
            }}
          >
            <ShoppingCart size={18} />
            Acquire
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Component to display if wishlist is empty
const EmptyWishlist = () => (
  <div 
    className="rounded-xl shadow-sm p-10 text-center"
    style={{
      background: colors.lightParchment,
      border: colors.royalBorder,
      boxShadow: colors.deepShadow
    }}
  >
    <div className="flex justify-center mb-4">
      <div className="relative">
        <Heart 
          size={64} 
          style={{ 
            color: colors.paleGold,
            strokeWidth: 1 
          }} 
        />
        <X 
          size={24} 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ color: colors.silver }}
        />
      </div>
    </div>
    <h3 
      className="text-xl font-bold mb-2"
      style={{ 
        color: colors.richBlack,
        fontFamily: "'Cinzel', serif"
      }}
    >
      Your Royal Collection is empty
    </h3>
    <p 
      className="mb-6 max-w-md mx-auto"
      style={{ color: colors.charcoal }}
    >
      Items worthy of royalty will be saved here for your future consideration.
    </p>
    <Link 
      to="/shop" 
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors font-medium"
      style={{
        background: colors.goldGradient,
        color: colors.richBlack,
        boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
        border: `1px solid ${colors.darkGold}`,
        fontFamily: "'Cinzel', serif"
      }}
    >
      <ShoppingCart size={18} />
      Explore Royal Wares
    </Link>
  </div>
);

// Main Wishlist component
const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      try {
        const parsedWishlist = JSON.parse(storedWishlist);
        setWishlistItems(parsedWishlist);
      } catch (error) {
        console.error("Error parsing wishlist:", error);
        setWishlistItems([]);
      }
    }
  }, []);

  const handleRemove = (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.product_id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    
    toast.success('Removed from Royal Collection', {
      style: {
        background: colors.lightParchment,
        color: colors.richBlack,
        border: colors.royalBorder,
        fontFamily: "'Cinzel', serif"
      },
      icon: '👑'
    });
  };

  const handleAddToCart = (id) => {
    const product = wishlistItems.find(item => item.product_id === id);
    let existingCart = JSON.parse(localStorage.getItem('cart') || []);
    
    if (existingCart.some(item => item.product_id === id)) {
      existingCart = existingCart.map(item => 
        item.product_id === id 
          ? {...item, quantity: item.quantity + 1} 
          : item
      );
    } else {
      existingCart.push({...product, quantity: 1});
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    toast.success('Added to Royal Cart', {
      style: {
        background: colors.goldGradient,
        color: colors.richBlack,
        border: `1px solid ${colors.darkGold}`,
        fontFamily: "'Cinzel', serif"
      },
      icon: '🛍️'
    });
  };

  const handleAddAllToCart = () => {
    let existingCart = JSON.parse(localStorage.getItem('cart') || []);
    
    wishlistItems.forEach(item => {
      const existingItem = existingCart.find(cartItem => cartItem.product_id === item.product_id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        existingCart.push({...item, quantity: 1});
      }
    });
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    toast.success('All items added to Royal Cart', {
      style: {
        background: colors.goldGradient,
        color: colors.richBlack,
        border: `1px solid ${colors.darkGold}`,
        fontFamily: "'Cinzel', serif"
      },
      icon: '👑'
    });
  };

  return (
    <div 
      className="min-h-screen font-sans"
      style={{ 
        background: `radial-gradient(circle at center, ${colors.parchment} 0%, ${colors.lightParchment} 100%)`
      }}
    >
      <div className="container mx-auto py-12 px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10 relative">
          <div className="inline-block relative">
            <Heart 
              size={28} 
              className="absolute -top-6 -right-6"
              style={{ 
                color: colors.royalGold,
                strokeWidth: 1.5 
              }} 
            />
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ 
                color: colors.richBlack,
                fontFamily: "'Cinzel', serif",
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
            >
              Royal Collection
            </h2>
          </div>
          <p 
            className="mt-2"
            style={{ color: colors.charcoal }}
          >
            {wishlistItems.length} treasures saved for your majesty
          </p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="space-y-6">
            {/* Render wishlist items */}
            {wishlistItems.map((item) => (
              <WishlistItem
                key={item.product_id}
                item={item}
                onRemove={handleRemove}
                onAddToCart={handleAddToCart}
              />
            ))}

            {/* Footer Actions */}
            <div className="flex justify-between items-center mt-8 flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 font-medium transition-colors"
                style={{ 
                  color: colors.royalGold,
                  fontFamily: "'Cinzel', serif"
                }}
              >
                <ArrowLeft size={18} />
                Continue Royal Shopping
              </Link>
              <button 
                onClick={handleAddAllToCart}
                className="inline-flex items-center gap-2 font-medium px-5 py-2.5 rounded-lg transition-colors"
                style={{
                  background: colors.goldGradient,
                  color: colors.richBlack,
                  boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
                  border: `1px solid ${colors.darkGold}`,
                  fontFamily: "'Cinzel', serif"
                }}
              >
                <ShoppingCart size={18} />
                Acquire All
              </button>
            </div>
          </div>
        ) : (
          <EmptyWishlist />
        )}
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');
        
        body {
          font-family: 'Marcellus', serif;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-thumb {
          background-color: ${colors.royalGold};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background-color: ${colors.parchment};
        }
      `}</style>
    </div>
  );
};

export default Wishlist;