import React, { useState, useEffect } from 'react';

const AccountForm = ({ openModal, userData, handleSubmit, handleChange, updatedData }) => {
    const [formData, setFormData] = useState({
        email: userData?.email || '',
        firstName: userData?.name.split(' ')[0] || '',
        lastName: userData?.name.split(' ')[1] || '',
        phone: userData?.phone || '',
        country: userData?.country || '',
        gender: userData?.gender || 'male',
    });

    // Update form data if userData changes
    useEffect(() => {
        if (userData) {
            setFormData({
                email: userData?.email || '',
                firstName: userData?.name.split(' ')[0] || '',
                lastName: userData?.name.split(' ')[1] || '',
                phone: userData?.phone || '',
                country: userData?.country || '',
                gender: userData?.gender || 'male',
            });
        }
    }, [userData]);  // This will ensure formData updates whenever userData changes

    const handleFormChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        handleChange(e);
    };

    return (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gray-100 border-b border-gray-300 px-6 py-4">
                <h2 className="text-lg font-semibold">Account Details</h2>
            </div>
            <div className="p-6">
                <form onSubmit={(e) => handleSubmit(e)}>
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
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleFormChange}
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
                                name="firstName"
                                type="text"
                                placeholder="Enter your first name"
                                value={formData.firstName}
                                onChange={handleFormChange}
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
                                name="lastName"
                                type="text"
                                placeholder="Enter your last name"
                                value={formData.lastName}
                                onChange={handleFormChange}
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
                                name="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleFormChange}
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
                                name="country"
                                value={formData.country}
                                onChange={handleFormChange}
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            >
                                <option value="Saudi Arabia">Saudi Arabia</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Other">Other</option>
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
                        type="submit"
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
