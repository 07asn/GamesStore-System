import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useSearchParams } from "react-router-dom";
import { Search, ShoppingBag, Filter, ChevronDown, Heart, Tag, Star, Gamepad2, Crown } from 'lucide-react';
import ProductCard from '../components/shop/ProductCard';

// Enhanced Royal Gold color scheme for light mode
const COLORS = {
  gold: '#D4AF37',
  brightGold: '#FFD700',
  darkGold: '#996515',
  goldGradient: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)',
  lightGold: 'rgba(212, 175, 55, 0.1)',
  black: '#0A0A0A',
  lightGray: '#E5E5E5',
  mediumGray: '#6D6D6D',
  darkGray: '#2A2A2A',
  offWhite: '#F9F9F9',
  white: '#FFFFFF',
  glowGold: '0 0 15px rgba(212, 175, 55, 0.3)'
};

const FilterBar = ({ categories, onFilterChange, onSortChange, onSearch, activeCategory }) => {
  return (
    <div className="rounded-xl p-6 mb-8" style={{
      backgroundColor: COLORS.white,
      border: `1px solid ${COLORS.lightGray}`,
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    }}>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-auto md:flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search games..."
            className="w-full pl-10 pr-4 py-3 rounded-lg transition-all focus:ring-2 focus:ring-offset-2"
            style={{
              border: `1px solid ${COLORS.lightGray}`,
              backgroundColor: COLORS.white,
              color: COLORS.darkGray,
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = COLORS.gold;
              e.target.style.boxShadow = COLORS.glowGold;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = COLORS.lightGray;
              e.target.style.boxShadow = 'none';
            }}
            onChange={(e) => onSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2"
            size={18}
            style={{ color: COLORS.gold }} />
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Category Filter */}
          <div className="relative group w-full sm:w-auto">
            <select
              aria-label="Category"
              className="appearance-none w-full rounded-lg pl-10 pr-10 py-3 cursor-pointer transition-all focus:ring-2 focus:ring-offset-2"
              style={{
                border: `1px solid ${COLORS.lightGray}`,
                backgroundColor: COLORS.white,
                color: COLORS.darkGray,
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = COLORS.gold;
                e.target.style.boxShadow = COLORS.glowGold;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = COLORS.lightGray;
                e.target.style.boxShadow = 'none';
              }}
              onChange={(e) => onFilterChange(e.target.value)}
              value={activeCategory}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
            <Gamepad2 className="absolute left-3 top-1/2 transform -translate-y-1/2"
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
              className="appearance-none w-full rounded-lg pl-10 pr-10 py-3 cursor-pointer transition-all focus:ring-2 focus:ring-offset-2"
              style={{
                border: `1px solid ${COLORS.lightGray}`,
                backgroundColor: COLORS.white,
                color: COLORS.darkGray,
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = COLORS.gold;
                e.target.style.boxShadow = COLORS.glowGold;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = COLORS.lightGray;
                e.target.style.boxShadow = 'none';
              }}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="latest">Latest Releases</option>
              <option value="low-price">Price: Low to High</option>
              <option value="high-price">Price: High to Low</option>
              <option value="best-seller">Best Sellers</option>
              <option value="top-rated">Top Rated</option>
            </select>
            <Star className="absolute left-3 top-1/2 transform -translate-y-1/2"
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
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromQuery = searchParams.get('category') || 'all';

  useEffect(() => {
    setActiveCategory(categoryFromQuery);
  }, [categoryFromQuery]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/products'),
          axios.get('http://localhost:5000/api/categories/active')
        ]);

        setAllProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    let result = [...allProducts];

    // Apply filters
    if (activeCategory !== 'all') {
      result = result.filter(product => {
        const productCategoryId =
          product.category_id ||
          product.categoryId ||
          (product.category && (product.category.category_id || product.category.categoryId));
        return Number(productCategoryId) === Number(activeCategory);
      });
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    switch (sortOption) {
      case 'latest':
        result.sort((a, b) => new Date(b.release_date || b.created_at) - new Date(a.release_date || a.created_at));
        break;
      case 'low-price':
        result.sort((a, b) => (a.discounted_price || a.price) - (b.discounted_price || b.price));
        break;
      case 'high-price':
        result.sort((a, b) => (b.discounted_price || b.price) - (a.discounted_price || a.price));
        break;
      case 'best-seller':
        result.sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0));
        break;
      case 'top-rated':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.is_featured || 0) - (a.is_featured || 0) || b.product_id - a.product_id);
    }

    setFilteredProducts(result);
  }, [allProducts, activeCategory, searchQuery, sortOption, isLoading]);

  const handleFilterChange = (value) => {
    setActiveCategory(value);
    const newSearchParams = new URLSearchParams(searchParams);
    if (value === 'all') {
      newSearchParams.delete('category');
    } else {
      newSearchParams.set('category', value);
    }
    setSearchParams(newSearchParams);
  };

  const getCategoryName = () => {
    if (activeCategory === 'all') return 'All Games';
    const category = categories.find(c => Number(c.category_id) === Number(activeCategory));
    return category ? `${category.name} Games` : 'Selected Games';
  };

  return (
    <div style={{
      backgroundColor: COLORS.offWhite,
      minHeight: '100vh',
      backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.03) 0%, transparent 100%)'
    }}>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown size={24} style={{ color: COLORS.gold }} />
            <span className="text-sm font-medium tracking-wider" style={{ color: COLORS.gold }}>
              ROYAL GAMING COLLECTION
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{
            color: COLORS.black,
            fontFamily: "'Cinzel', serif"
          }}>
            Discover <span style={{
              background: COLORS.goldGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Premium Games</span>
          </h1>
          <div className="w-24 h-1 mx-auto mb-6 rounded-full" style={{
            background: COLORS.goldGradient,
            boxShadow: COLORS.glowGold
          }}></div>
          <p style={{ color: COLORS.mediumGray }} className="max-w-2xl mx-auto text-lg">
            Curated selection of the finest games worthy of your collection
          </p>
        </div>

        <FilterBar
          categories={categories}
          onFilterChange={handleFilterChange}
          onSortChange={setSortOption}
          onSearch={setSearchQuery}
          activeCategory={activeCategory}
        />

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold" style={{
              color: COLORS.black,
              fontFamily: "'Cinzel', serif"
            }}>
              {getCategoryName()}
              <span className="ml-3 text-sm py-1 px-3 rounded-full"
                style={{
                  backgroundColor: COLORS.lightGold,
                  color: COLORS.darkGold,
                  border: `1px solid ${COLORS.gold}`
                }}>
                {filteredProducts.length} items
              </span>
            </h2>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 rounded-full mb-4" style={{
                  backgroundColor: COLORS.lightGold,
                  border: `2px solid ${COLORS.gold}`
                }}></div>
                <div style={{ color: COLORS.mediumGray }}>Loading royal collection...</div>
              </div>
            </div>
          )}

          {error && (
            <div className="px-4 py-3 rounded-lg text-center" style={{
              backgroundColor: COLORS.white,
              border: `1px solid ${COLORS.gold}`,
              color: COLORS.darkGray,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <div className="flex items-center justify-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: COLORS.gold,
                    color: COLORS.white
                  }}>
                  !
                </div>
                {error}
              </div>
            </div>
          )}

          {!isLoading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-20 rounded-xl" style={{
              backgroundColor: COLORS.white,
              border: `1px solid ${COLORS.lightGray}`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <div className="text-6xl mb-4" style={{ color: COLORS.lightGold }}>🎮</div>
              <h3 className="text-xl font-medium mb-2" style={{ color: COLORS.black }}>No games found</h3>
              <p className="mb-6 max-w-md mx-auto" style={{ color: COLORS.mediumGray }}>
                Your royal search didn't yield any results. Try different filters or search terms.
              </p>
              <button
                className="px-6 py-2 rounded-lg font-medium transition-all hover:transform hover:-translate-y-0.5"
                style={{
                  background: COLORS.goldGradient,
                  color: COLORS.black,
                  border: `1px solid ${COLORS.darkGold}`,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                  setSearchParams({});
                }}
              >
                Show All Games
              </button>
            </div>
          )}

          {!isLoading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.product_id}
                  product_id={product.product_id}
                  name={product.name}
                  price={product.price}
                  discounted_price={product.discounted_price}
                  productImage={product.images?.[0] || '/img/default-game.jpg'}
                  colors={{
                    primary: COLORS.gold,
                    primaryLight: COLORS.lightGold,
                    primaryDark: COLORS.darkGold,
                    secondary: COLORS.white,
                    dark: COLORS.black,
                    light: COLORS.white,
                    goldGradient: COLORS.goldGradient
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Marcellus&display=swap');
        
        body {
          font-family: 'Marcellus', serif;
        }
        
        select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23D4AF37'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1rem;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${COLORS.goldGradient};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${COLORS.offWhite};
        }
      `}</style>
    </div>
  );
};

export default ShopPage;