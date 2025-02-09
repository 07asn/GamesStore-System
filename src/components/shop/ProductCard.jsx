import React from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import product from '../../assets/product.jpg'; // default product image

/**
 * Props:
 * - title: string — Product title.
 * - price: string — Product price.
 * - discount: string — (Optional) Discounted price.
 * - salePercent: number — (Optional) Sale percentage to show in badge.
 * - productImage: string — (Optional) Image URL; defaults to the imported product image.
 * - productLink: string — (Optional) URL to product details.
 * - onAddToCart: function — (Optional) Callback when "Add to Cart" is clicked.
 */
const ProductCard = ({
  title,
  price,
  discount,
  salePercent,
  productImage,
  productLink = '#',
  onAddToCart,
}) => {
  return (
    <div className="border border-gray-300 rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-105">
      {/* Card Image */}
      <div className="relative border-b border-gray-300 overflow-hidden rounded-t-lg">
        {/* Sale Badge */}
        {salePercent && (
          <div className="absolute top-2 left-2 z-10 text-xs font-bold uppercase shadow">
            <span className="bg-red-500 text-white px-2 py-1 rounded">{`Sale ${salePercent}%`}</span>
          </div>
        )}
        {/* Product Media */}
        <div className="relative">
          <a href={productLink}>
            <img
              src={productImage || product}
              alt={title}
              className="w-full object-cover transition-transform duration-300 transform hover:scale-105 filter hover:brightness-110"
            />
          </a>
          {/* Favorite Button */}
          <a
            href={productLink}
            title="Add to Favorites"
            className="absolute top-2 right-2 m-2 w-6 h-6 rounded-full text-white text-base flex items-center justify-center transition-all shadow hover:bg-red-300 hover:text-red-600 hover:scale-110"
          >
            <FaHeart />
          </a>
        </div>
      </div>
      {/* Card Body */}
      <div className="text-center p-5 bg-gray-100 rounded-b-lg">
        <h6 className="text-base">
          <a
            href={productLink}
            className="no-underline text-gray-600 hover:text-yellow-400 hover:underline"
          >
            {title}
          </a>
        </h6>
        <div className="mt-2 leading-normal text-lg font-bold text-red-500">
          JD {price}
          {discount && (
            <del className="text-sm text-gray-500 ml-2">
              JD {discount}
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
