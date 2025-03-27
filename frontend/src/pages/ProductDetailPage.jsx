import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageCarousel from '../components/product-detail/ImageCarousel';
import ProductDetails from '../components/product-detail/ProductDetails';
import ReviewsSection from '../components/product-detail/ReviewsSection';
import SuggestionProducts from '../components/product-detail/SuggestionProducts';

const ProductDetailPage = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        console.log(data);  // Log the product data
        setProduct(data); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{`Error: ${error}`}</div>; 
  }

  return (
    <div className="container mx-auto py-5 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Product Images Slider */}
        <div className="md:w-1/2">
          {/* Ensure we're passing product.images (not product) to the ImageCarousel */}
          {product && product.images && product.images.length > 0 ? (
            <ImageCarousel images={product.images} />  // Pass the images array to the carousel
          ) : (
            <div>No images available</div>  // Fallback if no images are available
          )}
        </div>
        {/* Right: Product Details */}
        <div className="md:w-1/2">
          <ProductDetails product={product} />
        </div>
      </div>
      {/* Reviews Section */}
      <ReviewsSection productId={id} />
      {/* Suggestion Products Section */}
      <SuggestionProducts productId={id} />
    </div>
  );
};

export default ProductDetailPage;
