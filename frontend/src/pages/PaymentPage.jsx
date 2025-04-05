import React, { useState, useEffect, useRef } from 'react';
import HeaderSection from '../components/payment/HeaderSection';
import CouponSection from '../components/payment/CouponSection';
import OrderDetailsSection from '../components/payment/OrderDetailsSection';
import PaymentMethodsSection from '../components/payment/PaymentMethodsSection';
import PaymentButtonSection from '../components/payment/PaymentButtonSection';
import ContinueShoppingButton from '../components/ui/ContinueShoppingButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [coupon, setCoupon] = useState(null);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [baseSubtotal, setBaseSubtotal] = useState(0);
    const [itemDiscount, setItemDiscount] = useState(0);
    const [itemsTotal, setItemsTotal] = useState(0);
    const paymentMethodsRef = useRef();
    const navigate = useNavigate();

    // Handle PayPal success
    const handlePayPalSuccess = async (details) => {
        try {
            const finalTotal = (itemsTotal - couponDiscount).toFixed(2);
            const preparedCartItems = prepareCartItems();

            const payload = {
                payment_method: 'paypal',
                total_amount: finalTotal,
                cartItems: preparedCartItems
            };

            const response = await axios.post('http://localhost:5000/api/orders/create', payload, {
                withCredentials: true,
            });

            handleOrderSuccess(response);
        } catch (err) {
            console.error('PayPal order creation error:', err);
            alert('Failed to create PayPal order. Please try again.');
        }
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        
        if (!paymentMethodsRef.current?.validate()) {
            return;
        }
    
        try {
            const finalTotal = (itemsTotal - couponDiscount).toFixed(2);
            const paymentData = paymentMethodsRef.current.getPaymentData();
            const preparedCartItems = prepareCartItems();
    
            // Always use the same endpoint
            const endpoint = 'http://localhost:5000/api/orders/create';
    
            // For payment methods requiring proof
            if (paymentData.payment_proof) {
                const formData = new FormData();
                
                // Append all data as strings
                formData.append('payment_method', paymentData.payment_method);
                formData.append('total_amount', finalTotal);
                formData.append('cartItems', JSON.stringify(preparedCartItems));
                
                // Handle file upload properly
                if (paymentData.payment_proof instanceof File) {
                    formData.append('proof_img', paymentData.payment_proof);
                } else if (typeof paymentData.payment_proof === 'object') {
                    // Convert to Blob if needed
                    const blob = new Blob([paymentData.payment_proof], { type: paymentData.payment_proof.type });
                    formData.append('proof_img', blob, 'payment_proof.jpg');
                }
    
                // Debug what's being sent
                console.log('FormData entries:');
                for (let [key, value] of formData.entries()) {
                    console.log(key, value);
                }
    
                const response = await axios.post(endpoint, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    withCredentials: true,
                    transformRequest: (data, headers) => {
                        // Remove Content-Type header - let axios set it automatically
                        delete headers['Content-Type'];
                        return data;
                    }
                });
                handleOrderSuccess(response);
            } 
            // For non-file payment methods
            else {
                const response = await axios.post(endpoint, {
                    payment_method: paymentData.payment_method,
                    total_amount: finalTotal,
                    cartItems: preparedCartItems
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    withCredentials: true
                });
                handleOrderSuccess(response);
            }
        } catch (err) {
            console.error('Full checkout error:', err);
            console.error('Error response:', err.response);
            alert(err.response?.data?.message || 'Payment failed. Please try again.');
        }
    };

    // Helper function to prepare cart items consistently
    const prepareCartItems = () => {
        return cartItems.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price_at_purchase: item.discounted_price || item.price
        }));
    };

    // Handle successful order creation
    const handleOrderSuccess = (response) => {
        console.log('Order creation success:', response.data);
        localStorage.removeItem('cart');
        navigate('/order-confirmation', { 
            state: { orderId: response.data.order_id } 
        });
    };

    // Initialize cart from localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    // Handle coupon application
    const handleCouponApplied = (validatedCoupon) => {
        setCoupon(validatedCoupon);

        if (validatedCoupon.discount_percentage) {
            const discount = (parseFloat(validatedCoupon.discount_percentage) / 100) * itemsTotal;
            setCouponDiscount(discount);
        } else if (validatedCoupon.discount_value) {
            setCouponDiscount(parseFloat(validatedCoupon.discount_value));
        } else {
            setCouponDiscount(0);
        }
    };

    // Handle calculated values from order details
    const handleValuesCalculated = (baseSub, itemDisc, itemTotal) => {
        setBaseSubtotal(baseSub);
        setItemDiscount(itemDisc);
        setItemsTotal(itemTotal);
    };

    // Calculate final total
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
                    ref={paymentMethodsRef}
                    totalAmount={finalTotal}
                    onPayPalSuccess={handlePayPalSuccess}
                    onPayPalError={(err) => console.error('PayPal error:', err)}
                    cartItems={cartItems}
                />

                <div className="mb-5">
                    <PaymentButtonSection onCheckout={handleCheckout} />
                </div>

                <ContinueShoppingButton 
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/shop');
                    }}
                >
                    Continue Shopping
                </ContinueShoppingButton>
            </div>
        </div>
    );
};

export default PaymentPage;