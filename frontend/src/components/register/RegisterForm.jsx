import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGlobe, FaGoogle, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'js-cookie';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const PasswordStrengthIndicator = ({ password }) => {
    const getStrength = (password) => {
        if (!password) return 0;
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        return strength;
    };

    const strength = getStrength(password);
    const getColor = () => {
        if (strength === 0) return 'bg-gray-200';
        if (strength === 1) return 'bg-red-500';
        if (strength === 2) return 'bg-yellow-500';
        if (strength === 3) return 'bg-blue-500';
        return 'bg-green-500';
    };

    const getLabel = () => {
        if (strength === 0) return '';
        if (strength === 1) return 'Weak';
        if (strength === 2) return 'Fair';
        if (strength === 3) return 'Good';
        return 'Strong';
    };

    return (
        <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
                <div className="flex-1 flex space-x-2">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 flex-1 rounded-full ${i < strength ? getColor() : 'bg-gray-200'}`}
                        />
                    ))}
                </div>
                <span className="text-xs ml-2 font-medium text-gray-500">{getLabel()}</span>
            </div>
        </div>
    );
};

// Yup Validation Schema
const validationSchema = Yup.object({
    name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    country: Yup.string().oneOf(['Saudi Arabia', 'Jordan', 'Other'], 'Please select a valid country').required('Country is required'),
});

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            country: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            setErrorMessage('');
            setSuccessMessage('');
            try {
                const response = await axios.post('http://localhost:5000/api/users/register', values);
                setSuccessMessage('Account created successfully! Redirecting...');
                Cookie.set('token', response.data.token, { expires: 1 });

                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } catch (error) {
                setErrorMessage(error.response?.data?.message || 'An error occurred');
            }
            setLoading(false);
        },
    });

    const getInputClasses = (fieldName) => {
        return `block w-full pl-12 pr-${fieldName.includes('password') ? '12' : '4'} py-3.5 bg-white border 
        ${formik.touched[fieldName] && formik.errors[fieldName]
                ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50'
                : formik.touched[fieldName] && !formik.errors[fieldName]
                    ? 'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/50'
                    : 'border-gray-300 focus:border-[#DFBF00] focus:ring-2 focus:ring-[#DFBF00]/50'} 
        rounded-xl text-gray-800 transition-all duration-300`;
    };

    const getIconClasses = (fieldName) => {
        return `absolute inset-y-0 left-0 flex items-center pl-4 
        ${formik.touched[fieldName] && formik.errors[fieldName]
                ? 'text-red-500'
                : formik.touched[fieldName] && !formik.errors[fieldName]
                    ? 'text-green-500'
                    : 'text-gray-400 group-hover:text-[#DFBF00]'}
        transition-colors duration-200`;
    };

    return (
        <div className="col-span-1 md:col-span-3">
            <div className="backdrop-blur-xl bg-white/90 border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2 text-[#2A2A2A]">Create Account</h2>
                    <p className="text-[#818181]">Join the ultimate gaming experience</p>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg animate-fadeIn">
                        <div className="flex items-center">
                            <FaCheckCircle className="h-5 w-5 text-green-500" />
                            <p className="text-sm text-green-700 font-medium ml-3">{successMessage}</p>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-fadeIn">
                        <div className="flex items-center">
                            <FaExclamationCircle className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-700 font-medium ml-3">{errorMessage}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                        <div className="relative group">
                            <div className={getIconClasses('name')}>
                                <FaUser />
                            </div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                                className={getInputClasses('name')}
                                placeholder="John Doe"
                            />
                            {formik.touched.name && !formik.errors.name && (
                                <FaCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                            )}
                        </div>
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500 text-xs mt-1 flex items-center">
                                <FaExclamationCircle className="mr-1" size={12} />
                                {formik.errors.name}
                            </div>
                        ) : null}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <div className="relative group">
                            <div className={getIconClasses('email')}>
                                <FaEnvelope />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                                className={getInputClasses('email')}
                                placeholder="name@example.com"
                            />
                            {formik.touched.email && !formik.errors.email && (
                                <FaCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                            )}
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-xs mt-1 flex items-center">
                                <FaExclamationCircle className="mr-1" size={12} />
                                {formik.errors.email}
                            </div>
                        ) : null}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                        <div className="relative group">
                            <div className={getIconClasses('password')}>
                                <FaLock />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                                className={getInputClasses('password')}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-[#DFBF00] transition-colors duration-200"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {formik.values.password && <PasswordStrengthIndicator password={formik.values.password} />}
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500 text-xs mt-1 flex items-center">
                                <FaExclamationCircle className="mr-1" size={12} />
                                {formik.errors.password}
                            </div>
                        ) : null}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className="relative group">
                            <div className={getIconClasses('confirmPassword')}>
                                <FaLock />
                            </div>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                                className={getInputClasses('confirmPassword')}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-[#DFBF00] transition-colors duration-200"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className="text-red-500 text-xs mt-1 flex items-center">
                                <FaExclamationCircle className="mr-1" size={12} />
                                {formik.errors.confirmPassword}
                            </div>
                        ) : null}
                    </div>

                    {/* Country Select */}
                    <div>
                        <label htmlFor="country" className="text-sm font-medium text-gray-700">Country</label>
                        <div className="relative group">
                            <div className={getIconClasses('country')}>
                                <FaGlobe />
                            </div>
                            <select
                                id="country"
                                name="country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                                className={getInputClasses('country')}
                            >
                                <option value="" disabled>Select Your Country</option>
                                <option value="Saudi Arabia">Saudi Arabia</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Other">Other</option>
                            </select>
                            {formik.touched.country && !formik.errors.country && (
                                <FaCheckCircle className="absolute right-10 top-1/2 transform -translate-y-1/2 text-green-500" />
                            )}
                        </div>
                        {formik.touched.country && formik.errors.country ? (
                            <div className="text-red-500 text-xs mt-1 flex items-center">
                                <FaExclamationCircle className="mr-1" size={12} />
                                {formik.errors.country}
                            </div>
                        ) : null}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="relative w-full py-3.5 px-4 bg-[#1a1a1a] text-white font-medium rounded-xl transition-all duration-300 overflow-hidden group shadow-md hover:shadow-xl transform hover:-translate-y-1"
                    >
                        <span className="relative z-10 flex items-center justify-center">
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating account...
                                </>
                            ) : "Create Account"}
                        </span>
                        <span className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-opacity-10 bg-white/10"></span>
                    </button>

                    <div className="relative flex items-center justify-center mt-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                    </div>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-[#818181] text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#1a1a1a] hover:text-[#818181]/80 font-medium">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;