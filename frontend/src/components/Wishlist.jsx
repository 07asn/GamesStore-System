import React, { useState, useEffect } from 'react';
import { Heart, X, ShoppingCart, ArrowLeft, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Light theme color palette
const colors = {
  primary: '#FFDF00',
  primaryDark: '#DFBF00',
  light: '#FFFFFF',
  lightGray: '#F8F9FA',
  gray: {
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
  },
  accent: {
    yellow: '#FFDF00',
    yellowLight: 'rgba(255, 223, 0, 0.1)',
    yellowMedium: 'rgba(255, 223, 0, 0.3)',
  }
};

// Component to render each wishlist item
const WishlistItem = ({ item, onRemove, onAddToCart }) => (
  <div className="rounded-lg overflow-hidden group bg-white border border-gray-200 hover:border-[#FFDF00]/50 hover:shadow-lg transition-all duration-300">
    <div className="flex flex-col sm:flex-row">
      {/* Product Image */}
      <div className="sm:w-1/5 h-48 sm:h-auto relative overflow-hidden bg-gray-50">
        <img
          src={item.productImage || 'img/default-product.jpg'}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col sm:flex-row items-center sm:items-start gap-4 relative border-l border-gray-100">
        {/* Remove button */}
        <button
          onClick={() => onRemove(item.product_id)}
          className="p-2 rounded-full hover:bg-[#FFDF00]/10 text-gray-400 hover:text-[#DFBF00] transition-all duration-200"
          aria-label="Remove from wishlist"
        >
          <X size={16} />
        </button>

        {/* Product Details */}
        <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
          <h3 className="text-xl font-bold mb-1 text-gray-900">
            {item.name}
          </h3>
          <p className="text-sm mb-3 text-gray-500">
            {item.description || 'Premium quality product'}
          </p>

          {/* Badge */}
          <div className="flex flex-wrap gap-2 mb-3 justify-center sm:justify-start">
            <span className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 bg-[#FFDF00]/10 text-[#DFBF00] border border-[#FFDF00]/30">
              <Crown size={12} />
              Premium
            </span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex flex-col items-center sm:items-end gap-3">
          <div className="text-2xl font-bold text-[#DFBF00]">
            ${item.finalPrice ? item.finalPrice.toFixed(2) : item.price.toFixed(2)}
          </div>
          <button
            onClick={() => onAddToCart(item.product_id)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FFDF00] hover:bg-[#DFBF00] text-gray-900 font-medium transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Component to display if wishlist is empty
const EmptyWishlist = () => (
  <div className="rounded-lg bg-white border border-gray-200 p-10 text-center shadow-sm">
    <div className="flex justify-center mb-4">
      <div className="relative">
        <Heart
          size={64}
          className="text-[#FFDF00]/50"
          strokeWidth={1}
        />
        <X
          size={24}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-900">
      Your Wishlist is Empty
    </h3>
    <p className="mb-6 max-w-md mx-auto text-gray-500">
      Save your favorite games and products here for later.
    </p>
    <Link
      to="/shop"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FFDF00] hover:bg-[#DFBF00] text-gray-900 font-medium transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <ShoppingCart size={18} />
      Browse Store
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

    toast.success('Removed from wishlist', {
      style: {
        background: colors.light,
        color: colors.gray[900],
        border: '1px solid ' + colors.gray[200],
      },
    });
  };

  const handleAddToCart = (id) => {
    const product = wishlistItems.find(item => item.product_id === id);
    let existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    if (existingCart.some(item => item.product_id === id)) {
      existingCart = existingCart.map(item =>
        item.product_id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    toast.success('Added to cart', {
      style: {
        background: colors.light,
        color: colors.gray[900],
        border: '1px solid ' + colors.gray[200],
      },
    });
  };

  const handleAddAllToCart = () => {
    let existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    wishlistItems.forEach(item => {
      const existingItem = existingCart.find(cartItem => cartItem.product_id === item.product_id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        existingCart.push({ ...item, quantity: 1 });
      }
    });

    localStorage.setItem('cart', JSON.stringify(existingCart));

    toast.success('All items added to cart', {
      style: {
        background: colors.light,
        color: colors.gray[900],
        border: '1px solid ' + colors.gray[200],
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10 relative">
          <div className="inline-block relative">
            <Heart
              size={28}
              className="absolute -top-6 -right-6 text-[#FFDF00]"
              strokeWidth={1.5}
            />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              My Wishlist
            </h2>
          </div>
          <p className="mt-2 text-gray-500">
            {wishlistItems.length} items saved
          </p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="space-y-6">
            {/* Wishlist items */}
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
                className="inline-flex items-center gap-2 text-[#DFBF00] hover:text-[#FFDF00] transition-colors duration-200"
              >
                <ArrowLeft size={18} />
                Continue Shopping
              </Link>
              <button
                onClick={handleAddAllToCart}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FFDF00] hover:bg-[#DFBF00] text-gray-900 font-medium transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ShoppingCart size={18} />
                Add All to Cart
              </button>
            </div>
          </div>
        ) : (
          <EmptyWishlist />
        )}
      </div>
    </div>
  );
};

export default Wishlist;