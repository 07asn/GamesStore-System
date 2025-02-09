// src/components/HelperHeader.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage, setCurrency, toggleTheme } from '../redux/headerSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { language, currency, theme } = useSelector((state) => state.header);

  const handleLanguageToggle = () => {
    dispatch(toggleLanguage());
  };

  const handleCurrencyChange = (event) => {
    dispatch(setCurrency(event.target.value));
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    
  };

  return (
    <div className="bg-[#DFBF00] shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between text-gray-800 text-sm">
        {/* Social Media Icons */}
        <ul className="flex space-x-4 mb-2 md:mb-0">
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex items-center justify-center w-8 h-8 bg-white rounded-full text-[#3b5998] hover:bg-opacity-80 transition-colors"
            >
              <i className="fab fa-facebook-f text-sm"></i>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="flex items-center justify-center w-8 h-8 bg-white rounded-full text-[#1DA1F2] hover:bg-opacity-80 transition-colors"
            >
              <i className="fab fa-twitter text-sm"></i>
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center w-8 h-8 bg-white rounded-full text-[#E4405F] hover:bg-opacity-80 transition-colors"
            >
              <i className="fab fa-instagram text-sm"></i>
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-8 h-8 bg-white rounded-full text-[#0077B5] hover:bg-opacity-80 transition-colors"
            >
              <i className="fab fa-linkedin-in text-sm"></i>
            </a>
          </li>
        </ul>

        {/* Right Side: Language, Currency, and Theme Toggle */}
        <div className="flex items-center space-x-6">
          {/* Language Toggle */}
          <button
            onClick={handleLanguageToggle}
            className="flex items-center space-x-1 font-semibold hover:text-gray-700 focus:outline-none"
            aria-label="Toggle Language"
          >
            <i className="fas fa-globe"></i>
            <span>{language}</span>
          </button>

          {/* Currency Dropdown */}
          <div>
            <select
              value={currency}
              onChange={handleCurrencyChange}
              className="bg-white font-semibold border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
              aria-label="Select Currency"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JOD">JOD</option>
              <option value="SAR">SAR</option>
            </select>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="flex items-center space-x-1 font-semibold p-2 rounded-full hover:bg-white hover:text-gray-700 transition-colors focus:outline-none"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <>
                <i className="fas fa-sun text-yellow-500"></i>
                <span>Light</span>
              </>
            ) : (
              <>
                <i className="fas fa-moon text-gray-700"></i>
                <span>Night</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
