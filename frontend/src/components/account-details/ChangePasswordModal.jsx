import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

// Yup validation schema
const validationSchema = Yup.object({
    currentPassword: Yup.string()
        .required('Current password is required'),
    newPassword: Yup.string()
        .required('New password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[\W_]/, 'Password must contain at least one special character'),
    confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

const ChangePasswordModal = ({ closeModal }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const togglePasswordVisibility = (field) => {
        setShowPassword({
            ...showPassword,
            [field]: !showPassword[field]
        });
    };

    const handlePasswordChange = async (values, { setSubmitting }) => {
        try {
            setSubmitting(true);
            await axios.put('http://localhost:5000/api/users/change-password', {
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            }, { withCredentials: true });
            
            toast.success('Password updated successfully!');
            closeModal(); // Close the modal on successful password change
        } catch (error) {
            console.error('Error updating password:', error);
            setErrorMessage(
                error.response?.data?.message || 
                'Failed to update password. Please try again.'
            );
            toast.error('Failed to update password');
        } finally {
            setSubmitting(false);
        }
    };

    // Password strength indicator
    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, label: '', color: 'bg-gray-200' };
        
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[\W_]/.test(password)) strength += 1;

        const strengthMap = {
            0: { label: 'Very Weak', color: 'bg-red-500' },
            1: { label: 'Very Weak', color: 'bg-red-500' },
            2: { label: 'Weak', color: 'bg-orange-500' },
            3: { label: 'Medium', color: 'bg-yellow-500' },
            4: { label: 'Strong', color: 'bg-blue-500' },
            5: { label: 'Very Strong', color: 'bg-green-500' }
        };

        return { 
            strength, 
            label: strengthMap[strength].label, 
            color: strengthMap[strength].color 
        };
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
        >
            {/* Modal Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black"
                onClick={closeModal}
            ></motion.div>
            
            {/* Modal Content */}
            <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.3 }}
                className="bg-white rounded-xl shadow-2xl z-10 w-11/12 max-w-md mx-auto overflow-hidden"
            >
                <div className="bg-gradient-to-r from-[#FFDF00] to-[#DFBF00] px-6 py-4 flex justify-between items-center text-gray-700">
                    <h5 className="font-semibold text-lg">Change Password</h5>
                    <button
                        className="text-white hover:text-gray-200 focus:outline-none transition duration-150"
                        onClick={closeModal}
                        aria-label="Close modal"
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
                    <Formik
                        initialValues={{
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handlePasswordChange}
                    >
                        {({ values, isSubmitting, touched, errors }) => {
                            const passwordStrength = getPasswordStrength(values.newPassword);
                            
                            return (
                                <Form>
                                    {/* Current Password */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="currentPassword"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Current Password
                                        </label>
                                        <div className="relative">
                                            <Field
                                                id="currentPassword"
                                                name="currentPassword"
                                                type={showPassword.currentPassword ? "text" : "password"}
                                                placeholder="Enter current password"
                                                className="w-full p-3 pr-10 text-sm border border-gray-300 rounded-lg shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => togglePasswordVisibility('currentPassword')}
                                            >
                                                {showPassword.currentPassword ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        <ErrorMessage name="currentPassword" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    
                                    {/* New Password */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="newPassword"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <Field
                                                id="newPassword"
                                                name="newPassword"
                                                type={showPassword.newPassword ? "text" : "password"}
                                                placeholder="Enter new password"
                                                className="w-full p-3 pr-10 text-sm border border-gray-300 rounded-lg shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => togglePasswordVisibility('newPassword')}
                                            >
                                                {showPassword.newPassword ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
                                        
                                        {/* Password strength indicator */}
                                        {values.newPassword && (
                                            <div className="mt-2">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs font-medium text-gray-600">Password strength:</span>
                                                    <span className={`text-xs font-medium ${
                                                        passwordStrength.strength <= 2 ? 'text-red-500' : 
                                                        passwordStrength.strength === 3 ? 'text-yellow-500' : 'text-green-500'
                                                    }`}>
                                                        {passwordStrength.label}
                                                    </span>
                                                </div>
                                                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full ${passwordStrength.color} transition-all duration-300 ease-in-out`} 
                                                        style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                                                    ></div>
                                                </div>
                                                
                                                {/* Password requirements */}
                                                <ul className="mt-2 space-y-1">
                                                    <li className={`text-xs flex items-center ${/^.{8,}$/.test(values.newPassword) ? 'text-green-500' : 'text-gray-500'}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                            {/^.{8,}$/.test(values.newPassword) ? (
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            ) : (
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                                            )}
                                                        </svg>
                                                        At least 8 characters
                                                    </li>
                                                    <li className={`text-xs flex items-center ${/[A-Z]/.test(values.newPassword) ? 'text-green-500' : 'text-gray-500'}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                            {/[A-Z]/.test(values.newPassword) ? (
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            ) : (
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                                            )}
                                                        </svg>
                                                        One uppercase letter
                                                    </li>
                                                    <li className={`text-xs flex items-center ${/[0-9]/.test(values.newPassword) ? 'text-green-500' : 'text-gray-500'}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                            {/[0-9]/.test(values.newPassword) ? (
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            ) : (
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                                            )}
                                                        </svg>
                                                        One number
                                                    </li>
                                                    <li className={`text-xs flex items-center ${/[\W_]/.test(values.newPassword) ? 'text-green-500' : 'text-gray-500'}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                            {/[\W_]/.test(values.newPassword) ? (
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            ) : (
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                                            )}
                                                        </svg>
                                                        One special character
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Confirm Password */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="confirmPassword"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <Field
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type={showPassword.confirmPassword ? "text" : "password"}
                                                placeholder="Confirm new password"
                                                className="w-full p-3 pr-10 text-sm border border-gray-300 rounded-lg shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => togglePasswordVisibility('confirmPassword')}
                                            >
                                                {showPassword.confirmPassword ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Error Message */}
                                    {errorMessage && (
                                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                                            <div className="flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {errorMessage}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-end space-x-3 mt-6">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-150"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-4 py-2 text-sm font-medium text-GRAY-800 bg-[#FFDF00] rounded-lg shadow-lg hover:from-yellow-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 disabled:opacity-70"
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Updating...
                                                </div>
                                            ) : (
                                                'Update Password'
                                            )}
                                        </button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ChangePasswordModal;