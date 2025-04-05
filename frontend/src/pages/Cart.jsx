import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import ContinueShoppingButton from '../components/ui/ContinueShoppingButton';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const handleRemove = (product_id) => {
        const updatedCart = cartItems.filter(item => item.product_id !== product_id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleIncrease = (product_id) => {
        const updatedCart = cartItems.map(item =>
            item.product_id === product_id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleDecrease = (product_id) => {
        const updatedCart = cartItems.map(item =>
            item.product_id === product_id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleContinueShopping = () => {
        console.log('Continue shopping');
    };

    const handleCheckout = () => {
        axios.get('http://localhost:5000/api/users/status', { withCredentials: true })
            .then(response => {
                if (response.data.loggedIn) {
                    navigate('/payment');
                } else {
                    alert("Please log in to proceed with checkout");
                }
            })
            .catch(error => console.error(error));
    };

    // Calculate subtotal (check for discounted_price if available)
    const subtotal = cartItems.reduce((acc, item) => {
        const price = item.discounted_price && item.discounted_price > 0 ? parseFloat(item.discounted_price) : parseFloat(item.price.replace('JD', '').trim());
        return acc + price * item.quantity;
    }, 0);

    const total = subtotal;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 font-sans text-gray-800">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Page Title */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-2">Your Shopping Cart</h2>
                    <p className="text-gray-500">{cartItems.length} items in your cart</p>
                </div>

                {cartItems.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items Section */}
                        <div className="lg:w-8/12 space-y-6">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.product_id}
                                    item={item}
                                    onRemove={handleRemove}
                                    onIncrease={handleIncrease}
                                    onDecrease={handleDecrease}
                                />
                            ))}

                            {/* Continue Shopping Button */}
                            <div className="mt-8">
                                <ContinueShoppingButton
                                    onClick={handleContinueShopping}
                                    href="/shop"
                                >
                                    Continue Shopping
                                </ContinueShoppingButton>
                            </div>
                        </div>

                        {/* Cart Summary Section */}
                        <div className="lg:w-4/12">
                            <CartSummary
                                cartItems={cartItems}
                                subtotal={subtotal}
                                discount={0}
                                total={total}
                                onCheckout={handleCheckout} // Pass the onCheckout function
                            />
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                        <div className="flex justify-center mb-4">
                            <ShoppingCart size={64} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Your cart is empty</h3>
                        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                        <a
                            href="/shop"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFDF00] text-gray-700 hover:bg-[#DFBF00]  font-medium rounded-lg transition-colors"
                        >
                            <ShoppingBag size={18} />
                            Start Shopping
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
