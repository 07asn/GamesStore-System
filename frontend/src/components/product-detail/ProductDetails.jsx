import React, { useState } from 'react';
import {
  FaTruck, FaHeart, FaShoppingCart, FaRegStar, FaStar, FaStarHalfAlt, FaCheck,
  FaDesktop, FaMemory, FaMicrochip, FaHdd, FaWindows, FaGamepad, FaInfoCircle,
  FaGlobe, FaCalendar, FaBuilding, FaGamepad as FaGamepadAlt
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';


const styles = {
  container: "bg-white rounded-lg p-6 max-w-xl shadow-sm hover:shadow-md transition-shadow duration-300",
  header: "space-y-3 mb-4",
  title: "text-2xl font-bold text-gray-800 leading-tight line-clamp-2",
  platformBadge: "px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm",
  ratingContainer: "flex items-center space-x-2",
  priceContainer: "flex items-center space-x-3 mb-4",
  currentPrice: "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#DFBF00] to-[#FFDF00]",
  originalPrice: "text-sm text-gray-500 line-through",
  discountBadge: "px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 animate-pulse",
  stockInfo: "flex items-center text-sm font-medium",
  deliveryInfo: "flex items-center bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg shadow-sm",
  tabContainer: "border-b border-gray-200 mb-6",
  tabButton: (isActive) => `pb-2 px-4 text-sm font-medium transition-all duration-200 ${isActive
    ? 'border-b-2 border-[#DFBF00] text-[#DFBF00] scale-105'
    : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
    }`,
  contentBox: "bg-gray-50 rounded-lg p-4 mb-6",
  featureCard: "flex items-start space-x-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200",
  featureIcon: "text-[#DFBF00] text-lg mt-1",
  requirementsList: "space-y-3 bg-white rounded-lg p-4 shadow-sm",
  requirementItem: "flex items-center space-x-2 text-gray-700",
  detailsGrid: "grid grid-cols-2 gap-4",
  detailItem: "flex justify-between items-center bg-white p-3 rounded-lg shadow-sm",
  actionButton: (isPrimary) => `
    flex-1 flex items-center justify-center px-6 py-3 rounded-lg
    text-sm font-medium transition-all duration-200
    ${isPrimary
      ? 'bg-gradient-to-r from-[#DFBF00] to-[#FFDF00] text-white hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
      : 'border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#DFBF00]'}
  `
};

const ProductDetails = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  // Check if the product is loaded
  if (!product) {
    return (
      <div className="animate-pulse p-4 rounded-lg shadow-md space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-20 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  const { name, price, discounted_price, description, delivery_type, stock, platform, reviews_count, tags, avgRating, productImage, product_id } = product;

  const finalPrice = discounted_price ? parseFloat(discounted_price) : parseFloat(price);
  const discount = discounted_price ? ((1 - finalPrice / parseFloat(price)) * 100).toFixed(0) : 0;
  const isInStock = stock > 0;
  const ratingValue = typeof avgRating === 'number' ? avgRating : parseFloat(avgRating) || 0;

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          if (star <= Math.floor(rating)) {
            return <FaStar key={star} className="text-yellow-400 text-sm" />;
          } else if (star === Math.ceil(rating) && !Number.isInteger(rating)) {
            return <FaStarHalfAlt key={star} className="text-yellow-400 text-sm" />;
          }
          return <FaRegStar key={star} className="text-yellow-400 text-sm" />;
        })}
      </div>
    );
  };

  const renderSystemRequirements = () => (
    <div className={styles.requirementsList}>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800 border-b pb-2">Minimum</h4>
          <ul className="space-y-3">
            <li className={styles.requirementItem}>
              <FaWindows className="text-blue-500" />
              <span>Windows 10 64-bit</span>
            </li>
            <li className={styles.requirementItem}>
              <FaMicrochip className="text-blue-500" />
              <span>Intel Core i5-6600K</span>
            </li>
            <li className={styles.requirementItem}>
              <FaMemory className="text-blue-500" />
              <span>8 GB RAM</span>
            </li>
            <li className={styles.requirementItem}>
              <FaHdd className="text-blue-500" />
              <span>50 GB Storage</span>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800 border-b pb-2">Recommended</h4>
          <ul className="space-y-3">
            <li className={styles.requirementItem}>
              <FaWindows className="text-blue-500" />
              <span>Windows 11 64-bit</span>
            </li>
            <li className={styles.requirementItem}>
              <FaMicrochip className="text-blue-500" />
              <span>Intel Core i7-8700K</span>
            </li>
            <li className={styles.requirementItem}>
              <FaMemory className="text-blue-500" />
              <span>16 GB RAM</span>
            </li>
            <li className={styles.requirementItem}>
              <FaHdd className="text-blue-500" />
              <span>100 GB SSD</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderKeyFeatures = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { icon: FaGamepad, title: "Immersive Gameplay", desc: "Experience stunning graphics and engaging storylines" },
        { icon: FaDesktop, title: "4K Resolution", desc: "Ultra HD graphics with ray tracing" },
        { icon: FaGamepadAlt, title: "Multiplayer Mode", desc: "Online and local co-op gameplay" },
        { icon: FaInfoCircle, title: "Regular Updates", desc: "New content and features" }
      ].map((feature, index) => (
        <div key={index} className={styles.featureCard}>
          <feature.icon className={styles.featureIcon} />
          <div>
            <h3 className="font-medium text-gray-800">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAdditionalInfo = () => (
    <div className={styles.detailsGrid}>
      {[
        { icon: FaCalendar, label: "Release Date", value: "2024" },
        { icon: FaBuilding, label: "Publisher", value: "Game Studio" },
        { icon: FaGamepad, label: "Genre", value: "Action, RPG" },
        { icon: FaGlobe, label: "Language", value: "Multiple" }
      ].map((detail, index) => (
        <div key={index} className={styles.detailItem}>
          <div className="flex items-center space-x-2 text-gray-600">
            <detail.icon className="text-[#DFBF00]" />
            <span>{detail.label}</span>
          </div>
          <span className="font-medium text-gray-800">{detail.value}</span>
        </div>
      ))}
    </div>
  );

  const addToCart = () => {
    const productToAdd = {
      product_id,
      name,
      price,
      discounted_price,
      productImage,
      finalPrice,
      quantity: 1,
    };

    let existingCart = [];
    try {
      const cartData = localStorage.getItem('cart');
      existingCart = cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error parsing cart data', error);
    }

    const productIndex = existingCart.findIndex(item => item.product_id === productToAdd.product_id);

    if (productIndex >= 0) {
      existingCart[productIndex].quantity += 1;
      toast.success(`${name} quantity increased!`, {
        duration: 2000,
        className: 'bg-green-500 text-white',
      });
    } else {
      existingCart.push(productToAdd);
      toast.success(`Added to cart!`, {
        duration: 2000,
        className: 'bg-green-500 text-white',
      });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
  };

  const addToWishlist = () => {
    const productToAdd = {
      product_id,
      name,
      price,
      discounted_price,
      productImage,
      finalPrice,
    };

    let existingWishlist = [];
    try {
      const wishlistData = localStorage.getItem('wishlist');
      existingWishlist = wishlistData ? JSON.parse(wishlistData) : [];
    } catch (error) {
      console.error('Error parsing wishlist data', error);
    }

    if (existingWishlist.some(item => item.product_id === productToAdd.product_id)) {
      toast.error(`Already in wishlist`, {
        duration: 2000,
        className: 'bg-red-500 text-white',
      });
      return;
    }

    existingWishlist.push(productToAdd);
    localStorage.setItem('wishlist', JSON.stringify(existingWishlist));
    toast.success(`Added to wishlist!`, {
      duration: 2000,
      className: 'bg-green-500 text-white',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="flex items-center justify-between">
          <h1 className={styles.title}>{name}</h1>
          {platform && (
            <span className={styles.platformBadge}>{platform}</span>
          )}
        </div>

        <div className={styles.ratingContainer}>
          {renderStars(ratingValue)}
          <span className="text-xs text-gray-600">
            {ratingValue.toFixed(1)} ({reviews_count || 0} reviews)
          </span>
        </div>
      </div>

      <div className={styles.priceContainer}>
        <span className={styles.currentPrice}>JD {finalPrice.toFixed(2)}</span>
        {discounted_price && (
          <>
            <span className={styles.originalPrice}>JD {parseFloat(price).toFixed(2)}</span>
            <span className={styles.discountBadge}>-{discount}%</span>
          </>
        )}
      </div>

      <div className="space-y-3 mb-6">
        <div className={styles.stockInfo}>
          {isInStock ? (
            <div className="text-green-600">
              <FaCheck className="inline mr-1" />
              <span>In Stock ({stock})</span>
            </div>
          ) : (
            <div className="text-red-600">Out of Stock</div>
          )}
        </div>

        {delivery_type && (
          <div className={styles.deliveryInfo}>
            <FaTruck className="text-blue-600 mr-2" />
            <span className="text-blue-800 font-medium">{delivery_type}</span>
          </div>
        )}
      </div>

      <div className={styles.tabContainer}>
        <nav className="flex space-x-6" aria-label="Product Information">
          {['description', 'features', 'requirements', 'additional'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={styles.tabButton(activeTab === tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      <div className={styles.contentBox}>
        {activeTab === 'description' && (
          <p className="text-gray-600 leading-relaxed">{description}</p>
        )}
        {activeTab === 'features' && renderKeyFeatures()}
        {activeTab === 'requirements' && renderSystemRequirements()}
        {activeTab === 'additional' && renderAdditionalInfo()}
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex space-x-3">
        <button
          className={styles.actionButton(true)}
          disabled={!isInStock}
          onClick={addToCart}
        >
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>
        <button
          className={styles.actionButton(false)}
          onClick={addToWishlist}
        >
          <FaHeart className="mr-2 text-red-500" />
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;