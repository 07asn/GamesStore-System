import React, { useState } from 'react';
import axios from 'axios';
import { Ticket } from 'lucide-react';

const CouponSection = ({ cartItems = [], onCouponApplied }) => {
  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleApplyCoupon = async () => {
    setError('');
    setSuccess('');

    if (!couponCode) {
      setError('Please enter a coupon code');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/coupons/validate', {
        code: couponCode,
        cartItems,
      });

      setSuccess(response.data.message);
      onCouponApplied(response.data.coupon);
    } catch (err) {
      setError(err.response?.data?.message || 'Error validating coupon');
    }
  };

  return (
    <div className="bg-white p-6 mb-5 shadow-lg rounded-2xl">
      <div className="flex items-center mb-4 space-x-2">
        <Ticket className="text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-700">Have a Coupon?</h3>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Enter your coupon code below and tap <span className="font-medium">Apply</span> to see if you get a discount!
      </p>

      <div className="flex">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1 p-3 text-base border border-gray-300 rounded-l-lg outline-none 
            transition-colors duration-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
        />
        <button
          onClick={handleApplyCoupon}
          className="p-3 bg-gray-600 text-white border border-gray-600 rounded-r-lg text-base 
            font-medium transition-colors duration-200 hover:bg-[#FFDF00] hover:border-yellow-500"
        >
          Apply
        </button>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mt-3 bg-red-50 border-l-4 border-red-400 p-3 rounded flex items-start space-x-2">
          <svg
            className="w-5 h-5 flex-shrink-0 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.366-.756 1.45-.756 1.816 0l5.189 10.722A1.75 1.75 0 0114.69 16H5.31a1.75 1.75 0 01-1.572-2.179l5.19-10.722zM11 14a1 1 0 11-2 0 1 1 0 012 0zm-.354-8.646a.5.5 0 10-.707.708L10.293 7.5 9.646 8.146a.5.5 0 00.708.708l1-1a.5.5 0 00.146-.353v-1a.5.5 0 00-.146-.353l-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="mt-3 bg-green-50 border-l-4 border-green-400 p-3 rounded flex items-start space-x-2">
          <svg
            className="w-5 h-5 flex-shrink-0 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.952-10.648a.75.75 0 10-1.06-1.06L9 10.232l-1.892-1.892a.75.75 0 10-1.06 1.06L7.94 11.293a.75.75 0 001.06 0l4.952-4.952z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}
    </div>
  );
};

export default CouponSection;
