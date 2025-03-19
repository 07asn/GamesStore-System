// src/components/ProductDetails.jsx
import React from 'react';
import { FaTruck } from 'react-icons/fa';

const ProductDetails = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Red Dead Redemption 2</h1>
      <div className="mb-3 flex items-center">
        <span className="text-xl mr-2">JD 12.00</span>
        <span className="text-gray-500 line-through">JD 15.00</span>
        <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-xs">20% OFF</span>
      </div>
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <FaTruck className="text-blue-500 mr-2" />
          <span>Instant Delivery</span>
        </div>
      </div>
      <div className="mb-3 flex items-center">
        <div className="flex text-yellow-500 mr-2">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half-alt"></i>
        </div>
        <span className="text-gray-500">(128 reviews)</span>
      </div>
      <p className="mb-4">
        Open world game and missions - Adventures and it is the best-selling game in the world.
        This is a 0 hours played fresh steam account with the game.
        You can change any info of the account, like: steam password, steam email.
      </p>
      {/* Type Selection */}
      <div className="mb-4">
        <h6 className="mb-2 font-semibold">Type</h6>
        <div className="flex gap-2">
          <label className="cursor-pointer border border-yellow-400 text-yellow-400 py-1 px-3 rounded hover:bg-yellow-400 hover:text-black">
            <input type="radio" name="type" value="steam" className="hidden" defaultChecked /> Steam
          </label>
          <label className="cursor-pointer border border-yellow-400 text-yellow-400 py-1 px-3 rounded hover:bg-yellow-400 hover:text-black">
            <input type="radio" name="type" value="rockstar" className="hidden" /> Rockstar
          </label>
        </div>
      </div>
      {/* Quantity */}
      <div className="mb-4 flex items-center">
        <label className="mr-2">Quantity:</label>
        <select className="border border-gray-300 rounded p-1 w-auto">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      {/* Tags */}
      <div className="mb-4">
        <span className="block text-gray-600">
          <strong>Tags:</strong> <a href="#" className="text-gray-500 hover:underline">Games</a>, <a href="#" className="text-gray-500 hover:underline">Online</a>.
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
