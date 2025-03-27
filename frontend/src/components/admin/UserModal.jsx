import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
    UserPlus, User, Mail, Phone, Globe, CheckCircle, Lock, XCircle 
} from 'lucide-react';

const UserModal = ({ isOpen, onClose, user, onUserUpdate }) => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        country: '',
        gender: 'male',
        email_verified: false,
        password: '', 
    });

    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        if (user) {
            // Editing existing user
            setUserData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                country: user.country || '',
                gender: user.gender || 'male',
                email_verified: user.email_verified || false,
                password: '', 
            });
        } else {
            // Reset for new user
            setUserData({
                name: '',
                email: '',
                phone: '',
                country: '',
                gender: 'male',
                email_verified: false,
                password: '',
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (user) {
                // Update existing user
                await axios.put(
                    `http://localhost:5000/api/admin/users/${user.user_id}`,
                    userData,
                    { withCredentials: true }
                );
            } else {
                // Create new user (needs password)
                await axios.post(
                    'http://localhost:5000/api/admin/users',
                    userData,
                    { withCredentials: true }
                );
            }

            Swal.fire({
                icon: 'success',
                title: user ? 'User Updated' : 'User Created',
                text: user
                    ? 'User information has been successfully updated.'
                    : 'A new user has been created.',
                background: '#f8f9fa',
                customClass: {
                    popup: 'rounded-2xl shadow-2xl',
                    confirmButton: 'bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2',
                },
            });

            // Refresh data in the parent
            onUserUpdate();
            // Close the modal
            onClose();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Operation Failed',
                text: error.response?.data?.message || 'Unable to process user data.',
                background: '#f8f9fa',
                customClass: {
                    popup: 'rounded-2xl shadow-2xl',
                    confirmButton: 'bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2',
                },
            });
        }
    };

    const countries = [
        { value: '', label: 'Select Country' },
        { value: 'Jordan', label: 'Jordan' },
        { value: 'Saudi Arabia', label: 'Saudi Arabia' },
        { value: 'United Arab Emirates', label: 'United Arab Emirates' },
        { value: 'Other', label: 'Other' }
    ];

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 ease-in-out scale-100 hover:scale-[1.01]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        {user ? (
                            <UserPlus className="w-7 h-7 text-blue-600" />
                        ) : (
                            <UserPlus className="w-7 h-7 text-green-600" />
                        )}
                        <h2 className="text-2xl font-bold text-gray-800">
                            {user ? 'Update User' : 'Create New User'}
                        </h2>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                        <XCircle className="w-8 h-8" />
                    </button>
                </div>

                {/* Form */}
                <form 
                    onSubmit={handleSubmit} 
                    className="p-6 space-y-5 bg-gray-50"
                >
                    {/* Name Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all duration-200"
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all duration-200"
                            required
                        />
                        {userData.email_verified && (
                            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                        )}
                    </div>

                    {/* Phone Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={userData.phone}
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all duration-200"
                        />
                    </div>

                    {/* Country Select */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Globe className="w-5 h-5 text-gray-400" />
                        </div>
                        <select
                            value={userData.country}
                            onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all duration-200"
                            required
                        >
                            {countries.map((country) => (
                                <option key={country.value} value={country.value}>
                                    {country.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Gender Radio */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <div className="flex items-center space-x-4">
                            {['male', 'female'].map((gender) => (
                                <label 
                                    key={gender} 
                                    className="inline-flex items-center cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        value={gender}
                                        checked={userData.gender === gender}
                                        onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                                        className="form-radio text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-gray-700 capitalize">
                                        {gender}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Email Verified Checkbox */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={userData.email_verified}
                            onChange={(e) => setUserData({ ...userData, email_verified: e.target.checked })}
                            className="form-checkbox rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Email Verified</span>
                    </div>

                    {/* Password (for new users) */}
                    {!user && (
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Enter a password"
                                value={userData.password}
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all duration-200"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                {passwordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                            {user ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;