// src/components/AccountForm.jsx
import React from 'react';

const AccountForm = ({ openModal }) => {
    return (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gray-100 border-b border-gray-300 px-6 py-4">
                <h2 className="text-lg font-semibold">Account Details</h2>
            </div>
            <div className="p-6">
                <form>
                    {/* Email Address */}
                    <div className="mb-6">
                        <label
                            htmlFor="inputEmailAddress"
                            className="block text-sm font-medium mb-2"
                        >
                            Email address
                        </label>
                        <input
                            id="inputEmailAddress"
                            type="email"
                            placeholder="Enter your email address"
                            defaultValue="name@example.com"
                            className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* First and Last Name */}
                    <div className="flex flex-col md:flex-row md:gap-6 mb-6">
                        <div className="flex-1 mb-6 md:mb-0">
                            <label
                                htmlFor="inputFirstName"
                                className="block text-sm font-medium mb-2"
                            >
                                First name
                            </label>
                            <input
                                id="inputFirstName"
                                type="text"
                                placeholder="Enter your first name"
                                defaultValue="Hasan"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor="inputLastName"
                                className="block text-sm font-medium mb-2"
                            >
                                Last name
                            </label>
                            <input
                                id="inputLastName"
                                type="text"
                                placeholder="Enter your last name"
                                defaultValue="Mansour"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                    </div>

                    {/* Phone Number and Location */}
                    <div className="flex flex-col md:flex-row md:gap-6 mb-6">
                        <div className="flex-1 mb-6 md:mb-0">
                            <label
                                htmlFor="inputPhone"
                                className="block text-sm font-medium mb-2"
                            >
                                Phone number
                            </label>
                            <input
                                id="inputPhone"
                                type="tel"
                                placeholder="Enter your phone number"
                                defaultValue="00962788862798"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor="country"
                                className="block text-sm font-medium mb-2"
                            >
                                Location
                            </label>
                            <select
                                id="country"
                                required
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            >
                                <option value="" disabled selected>
                                    Select Your Country
                                </option>
                                <option value="saudi">Saudi Arabia</option>
                                <option value="jordan">Jordan</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Password and Change Password */}
                    <div className="mb-8">
                        <label
                            htmlFor="inputPassword"
                            className="block text-sm font-medium mb-2"
                        >
                            Password
                        </label>
                        <div className="flex">
                            <input
                                id="inputPassword"
                                type="password"
                                placeholder="**********"
                                className="flex-1 p-3 text-sm border border-gray-300 rounded-l-lg shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                            <button
                                type="button"
                                onClick={openModal}
                                className="p-3 bg-gray-200 border border-gray-300 rounded-r-lg shadow-sm hover:bg-yellow-300 hover:text-black transition-colors focus:outline-none"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>

                    {/* Save Changes Button */}
                    <button
                        type="button"
                        className="w-full bg-gray-200 py-3 rounded-lg shadow-lg hover:bg-yellow-300 hover:text-black transition-colors text-lg font-semibold"
                    >
                        Save changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AccountForm;
