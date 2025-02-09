import React from 'react';
import ProductCard from '../components/shop/ProductCard'; // Adjust the path as needed

const HeroSection = () => {
    return (
      <section
        className="relative h-80 bg-cover bg-center flex items-center justify-center  bg-gray-900/40 backdrop-blur-md"
        style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x400/?games,shop')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Welcome to 7SN Store
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Discover exclusive games and deals
          </p>
        </div>
      </section>
    );
  };

const ShopPage = () => {
  // Sample product data (modify or fetch from an API as needed)
  const products = [
    {
      id: 1,
      title: 'Full Rim Aviator Eyeglasses',
      price: '2.60',
      discount: '3.00',
      salePercent: 10,
      productLink: 'product.html',
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
      title: 'Full Rim Aviator Eyeglasses',
      price: '2.60',
      discount: '3.00',
      salePercent: 10,
      productLink: 'product.html',
    },
    {
      id: 4,
      title: 'FC 25 Standard Edition',
      price: '14.99',
      discount: '59.50',
      salePercent: 75,
      productLink: '#',
    },
    // Add more product objects as needed.
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
    <div className="container mx-auto mt-4 px-4 mt-10">
      {/* Filter and Search Wrapper */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {/* Sort Filter */}
        <div>
          <select
            id="sort-filter"
            aria-label="Sort products"
            className="min-w-[180px] border border-gray-300 rounded-md p-2"
          >
            <option value="default" defaultValue>
              Sort by
            </option>
            <option value="low-price">Low Price</option>
            <option value="high-price">High Price</option>
            <option value="newest">Newest</option>
            <option value="popular">Popular</option>
          </select>
        </div>
        {/* Category Filter */}
        <div>
          <select
            id="category-filter"
            aria-label="Category"
            className="min-w-[180px] border border-gray-300 rounded-md p-2"
          >
            <option value="default" defaultValue>
              Category
            </option>
            <option value="all">All</option>
            <option value="steam-online">Steam Online</option>
            <option value="steam-offline">Steam Offline</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Section Heading */}
      <section className="mb-8">
        <div className="text-center">
          <h3 className="text-2xl mt-2 mb-4">Games</h3>
        </div>
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((prod) => (
            <ProductCard key={prod.id} {...prod} />
          ))}
        </div>
      </section>
    </div></div>
  );
};

export default ShopPage;
