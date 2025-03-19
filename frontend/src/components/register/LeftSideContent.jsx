import React from 'react';
import { Link } from 'react-router-dom';

const LeftSideContent = () => {
    return (
        <div className="hidden md:block md:col-span-2 space-y-8">
            <div>
                <h1 className="text-4xl font-bold mb-3">
                    <span className="text-gray-800">Join Our </span>
                    <span className="text-[#DFBF00]">Community</span>
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                    Create your account today and get access to exclusive gaming content and deals tailored just for you.
                </p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-xl border border-gray-100 mt-12">
                <h3 className="font-bold text-lg mb-4">Why Join 7SN Store?</h3>
                <ul className="space-y-3">
                    <li className="flex items-start">
                        <div className="w-6 h-6 bg-[#DFBF00] rounded-full flex items-center justify-center text-white mt-0.5 mr-3">✓</div>
                        <p className="text-gray-600">Access to exclusive game deals and promotions</p>
                    </li>
                    <li className="flex items-start">
                        <div className="w-6 h-6 bg-[#DFBF00] rounded-full flex items-center justify-center text-white mt-0.5 mr-3">✓</div>
                        <p className="text-gray-600">Early access to new game releases</p>
                    </li>
                    <li className="flex items-start">
                        <div className="w-6 h-6 bg-[#DFBF00] rounded-full flex items-center justify-center text-white mt-0.5 mr-3">✓</div>
                        <p className="text-gray-600">Member-only events and tournaments</p>
                    </li>
                    <li className="flex items-start">
                        <div className="w-6 h-6 bg-[#DFBF00] rounded-full flex items-center justify-center text-white mt-0.5 mr-3">✓</div>
                        <p className="text-gray-600">Earn rewards with every purchase</p>
                    </li>
                </ul>
            </div>

            <div className="flex flex-col space-y-4 mt-8">
                <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 py-3.5 px-4 bg-[#FFDF00] hover:bg-[#DFBF00] border-2 border-[#C1A811] hover:border-[#DFBF00] rounded-xl text-[#2A2A2A] font-medium transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
                >
                    Already have an Account?
                </Link>

                <Link
                    to="/"
                    className="flex items-center justify-center gap-2 py-3.5 px-4 bg-[#2A2A2A] hover:bg-[#000000] border border-[#818181] hover:border-[#2A2A2A] rounded-xl text-[#FFFFFF] transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
                >
                    Return to Home Page
                </Link>
            </div>
        </div>
    );
};

export default LeftSideContent;
