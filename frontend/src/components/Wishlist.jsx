import React from 'react';
import { Heart, X, ShoppingCart, ArrowLeft } from 'lucide-react';
import product1 from '../assets/product-5.jpg';
import product2 from '../assets/product.jpg';

const WishlistItem = ({ item, onRemove, onAddToCart }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
    <div className="flex flex-col sm:flex-row">
      {/* Product Image with gradient overlay */}
      <div className="sm:w-1/5 h-48 sm:h-auto relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex-1 flex flex-col sm:flex-row items-center sm:items-start gap-4 relative">
        {/* Remove button */}
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-red-500 transition-all duration-200"
          aria-label="Remove from wishlist"
        >
          <X size={16} />
        </button>
        
        {/* Product Details */}
        <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h3>
          <p className="text-gray-500 text-sm mb-3">{item.subtitle}</p>
          
          {/* Tags/Badges */}
          <div className="flex flex-wrap gap-2 mb-3 justify-center sm:justify-start">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">Popular</span>
            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">In Stock</span>
          </div>
        </div>
        
        {/* Price and Action */}
        <div className="flex flex-col items-center sm:items-end gap-3">
          <div className="text-2xl font-bold text-gray-900">{item.price}</div>
          <button 
            onClick={() => onAddToCart(item.id)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm hover:shadow"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
);

const EmptyWishlist = () => (
  <div className="bg-white rounded-xl shadow-sm p-10 text-center">
    <div className="flex justify-center mb-4">
      <div className="relative">
        <Heart size={64} className="text-gray-200" />
        <X size={24} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
    <h3 className="text-xl font-bold mb-2">Your wishlist is empty</h3>
    <p className="text-gray-500 mb-6 max-w-md mx-auto">Items added to your wishlist will be saved here for you to revisit later.</p>
    <a 
      href="/shop" 
      className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
    >
      <ShoppingCart size={18} />
      Explore Products
    </a>
  </div>
);

const Wishlist = () => {
    const wishlistItems = [
        {
            id: 1,
            image: product1,
            title: 'Spiderman Remastered',
            subtitle: 'Steam offline',
            price: 'JD 2.99',
        },
        {
            id: 2,
            image: product2,
            title: 'Red Dead Redemption 2',
            subtitle: 'Steam Online',
            price: 'JD 12.00',
        },
    ];

    // Handlers
    const handleRemove = (id) => {
        console.log('Remove item with id:', id);
    };

    const handleAddToCart = (id) => {
        console.log('Add to cart item with id:', id);
    };

    const handleContinueShopping = () => {
        console.log('Continue shopping');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-gray-100 font-sans">
            {/* Main Container */}
            <div className="container mx-auto py-12 px-4 max-w-5xl">
                {/* Header with animation */}
                <div className="text-center mb-10 relative">
                    <div className="inline-block relative">
                        <Heart size={28} className="text-pink-500 absolute -top-6 -right-6 opacity-75" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">My Wishlist</h2>
                    </div>
                    <p className="text-gray-500 mt-2">{wishlistItems.length} items saved for later</p>
                </div>

                {wishlistItems.length > 0 ? (
                    <div className="space-y-6">
                        {/* Wishlist Items */}
                        {wishlistItems.map((item) => (
                            <WishlistItem
                                key={item.id}
                                item={item}
                                onRemove={handleRemove}
                                onAddToCart={handleAddToCart}
                            />
                        ))}

                        {/* Footer Actions */}
                        <div className="flex justify-between items-center mt-8 flex-wrap gap-4">
                            {/* Continue Shopping Button */}
                            <a
                                href="/shop"
                                onClick={handleContinueShopping}
                                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                            >
                                <ArrowLeft size={18} />
                                Continue Shopping
                            </a>
                            
                            {/* Add All to Cart (optional) */}
                            <button 
                                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm hover:shadow"
                                onClick={() => console.log('Add all to cart')}
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