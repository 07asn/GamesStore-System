import React from 'react';
import { FaTruck, FaHeart, FaShoppingCart, FaRegStar, FaStar, FaStarHalfAlt, FaCheck } from 'react-icons/fa';

const ProductDetails = ({ product }) => {
  // Check if the product is loaded
  if (!product) {
    return (
      <div className="animate-pulse p-6 rounded-lg shadow-md">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
        <div className="h-20 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  const { name, price, discounted_price, description, delivery_type, stock, platform, reviews_count, tags, avgRating } = product;

  const finalPrice = discounted_price ? parseFloat(discounted_price) : parseFloat(price);
  const discount = discounted_price ? ((1 - finalPrice / parseFloat(price)) * 100).toFixed(0) : 0;
  const isInStock = stock > 0;
  
  // Convert avgRating to a number to fix the TypeError
  const ratingValue = typeof avgRating === 'number' ? avgRating : parseFloat(avgRating) || 0;

  // Function to render stars based on the avgRating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i < Math.floor(rating) + 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      {/* Product Name with Badge for Platform */}
      <div className="flex flex-wrap items-start justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-800 leading-tight">{name}</h1>
        {platform && (
          <span className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {platform}
          </span>
        )}
      </div>

      {/* Reviews Section */}
      <div className="flex items-center mb-6">
        <div className="flex mr-2">
          {renderStars(ratingValue)}
        </div>
        <span className="text-gray-600 text-sm font-medium">
          {ratingValue.toFixed(1)} ({reviews_count || 0} reviews)
        </span>
      </div>

      {/* Price Section with Discount Badge */}
      <div className="mb-6 flex flex-wrap items-center">
        <span className="text-3xl font-bold text-gray-900 mr-3">JD {finalPrice.toFixed(2)}</span>
        {discounted_price && (
          <>
            <span className="text-lg text-gray-500 line-through mr-3">JD {parseFloat(price).toFixed(2)}</span>
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              {discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* Availability Badge */}
      <div className="mb-4">
        {isInStock ? (
          <div className="flex items-center text-green-600">
            <FaCheck className="mr-2" />
            <span className="font-medium">In Stock ({stock} available)</span>
          </div>
        ) : (
          <div className="text-red-600 font-medium">Out of Stock</div>
        )}
      </div>

      {/* Delivery Info */}
      {delivery_type && (
        <div className="mb-6 flex items-center bg-blue-50 p-3 rounded-lg">
          <FaTruck className="text-blue-600 text-xl mr-3" />
          <div>
            <p className="font-medium text-blue-800">{delivery_type}</p>
            <p className="text-sm text-blue-600">Order now for fastest delivery</p>
          </div>
        </div>
      )}

      {/* Divider */}
      <hr className="my-6 border-gray-200" />

      {/* Product Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <a 
                key={index} 
                href="#" 
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Add to Cart Section */}
      <div className="mt-8">
        <div className="flex items-center mb-4">
          <label className="mr-3 font-medium text-gray-700">Quantity:</label>
          <div className="relative">
            <select className="appearance-none bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {[...Array(Math.min(stock || 1, 10))].map((_, idx) => (
                <option key={idx} value={idx + 1}>
                  {idx + 1}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
          <button 
            className="flex items-center justify-center px-6 py-3 bg-[#DFBF00] text-gray-50 font-bold rounded-lg hover:bg-[#FFDF00] transition-colors"
            disabled={!isInStock}
          >
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
          <button className="flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
            <FaHeart className="mr-2 text-red-500" />
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;