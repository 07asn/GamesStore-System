// src/components/PaymentPage.jsx
import React, { useState, useEffect } from 'react';
import HeaderSection from '../components/payment/HeaderSection';
import CouponSection from '../components/payment/CouponSection';
import OrderDetailsSection from '../components/payment/OrderDetailsSection';
import PaymentMethodsSection from '../components/payment/PaymentMethodsSection';
import PaymentButtonSection from '../components/payment/PaymentButtonSection';
import ContinueShoppingButton from '../components/ui/ContinueShoppingButton';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [coupon, setCoupon] = useState(null);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [baseSubtotal, setBaseSubtotal] = useState(0);
    const [itemDiscount, setItemDiscount] = useState(0);
    const [itemsTotal, setItemsTotal] = useState(0);
    const navigate = useNavigate();

    const handlePayPalSuccess = async (details) => {
        console.log('PayPal success:', details);

        try {
            const finalTotal = (itemsTotal - couponDiscount).toFixed(2);

            const preparedCartItems = cartItems.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price_at_purchase: item.discounted_price || item.price
            }));

            const payload = {
                payment_method: 'paypal',
                total_amount: finalTotal,
                cartItems: preparedCartItems
            };

            const response = await axios.post('http://localhost:5000/api/orders/create', payload, {
                withCredentials: true,
            });

            console.log('Order creation success:', response.data);
            localStorage.removeItem('cart');
            const orderId = response.data.order_id;
            navigate('/order-confirmation', { state: { orderId } });
        } catch (err) {
            console.error('Error creating order:', err);
        }
    };


    const handlePayPalError = (error) => {
        console.error('PayPal error:', error);
    };

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const handleContinueShopping = (e) => {
        e.preventDefault();
        console.log('Continue shopping');
        navigate('/shop')
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        console.log('Proceed to final checkout');
    };

    // Called from OrderDetailsSection with item-level calculations
    const handleValuesCalculated = (baseSub, itemDisc, itemTotal) => {
        // itemTotal = baseSub - itemDisc
        setBaseSubtotal(baseSub);
        setItemDiscount(itemDisc);
        setItemsTotal(itemTotal);
    };

    // Called from CouponSection when the coupon is validated
    const handleCouponApplied = (validatedCoupon) => {
        setCoupon(validatedCoupon);

        // If it's a percentage discount
        if (validatedCoupon.discount_percentage && validatedCoupon.discount_percentage > 0) {
            const perc = parseFloat(validatedCoupon.discount_percentage);
            // Apply to the itemsTotal
            const extraDiscount = (perc / 100) * itemsTotal;
            setCouponDiscount(extraDiscount);
        }
        // If it's a flat discount
        else if (validatedCoupon.discount_value && validatedCoupon.discount_value > 0) {
            setCouponDiscount(parseFloat(validatedCoupon.discount_value));
        }
        else {
            setCouponDiscount(0);
        }
    };

    // The final total: item-based total minus coupon discount
    const finalTotal = Number((itemsTotal - couponDiscount).toFixed(2));


    return (
        <div className="min-h-screen bg-gray-50 text-gray-700">
            <div className="max-w-[800px] mx-auto p-5">
                <HeaderSection />

                <CouponSection
                    onCouponApplied={handleCouponApplied}
                    cartItems={cartItems}
                />


                <OrderDetailsSection
                    cartItems={cartItems}
                    onValuesCalculated={handleValuesCalculated}
                    couponDiscount={couponDiscount}
                />

                <PaymentMethodsSection
                    totalAmount={finalTotal}
                    onPayPalSuccess={handlePayPalSuccess}
                    onPayPalError={handlePayPalError}
                />


                <div className="mb-5">
                    <PaymentButtonSection onCheckout={handleCheckout} />
                </div>

                <ContinueShoppingButton onClick={handleContinueShopping} href="/shop">
                    Continue Shopping
                </ContinueShoppingButton>
            </div>
        </div>
    );
};

export default PaymentPage;
