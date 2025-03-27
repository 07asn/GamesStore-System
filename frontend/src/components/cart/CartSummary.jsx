// CartSummary.jsx
import React, { useState } from 'react';
import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const CartSummary = ({ cartItems, subtotal, discount, total, onCheckout }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Fallback to 0 if the values are not numbers
  const validSubtotal = isNaN(subtotal) ? 0 : subtotal;
  const validDiscount = isNaN(discount) ? 0 : discount;
  const validTotal = isNaN(total) ? 0 : total;

  const isLoggedIn = Cookies.get('token');

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location.pathname } });
    } else {
      onCheckout();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <ShoppingCart size={20} />
        Order Summary
      </h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between pb-4 border-b border-gray-100">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">JD {validSubtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pb-4 border-b border-gray-100">
          <span className="text-gray-600">Discount</span>
          <span className="font-medium">JD {validDiscount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-800 font-bold">Total</span>
          <span className="text-xl font-bold">JD {validTotal.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full py-4 px-6 bg-[#FFDF00] text-gray-900 hover:bg-[#DFBF00] font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
      >
        <ShoppingBag size={18} />
        Proceed to Checkout
      </button>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Secure payment processing</p>
      </div>
    </div>
  );
};

export default CartSummary;
