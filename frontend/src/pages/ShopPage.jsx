import React, { useState } from 'react';
import { Search, ShoppingBag, Filter, ChevronDown, Heart, Tag, Star } from 'lucide-react';
import ProductCard from '../components/shop/ProductCard'; // Adjust the path as needed

// Enhanced Hero Section
const HeroSection = () => {
  return (
    <section className="relative h-[400px] bg-cover bg-center flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center transform scale-110" 
        style={{ 
          backgroundImage: "url('https://source.unsplash.com/random/1600x800/?gaming,setup')",
          filter: "brightness(0.6)"
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Discover Your Next Gaming Adventure
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Exclusive deals, latest releases, and premium gaming experiences
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="#featured" 
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-indigo-500/30"
          >
            Featured Games
          </a>
          <a 
            href="#deals" 
            className="px-8 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium rounded-lg transition-colors border border-white/30"
          >
            Special Deals
          </a>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-100 to-transparent"></div>
    </section>
  );
};

// Filter Bar Component
const FilterBar = ({ onFilterChange, onSortChange, onSearch }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-auto md:flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search games..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Filters */}
          <div className="relative group w-full sm:w-auto">
            <select
              aria-label="Category"
              className="appearance-none w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-10 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="appearance-none w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-10 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
  // Sample product data
  const products = [
    {
      id: 1,
      title: 'Full Rim Aviator Eyeglasses',
      price: '2.60',
      discount: '3.00',
      salePercent: 10,
      productLink: 'product.html',
      image: 'https://source.unsplash.com/random/300x300/?glasses',
    },
    {
      id: 2,
      title: 'FC 25 Standard Edition',
      price: '14.99',
      discount: '59.50',
      salePercent: 75,
      productLink: '#',
      image: 'https://source.unsplash.com/random/300x300/?game',
    },
    {
      id: 3,
      title: 'Assassin\'s Creed Valhalla',
      price: '29.99',
      discount: '59.99',
      salePercent: 50,
      productLink: 'product.html',
      image: 'https://source.unsplash.com/random/300x300/?viking',
    },
    {
      id: 4,
      title: 'Cyberpunk 2077',
      price: '39.99',
      discount: '59.99',
      salePercent: 33,
      productLink: '#',
      image: 'https://source.unsplash.com/random/300x300/?cyberpunk',
    },
  ];

  // State for active category
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter and Sort handlers (would connect to actual filtering logic)
  const handleFilterChange = (value) => {
    console.log('Filter changed to:', value);
  };

  const handleSortChange = (value) => {
    console.log('Sort changed to:', value);
  };

  const handleSearch = (value) => {
    console.log('Search query:', value);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Filter Bar */}
        <FilterBar 
          onFilterChange={handleFilterChange} 
          onSortChange={handleSortChange}
          onSearch={handleSearch}
        />

        {/* Section Heading */}
        <section className="mb-8">
          <div className="text-center">
            <h3 className="text-2xl mt-2 mb-4">Games</h3>
          </div>
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((prod) => (
              <ProductCard key={prod.id} {...prod} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShopPage;
