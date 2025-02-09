// src/components/ProfileCard.jsx
import React from 'react';
import profilePic from '../../assets/male.png'; // Adjust path as needed

const ProfileCard = () => {
    return (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gray-100 border-b border-gray-300 text-center py-4">
                <h2 className="text-lg font-semibold">Profile Picture</h2>
            </div>
            <div className="p-6 flex flex-col items-center">
                <img
                    id="profile-picture"
                    src={profilePic}
                    alt="Profile"
                    className="h-40 w-40 object-cover rounded-full shadow-lg mb-4 border-4 border-gray-200"
                />
                <p className="text-sm text-gray-500 mb-3">Select your gender</p>
                <select
                    id="gender-select"
                    className="w-1/2 p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
        </div>
    );
};

export default ProfileCard;
