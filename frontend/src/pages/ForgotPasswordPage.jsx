// ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Call the backend forgot-password endpoint
      const response = await axios.post('http://localhost:5000/api/users/forgot-password', { email });
      console.log(response.data.message);
      setSubmitted(true);
    } catch (err) {
      console.error('Error sending reset email:', err);
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-120 backdrop-blur-xl bg-white/90 border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 max-w-lg mx-auto mb-10 mt-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-[#2A2A2A]">Forgot Password</h2>
        <p className="text-[#818181]">
          {!submitted 
            ? "Enter your email and we'll send you a link to reset your password" 
            : "Check your email for a password reset link"}
        </p>
      </div>

      {error && (
        <p className="text-center text-red-500 mb-4">
          {error}
        </p>
      )}

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 focus:border-[#FFDF00] focus:ring-2 focus:ring-[#FFDF00]/50 rounded-xl text-[#2A2A2A] placeholder-[#818181] transition-all duration-300"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="relative w-full py-3.5 px-4 bg-[#FFDF00] hover:bg-[#DFBF00] text-[#2A2A2A] font-medium rounded-xl transition-all duration-300 overflow-hidden group shadow-md hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span className="relative z-10 flex items-center justify-center">
              {loading ? "Sending..." : "Send Reset Link"}
            </span>
          </button>
        </form>
      ) : (
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-[#FFDF00]/20 rounded-full flex items-center justify-center">
            <div className="w-10 h-10 bg-[#FFDF00] rounded-full flex items-center justify-center">
              <FaEnvelope className="text-[#2A2A2A] text-xl" />
            </div>
          </div>
          <p className="text-[#2A2A2A]">
            We've sent a password reset link to<br />
            <span className="font-medium">{email}</span>
          </p>
          <p className="text-sm text-[#818181]">
            Check your inbox and click on the link to reset your password.
            If you don't see it, please check your spam folder.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-[#DFBF00] hover:text-[#FFDF00] transition-colors duration-200 text-sm"
          >
            Didn't receive an email? Try again
          </button>
        </div>
      )}
      
      <div className="mt-8 text-center">
        <Link to="/login" className="text-[#818181] hover:text-[#DFBF00] transition-colors duration-200 flex items-center justify-center gap-2 text-sm">
          <FaArrowLeft className="text-[#DFBF00]" />
          <span>Back to login</span>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
