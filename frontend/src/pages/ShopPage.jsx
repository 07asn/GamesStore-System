import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ShoppingBag, Filter, ChevronDown, Heart, Tag, Star } from 'lucide-react';
import ProductCard from '../components/shop/ProductCard';

// Filter Bar Component
const FilterBar = ({ onFilterChange, onSortChange, onSearch }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-auto md:flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search games..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Filters */}
          <div className="relative group w-full sm:w-auto">
            <select
              aria-label="Category"
              className="appearance-none w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-10 py-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition-colors"
              onChange={(e) => onFilterChange && onFilterChange(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="steam-online">Steam Online</option>
              <option value="steam-offline">Steam Offline</option>
              <option value="action">Action Games</option>
              <option value="adventure">Adventure</option>
              <option value="sports">Sports</option>
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
          </div>
          
          {/* Sort */}
          <div className="relative group w-full sm:w-auto">
            <select
              aria-label="Sort products"
              className="appearance-none w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-10 py-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition-colors"
              onChange={(e) => onSortChange && onSortChange(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="latest">Latest</option>
              <option value="low-price">Price: Low to High</option>
              <option value="high-price">Price: High to Low</option>
              <option value="best-seller">Best Sellers</option>
            </select>
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ShopPage = () => {
  // State for products
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
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Game Store</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the latest and greatest games for your collection
          </p>
        </div>
        
        {/* Filter Bar */}
        <FilterBar 
          onFilterChange={handleFilterChange} 
          onSortChange={handleSortChange}
          onSearch={handleSearch}
        />

        {/* Section Heading */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {activeCategory === 'all' ? 'All Games' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Games`}
            </h2>
            <span className="text-gray-500">{products.length} products</span>
          </div>
          
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-blue-200 rounded-full mb-2"></div>
                <div className="text-gray-500">Loading games...</div>
              </div>
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && !error && products.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-gray-400 text-6xl mb-4">🎮</div>
              <h3 className="text-xl font-medium text-gray-700 mb-1">No games found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setActiveCategory('all')}
              >
                View all games
              </button>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((prod) => (
                <ProductCard key={prod.product_id} {...prod} />
              ))}
            </div>
          )}

        </section>
      </div>
    </div>
  );
};

export default ShopPage;