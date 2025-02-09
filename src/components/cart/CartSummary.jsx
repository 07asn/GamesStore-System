import React from 'react';
import PropTypes from 'prop-types';

const CartSummary = ({ subtotal, tax, total, onCheckout }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h5 className="text-2xl font-bold mb-6">Summary</h5>
            <div className="flex justify-between mb-4">
                <span className="text-lg">Subtotal:</span>
                <span className="text-lg font-semibold">JD {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
                <span className="text-lg">Tax (3%):</span>
                <span className="text-lg font-semibold">JD {tax.toFixed(2)}</span>
            </div>
            <hr className="mb-4" />
            <div className="flex justify-between font-bold text-xl mb-6">
                <span>Total:</span>
                <span>JD {total.toFixed(2)}</span>
            </div>
            <button
                onClick={onCheckout}
                className="w-full bg-[#1a1a1a] hover:bg-[#DFBF00] text-white py-3 rounded-full transition-colors inline-flex items-center justify-center text-lg font-semibold"
            >
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
        </div>
    );
};

CartSummary.propTypes = {
    subtotal: PropTypes.number.isRequired,
    tax: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onCheckout: PropTypes.func.isRequired,
};

export default CartSummary;
