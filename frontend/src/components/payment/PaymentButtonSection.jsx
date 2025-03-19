// src/components/PaymentButtonSection.jsx
import React from 'react';
import PropTypes from 'prop-types';

const PaymentButtonSection = ({ onCheckout }) => {
  return (
    <div className="bg-white p-5 mb-5 shadow-lg rounded-2xl">
      <a href="order-success.html" onClick={onCheckout}>
        <button className="w-full bg-[#1a1a1a] hover:bg-[#DFBF00] text-white py-3 rounded-full transition-colors inline-flex items-center justify-center text-lg font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Payment Checkout
        </button>
      </a>
    </div>
  );
};

PaymentButtonSection.propTypes = {
  onCheckout: PropTypes.func.isRequired,
};

export default PaymentButtonSection;
