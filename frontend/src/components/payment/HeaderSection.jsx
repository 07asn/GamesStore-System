import React from 'react';
import profilePic from '../../assets/male.png';

const HeaderSection = () => {
    return (
        <div className="bg-white p-5 mb-5 shadow-lg rounded-2xl">
            <div className="flex items-center">
                <img
                    src={profilePic}
                    alt="Profile"
                    className="w-16 h-16 rounded-full mr-4 shadow-md"
                />
                <div>
                    <h2 className="text-lg font-semibold">Hi, Hasan Mansour</h2>
                    <p className="text-sm text-gray-500">Menu &gt; Shopping Cart &gt; Payment</p>
                </div>
            </div>
        </div>
    );
};

export default HeaderSection;
