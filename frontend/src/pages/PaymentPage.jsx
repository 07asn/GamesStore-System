import React, { useState, useEffect, useRef } from 'react';
import HeaderSection from '../components/payment/HeaderSection';
import CouponSection from '../components/payment/CouponSection';
import OrderDetailsSection from '../components/payment/OrderDetailsSection';
import PaymentMethodsSection from '../components/payment/PaymentMethodsSection';
import PaymentButtonSection from '../components/payment/PaymentButtonSection';
import ContinueShoppingButton from '../components/ui/ContinueShoppingButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaExchangeAlt } from 'react-icons/fa';

const PaymentPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [coupon, setCoupon] = useState(null);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [baseSubtotal, setBaseSubtotal] = useState(0);
    const [itemDiscount, setItemDiscount] = useState(0);
    const [itemsTotal, setItemsTotal] = useState(0);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const paymentMethodsRef = useRef();
    const navigate = useNavigate();

    const USD_TO_JD = 0.71; 
    const USD_TO_SAR = 3.70;

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            navigate('/login', { state: { from: '/payment' } });
            return;
        }

        axios.get('http://localhost:5000/api/users/status', { withCredentials: true })
            .catch(error => {
                console.error('Auth error:', error);
                navigate('/login', { state: { from: '/payment' } });
            });
    }, [navigate]);

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

    // Calculate final total in USD
    const finalTotalUSD = Number((itemsTotal - couponDiscount).toFixed(2));

    // Calculate amounts in different currencies
    const jdAmount = (finalTotalUSD * USD_TO_JD).toFixed(2);
    const sarAmount = (finalTotalUSD * USD_TO_SAR).toFixed(2);

    // Get display amount based on selected currency
    const getDisplayAmount = () => {
        switch (selectedCurrency) {
            case 'JD':
                return `JD ${jdAmount}`;
            case 'SAR':
                return `SAR ${sarAmount}`;
            default:
                return `$${finalTotalUSD}`;
        }
    };

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

                {/* Currency Converter */}
                <div className="bg-white p-6 mb-5 shadow-lg rounded-2xl border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Currency Converter</h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedCurrency('USD')}
                                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${selectedCurrency === 'USD'
                                    ? 'bg-yellow-100 text-yellow-600'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                USD
                            </button>
                            <button
                                onClick={() => setSelectedCurrency('JD')}
                                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${selectedCurrency === 'JD'
                                    ? 'bg-yellow-100 text-yellow-600'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                JD
                            </button>
                            <button
                                onClick={() => setSelectedCurrency('SAR')}
                                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${selectedCurrency === 'SAR'
                                    ? 'bg-yellow-100 text-yellow-600'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                SAR
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                <span className="text-yellow-600 font-bold">{selectedCurrency}</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Amount</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {getDisplayAmount()}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Exchange Rates</p>
                            <p className="text-sm font-medium text-gray-600">1 USD = {USD_TO_JD} JD</p>
                            <p className="text-sm font-medium text-gray-600">1 USD = {USD_TO_SAR} SAR</p>
                        </div>
                    </div>
                </div>

                <PaymentMethodsSection
                    ref={paymentMethodsRef}
                    totalAmount={finalTotalUSD}
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