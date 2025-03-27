import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Search, ShoppingBag, Filter, ChevronDown, Heart, Tag, Star } from 'lucide-react';
import ProductCard from '../components/shop/ProductCard';

// Color scheme
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

// Filter Bar Component
const FilterBar = ({ onFilterChange, onSortChange, onSearch }) => {
  return (
    <div className="rounded-xl shadow-md p-6 mb-8 border" style={{ 
      backgroundColor: COLORS.offWhite,
      borderColor: COLORS.lightGray
    }}>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-auto md:flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search games..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg transition-all"
            style={{ 
              borderColor: COLORS.lightGray,
              backgroundColor: 'white',
              color: COLORS.darkGray,
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.boxShadow = COLORS.glowGold}
            onBlur={(e) => e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'}
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" 
                  size={18} 
                  style={{ color: COLORS.gold }} />
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Filters */}
          <div className="relative group w-full sm:w-auto">
            <select
              aria-label="Category"
              className="appearance-none w-full border rounded-lg pl-10 pr-10 py-3 cursor-pointer transition-colors"
              style={{ 
                borderColor: COLORS.lightGray,
                backgroundColor: 'white',
                color: COLORS.darkGray,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.boxShadow = COLORS.glowGold}
              onBlur={(e) => e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'}
              onChange={(e) => onFilterChange && onFilterChange(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="steam-online">Steam Online</option>
              <option value="steam-offline">Steam Offline</option>
              <option value="action">Action Games</option>
              <option value="adventure">Adventure</option>
              <option value="sports">Sports</option>
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2" 
                    size={16} 
                    style={{ color: COLORS.gold }} />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" 
                         size={16} 
                         style={{ color: COLORS.gold }} />
          </div>
          
          {/* Sort */}
          <div className="relative group w-full sm:w-auto">
            <select
              aria-label="Sort products"
              className="appearance-none w-full border rounded-lg pl-10 pr-10 py-3 cursor-pointer transition-colors"
              style={{ 
                borderColor: COLORS.lightGray,
                backgroundColor: 'white',
                color: COLORS.darkGray,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.boxShadow = COLORS.glowGold}
              onBlur={(e) => e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'}
              onChange={(e) => onSortChange && onSortChange(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="latest">Latest</option>
              <option value="low-price">Price: Low to High</option>
              <option value="high-price">Price: High to Low</option>
              <option value="best-seller">Best Sellers</option>
            </select>
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2" 
                 size={16} 
                 style={{ color: COLORS.gold }} />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" 
                         size={16} 
                         style={{ color: COLORS.gold }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        console.log("Fetched products:", response.data);  // Log the fetched products
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const handleFilterChange = (value) => {
    console.log('Filter changed to:', value);
    setActiveCategory(value);
    // Implement filtering logic here
  };

  const handleSortChange = (value) => {
    console.log('Sort changed to:', value);
    // Implement sorting logic here
  };

  const handleSearch = (value) => {
    console.log('Search query:', value);
    // Implement search logic here
  };

  return (
    <div style={{ 
      background: `linear-gradient(to bottom, ${COLORS.offWhite}, #f0f0f0)`,
      minHeight: '100vh'
    }}>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2" style={{ color: COLORS.darkGray }}>
            Game <span style={{ color: COLORS.gold }}>Store</span>
          </h1>
          <div className="w-24 h-1 mx-auto mb-4" style={{ background: COLORS.goldGradient, boxShadow: COLORS.glowGold }}></div>
          <p style={{ color: COLORS.mediumGray }} className="max-w-2xl mx-auto">
            Discover the latest and greatest games for your collection
          </p>
        </div>
        
        <FilterBar 
          onFilterChange={handleFilterChange} 
          onSortChange={handleSortChange}
          onSearch={handleSearch}
        />

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold" style={{ color: COLORS.darkGray }}>
              {activeCategory === 'all' ? 'All Games' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Games`}
              <span className="ml-2 text-sm py-1 px-3 rounded-full" 
                    style={{ 
                      backgroundColor: COLORS.gold,
                      color: COLORS.black
                    }}>
                {products.length}
              </span>
            </h2>
          </div>
          
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 rounded-full mb-2" style={{ backgroundColor: COLORS.gold }}></div>
                <div style={{ color: COLORS.darkGray }}>Loading games...</div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="px-4 py-3 rounded-lg text-center border" style={{
              backgroundColor: '#FFF6E5',
              borderColor: COLORS.gold,
              color: COLORS.darkGray
            }}>
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 mr-2 text-center rounded-full flex items-center justify-center" 
                     style={{ backgroundColor: COLORS.gold, color: 'white' }}>!</div>
                {error}
              </div>
            </div>
          )}
          
          {!isLoading && !error && products.length === 0 && (
            <div className="text-center py-20 rounded-xl border" style={{
              backgroundColor: COLORS.offWhite,
              borderColor: COLORS.lightGray
            }}>
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-xl font-medium mb-1" style={{ color: COLORS.darkGray }}>No games found</h3>
              <p className="mb-4" style={{ color: COLORS.mediumGray }}>Try adjusting your search or filter criteria</p>
              <button 
                className="px-4 py-2 rounded-lg transition-all"
                style={{ 
                  background: COLORS.goldGradient,
                  color: COLORS.black,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseOver={(e) => e.target.style.boxShadow = COLORS.glowGold}
                onMouseOut={(e) => e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
                onClick={() => setActiveCategory('all')}
              >
                View all games
              </button>
            </div>
          )}

          {!isLoading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((prod) => (
                <ProductCard 
                  key={prod.product_id} 
                  product_id={prod.product_id}
                  name={prod.name}
                  price={prod.price}
                  discounted_price={prod.discounted_price}
                  productImage={prod.images[0]}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ShopPage;