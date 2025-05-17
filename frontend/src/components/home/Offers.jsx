import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const COLORS = {
  gold: '#DFBF00',
  brightGold: '#FFDF00',
  darkGold: '#C1A811',
  goldGradient: 'linear-gradient(135deg, #FFDF00, #C1A811)',
  black: '#000000',
  lightGray: '#DBDBDB',
  mediumGray: '#636362',
  darkGray: '#2A2A2A',
  offWhite: '#F6F6F6',
  glowGold: '0 0 15px rgba(223, 191, 0, 0.5)'
};

const Offers = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/featured');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const handleScrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setScrollLeft(sliderRef.current.scrollLeft);
    sliderRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    sliderRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    sliderRef.current.scrollLeft = scrollLeft - x;
  };

  const formatPrice = (price) => {
    if (!price) return "0.00";
    const number = typeof price === 'number' ? price : parseFloat(price);
    return number.toFixed(2);
  };

  const addToCart = (product) => {
    const finalPrice = product.discounted_price ? parseFloat(product.discounted_price) : parseFloat(product.price);
    const cartProduct = {
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      discounted_price: product.discounted_price,
      productImage: product.images[0]?.image_url || '/img/fallback-product.jpg',
      finalPrice,
      quantity: 1,
    };

    let existingCart = [];
    try {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        existingCart = JSON.parse(cartData);
      }
    } catch (error) {
      console.error('Error parsing cart data', error);
      existingCart = [];
    }

    const productIndex = existingCart.findIndex(item => item.product_id === cartProduct.product_id);

    if (productIndex >= 0) {
      existingCart[productIndex].quantity += 1;
    } else {
      existingCart.push(cartProduct);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    toast.success(`${product.name} has been added to the cart!`, {
      position: 'bottom-left',
      duration: 3000,
      style: {
        background: '#4caf50',
        color: '#fff',
        fontWeight: 'bold',
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-transparent border-yellow-500 rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-600">Loading featured products...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: COLORS.offWhite, color: COLORS.darkGray }}>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: COLORS.brightGold, opacity: 0.15 }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: COLORS.darkGold, opacity: 0.15 }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="relative mb-16 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl" style={{ background: 'linear-gradient(135deg, #FFDF00 0%, #DFBF00 100%)', opacity: '0.15' }} />
              <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl" style={{ background: 'linear-gradient(135deg, #DFBF00 0%, #FFDF00 100%)', opacity: '0.1' }} />
            </div>

            {/* Content Container */}
            <div className="text-center relative">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FFDF00]/0 via-[#FFDF00] to-[#FFDF00]/0"></div>

              {/* Main Title */}
              <div className="relative inline-block">
                <h2 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFDF00] to-[#DFBF00] drop-shadow-[0_0_10px_rgba(255,223,0,0.3)]">
                    Special Offers
                  </span>
                </h2>

                {/* Animated Underline */}
                <div className="h-1 w-full bg-gradient-to-r from-[#FFDF00]/0 via-[#FFDF00] to-[#FFDF00]/0 group-hover:w-full transition-all duration-300"></div>
              </div>

              {/* Subtitle with Icon */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#DFBF00] to-transparent"></div>
                <p className="text-gray-600 text-lg font-medium">
                  Discover Amazing Deals on Premium Games
                </p>
                <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#DFBF00] to-transparent"></div>
              </div>

              {/* Additional Description */}
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                Limited time offers on top-tier digital experiences. Don't miss out on these exclusive deals!
              </p>
            </div>
          </div>

          <div className="relative group">
            <button onClick={handleScrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#DFBF00] w-12 h-12 flex items-center justify-center shadow-xl opacity-90 hover:opacity-100 transition-all duration-300 -ml-6 hover:-translate-x-1 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#DFBF00] w-12 h-12 flex items-center justify-center shadow-xl opacity-90 hover:opacity-100 transition-all duration-300 -mr-6 hover:translate-x-1 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div ref={sliderRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onMouseMove={handleMouseMove} className="offers-slider overflow-x-auto flex space-x-6 pb-8 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', cursor: 'grab' }}>
              {featuredProducts.map((product) => (
                <div key={product.product_id} className="offers-card z-0 min-w-[350px] max-w-[450px] min-h-[500px] relative flex flex-col justify-between items-center overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-300 ease hover:-translate-y-2 hover:shadow-xl flex-shrink-0 bg-white">
                  <div className="absolute top-4 left-4 bg-red-100 text-black text-sm py-2 px-4 rounded-lg font-bold z-10 shadow-md border border-red-200">
                    <div className="absolute -left-1 top-3 w-2 h-6 bg-red-500 transform -skew-x-12"></div>
                    <span className="relative z-10">75% OFF</span>
                  </div>

                  <Link to={`/products/${product.product_id}`} className="w-full h-64 relative overflow-hidden rounded-xl mb-6 border-4 border-gray-100 bg-gray-50 z-5">
                    <img src={product.images[0]?.image_url || '/img/fallback-product.jpg'} alt={product.name} className="w-full h-full object-contain transition-transform duration-500 ease-in-out hover:scale-110" onError={(e) => { e.target.src = '/img/fallback-product.jpg'; }} loading="lazy" />
                  </Link>

                  <div className="w-full flex-1 flex flex-col justify-between z-5">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 text-center mb-4 line-clamp-2 px-4">
                        <Link to={`/products/${product.product_id}`} className="no-underline hover:underline">
                          <span className="bg-clip-text text-transparent" style={{ backgroundImage: COLORS.goldGradient }}>{product.name}</span>
                        </Link>
                      </h2>
                      {product.description && (
                        <div className="relative group/desc mb-6">
                          <p className="text-gray-700 text-base text-center leading-relaxed tracking-tight line-clamp-3 transition-all duration-300 px-4">
                            {product.description}
                            <span className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent group-hover/desc:hidden"></span>
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="text-center mb-6">
                      <span className="line-through text-gray-400 text-lg mr-2">JD {formatPrice(product.price)}</span>
                      <span className="text-red-600 font-bold text-2xl bg-red-50 px-3 py-1 rounded-full">JD {formatPrice(product.discounted_price || product.price)}</span>
                    </div>

                    <button
                      className="relative w-full h-12 rounded-xl bg-gradient-to-r from-[#DFBF00] to-[#C1A811] flex items-center justify-center overflow-hidden transition-all duration-300 hover:from-[#C1A811] hover:to-[#C1A811] group/button shadow-md hover:shadow-lg"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      <span className="absolute right-0 w-12 h-full bg-gray-50 flex items-center justify-center transition-all duration-300 group-hover/button:w-full">
                        <FaShoppingCart className="h-5 w-5 text-[#DFBF00]" />
                      </span>
                      <span className="text-white font-semibold tracking-wide transition-all duration-300 group-hover/button:pr-8">Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {featuredProducts.length === 0 && !loading && (
            <div className="text-center p-8">
              <p className="text-gray-600">No featured products available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Offers;