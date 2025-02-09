// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#1a1a1a] text-white">
            {/* Main Footer Section */}
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-[#DFBF00]">Company Name</h3>
                        <p className="text-gray-300">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisi vel consectetur
                            interdum, nisl nisi consectetur nisi, euismod aliquam nisl nisi eu nunc.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-[#DFBF00]">Quick Links</h3>
                        <ul>
                            <li className="mb-2 hover:text-gray-300 transition-colors">
                                <a href="#">Home</a>
                            </li>
                            <li className="mb-2 hover:text-gray-300 transition-colors">
                                <a href="#">About Us</a>
                            </li>
                            <li className="mb-2 hover:text-gray-300 transition-colors">
                                <a href="#">Services</a>
                            </li>
                            <li className="mb-2 hover:text-gray-300 transition-colors">
                                <a href="#">Contact</a>
                            </li>
                            <li className="mb-2 hover:text-gray-300 transition-colors">
                                <a href="#">Blog</a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-[#DFBF00]">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-[#3b5998] hover:bg-gray-200 transition-colors"
                            >
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                                className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-[#1DA1F2] hover:bg-gray-200 transition-colors"
                            >
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-[#E4405F] hover:bg-gray-200 transition-colors"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-[#0077B5] hover:bg-gray-200 transition-colors"
                            >
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#1a1a1a] py-4 border-t-1 border-[#DFBF00]">
                <div className="container mx-auto px-4 text-center">
                    <p className=" text-sm">
                        &copy; {new Date().getFullYear()} 07ASN. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
