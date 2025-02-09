// src/components/Wishlist.jsx
import React from 'react';
import product1 from '../assets/product-5.jpg';
import product2 from '../assets/product.jpg';

const wishlistItems = [
    {
        id: 1,
        image: product1,
        title: 'Spiderman Remastered',
        subtitle: 'Steam offline',
        price: 'JD 2.99',
    },
    {
        id: 2,
        image: product2,
        title: 'Red Dead Redemption 2',
        subtitle: 'Steam Online',
        price: 'JD 12.00',
    },
];

const Wishlist = () => {
    return (
        <div className=" bg-gradient-to-b from-gray-100 to-gray-200 font-sans">
            {/* Main Container */}
            <div className="container mx-auto py-12 px-4">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Wishlist</h2>

                <div className="flex flex-col items-center space-y-8">
                    {/* Wishlist Items */}
                    {wishlistItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 relative w-full max-w-4xl overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                className="absolute top-1 right-1 p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors focus:outline-none"
                                aria-label="Remove item"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Card Body */}
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row items-center">
                                    {/* Product Image */}
                                    <div className="w-full md:w-1/4 flex justify-center mb-4 md:mb-0">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="max-w-[100px] md:max-w-[80px] h-auto rounded-lg"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="w-full md:w-1/2 text-center md:text-left">
                                        <h5 className="text-xl font-semibold mb-1">{item.title}</h5>
                                        <p className="text-gray-500">{item.subtitle}</p>
                                    </div>

                                    {/* Price and Action */}
                                    <div className="w-full md:w-1/4 text-center md:text-right">
                                        <p className="text-lg font-bold mb-3">{item.price}</p>
                                        <button className="bg-[#DFBF00] hover:bg-yellow-600 text-white text-sm font-semibold px-6 py-2 rounded-full transition-colors">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Continue Shopping Button */}
                    <div className="self-start mt-4">
                        <a
                            href="#"
                            className="inline-flex items-center border border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-3 rounded-full transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Continue Shopping
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
