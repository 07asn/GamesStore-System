// src/components/ImageCarousel.jsx
import React, { useState } from 'react';
import product from '../../assets/product.jpg';
import product5 from '../../assets/product-5.jpg';

const ImageCarousel = () => {
  const images = [
    { src: product, alt: 'Product Image 1' },
    { src: product5, alt: 'Product Image 2' },
    { src: product, alt: 'Product Image 3' },
  ];

  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative mb-4">
      <img
        src={images[current].src}
        alt={images[current].alt}
        className="w-full object-cover rounded-lg"
      />
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
      >
        <span className="sr-only">Previous</span>
        &#10094;
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
      >
        <span className="sr-only">Next</span>
        &#10095;
      </button>
    </div>
  );
};

export default ImageCarousel;
