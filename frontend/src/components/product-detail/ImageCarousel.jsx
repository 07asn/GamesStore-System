import React, { useState } from 'react';

const ImageCarousel = ({ images = [] }) => {
  console.log(images);  // Log images to see if they're passed correctly

  const [current, setCurrent] = useState(images.length > 0 ? 0 : -1); // Set to -1 if no images

  if (images.length === 0) {
    return <div>No images available</div>; // Show message if no images are available
  }

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative mb-4">
      <img
        src={images[current]}
        alt={`Product Image ${current + 1}`}
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
