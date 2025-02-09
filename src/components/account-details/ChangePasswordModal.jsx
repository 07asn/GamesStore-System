// src/components/ChangePasswordModal.jsx
import React from 'react';

const ChangePasswordModal = ({ closeModal }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Modal Backdrop */}
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={closeModal}
            ></div>
            {/* Modal Content */}
            <div className="bg-white rounded-2xl shadow-2xl z-10 w-11/12 max-w-md mx-auto">
                <div className="border-b border-gray-300 px-6 py-4 flex justify-between items-center">
                    <h5 className="font-semibold text-lg">Change Password</h5>
                    <button
                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                        onClick={closeModal}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="p-6">
                    <form>
                        {/* Current Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="currentPassword"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Current Password
                            </label>
                            <input
                                id="currentPassword"
                                type="password"
                                placeholder="Enter current password"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                        {/* New Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="newPassword"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                New Password
                            </label>
                            <input
                                id="newPassword"
                                type="password"
                                placeholder="Enter new password"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                        {/* Confirm Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm new password"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                        <button
                            type="button"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
