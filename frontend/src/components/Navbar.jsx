// src/components/Header.jsx
import React, { useRef, useEffect } from 'react';
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
import logo from '../assets/logo.png';

const Navbar = () => {
    const dispatch = useDispatch();
    const { categoriesOpen, cartOpen, profileOpen, mobileSidebarOpen, searchOpen } =
        useSelector((state) => state.navbar);

    // Refs for delayed closing of dropdowns.
    const categoriesTimeoutRef = useRef(null);
    const cartTimeoutRef = useRef(null);

    // Ref for profile dropdown container (used for click-outside)
    const profileRef = useRef(null);

    // --- Profile Dropdown: Close when clicking outside ---
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                dispatch(setProfileOpen(false));
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatch]);

    // --- Categories Dropdown handlers with delay ---
    const handleCategoriesMouseEnter = () => {
        if (categoriesTimeoutRef.current) clearTimeout(categoriesTimeoutRef.current);
        dispatch(setCategoriesOpen(true));
    };

    const handleCategoriesMouseLeave = () => {
        categoriesTimeoutRef.current = setTimeout(() => {
            dispatch(setCategoriesOpen(false));
        }, 150); // 150ms delay before closing
    };

    // --- Cart Dropdown handlers with delay ---
    const handleCartMouseEnter = () => {
        if (cartTimeoutRef.current) clearTimeout(cartTimeoutRef.current);
        dispatch(setCartOpen(true));
    };

    const handleCartMouseLeave = () => {
        cartTimeoutRef.current = setTimeout(() => {
            dispatch(setCartOpen(false));
        }, 150);
    };

    // Sample static cart data (for demonstration)
    const cart = {
        items: [
            { name: 'Game Item 1', price: 7.99 },
            { name: 'Subscription', price: 7.0 },
        ],
    };
    const cartTotal = cart.items.reduce((sum, item) => sum + item.price, 0);

    return (
        <header>
            <nav className="bg-[#FFDF00] text-[#514F4F] shadow-lg w-full">
                <div className="container mx-auto flex justify-between items-center h-16 px-4 md:px-8">
                    {/* ------------------ Logo ------------------ */}
                    <div className="logo flex items-center">
                        <a href="index.html">
                            <img src={logo} alt="Game Station Logo" className="max-h-12" />
                        </a>
                    </div>

                    {/* ------------------ Desktop Search ------------------ */}
                    <div className="hidden lg:flex items-center w-1/2 lg:w-1/3">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-white rounded-full border border-gray-300 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                    </div>

                    {/* ------------------ Categories Dropdown (Desktop) ------------------ */}
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
                            <div
                                className="absolute left-0 mt-2 w-56 rounded-xl shadow-2xl bg-white border border-gray-100 z-50 transition-all duration-300"
                                onMouseEnter={handleCategoriesMouseEnter}
                                onMouseLeave={handleCategoriesMouseLeave}
                            >
                                <div className="py-2">
                                    <a
                                        href="shop.html"
                                        className="dropdown-item px-4 py-3 text-gray-700 flex items-center space-x-3 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition ease-in-out duration-200"
                                    >
                                        <i className="fas fa-gamepad text-lg text-gray-500"></i>
                                        <span>Games</span>
                                    </a>
                                    <a
                                        href="shop.html"
                                        className="dropdown-item px-4 py-3 text-gray-700 flex items-center space-x-3 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition ease-in-out duration-200"
                                    >
                                        <i className="fas fa-user-circle text-lg text-gray-500"></i>
                                        <span>Accounts</span>
                                    </a>
                                    <a
                                        href="shop.html"
                                        className="dropdown-item px-4 py-3 text-gray-700 flex items-center space-x-3 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition ease-in-out duration-200"
                                    >
                                        <i className="fas fa-code text-lg text-gray-500"></i>
                                        <span>Programs</span>
                                    </a>
                                    <a
                                        href="shop.html"
                                        className="dropdown-item px-4 py-3 text-gray-700 flex items-center space-x-3 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition ease-in-out duration-200"
                                    >
                                        <i className="fas fa-credit-card text-lg text-gray-500"></i>
                                        <span>Digital Cards</span>
                                    </a>
                                    <a
                                        href="shop.html"
                                        className="dropdown-item px-4 py-3 text-gray-700 flex items-center space-x-3 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition ease-in-out duration-200"
                                    >
                                        <i className="fas fa-sync-alt text-lg text-gray-500"></i>
                                        <span>Subscriptions</span>
                                    </a>
                                    <a
                                        href="shop.html"
                                        className="dropdown-item px-4 py-3 text-gray-700 flex items-center space-x-3 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition ease-in-out duration-200"
                                    >
                                        <i className="fas fa-laptop-code text-lg text-gray-500"></i>
                                        <span>Programming</span>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ------------------ Desktop Navigation ------------------ */}
                    <a
                        href="index.html"
                        className="flex items-center space-x-2 hover-effect hidden lg:block"
                    >
                        <i className="fas fa-home text-gray-700"></i>
                        <span className="text-gray-700">Home</span>
                    </a>

                    {/* ------------------ Cart ------------------ */}
                    <div
                        className="relative"
                        onMouseEnter={handleCartMouseEnter}
                        onMouseLeave={handleCartMouseLeave}
                    >
                        <a
                            href="cart.html"
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition ease-in-out duration-200"
                        >
                            <i className="fas fa-shopping-cart text-gray-700 text-xl"></i>
                            <span className="text-gray-700">Cart</span>
                            {cart.items.length > 0 && (
                                <span className="cart-badge bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {cart.items.length}
                                </span>
                            )}
                        </a>
                        {cartOpen && (
                            <div
                                className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 transition-all duration-300"
                                onMouseEnter={handleCartMouseEnter}
                                onMouseLeave={handleCartMouseLeave}
                            >
                                <h3 className="font-semibold text-lg p-4 border-b border-gray-100">
                                    Your Cart
                                </h3>
                                <ul className="p-4 space-y-3 max-h-64 overflow-y-auto">
                                    {cart.items.map((item, index) => (
                                        <li key={index} className="flex justify-between items-center">
                                            <span className="text-gray-700">{item.name}</span>
                                            <span className="text-gray-700 font-medium">
                                                JD {item.price.toFixed(2)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="p-4 border-t border-gray-100">
                                    <div className="flex justify-between font-semibold text-gray-700">
                                        <span>Total:</span>
                                        <span>JD {cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <a
                                        href="checkout.html"
                                        className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-700 transition ease-in-out duration-200"
                                    >
                                        <i className="fas fa-credit-card mr-2"></i>
                                        <span>Checkout</span>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ------------------ Profile (Desktop) ------------------ */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {/* Attach a ref to the container to detect clicks outside */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => dispatch(toggleProfile())}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') dispatch(toggleProfile());
                                }}
                                className="p-2 rounded-full hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
                                aria-label="Toggle profile dropdown"
                            >
                                <i className="fas fa-user-circle text-2xl text-gray-700"></i>
                            </button>
                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 transition-all duration-300">
                                    <a
                                        href="login.html"
                                        className="dropdown-item flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition ease-in-out duration-150"
                                    >
                                        <i className="fas fa-sign-in-alt mr-3 text-gray-500"></i>
                                        <span>Sign Out</span>
                                    </a>
                                    <a
                                        href="orders.html"
                                        className="dropdown-item flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition ease-in-out duration-150"
                                    >
                                        <i className="fas fa-box mr-3 text-gray-500"></i>
                                        <span>Orders</span>
                                    </a>
                                    <a
                                        href="wishlist.html"
                                        className="dropdown-item flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition ease-in-out duration-150"
                                    >
                                        <i className="fas fa-heart mr-3 text-gray-500"></i>
                                        <span>Wishlist</span>
                                    </a>
                                    <a
                                        href="account-settings.html"
                                        className="dropdown-item flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition ease-in-out duration-150"
                                    >
                                        <i className="fas fa-cog mr-3 text-gray-500"></i>
                                        <span>Account Settings</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ------------------ Mobile Section ------------------ */}
                    <div className="flex lg:hidden items-center space-x-6">
                        {/* Mobile Search Icon */}
                        <button
                            onClick={() => dispatch(toggleSearch())}
                            aria-label="Toggle Search Bar"
                            className="p-2 rounded-full hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-500 transition ease-in-out duration-200"
                        >
                            <i className="fas fa-search text-xl text-gray-700"></i>
                        </button>
                        {/* Hamburger Menu */}
                        <button
                            onClick={() => dispatch(toggleMobileSidebar())}
                            aria-label="Toggle Sidebar Menu"
                            className="p-2 rounded-full hover:bg-yellow-400 focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
                        >
                            <div className="w-6 h-6 flex flex-col justify-between items-center">
                                <span
                                    className={`block h-0.5 w-full bg-gray-700 transform transition duration-200 ${mobileSidebarOpen ? 'rotate-45 translate-y-2.5' : ''
                                        }`}
                                ></span>
                                <span
                                    className={`block h-0.5 w-full bg-gray-700 transition duration-200 ${mobileSidebarOpen ? 'opacity-0' : ''
                                        }`}
                                ></span>
                                <span
                                    className={`block h-0.5 w-full bg-gray-700 transform transition duration-200 ${mobileSidebarOpen ? '-rotate-45 -translate-y-2.5' : ''
                                        }`}
                                ></span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* ------------------ Mobile Search Bar ------------------ */}
                {searchOpen && (
                    <div className="lg:hidden fixed top-16 left-0 w-full bg-white p-4 shadow-lg z-40 transition-opacity duration-300">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full rounded-full border border-gray-300 px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}

                {/* ------------------ Mobile Sidebar Menu ------------------ */}
                {mobileSidebarOpen && (
                    <div className="lg:hidden fixed inset-0 z-50 transition-opacity duration-300">
                        {/* Overlay */}
                        <div
                            onClick={() => dispatch(setMobileSidebar(false))}
                            className="fixed inset-0 bg-black/50"
                        ></div>
                        <aside
                            className="fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-yellow-300 via-white to-white shadow-lg z-50 overflow-y-auto rounded-tr-lg rounded-br-lg transition-transform duration-300"
                            role="menu"
                            aria-expanded="true"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => dispatch(setMobileSidebar(false))}
                                className="absolute top-4 right-4 p-2 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 rounded-full transition ease-in-out duration-200"
                                aria-label="Close Sidebar Menu"
                            >
                                <i className="fas fa-times text-xl"></i>
                            </button>
                            <div className="py-5">
                                <div className="flex flex-col space-y-6">
                                    <a
                                        href="index.html"
                                        className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
                                        role="menuitem"
                                    >
                                        <i className="fas fa-home mr-3 text-blue-500"></i>
                                        Home
                                    </a>
                                    <div className="border-t border-gray-100">
                                        <button
                                            onClick={() => dispatch(toggleCategories())}
                                            className="flex items-center px-6 py-3 w-full text-left justify-between text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
                                            aria-expanded="false"
                                            aria-label="Toggle Categories"
                                        >
                                            <span>
                                                <i className="fas fa-th-large mr-3 text-blue-500"></i>
                                                Categories
                                            </span>
                                            <i className={`fas text-sm ${categoriesOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                        </button>
                                        {categoriesOpen && (
                                            <div className="bg-gray-50">
                                                <a
                                                    href="shop.html"
                                                    className="dropdown-item px-4 py-3 text-gray-700 flex items-center space-x-3 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition ease-in-out duration-200"
                                                >
                                                    <i className="fas fa-gamepad text-lg text-gray-500"></i>
                                                    <span>Games</span>
                                                </a>
                                                <a
                                                    href="shop.html"
                                                    className="dropdown-item px-4 py-3 text-gray-700 flex items-center space-x-3 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition ease-in-out duration-200"
                                                >
                                                    <i className="fas fa-user-circle text-lg text-gray-500"></i>
                                                    <span>Accounts</span>
                                                </a>
                                                <a
                                                    href="shop.html"
                                                    className="dropdown-item px-4 py-3 text-gray-700 flex items-center space-x-3 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition ease-in-out duration-200"
                                                >
                                                    <i className="fas fa-code text-lg text-gray-500"></i>
                                                    <span>Programs</span>
                                                </a>
                                                <a
                                                    href="shop.html"
                                                    className="dropdown-item px-4 py-3 text-gray-700 flex items-center space-x-3 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition ease-in-out duration-200"
                                                >
                                                    <i className="fas fa-credit-card text-lg text-gray-500"></i>
                                                    <span>Digital Cards</span>
                                                </a>
                                                <a
                                                    href="shop.html"
                                                    className="dropdown-item px-4 py-3 text-gray-700 flex items-center space-x-3 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition ease-in-out duration-200"
                                                >
                                                    <i className="fas fa-sync-alt text-lg text-gray-500"></i>
                                                    <span>Subscriptions</span>
                                                </a>
                                                <a
                                                    href="shop.html"
                                                    className="dropdown-item px-4 py-3 text-gray-700 flex items-center space-x-3 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition ease-in-out duration-200"
                                                >
                                                    <i className="fas fa-laptop-code text-lg text-gray-500"></i>
                                                    <span>Programming</span>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                    <div className="border-t border-gray-100">
                                    <a
                                            href="login.html"
                                            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
                                            role="menuitem"
                                        >
                                            <i className="fas fa-sign-in-alt text-blue-500 mr-3"></i>
                                            Sign In
                                        </a>
                                        <a
                                            href="login.html"
                                            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
                                            role="menuitem"
                                        >
                                            <i className="fas fa-box text-blue-500 mr-3"></i>
                                            Orders
                                        </a>
                                        <a
                                            href="login.html"
                                            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
                                            role="menuitem"
                                        >
                                            <i className="fas fa-heart text-blue-500 mr-3"></i>
                                            Wishlist
                                        </a>
                                        <a
                                            href="account-settings.html"
                                            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
                                            role="menuitem"
                                        >
                                            <i className="fas fa-cog text-blue-500 mr-3"></i>
                                            Account Settings
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
