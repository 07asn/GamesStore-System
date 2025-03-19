import React from 'react';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import product1 from '../assets/product-5.jpg';
import product2 from '../assets/product.jpg';

// Enhanced CartItem component
const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
    <div className="flex flex-col sm:flex-row">
      <div className="sm:w-1/4 h-40 sm:h-auto">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
            <button 
              onClick={() => onRemove(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <p className="text-sm text-gray-500">{item.description}</p>
          <p className="font-semibold text-gray-900">{item.price}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1 border border-gray-200 rounded-lg overflow-hidden">
            <button 
              onClick={() => onDecrease(item.id)}
              className="p-2 bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-50"
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-1 font-medium">{item.quantity}</span>
            <button 
              onClick={() => onIncrease(item.id)}
              className="p-2 bg-gray-50 hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          <p className="font-bold text-lg">
            JD {(parseFloat(item.price.replace('JD', '').trim()) * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Enhanced CartSummary component
const CartSummary = ({ subtotal, tax, total, onCheckout }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
      <ShoppingCart size={20} />
      Order Summary
    </h3>
    
    <div className="space-y-4 mb-6">
      <div className="flex justify-between pb-4 border-b border-gray-100">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">JD {subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between pb-4 border-b border-gray-100">
        <span className="text-gray-600">Tax (3%)</span>
        <span className="font-medium">JD {tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-800 font-bold">Total</span>
        <span className="text-xl font-bold">JD {total.toFixed(2)}</span>
      </div>
    </div>
    
    <button 
      onClick={onCheckout}
      className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
    >
      <ShoppingBag size={18} />
      Proceed to Checkout
    </button>

    <div className="mt-4 text-center text-sm text-gray-500">
      <p>Secure payment processing</p>
    </div>
  </div>
);

// Enhanced ContinueShoppingButton component
const ContinueShoppingButton = ({ onClick, href, children }) => (
  <a 
    href={href} 
    onClick={onClick}
    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
  >
    <ArrowLeft size={18} />
    {children}
  </a>
);

const Cart = () => {
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
                                    key={item.id}
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
                                subtotal={subtotal}
                                tax={tax}
                                total={total}
                                onCheckout={handleCheckout}
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
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
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