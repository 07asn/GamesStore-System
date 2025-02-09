// src/components/PaymentPage.jsx
import React from 'react';
import HeaderSection from '../components/payment/HeaderSection';
import CouponSection from '../components/payment/CouponSection';
import OrderDetailsSection from '../components/payment/OrderDetailsSection';
import PaymentMethodsSection from '../components/payment/PaymentMethodsSection';
import PaymentButtonSection from '../components/payment/PaymentButtonSection';
import ContinueShoppingButton from '../components/ui/ContinueShoppingButton';

const PaymentPage = () => {
    // Dummy handlers for demonstration
    const handleContinueShopping = (e) => {
        e.preventDefault();
        console.log('Continue shopping');
        // Navigate to shop page
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        console.log('Proceed to checkout');
        // Navigate to checkout page
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-700">
            <div className="max-w-[800px] mx-auto p-5">
                {/* Header Section */}
                <HeaderSection />

                {/* Coupon Section */}
                <CouponSection />

                {/* Order Details Section */}
                <OrderDetailsSection />

                {/* Payment Methods Section */}
                <PaymentMethodsSection />

                {/* Payment Button Section */}
                <div className="mb-5">
                    <PaymentButtonSection onCheckout={handleCheckout} />
                </div>

                {/* Continue Shopping Button */}
                <ContinueShoppingButton onClick={handleContinueShopping} href="/shop">
                    Continue Shopping
                </ContinueShoppingButton>
            </div>
        </div>
    );
};

export default PaymentPage;
