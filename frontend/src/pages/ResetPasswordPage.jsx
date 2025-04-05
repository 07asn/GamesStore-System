// ResetPasswordPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('Reset your password');

  useEffect(() => {
    console.log('ResetPasswordPage mounted');
    console.log('Token from URL:', token);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Reset password form submitted');
    setError('');

    // Validate that the passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate token presence
    if (!token) {
      setError("Reset token is missing.");
      return;
    }

    setLoading(true);
    console.log("Before calling API with newPassword:", newPassword);

    try {
      const response = await axios.post('http://localhost:5000/api/users/reset-password', {
        token,
        newPassword,
      });
      console.log("API response received. New password = " + newPassword);
      setMessage(response.data.message || 'Password reset successfully!');
      setSubmitted(true);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to reset password.";
      console.error('Error resetting password:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-120 backdrop-blur-xl bg-white/90 border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg transition-all duration-300 max-w-lg mx-auto mb-10 mt-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-[#2A2A2A]">Reset Password</h2>
        <p className="text-[#818181]">{message}</p>
      </div>

      {error && (
        <p className="text-center text-red-500 mb-4">
          {error}
        </p>
      )}

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="newPassword" className="text-sm font-medium text-[#2A2A2A]">New Password</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="block w-full pl-4 pr-4 py-3.5 bg-white border border-gray-300 focus:border-[#FFDF00] focus:ring-2 focus:ring-[#FFDF00]/50 rounded-xl text-[#2A2A2A] placeholder-[#818181] transition-all duration-300"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-[#2A2A2A]">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="block w-full pl-4 pr-4 py-3.5 bg-white border border-gray-300 focus:border-[#FFDF00] focus:ring-2 focus:ring-[#FFDF00]/50 rounded-xl text-[#2A2A2A] placeholder-[#818181] transition-all duration-300"
              placeholder="Confirm new password"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !newPassword || !confirmPassword}
            className="relative w-full py-3.5 px-4 bg-[#FFDF00] hover:bg-[#DFBF00] text-[#2A2A2A] font-medium rounded-xl transition-all duration-300 overflow-hidden group shadow-md hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span className="relative z-10 flex items-center justify-center">
              {loading ? "Resetting..." : "Reset Password"}
            </span>
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-[#2A2A2A] mb-4">
            Your password has been reset successfully.
          </p>
          <Link to="/login" className="text-[#DFBF00] hover:text-[#FFDF00] transition-colors duration-200 text-sm flex items-center justify-center gap-2">
            <FaArrowLeft className="text-[#DFBF00]" />
            <span>Back to login</span>
          </Link>
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

export default ResetPasswordPage;
