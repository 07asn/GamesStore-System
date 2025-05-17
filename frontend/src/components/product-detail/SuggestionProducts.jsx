import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios
import ProductCard from '../shop/ProductCard';

const SuggestionProducts = ({ productId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        // Axios GET request to fetch related products
        const response = await axios.get(`http://localhost:5000/api/products/related/${productId}`);

        // Check if data is returned and set it
        if (response.status === 200) {
          setRelatedProducts(response.data);
        } else {
          console.error('No related products found:', response.data);
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchRelatedProducts();
    }
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="mt-20">
      <h5 className="font-bold text-xl mb-6 text-gray-700 border-b-2 border-yellow-400 inline-block pb-1">
        Products you may like
      </h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((prod) => (
            <ProductCard
              key={prod.product_id}
              {...prod}
              productImage={prod.images && prod.images.length > 0 ? prod.images[0] : null}
            />
          ))
        ) : (
          <p>No related products found</p>
        )}
      </div>
    </section>
  );
};

export default SuggestionProducts;
