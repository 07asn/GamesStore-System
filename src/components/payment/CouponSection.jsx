import React from 'react';

const CouponSection = () => {
    return (
        <div className="bg-white p-5 mb-5 shadow-lg rounded-2xl">
            <div className="flex">
                <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    className="flex-1 p-3 text-base border border-gray-300 rounded-l-lg outline-none transition-colors focus:border-blue-500"
                />
                <button
                    className="p-3 bg-gray-600 text-white border border-gray-600 rounded-r-lg text-base transition-colors hover:bg-yellow-500"
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

export default CouponSection;
