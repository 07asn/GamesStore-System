// src/components/OrderSummaryPage.jsx
import React, { useState } from 'react';
import checkmark from '../assets/checkmark.png';
import product1 from '../assets/product-2.png.jpg';
import product2 from '../assets/product-5.jpg';

const OrderSummaryPage = () => {
    const [ratingModalOpen, setRatingModalOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [accordionOpen, setAccordionOpen] = useState({});

    const orderNumber = "Z5383263862";
    const purchaseDate = "Dec 30/24 - 7:35 PM";

    const products = [
        {
            id: 1,
            image: product1,
            title: "Elden Ring + DLC",
            price: "4.99 JOD",
            amount: 1,
            total: "41.51 JOD",
            keys: ["N832K-FVKRP-TGQ8F-7TPTQ-T6PKG", "XYZ12-ABC34-56789-T6PKG"],
        },
        {
            id: 2,
            image: product2,
            title: "Super Mario Odyssey",
            price: "2.99 JOD",
            amount: 2,
            total: "5.98 JOD",
            keys: ["QWER-56789-ABC12-RTYUK"],
        },
    ];

    const toggleAccordion = (id) => {
        setAccordionOpen(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const copyKey = (keys) => {
        navigator.clipboard.writeText(keys.join(" "));
        alert("Key(s) copied to clipboard!");
    };

    return (
        <section className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600">
                <ol className="flex items-center space-x-2">
                    <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 .5l6 6V15a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6.5l6-6z" />
                        </svg>
                        <span className="hover:text-gray-900 transition-colors">Home</span>
                    </li>
                    <li className="text-gray-400">/</li>
                    <li className="hover:text-gray-900 transition-colors">Purchase Orders</li>
                    <li className="text-gray-400">/</li>
                    <li className="text-gray-900 font-medium">Order Summary</li>
                </ol>
            </nav>

            {/* Order Status Section */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg border border-green-200">
                <div className="flex items-center space-x-6">
                    <div className="bg-green-500 p-4 rounded-full shadow-lg">
                        <img src={checkmark} alt="Completed" className="w-12 h-12 filter brightness-0 invert" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank you for your order! 🎉</h1>
                        <div className="space-y-1 text-gray-700">
                            <p className="flex items-center">
                                <span className="w-24 font-medium">Order:</span>
                                <span className="font-mono bg-gray-100 px-2 py-1 rounded">{orderNumber}</span>
                            </p>
                            <p className="flex items-center">
                                <span className="w-24 font-medium">Date:</span>
                                {purchaseDate}
                            </p>
                            <p className="flex items-center">
                                <span className="w-24 font-medium">Status:</span>
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold uppercase">
                                    Completed
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rating Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="text-center space-y-4">
                    <div className="inline-block bg-yellow-100 p-4 rounded-full">
                        <span className="text-4xl">⭐</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">How was your experience?</h2>
                    <p className="text-gray-600 max-w-prose mx-auto">
                        Your feedback helps us improve! Please take a moment to rate your shopping experience.
                    </p>
                    <button
                        onClick={() => setRatingModalOpen(true)}
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium 
                        transform transition-all duration-200 hover:scale-105 shadow-lg"
                    >
                        Rate Your Experience
                    </button>
                </div>
            </div>

            {/* Rating Modal */}
            {ratingModalOpen && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-md backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden animate-pop-in">
                        <div className="bg-green-500 p-4 flex justify-between items-center">
                            <h3 className="text-white text-lg font-bold">Rate Your Experience</h3>
                            <button
                                onClick={() => setRatingModalOpen(false)}
                                className="text-white hover:text-yellow-200 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex justify-center space-x-2">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        onClick={() => setSelectedRating(star)}
                                        className={`text-4xl transition-transform ${star <= selectedRating ?
                                            'text-yellow-400' : 'text-gray-300'} hover:scale-110`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Tell us more about your experience..."
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 
                            focus:border-transparent transition-all resize-none"
                                rows="4"
                            />
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setRatingModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        console.log("Rating:", selectedRating, "Feedback:", feedback);
                                        setRatingModalOpen(false);
                                    }}
                                    className="bg-green-500 hover:bg-green-700 px-6 py-2 text-white rounded-lg 
                            font-medium transition-colors"
                                >
                                    Submit Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Products Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <h2 className="text-2xl font-bold p-8 border-b border-gray-100">Order Details</h2>
                <div className="divide-y divide-gray-100">
                    {products.map(product => (
                        <div key={product.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex flex-col md:flex-row gap-6">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-32 h-32 object-contain rounded-xl border border-gray-200 bg-white"
                                />
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                        <div>
                                            <p><span className="font-medium">Unit Price:</span> {product.price}</p>
                                            <p><span className="font-medium">Quantity:</span> {product.amount}</p>
                                        </div>
                                        <div>
                                            <p><span className="font-medium">Total:</span> {product.total}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-3">
                                        <button
                                            onClick={() => toggleAccordion(product.id)}
                                            className="flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
                                        >
                                            {accordionOpen[product.id] ? 'Hide' : 'Show'} Product Keys
                                            <svg
                                                className={`w-4 h-4 ml-2 transition-transform ${accordionOpen[product.id] ? 'rotate-180' : ''}`}
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {accordionOpen[product.id] && (
                                            <div className="bg-gray-50 p-4 rounded-lg space-y-2 animate-slide-down">
                                                {product.keys.map((key, index) => (
                                                    <div key={index} className="flex justify-between items-center bg-white p-3 rounded">
                                                        <span className="font-mono text-sm">{key}</span>
                                                        <button
                                                            onClick={() => copyKey([key])}
                                                            className="text-gray-500 hover:text-yellow-600 transition-colors"
                                                        >
                                                            ⎘ Copy
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => copyKey(product.keys)}
                                                className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg 
                                    transition-colors flex items-center"
                                            >
                                                ⎘ Copy All Keys
                                            </button>
                                            <button
                                                className="text-sm text-white bg-[#DFBF00] hover:bg-[#FFDF00] hover:text-[#1a1a1a] px-4 py-2 
                                    rounded-lg transition-colors flex items-center"
                                            >
                                                Activation Guide
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OrderSummaryPage;