// src/components/Categories.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader, AlertCircle, Crown, Gamepad2 } from 'lucide-react';
import CategoryCard from './CategoryCard';

// Match the consistent color scheme across components
const colors = {
  primary: '#FFDF00',
  primaryDark: '#DFBF00',
  background: '#FFFFFF',
  backgroundAlt: '#F8F9FA',
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    accent: '#DFBF00'
  },
  border: '#E5E7EB'
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories/active');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  if (loading) {
    return (
      <section className="min-h-[50vh] bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:32px_32px]"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-16 h-16 border-4 border-t-4 border-[#FFDF00] border-t-[#FFDF00] border-opacity-20 rounded-full animate-spin mb-6"></div>
            <p className="text-xl font-medium text-gray-700">Loading categories...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-[50vh] bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:32px_32px]"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg border border-[#FFDF00]/20 p-8 text-center">
            <AlertCircle className="w-12 h-12 text-[#FFDF00] mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-900">Unable to load categories</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-[#FFDF00] hover:bg-[#DFBF00] text-gray-900 rounded-lg transition-all duration-300 font-medium shadow-sm hover:shadow-md"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white relative overflow-hidden">
      {/* Hero Header */}
      <header className="relative py-20 bg-gradient-to-b from-[#1a1a1a] via-[#111111] to-black mb-16 overflow-hidden shadow-xl">
  {/* Decorative background grid */}
  <div className="absolute inset-0 bg-grid-black/[0.03] bg-[size:32px_32px] z-0"></div>

  {/* Container */}
  <div className="container mx-auto px-6 relative z-10">
    <div className="text-center space-y-6">
      {/* Tagline Badge */}
      <div className="inline-flex items-center justify-center px-4 py-2 bg-[#FFDF00]/15 backdrop-blur-sm rounded-full shadow-md">
        <Crown className="h-5 w-5 text-[#DFBF00] mr-2" />
        <span className="text-gray-100 font-semibold text-sm tracking-wide uppercase">
          Premium Collections
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-100 tracking-tight leading-tight">
        Browse Our Categories
      </h1>

      {/* Subtext */}
      <p className="text-lg md:text-xl text-[#DFBF00] max-w-2xl mx-auto font-medium">
        Discover our curated selection of premium gaming experiences
      </p>
    </div>
  </div>
</header>


      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.category_id}
              imageSrc={category.image_url}
              title={category.name}
              id={category.category_id}
            />
          ))}
        </motion.div>

        {categories.length === 0 && !loading && !error && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-medium mb-2 text-gray-900">No Categories Available</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Check back later for our curated gaming categories.
            </p>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl bg-[#FFDF00]/10 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl bg-[#DFBF00]/10 -z-10"></div>
    </section>
  );
};

export default Categories;
