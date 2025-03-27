// src/components/Navbar.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    toggleCategories,
    setCategoriesOpen,
    toggleCart,
    setCartOpen,
    toggleProfile,
    setProfileOpen,
    toggleMobileSidebar,
    setMobileSidebar,
    toggleSearch,
} from '../redux/navbarSlice';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { ShoppingBag, ShoppingCart } from 'lucide-react';

const Navbar = () => {
    const dispatch = useDispatch();
    const { categoriesOpen, cartOpen, profileOpen, mobileSidebarOpen, searchOpen } = useSelector((state) => state.navbar);

    const profileRef = useRef(null);
    const categoriesTimeoutRef = useRef(null);
    const cartTimeoutRef = useRef(null);

    // State for cart items fetched from localStorage
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Try to parse the cart from localStorage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                const parsedCart = JSON.parse(storedCart);
                // If stored data is an array, use it; otherwise check if it's an object with an "items" property
                if (Array.isArray(parsedCart)) {
                    setCartItems(parsedCart);
                } else if (parsedCart.items && Array.isArray(parsedCart.items)) {
                    setCartItems(parsedCart.items);
                } else {
                    setCartItems([]);
                }
            } catch (error) {
                console.error('Error parsing cart from localStorage:', error);
                setCartItems([]);
            }
        }
    }, []);

    // Calculate total number of items and total price
    const cartCount = cartItems.length;
    const cartTotal = cartItems.reduce((sum, item) => {
        let price = 0;
        if (item.price) {
            // Remove any non-numeric characters (like "JD") and parse as float
            price = parseFloat(item.price.replace(/[^\d.]/g, '').trim()) || 0;
        }
        return sum + price * (item.quantity || 1);
    }, 0);

    const handleCategoriesMouseEnter = () => {
        if (categoriesTimeoutRef.current) clearTimeout(categoriesTimeoutRef.current);
        dispatch(setCategoriesOpen(true));
    };

    const handleCategoriesMouseLeave = () => {
        categoriesTimeoutRef.current = setTimeout(() => {
            dispatch(setCategoriesOpen(false));
        }, 150);
    };

    const handleCartMouseEnter = () => {
        if (cartTimeoutRef.current) clearTimeout(cartTimeoutRef.current);
        dispatch(setCartOpen(true));
    };

    const handleCartMouseLeave = () => {
        cartTimeoutRef.current = setTimeout(() => {
            dispatch(setCartOpen(false));
        }, 150);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                dispatch(setProfileOpen(false));
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dispatch]);

    return (
        <nav className="bg-[#FFDF00] text-[#514F4F] shadow-lg w-full">
            <div className="container mx-auto flex justify-between items-center h-16 px-4 md:px-8">
                {/* Logo */}
                <div className="logo flex items-center">
                    <Link to="/">
                        <img src={logo} alt="Game Station Logo" className="max-h-12" />
                    </Link>
                </div>

                {/* Desktop Search */}
                <div className="hidden lg:flex items-center w-1/2 lg:w-1/3">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-white rounded-full border border-gray-300 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>
                </div>

                {/* Categories Dropdown */}
                <div
                    className="relative hidden lg:block"
                    onMouseEnter={handleCategoriesMouseEnter}
                    onMouseLeave={handleCategoriesMouseLeave}
                >
                    <button
                        onClick={() => dispatch(toggleCategories())}
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-yellow-400 focus:outline-none transition ease-in-out duration-200"
                    >
                        <i className="fas fa-th-large text-gray-700"></i>
                        <span className="text-gray-700">Categories</span>
                    </button>
                    {categoriesOpen && (
                        <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-2xl bg-white border border-gray-100 z-50 transition-all duration-300">
                            <div className="py-2">
                                {['Games', 'Accounts', 'Programs', 'Digital Cards', 'Subscriptions', 'Programming'].map((item, index) => (
                                    <Link
                                        key={index}
                                        to="/shop"
                                        className="dropdown-item px-4 py-3 text-gray-700 flex items-center space-x-3 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition ease-in-out duration-200"
                                    >
                                        <i className="fas fa-chevron-circle-right text-lg text-gray-500"></i>
                                        <span>{item}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Desktop Nav - Home */}
                <Link to="/" className="flex items-center space-x-2 hover-effect hidden lg:block">
                    <i className="fas fa-home text-gray-700"></i>
                    <span className="text-gray-700">Home</span>
                </Link>

                {/* Cart */}
                <div className="relative" onMouseEnter={handleCartMouseEnter} onMouseLeave={handleCartMouseLeave}>
                    <Link to="/cart" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition ease-in-out duration-200">
                        <i className="fas fa-shopping-cart text-gray-700 text-xl"></i>
                        <span className="text-gray-700">Cart</span>
                        {cartCount > 0 && (
                            <span className="cart-badge bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    {cartOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 transition-all duration-300">
                            <h3 className="font-semibold text-lg p-4 border-b border-gray-100">Your Cart</h3>
                            <ul className="p-4 space-y-3 max-h-64 overflow-y-auto">
                                {cartItems.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <span className="text-gray-700">{item.name}</span>
                                        <span className="text-gray-700 font-medium">JD {parseFloat(item.price.replace(/[^\d.]/g, '').trim()).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="p-4 border-t border-gray-100 flex justify-between font-semibold text-gray-700">
                                <span>Total:</span>
                                <span>JD {cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="p-4">
                                <Link
                                    to="/cart"
                                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#FFDF00] text-gray-700 font-semibold py-3 px-5 shadow-md hover:bg-[#DFBF00] focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-300"
                                    aria-label="Go to cart"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 80 80"
                                        className="w-6 h-6 fill-white"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill="#18CEF6"
                                            d="M26.029 58.156c-1.683 0-3.047 1.334-3.047 2.979 0 1.646 1.364 2.979 3.047 2.979s3.047-1.333 3.047-2.979c0-1.645-1.364-2.979-3.047-2.979zm17.795 0c-1.682 0-3.046 1.334-3.046 2.979 0 1.646 1.364 2.979 3.046 2.979 1.683 0 3.047-1.333 3.047-2.979 0-1.645-1.364-2.979-3.047-2.979zM22.515 26.997l5.416 14.5h21.793l6.189-14.5H22.515z"
                                        />
                                        <path
                                            fill="#233251"
                                            d="m58.753 13-9.67 28.181H23.85l-6.527-17.968h29.111v-2.27H14.036l7.722 21.258-6.281 10.643h35.794v-2.271H19.494l4.207-7.125h27.051l9.67-28.18H71V13H58.753zm-33.4 41.861c-3.134.002-5.674 2.484-5.676 5.548.002 3.065 2.542 5.548 5.676 5.549 3.133-.002 5.672-2.485 5.672-5.549 0-3.064-2.539-5.546-5.672-5.548zm0 8.827c-1.853-.003-3.35-1.468-3.353-3.279.003-1.81 1.5-3.274 3.353-3.277 1.849.003 3.349 1.467 3.352 3.277-.003 1.812-1.503 3.276-3.352 3.279zm17.794-8.827c-3.134.002-5.673 2.484-5.674 5.548.001 3.065 2.54 5.548 5.674 5.549 3.134-.002 5.672-2.485 5.674-5.549-.002-3.064-2.54-5.546-5.674-5.548zm0 8.827c-1.851-.003-3.349-1.468-3.352-3.279.003-1.81 1.501-3.274 3.352-3.277 1.851.003 3.35 1.467 3.353 3.277-.003 1.812-1.502 3.276-3.353 3.279z"
                                        />
                                    </svg>
                                    <span className="text-base">View Cart</span>
                                </Link>
                            </div>

                        </div>
                    )}
                </div>

                {/* Profile */}
                <div className="hidden lg:flex items-center space-x-6">
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => dispatch(toggleProfile())}
                            className="p-2 rounded-full hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
                            aria-label="Toggle profile dropdown"
                        >
                            <i className="fas fa-user-circle text-2xl text-gray-700"></i>
                        </button>
                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 transition-all duration-300">
                                {[
                                    { label: 'Sign Out', icon: 'sign-in-alt', href: 'login.html' },
                                    { label: 'Orders', icon: 'box', href: 'orders.html' },
                                    { label: 'Wishlist', icon: 'heart', href: 'wishlist.html' },
                                    { label: 'Account Settings', icon: 'cog', href: 'account-settings.html' },
                                ].map((item, index) => (
                                    <Link
                                        key={index}
                                        to={item.href}
                                        className="dropdown-item flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition ease-in-out duration-150"
                                    >
                                        <i className={`fas fa-${item.icon} mr-3 text-gray-500`}></i>
                                        <span>{item.label}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Search + Hamburger */}
                <div className="flex lg:hidden items-center space-x-6">
                    <button
                        onClick={() => dispatch(toggleSearch())}
                        aria-label="Toggle Search Bar"
                        className="p-2 rounded-full hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-500 transition ease-in-out duration-200"
                    >
                        <i className="fas fa-search text-xl text-gray-700"></i>
                    </button>
                    <button
                        onClick={() => dispatch(toggleMobileSidebar())}
                        aria-label="Toggle Sidebar Menu"
                        className="p-2 rounded-full hover:bg-yellow-400 focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
                    >
                        <div className="w-6 h-6 flex flex-col justify-between items-center">
                            <span className={`block h-0.5 w-full bg-gray-700 transform transition duration-200 ${mobileSidebarOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                            <span className={`block h-0.5 w-full bg-gray-700 transition duration-200 ${mobileSidebarOpen ? 'opacity-0' : ''}`} />
                            <span className={`block h-0.5 w-full bg-gray-700 transform transition duration-200 ${mobileSidebarOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Search Input */}
            {searchOpen && (
                <div className="lg:hidden fixed top-16 left-0 w-full bg-white p-4 shadow-lg z-40 transition-opacity duration-300">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded-full border border-gray-300 px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            )}

            {/* Mobile Sidebar */}
            {mobileSidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-50 transition-opacity duration-300">
                    <div onClick={() => dispatch(setMobileSidebar(false))} className="fixed inset-0 bg-black/50"></div>
                    <aside className="fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-yellow-300 via-white to-white shadow-lg z-50 overflow-y-auto rounded-tr-lg rounded-br-lg transition-transform duration-300">
                        <button
                            onClick={() => dispatch(setMobileSidebar(false))}
                            className="absolute top-4 right-4 p-2 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 rounded-full"
                            aria-label="Close Sidebar Menu"
                        >
                            <i className="fas fa-times text-xl"></i>
                        </button>
                        <div className="py-5 flex flex-col space-y-6 px-4">
                            <Link to="/" className="flex items-center py-3 text-gray-700 hover:bg-gray-50">
                                <i className="fas fa-home mr-3 text-blue-500"></i> Home
                            </Link>
                            <button
                                onClick={() => dispatch(toggleCategories())}
                                className="flex items-center justify-between py-3 text-gray-700 hover:bg-gray-50"
                            >
                                <span className="flex items-center">
                                    <i className="fas fa-th-large mr-3 text-blue-500"></i> Categories
                                </span>
                                <i className={`fas text-sm ${categoriesOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
                            </button>
                            {categoriesOpen && (
                                <div className="bg-gray-50">
                                    {['Games', 'Accounts', 'Programs', 'Digital Cards', 'Subscriptions', 'Programming'].map((item, i) => (
                                        <Link key={i} to="/shop" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100">
                                            <i className="fas fa-circle mr-3 text-gray-500 text-sm"></i> {item}
                                        </Link>
                                    ))}
                                </div>
                            )}
                            <div className="border-t pt-4">
                                {['Sign In', 'Orders', 'Wishlist', 'Account Settings'].map((item, i) => (
                                    <Link key={i} to="/login" className="flex items-center py-3 text-gray-700 hover:bg-gray-100">
                                        <i className={`fas fa-${['sign-in-alt', 'box', 'heart', 'cog'][i]} mr-3 text-blue-500`}></i> {item}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
