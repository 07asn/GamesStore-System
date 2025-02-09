// src/pages/ProductDetailPage.jsx
import React from 'react';
import ImageCarousel from '../components/product-detail/ImageCarousel';
import ProductDetails from '../components/product-detail/ProductDetails';
import ReviewsSection from '../components/product-detail/ReviewsSection';
import SuggestionProducts from '../components/product-detail/SuggestionProducts';

const ProductDetailPage = () => {
  return (
    <div className="container mx-auto py-5 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Product Images Slider */}
        <div className="md:w-1/2">
          <ImageCarousel />
        </div>
        {/* Right: Product Details */}
        <div className="md:w-1/2">
          <ProductDetails />
        </div>
      </div>
      {/* Reviews Section */}
      <ReviewsSection />
      {/* Suggestion Products Section */}
      <SuggestionProducts />
    </div>
  );
};

export default ProductDetailPage;
