// src/components/Categories.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader, AlertCircle } from 'lucide-react';
import CategoryCard from './CategoryCard';

// Define your color constants
const colors = {
  offWhite: '#F6F6F6',
  brightGold: '#FFDF00',
  darkGold: '#C1A811',
  lightGray: '#DBDBDB',
  darkGray: '#2A2A2A',
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories/all');
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
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{ backgroundColor: colors.offWhite, color: colors.darkGray }}
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
            style={{ backgroundColor: colors.brightGold, opacity: 0.15 }}
          />
          <div
            className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl"
            style={{ backgroundColor: colors.darkGold, opacity: 0.15 }}
          />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <Loader className="w-12 h-12 animate-spin mb-4" style={{ color: colors.brightGold }} />
            <p className="text-lg font-medium">Loading our curated categories...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{ backgroundColor: colors.offWhite, color: colors.darkGray }}
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
            style={{ backgroundColor: colors.brightGold, opacity: 0.15 }}
          />
          <div
            className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl"
            style={{ backgroundColor: colors.darkGold, opacity: 0.15 }}
          />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[300px] max-w-lg mx-auto p-8 rounded-lg" style={{ backgroundColor: '#ffffff', border: `1px solid ${colors.brightGold}` }}>
            <AlertCircle className="w-12 h-12 mb-4" style={{ color: colors.brightGold }} />
            <p className="text-lg font-semibold mb-2">Unable to load categories</p>
            <p className="mb-4" style={{ color: colors.darkGray }}>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2 rounded-full transition-all font-medium"
              style={{ backgroundColor: colors.brightGold, color: colors.darkGray }}
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor: colors.offWhite, color: colors.darkGray }}
    >
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: colors.brightGold, opacity: 0.15 }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl"
          style={{ backgroundColor: colors.darkGold, opacity: 0.15 }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 relative inline-block">
            Browse Our Collections
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full" style={{ background: `linear-gradient(135deg, ${colors.brightGold}, ${colors.darkGold})` }} />
          </h2>
          <p className="mt-6 text-lg" style={{ color: colors.mediumGray }}>
            Discover our premium selection of products curated for excellence.
          </p>
        </div>
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
      </div>
    </section>
  );
};

export default Categories;
