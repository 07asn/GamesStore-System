// src/components/SuggestionProducts.jsx
import React from 'react';
import ProductCard from '../shop/ProductCard';

const SuggestionProducts = () => {
  // Sample product data for suggestions
  const products = [
    {
      id: 1,
      title: 'Full Rim Aviator Eyeglasses',
      price: '2.60',
      discount: '3.00',
      salePercent: 10,
      productLink: '#',
    },
    {
      id: 2,
      title: 'FC 25 Standard Edition',
      price: '14.99',
      discount: '59.50',
      salePercent: 75,
      productLink: '#',
    },
    {
      id: 3,
      title: 'Spiderman Remastered',
      price: '2.99',
      discount: '4.99',
      salePercent: 45,
      productLink: '#',
    },
    {
      id: 4,
      title: 'Elden Ring + Shadow DLC',
      price: '4.50',
      discount: '5.50',
      salePercent: 20,
      productLink: '#',
    },
    // Add more products as needed
  ];

  return (
    <section className="mt-20">
      <h5 className="font-bold text-xl mb-6 text-gray-700 border-b-2 border-yellow-400 inline-block pb-1">
        Products you may like
      </h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((prod) => (
          <ProductCard key={prod.id} {...prod} />
        ))}
      </div>
    </section>
  );
};

export default SuggestionProducts;
