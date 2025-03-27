import React, { useState, useEffect } from 'react';

const ImageCarousel = ({ images = [] }) => {
  const [current, setCurrent] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [thumbnailHover, setThumbnailHover] = useState(null);

  useEffect(() => {
    // Reset current image when images array changes
    if (images.length > 0) {
      setCurrent(0);
    }
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500 font-medium">No images available</p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
    setIsLoading(true);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    setIsLoading(true);
  };

  const goToImage = (index) => {
    setCurrent(index);
    setIsLoading(true);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) {
      nextImage(); // Swipe left
    } else if (touchEnd - touchStart > 50) {
      prevImage(); // Swipe right
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative ${isFullScreen ? 'fixed inset-0 z-50 bg-black p-4' : ''}`}>
      {/* Main image container */}
      <div 
        className={`relative overflow-hidden ${isFullScreen ? 'h-full flex items-center' : 'h-96 md:h-80 lg:h-96'} rounded-lg bg-gray-100`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-10">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Current image */}
        <img
          src={images[current]}
          alt={`Product Image ${current + 1}`}
          className={`w-full h-full object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleImageLoad}
        />

        {/* Navigation controls - arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </>
        )}

        {/* Full screen toggle */}
        <button
          onClick={toggleFullScreen}
          className="absolute top-2 right-2 bg-white bg-opacity-75 text-gray-800 p-2 rounded-full shadow-md hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          aria-label={isFullScreen ? "Exit full screen" : "View full screen"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
          </svg>
        </button>

        {/* Image counter */}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex overflow-x-auto space-x-2 mt-2 pb-1">
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative flex-shrink-0 cursor-pointer transition-all duration-300 ${index === current ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'}`}
              onClick={() => goToImage(index)}
              onMouseEnter={() => setThumbnailHover(index)}
              onMouseLeave={() => setThumbnailHover(null)}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="h-16 w-16 object-cover rounded"
              />
              {thumbnailHover === index && index !== current && (
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Close full screen button */}
      {isFullScreen && (
        <button
          onClick={toggleFullScreen}
          className="absolute top-4 right-4 bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none"
          aria-label="Close full screen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
};

export default ImageCarousel;