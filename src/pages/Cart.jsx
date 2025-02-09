import React from 'react';
import product1 from '../assets/product-5.jpg';
import product2 from '../assets/product.jpg';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import ContinueShoppingButton from '../components/ui/ContinueShoppingButton';

const cartItems = [
    {
        id: 1,
        image: product1,
        title: 'Spiderman Remastered',
        description: 'Steam offline',
        price: 'JD 2.99',
        quantity: 1,
    },
    {
        id: 2,
        image: product2,
        title: 'Red Dead Redemption 2',
        description: 'Steam Online',
        price: 'JD 12.00',
        quantity: 2,
    },
];

const Cart = () => {
    // Dummy handlers for demonstration
    const handleRemove = (id) => {
        console.log('Remove item with id:', id);
    };

    const handleIncrease = (id) => {
        console.log('Increase quantity for item:', id);
    };

    const handleDecrease = (id) => {
        console.log('Decrease quantity for item:', id);
    };

    const handleContinueShopping = () => {
        console.log('Continue shopping');
        // Navigate to shop page
    };

    const handleCheckout = () => {
        console.log('Proceed to checkout');
        // Navigate to checkout page
    };

    // Calculate subtotal (assumes price strings are formatted as "JD xx.xx")
    const subtotal = cartItems.reduce((acc, item) => {
        const price = parseFloat(item.price.replace('JD', '').trim());
        return acc + price * item.quantity;
    }, 0);
    const tax = subtotal * 0.03;
    const total = subtotal + tax;

    return (
        <div className="min-h-screen bg-gray-100 py-10 font-sans text-gray-700">
            <div className="container mx-auto px-4">
                {/* Page Title */}
                <h2 className="text-3xl font-bold text-center mb-8">Shopping Cart</h2>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items Section */}
                    <div className="lg:w-8/12 space-y-8">
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onRemove={handleRemove}
                                onIncrease={handleIncrease}
                                onDecrease={handleDecrease}
                            />
                        ))}

                        {/* Continue Shopping Button */}
                        <ContinueShoppingButton
                            onClick={handleContinueShopping}
                            href="/shop"
                        >
                            Continue Shopping
                        </ContinueShoppingButton>
                    </div>

                    {/* Cart Summary Section */}
                    <div className="lg:w-4/12">
                        <CartSummary
                            subtotal={subtotal}
                            tax={tax}
                            total={total}
                            onCheckout={handleCheckout}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
