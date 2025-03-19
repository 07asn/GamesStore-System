import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';
import Cookie from 'js-cookie';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GoogleSignInButton from './GoogleSignInButton';
import ForgotPasswordLink from './ForgotPasswordLink';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState('');

    // Define validation schema with Yup
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
    });

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            setServerError('');
            
            try {
                const response = await axios.post('http://localhost:5000/api/users/login', values);
                
                Cookie.set('token', response.data.token, { expires: 1 });
                window.location.href = '/';
            } catch (error) {
                setServerError(error.response?.data?.message || 'An error occurred during login');
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <div className="backdrop-blur-xl bg-white/90 border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 max-w-lg mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2 text-[#2A2A2A]">Welcome Back</h2>
                <p className="text-[#818181]">Sign in to continue your gaming journey</p>
            </div>

            {/* Server Error Message */}
            {serverError && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-fadeIn">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <FaExclamationCircle className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700 font-medium">{serverError}</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-[#2A2A2A]">Email</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[#818181] group-hover:text-[#DFBF00] transition-colors duration-200">
                                <FaEnvelope />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                {...formik.getFieldProps('email')}
                                className={`block w-full pl-12 pr-4 py-3.5 bg-white border ${
                                    formik.touched.email && formik.errors.email 
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/50' 
                                        : 'border-gray-300 focus:border-[#FFDF00] focus:ring-[#FFDF00]/50'
                                } rounded-xl text-[#2A2A2A] placeholder-[#818181] transition-all duration-300`}
                            />
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-[#2A2A2A]">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[#818181] group-hover:text-[#DFBF00] transition-colors duration-200">
                                <FaLock />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...formik.getFieldProps('password')}
                                className={`block w-full pl-12 pr-12 py-3.5 bg-white border ${
                                    formik.touched.password && formik.errors.password 
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/50' 
                                        : 'border-gray-300 focus:border-[#FFDF00] focus:ring-[#FFDF00]/50'
                                } rounded-xl text-[#2A2A2A] placeholder-[#818181] transition-all duration-300`}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#818181] hover:text-[#DFBF00] transition-colors duration-200"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex="-1"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
                        )}
                    </div>
                </div>

                {/* Forgot Password Link */}
                <ForgotPasswordLink />

                <button
                    type="submit"
                    disabled={loading}
                    className="relative w-full py-3.5 px-4 bg-[#1a1a1a] text-white font-medium rounded-xl transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 mb-10 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <span className="relative z-10 flex items-center justify-center">
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </>
                        ) : (
                            'Sign in'
                        )}
                    </span>
                </button>
            </form>

            {/* Divider with "Or continue with" text */}
            <div className="relative flex items-center justify-center mb-7">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative px-4 bg-white text-sm text-[#818181]">
                    Or continue with
                </div>
            </div>

            {/* Google Sign In Button */}
            <GoogleSignInButton />

            {/* Registration Link */}
            <div className="mt-8 text-center">
                <p className="text-[#818181] text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-[#1a1a1a] hover:text-[#818181]/80 font-medium">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;