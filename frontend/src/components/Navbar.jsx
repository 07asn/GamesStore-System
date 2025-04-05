// src/components/Navbar.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import {
  toggleCategories,
  setCategoriesOpen,
  toggleCart,
  setCartOpen,
  toggleMobileSidebar,
  setMobileSidebar,
  toggleSearch,
} from '../redux/navbarSlice';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/logo.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux states for other navbar parts
  const { categoriesOpen, cartOpen, mobileSidebarOpen, searchOpen } = useSelector((state) => state.navbar);

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Dynamic categories state
  const [categories, setCategories] = useState([]);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Cart state from localStorage
  const [cartItems, setCartItems] = useState([]);

  const profileRef = useRef(null);
  const categoriesTimeoutRef = useRef(null);
  const cartTimeoutRef = useRef(null);

  // Check for token in cookies on mount
  useEffect(() => {
    const token = Cookies.get('token');
    console.log("Navbar: token from cookies:", token);
    setIsLoggedIn(!!token);
  }, []);

  // Fetch auth status from backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users/status', { withCredentials: true })
      .then((res) => {
        if (res.data.loggedIn && res.data.user) {
          setIsLoggedIn(true);
          // Set isAdmin based on the role returned from backend
          setIsAdmin(res.data.user.role === 'admin');
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching auth status:', err);
        setIsLoggedIn(false);
        setIsAdmin(false);
      });
  }, []);

  // Listen for custom event to update auth state after login
  useEffect(() => {
    const handleUserLoggedIn = () => {
      const token = Cookies.get('token');
      setIsLoggedIn(!!token);
    };
    window.addEventListener('userLoggedIn', handleUserLoggedIn);
    return () => window.removeEventListener('userLoggedIn', handleUserLoggedIn);
  }, []);

  // Fetch categories from API
  useEffect(() => {
    axios.get('http://localhost:5000/api/categories/all')
      .then((response) => {
        console.log("Fetched categories:", response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
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

  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce((sum, item) => {
    let price = 0;
    if (item.price) {
      price = parseFloat(item.price.replace(/[^\d.]/g, '').trim()) || 0;
    }
    return sum + price * (item.quantity || 1);
  }, 0);

  // Debounce product search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        axios
          .get(`http://localhost:5000/api/products/search?q=${encodeURIComponent(searchQuery)}`)
          .then((response) => {
            setSearchResults(response.data);
          })
          .catch((err) => {
            console.error("Error searching products:", err);
            setSearchResults([]);
          });
      } else {
        setSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Categories mouse handlers
  const handleCategoriesMouseEnter = () => {
    if (categoriesTimeoutRef.current) clearTimeout(categoriesTimeoutRef.current);
    dispatch(setCategoriesOpen(true));
  };

  const handleCategoriesMouseLeave = () => {
    categoriesTimeoutRef.current = setTimeout(() => {
      dispatch(setCategoriesOpen(false));
    }, 150);
  };

  // Cart mouse handlers
  const handleCartMouseEnter = () => {
    if (cartTimeoutRef.current) clearTimeout(cartTimeoutRef.current);
    dispatch(setCartOpen(true));
  };

  const handleCartMouseLeave = () => {
    cartTimeoutRef.current = setTimeout(() => {
      dispatch(setCartOpen(false));
    }, 150);
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Profile icon click: if not logged in, navigate to login; otherwise, toggle dropdown.
  const handleProfileClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setProfileOpen((prev) => !prev);
    }
  };

  // Logout: remove token from cookies and navigate to login.
  const handleLogout = () => {
    Cookies.remove('token', { path: '/' });
    setIsLoggedIn(false);
    setProfileOpen(false);
    navigate('/login');
  };

  // Build navigation items for the profile dropdown
  const navItems = [
    { label: 'Orders', icon: 'scroll', to: '/orders' },
    { label: 'Wishlist', icon: 'heart', to: '/wishlist' },
    { label: 'Profile', icon: 'user', to: '/profile' },
    ...(isAdmin ? [{ label: 'Admin', icon: 'user-shield', to: '/admin' }] : []),
  ];

  return (
    <nav className="bg-[#FFDF00] text-[#514F4F] shadow-lg w-full sticky top-0 z-40 font-['Rajdhani'] border-b-4 border-[#514F4F]/30">
      {/* Animated gaming border effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#514F4F] to-transparent opacity-70 animate-pulse"></div>
      
      <div className="container mx-auto flex justify-between items-center h-20 px-4 md:px-8 relative">
        {/* Gaming Style Logo */}
        <div className="logo-container relative py-3 group">
          <Link to="/" className="flex items-center">
            <div className="relative overflow-hidden rounded-lg transform group-hover:rotate-[-5deg] transition-all duration-300">
              <img
                src={logo}
                alt="07ASN Logo"
                className="h-14 w-auto object-contain filter drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#514F4F]/20 to-[#514F4F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 border-2 border-[#514F4F]/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <div className="ml-4 relative">
              <span className="font-bold text-2xl tracking-tight md:block text-[#514F4F]">
                07ASN
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#514F4F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </div>
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center w-1/2 lg:w-1/3 relative mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search games, gear, more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white rounded-full border-2 border-[#514F4F]/30 px-5 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-[#514F4F] focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-[#514F4F]/20 text-[#514F4F] placeholder-[#514F4F]/70"
            />
            <i className="fas fa-search absolute right-4 top-3.5 text-[#514F4F]"></i>
          </div>
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border-2 border-[#514F4F]/30 rounded-xl shadow-2xl z-50 mt-1 overflow-hidden animate-fadeIn">
              <ul className="max-h-96 overflow-y-auto">
                {searchResults.map((product) => (
                  <li key={product.product_id} className="border-b border-gray-200 last:border-0 hover:bg-[#FFDF00]/10 transition-colors duration-200">
                    <Link
                      to={`/products/${product.product_id}`}
                      className="flex items-center px-4 py-3"
                      onClick={() => setSearchQuery('')}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg overflow-hidden border border-[#514F4F]/20">
                        <img
                          src={
                            product.images && product.images.length > 0
                              ? product.images[0].image_url
                              : 'https://via.placeholder.com/40'
                          }
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <p className="font-medium text-[#514F4F] truncate">{product.name}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-[#514F4F] font-semibold">
                            ${product.discounted_price || product.price}
                          </span>
                          {product.discounted_price && (
                            <span className="ml-2 text-sm text-[#514F4F]/70 line-through">
                              ${product.price}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleCategoriesMouseEnter}
            onMouseLeave={handleCategoriesMouseLeave}
          >
            <button
              onClick={() => dispatch(toggleCategories())}
              className="flex items-center space-x-2 p-2.5 rounded-lg hover:bg-[#FFDF00]/80 focus:outline-none transition-all duration-200 group relative overflow-hidden"
            >
              <i className="fa-solid fa-list text-[#514F4F] group-hover:text-[#514F4F]/90 transition-colors duration-200"></i>
              <span className="font-medium group-hover:text-[#514F4F]/90 transition-colors duration-200">Categories</span>
              <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${categoriesOpen ? 'transform rotate-180' : ''} text-[#514F4F]`}></i>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#514F4F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
            {categoriesOpen && (
              <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-2xl bg-white border-2 border-[#514F4F]/30 z-50 animate-fadeInUp">
                <div className="py-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.category_id}
                      to={`/shop?category=${cat.category_id}`}
                      className="flex items-center px-4 py-3 text-[#514F4F] hover:bg-[#FFDF00]/20 hover:text-[#514F4F]/90 transition-colors duration-200"
                      onClick={() => dispatch(setCategoriesOpen(false))}
                    >
                      <i className="fas fa-gamepad mr-3 text-[#514F4F] text-xs"></i>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Top Games Link */}
          <Link 
            to="/top-played" 
            className="flex items-center space-x-2 p-2.5 rounded-lg hover:bg-[#FFDF00]/80 transition-all duration-200 group relative"
          >
            <i className="fas fa-trophy text-[#514F4F] group-hover:text-[#514F4F]/90 transition-colors duration-200"></i>
            <span className="font-medium group-hover:text-[#514F4F]/90 transition-colors duration-200">Top Games</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#514F4F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>


          {/* Cart */}
          <div className="relative" onMouseEnter={handleCartMouseEnter} onMouseLeave={handleCartMouseLeave}>
            <Link 
              to="/cart" 
              className="flex items-center space-x-2 p-2.5 rounded-lg hover:bg-[#FFDF00]/80 transition-all duration-200 group relative"
            >
              <i className="fas fa-shopping-cart text-[#514F4F] text-xl group-hover:text-[#514F4F]/90 transition-colors duration-200"></i>
              <span className="font-medium group-hover:text-[#514F4F]/90 transition-colors duration-200">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#514F4F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            {cartOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border-2 border-[#514F4F]/30 rounded-xl shadow-2xl z-50 animate-fadeInUp">
                <h3 className="font-semibold text-lg p-4 border-b border-gray-200 bg-[#FFDF00]/20 rounded-t-xl text-[#514F4F]">
                  Your Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                </h3>
                <ul className="p-4 space-y-3 max-h-64 overflow-y-auto">
                  {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                      <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0 hover:bg-[#FFDF00]/10 transition-colors duration-200">
                        <span className="text-[#514F4F]/90 truncate max-w-[180px]">{item.name}</span>
                        <span className="text-[#514F4F] font-medium whitespace-nowrap">
                          ${parseFloat(item.price.replace(/[^\d.]/g, '').trim()).toFixed(2)}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-center py-4 text-[#514F4F]/70">Your cart is empty</li>
                  )}
                </ul>
                {cartItems.length > 0 && (
                  <>
                    <div className="p-4 border-t border-gray-200 flex justify-between font-semibold text-[#514F4F] bg-[#FFDF00]/20">
                      <span>Total:</span>
                      <span className="text-[#514F4F]">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="p-4">
                      <Link
                        to="/cart"
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#514F4F] text-[#FFDF00] font-semibold py-2.5 px-6 shadow-lg hover:bg-[#514F4F]/90 focus:outline-none focus:ring-2 focus:ring-[#514F4F] transition-all duration-300 hover:shadow-[#514F4F]/30"
                        aria-label="Go to cart"
                      >
                        <i className="fas fa-shopping-cart"></i>
                        <span className="text-base">View Cart</span>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={handleProfileClick}
              className="p-2.5 rounded-full hover:bg-[#FFDF00]/80 focus:outline-none focus:ring-2 focus:ring-[#514F4F] transition-all duration-200 group relative"
              aria-label="Toggle profile dropdown"
            >
              <i className="fas fa-user-circle text-2xl text-[#514F4F] group-hover:text-[#514F4F]/90 transition-colors duration-200"></i>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#514F4F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-[#514F4F]/30 rounded-xl shadow-xl z-50 animate-fadeInUp overflow-hidden">
                <div className="py-1">
                  {navItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.to}
                      className="flex items-center px-4 py-3 text-[#514F4F] hover:bg-[#FFDF00]/20 hover:text-[#514F4F]/90 transition-colors duration-200"
                      onClick={() => setProfileOpen(false)}
                    >
                      <i className={`fas fa-${item.icon} mr-3 text-[#514F4F]`}></i>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-[#514F4F] hover:bg-[#FFDF00]/20 hover:text-red-500 transition-colors duration-200 text-left"
                  >
                    <i className="fas fa-sign-out-alt mr-3 text-[#514F4F]"></i>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search + Hamburger */}
        <div className="flex lg:hidden items-center space-x-5">
          <button
            onClick={() => dispatch(toggleSearch())}
            aria-label="Toggle Search Bar"
            className="p-2 rounded-full hover:bg-[#FFDF00]/80 focus:outline-none transition-all duration-200 relative"
          >
            <i className="fas fa-search text-xl text-[#514F4F]"></i>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#514F4F] transform scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
          <Link to="/cart" className="p-2 relative">
            <i className="fas fa-shopping-cart text-xl text-[#514F4F]"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-pulse">
                {cartCount}
              </span>
            )}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#514F4F] transform scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <button
            onClick={() => dispatch(toggleMobileSidebar())}
            aria-label="Toggle Sidebar Menu"
            className="p-2 rounded-full hover:bg-[#FFDF00]/80 focus:outline-none transition-all duration-200 relative"
          >
            <div className="w-7 h-7 flex flex-col justify-between items-center">
              <span 
                className={`block h-0.5 w-full bg-[#514F4F] transform transition duration-300 ease-out ${mobileSidebarOpen ? 'rotate-45 translate-y-3' : ''}`} 
              />
              <span 
                className={`block h-0.5 w-full bg-[#514F4F] transition duration-200 ease-out ${mobileSidebarOpen ? 'opacity-0' : 'opacity-100'}`} 
              />
              <span 
                className={`block h-0.5 w-full bg-[#514F4F] transform transition duration-300 ease-out ${mobileSidebarOpen ? '-rotate-45 -translate-y-3' : ''}`} 
              />
            </div>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#514F4F] transform scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
        </div>
      </div>

      {/* Mobile Search Input */}
      {searchOpen && (
        <div className="lg:hidden fixed top-20 left-0 w-full bg-[#FFDF00] p-4 shadow-lg z-40 animate-slideDown border-t-4 border-[#514F4F]/30">
          <div className="relative">
            <input
              type="text"
              placeholder="Search games, gear, more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-white border-2 border-[#514F4F]/30 px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#514F4F] focus:border-transparent text-[#514F4F] placeholder-[#514F4F]/70"
            />
            <i className="fas fa-search absolute right-4 top-3 text-[#514F4F]"></i>
          </div>
          {searchResults.length > 0 && (
            <div className="mt-2 bg-white border-2 border-[#514F4F]/30 rounded-lg shadow-lg max-h-80 overflow-y-auto">
              <ul>
                {searchResults.map((product) => (
                  <li key={product.product_id} className="border-b border-gray-200 hover:bg-[#FFDF00]/10 transition-colors duration-200">
                    <Link
                      to={`/products/${product.product_id}`}
                      className="flex items-center px-4 py-3"
                      onClick={() => {
                        setSearchQuery('');
                        dispatch(toggleSearch());
                      }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded overflow-hidden border border-[#514F4F]/20">
                        <img
                          src={
                            product.images && product.images.length > 0
                              ? product.images[0].image_url
                              : 'https://via.placeholder.com/40'
                          }
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-[#514F4F]">{product.name}</div>
                        <div className="text-sm text-[#514F4F]/90">
                          ${product.discounted_price || product.price}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            onClick={() => dispatch(setMobileSidebar(false))} 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
          ></div>
          <aside className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-[#FFDF00] shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out border-l-4 border-[#514F4F]/30">
            <div className="flex items-center justify-between p-4 border-b border-[#514F4F]/30 bg-[#DFBF00]">
              <div className="flex items-center">
                <div className="relative overflow-hidden rounded-lg">
                  <img src={logo} alt="07ASN Logo" className="max-h-10" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#514F4F]/20 to-[#514F4F]/10"></div>
                </div>
                <span className="ml-3 font-bold text-xl text-[#514F4F]">07ASN</span>
              </div>
              <button
                onClick={() => dispatch(setMobileSidebar(false))}
                className="p-2 text-[#514F4F] hover:bg-[#FFDF00]/80 rounded-full focus:outline-none"
                aria-label="Close Sidebar Menu"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="py-5 flex flex-col space-y-1 px-4">
              <Link 
                to="/" 
                onClick={() => dispatch(setMobileSidebar(false))}
                className="flex items-center py-3 px-4 text-[#514F4F] hover:bg-[#FFDF00]/80 rounded-lg transition-colors duration-200"
              >
                <i className="fas fa-home mr-3 text-[#514F4F]"></i> 
                <span>Home</span>
              </Link>
              
              <Link 
                to="/top-played" 
                onClick={() => dispatch(setMobileSidebar(false))}
                className="flex items-center py-3 px-4 text-[#514F4F] hover:bg-[#FFDF00]/80 rounded-lg transition-colors duration-200"
              >
                <i className="fas fa-trophy mr-3 text-[#514F4F]"></i> 
                <span>Top Games</span>
              </Link>
              
              <button
                onClick={() => dispatch(toggleCategories())}
                className="flex items-center justify-between py-3 px-4 text-[#514F4F] hover:bg-[#FFDF00]/80 rounded-lg transition-colors duration-200 w-full"
              >
                <span className="flex items-center">
                  <i className="fas fa-list mr-3 text-[#514F4F]"></i> 
                  <span>Categories</span>
                </span>
                <i className={`fas text-sm ${categoriesOpen ? 'fa-chevron-up' : 'fa-chevron-down'} text-[#514F4F]`} />
              </button>
              
              {categoriesOpen && (
                <div className="bg-black/10 rounded-lg overflow-hidden border border-[#514F4F]/30">
                  {categories.map((cat) => (
                    <Link
                      key={cat.category_id}
                      to={`/shop?category=${cat.category_id}`}
                      onClick={() => {
                        dispatch(setMobileSidebar(false));
                        dispatch(setCategoriesOpen(false));
                      }}
                      className="flex items-center px-6 py-3 text-[#514F4F] hover:bg-[#FFDF00]/60 transition-colors duration-200"
                    >
                      <i className="fas fa-gamepad mr-3 text-[#514F4F] text-xs"></i> 
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}
              
              <div className="border-t border-[#514F4F]/30 pt-4 mt-2">
                {isLoggedIn ? (
                  <>
                    {navItems.map((item, i) => (
                      <Link 
                        key={i}
                        to={item.to}
                        onClick={() => dispatch(setMobileSidebar(false))}
                        className="flex items-center py-3 px-4 text-[#514F4F] hover:bg-[#FFDF00]/80 rounded-lg transition-colors duration-200"
                      >
                        <i className={`fas fa-${item.icon} mr-3 text-[#514F4F]`}></i> 
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        handleLogout();
                        dispatch(setMobileSidebar(false));
                      }}
                      className="flex items-center w-full py-3 px-4 text-[#514F4F] hover:bg-[#FFDF00]/80 hover:text-red-500 rounded-lg transition-colors duration-200 text-left"
                    >
                      <i className="fas fa-sign-out-alt mr-3 text-[#514F4F]"></i>
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => dispatch(setMobileSidebar(false))}
                    className="flex items-center py-3 px-4 text-[#514F4F] hover:bg-[#FFDF00]/80 rounded-lg transition-colors duration-200"
                  >
                    <i className="fas fa-sign-in-alt mr-3 text-[#514F4F]"></i> 
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </div>
          </aside>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
