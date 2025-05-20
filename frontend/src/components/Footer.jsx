// src/components/Footer.jsx
import React from 'react';
import {
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn,
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLongArrowAltRight
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Services', path: '/services' },

    { name: 'Games', path: '/shop' },
    { name: 'Contact', path: '/contact' },
  ];


  const serviceLinks = [
    { name: 'Games Top Played', path: '/top-played' },
    { name: 'eSports Games', path: '/shop?category=5' },
    { name: 'Gaming Accounts', path: '/shop?category=2' },
    { name: 'Subscriptions', path: '/shop?category=1' },
    { name: 'Support', path: '/contact' },
    { name: 'Join Us', path: '/register' },
  ];

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
                <p>Amman, Jordan</p>
              </div>
              <div className="flex items-center text-gray-400 hover:text-[#FFDF00] transition duration-300">
                <FaPhoneAlt className="mr-3 text-[#FFDF00]" />
                <p>+962 7 888 62 798</p>
              </div>
              <div className="flex items-center text-gray-400 hover:text-[#FFDF00] transition duration-300">
                <FaEnvelope className="mr-3 text-[#FFDF00]" />
                <p>07asn.m@gmail.com</p>
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
              {quickLinks.map((item) => (
                <li key={item.name} className="group">
                  <Link
                    to={item.path}
                    className="flex items-center text-gray-400 group-hover:text-[#FFDF00] transition-all duration-300 group-hover:translate-x-2"
                  >
                    <FaLongArrowAltRight className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {item.name}
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
              {serviceLinks.map((item) => (
                <li key={item.name} className="group">
                  <Link
                    to={item.path}
                    className="flex items-center text-gray-400 group-hover:text-[#FFDF00] transition-all duration-300 group-hover:translate-x-2"
                  >
                    <FaLongArrowAltRight className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social Media */}
          <div>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                {[
                  { icon: <FaFacebookF className="text-[#1a1a1a]" />, url: 'https://www.facebook.com/profile.php?id=100004036249506' },
                  { icon: <FaTwitter className="text-[#1a1a1a]" />, url: 'https://x.com/O7asn' },
                  { icon: <FaInstagram className="text-[#1a1a1a]" />, url: 'https://www.instagram.com/07asn/' },
                  { icon: <FaLinkedinIn className="text-[#1a1a1a]" />, url: 'https://www.linkedin.com/in/07asn/' }
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
              {/* Make sure these pages exist or update the paths accordingly */}
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
