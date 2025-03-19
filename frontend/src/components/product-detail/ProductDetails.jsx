import React from 'react';
import { FaTruck } from 'react-icons/fa';

const ProductDetails = ({ product }) => {
  // Check if the product is loaded
  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, price, discounted_price, description, delivery_type, stock, platform, reviews_count, tags } = product;

  const finalPrice = discounted_price ? parseFloat(discounted_price) : parseFloat(price);

  return (
    <div>
      {/* Product Name */}
      <h1 className="text-2xl font-bold mb-3">{name}</h1>

      {/* Price Section */}
      <div className="mb-3 flex items-center">
        <span className="text-xl mr-2">JD {finalPrice.toFixed(2)}</span>
        {discounted_price && (
          <span className="text-gray-500 line-through">JD {parseFloat(price).toFixed(2)}</span>
        )}
        {discounted_price && (
          <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
            {((1 - finalPrice / parseFloat(price)) * 100).toFixed(0)}% OFF
          </span>
        )}
      </div>

      {/* Delivery Type */}
      <div className="mb-4">
        {delivery_type && (
          <div className="flex items-center mb-2">
            <FaTruck className="text-blue-500 mr-2" />
            <span>{delivery_type}</span>
          </div>
        )}
      </div>

      {/* Platform */}
      {platform && (
        <div className="mb-4">
          <span className="font-semibold">Platform:</span> {platform}
        </div>
      )}

      {/* Reviews Section */}
      <div className="mb-3 flex items-center">
        <div className="flex text-yellow-500 mr-2">
          {/* Assuming you have a way to display star ratings */}
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half-alt"></i>
        </div>
        <span className="text-gray-500">({reviews_count} reviews)</span>
      </div>

      {/* Product Description */}
      <p className="mb-4">{description}</p>

      {/* Quantity Selection */}
      <div className="mb-4 flex items-center">
        <label className="mr-2">Quantity:</label>
        <select className="border border-gray-300 rounded p-1 w-auto">
          {[...Array(stock)].map((_, idx) => (
            <option key={idx} value={idx + 1}>
              {idx + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <span className="block text-gray-600">
          <strong>Tags:</strong>{' '}
          {tags && tags.map((tag, index) => (
            <a key={index} href="#" className="text-gray-500 hover:underline">
              {tag}
            </a>
          ))}
        </span>
      </div>

      {/* Actions */}
      <div className="grid gap-2">
        <button className="py-2 px-4 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500">
          Add to Cart
        </button>
        <button className="py-2 px-4 border border-gray-300 rounded hover:bg-red-200 flex items-center justify-center">
          <i className="far fa-heart mr-2"></i> Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
