// src/components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-white relative">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFDF00]/30 via-[#FFDF00] to-[#FFDF00]/30"></div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">
                <span className="text-white">07</span>
                <span className="text-[#FFDF00]">ASN</span>
              </h2>
              <div className="w-16 h-1 bg-[#FFDF00] rounded-full mb-4"></div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Creating exceptional gaming experiences through innovation and passion. 
              Join our community and be part of the next generation of gaming.
            </p>
            <div className="space-y-4 pt-2">
              <div className="flex items-center text-gray-400 hover:text-[#FFDF00] transition duration-300">
                <FaMapMarkerAlt className="mr-3 text-[#FFDF00]" />
                <p>123 Gaming Street, Digital City</p>
              </div>
              <div className="flex items-center text-gray-400 hover:text-[#FFDF00] transition duration-300">
                <FaPhoneAlt className="mr-3 text-[#FFDF00]" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center text-gray-400 hover:text-[#FFDF00] transition duration-300">
                <FaEnvelope className="mr-3 text-[#FFDF00]" />
                <p>contact@07asn.com</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:ml-8">
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-2/3 h-1 bg-[#FFDF00] rounded-full -mb-2"></span>
            </h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Services', 'Games', 'Tournaments', 'Contact'].map((item) => (
                <li key={item} className="group">
                  <Link 
                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="flex items-center text-gray-400 group-hover:text-[#FFDF00] transition-all duration-300 group-hover:translate-x-2"
                  >
                    <FaLongArrowAltRight className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Our Services
              <span className="absolute bottom-0 left-0 w-2/3 h-1 bg-[#FFDF00] rounded-full -mb-2"></span>
            </h3>
            <ul className="space-y-3">
              {['Game Development', 'eSports Events', 'Gaming Community', 'Merchandise', 'Support', 'Partnerships'].map((item) => (
                <li key={item} className="group">
                  <Link 
                    to={`/services/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="flex items-center text-gray-400 group-hover:text-[#FFDF00] transition-all duration-300 group-hover:translate-x-2"
                  >
                    <FaLongArrowAltRight className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Stay Connected
              <span className="absolute bottom-0 left-0 w-2/3 h-1 bg-[#FFDF00] rounded-full -mb-2"></span>
            </h3>
            <p className="text-gray-400 mb-4">Subscribe to get the latest updates and news</p>
            
            {/* Newsletter Form */}
            <div className="flex flex-col space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg focus:outline-none focus:border-[#FFDF00] text-white placeholder-gray-500"
                />
                <button className="absolute right-1 top-1 bottom-1 px-4 bg-[#FFDF00] hover:bg-[#DFBF00] text-[#1a1a1a] font-medium rounded-md transition duration-300">
                  Subscribe
                </button>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                {[
                  { icon: <FaFacebookF className="text-[#1a1a1a]" />, color: '#3b5998', url: 'https://facebook.com' },
                  { icon: <FaTwitter className="text-[#1a1a1a]" />, color: '#1DA1F2', url: 'https://twitter.com' },
                  { icon: <FaInstagram className="text-[#1a1a1a]" />, color: '#E4405F', url: 'https://instagram.com' },
                  { icon: <FaLinkedinIn className="text-[#1a1a1a]" />, color: '#0077B5', url: 'https://linkedin.com' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.url.split('https://')[1].split('.com')[0]}`}
                    className="group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700 group-hover:bg-[#FFDF00] transition-all duration-300 transform group-hover:-translate-y-1">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} <span className="text-[#FFDF00]">07ASN</span>. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-[#FFDF00] text-sm transition duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-500 hover:text-[#FFDF00] text-sm transition duration-300">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-500 hover:text-[#FFDF00] text-sm transition duration-300">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;