import React from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import product from '../../assets/product.jpg'; 

const ProductCard = ({
  name,
  price,
  discounted_price,
  productImage,
  product_id,
  onAddToCart,
}) => {

  const finalPrice = discounted_price ? parseFloat(discounted_price) : parseFloat(price);

  const link = `/products/${product_id}`;

  return (
    <div className="border border-gray-300 rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-105">
      {/* Card Image */}
      <div className="relative border-b border-gray-300 overflow-hidden rounded-t-lg">
        {/* Product Media */}
        <div className="relative">
          <Link to={link}> 
            <img
              src={productImage || product}
              alt={name}
              className="w-full object-cover transition-transform duration-300 transform hover:scale-105 filter hover:brightness-110"
            />
          </Link>
          {/* Favorite Button */}
          <Link
            to={link}
            title="Add to Favorites"
            className="absolute top-2 right-2 m-2 w-6 h-6 rounded-full text-white text-base flex items-center justify-center transition-all shadow hover:bg-red-300 hover:text-red-600 hover:scale-110"
          >
            <FaHeart />
          </Link>
        </div>
      </div>
      {/* Card Body */}
      <div className="text-center p-5 bg-gray-100 rounded-b-lg">
        <h6 className="text-base">
          <Link
            to={link}
            className="no-underline text-gray-600 hover:text-yellow-400 hover:underline"
          >
            {name}
          </Link>
        </h6>
        <div className="mt-2 leading-normal text-lg font-bold text-red-500">
          JD {finalPrice.toFixed(2)}
          {discounted_price && (
            <del className="text-sm text-gray-500 ml-2">
              JD {parseFloat(price).toFixed(2)} 
            </del>
          )}
        </div>
        <div className="mt-2">
          <button
            onClick={onAddToCart}
            title="Add to Cart"
            className="inline-block py-2 px-5 bg-gray-200 text-gray-800 w-11/12 text-sm uppercase transition-all transform hover:bg-yellow-400 hover:text-black hover:-translate-y-1 hover:shadow-lg"
          >
            <FaShoppingCart className="inline mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
