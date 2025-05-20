// ResetPasswordForm.jsx
import React, { useState, useEffect } from 'react';
import { FaLock, FaEye, FaEyeSlash, FaCheck, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordForm = () => {
  const [formState, setFormState] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [tokenValid, setTokenValid] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState('');

  const location = useLocation();

  // Extract token from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    console.log("Token from URL:", token);

    if (token) {
      // Validate token (simulate API validation; replace with your actual API call if available)
      const validateToken = async () => {
        try {
          // Example: If you have an endpoint to validate the token, call it here.
          // const res = await axios.get(`http://localhost:5000/api/users/validate-reset-token?token=${token}`);
          // setTokenValid(res.data.valid);
          await new Promise(resolve => setTimeout(resolve, 1000));
          setTokenValid(true);
        } catch (error) {
          setTokenValid(false);
        }
      };
      validateToken();
    } else {
      setTokenValid(false);
    }
  }, [location]);

  // Check password strength
  useEffect(() => {
    const { password } = formState;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  }, [formState.password]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formState.password !== formState.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Retrieve token again (in case needed)
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (!token) {
      setError("Reset token is missing.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/users/reset-password', {
        token,
        newPassword: formState.password,
      });
      console.log("API response:", response.data);
      setSubmitted(true);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to reset password.";
      console.error("Error resetting password:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // While token is being validated
  if (tokenValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="backdrop-blur-xl bg-white/90 border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg transition-all duration-300 max-w-lg w-full">
          <div className="animate-pulse">
            <p className="text-[#818181]">Validating your reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  // If token is invalid
  if (tokenValid === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="backdrop-blur-xl bg-white/90 border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg transition-all duration-300 max-w-lg w-full text-center">
          <div className="mb-6 mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <FaExclamationTriangle className="text-red-500 text-xl" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-[#2A2A2A]">Invalid or Expired Link</h2>
          <p className="text-[#818181] mb-6">
            The password reset link is invalid or has expired. Please request a new password reset link.
          </p>
          <Link
            to="/forgot-password"
            className="inline-block py-3 px-6 bg-[#FFDF00] hover:bg-[#DFBF00] text-[#2A2A2A] font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  // If password has been reset successfully
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="backdrop-blur-xl bg-white/90 border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg transition-all duration-300 max-w-lg w-full text-center">
          <div className="mb-6 mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <FaCheck className="text-green-500 text-xl" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-[#2A2A2A]">Password Reset Successful</h2>
          <p className="text-[#818181] mb-6">
            Your password has been successfully reset. You can now log in with your new password.
          </p>
          <Link
            to="/login"
            className="inline-block py-3 px-6 bg-[#FFDF00] hover:bg-[#DFBF00] text-[#2A2A2A] font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Main reset password form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="backdrop-blur-xl bg-white/90 border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 max-w-lg w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-[#2A2A2A]">Reset Password</h2>
          <p className="text-[#818181]">Create a new password for your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-[#2A2A2A]">New Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[#818181] group-hover:text-[#DFBF00] transition-colors duration-200">
                <FaLock />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formState.password}
                onChange={handleInputChange}
                required
                className="block w-full pl-12 pr-12 py-3.5 bg-white border border-gray-300 focus:border-[#FFDF00] focus:ring-2 focus:ring-[#FFDF00]/50 rounded-xl text-[#2A2A2A] placeholder-[#818181] transition-all duration-300"
                placeholder="••••••••"
                minLength={8}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#818181] hover:text-[#DFBF00] transition-colors duration-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Password strength meter */}
            {formState.password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full ${i < passwordStrength
                          ? passwordStrength === 1 ? 'bg-red-400'
                            : passwordStrength === 2 ? 'bg-orange-400'
                              : passwordStrength === 3 ? 'bg-yellow-400'
                                : 'bg-green-400'
                          : 'bg-gray-200'
                        }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-[#818181]">
                  {passwordStrength === 0 && "Use 8+ characters with letters, numbers & symbols"}
                  {passwordStrength === 1 && "Weak - Add uppercase letters, numbers or symbols"}
                  {passwordStrength === 2 && "Fair - Add more variety for a stronger password"}
                  {passwordStrength === 3 && "Good - Your password is becoming stronger"}
                  {passwordStrength === 4 && "Strong - Your password meets all requirements"}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-[#2A2A2A]">Confirm Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[#818181] group-hover:text-[#DFBF00] transition-colors duration-200">
                <FaLock />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formState.confirmPassword}
                onChange={handleInputChange}
                required
                className="block w-full pl-12 pr-12 py-3.5 bg-white border border-gray-300 focus:border-[#FFDF00] focus:ring-2 focus:ring-[#FFDF00]/50 rounded-xl text-[#2A2A2A] placeholder-[#818181] transition-all duration-300"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#818181] hover:text-[#DFBF00] transition-colors duration-200"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Password match indicator */}
            {formState.confirmPassword && (
              <div className="mt-2 flex items-center text-xs">
                {formState.password === formState.confirmPassword ? (
                  <>
                    <FaCheck className="text-green-500 mr-1" />
                    <span className="text-green-500">Passwords match</span>
                  </>
                ) : (
                  <>
                    <FaTimes className="text-red-500 mr-1" />
                    <span className="text-red-500">Passwords don't match</span>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading ||
              formState.password !== formState.confirmPassword ||
              formState.password.length < 8 ||
              passwordStrength < 2}
            className="relative w-full py-3.5 px-4 bg-[#FFDF00] hover:bg-[#DFBF00] text-[#2A2A2A] font-medium rounded-xl transition-all duration-300 overflow-hidden group shadow-md hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span className="relative z-10 flex items-center justify-center">
              {loading ? "Resetting..." : "Reset Password"}
            </span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="text-[#818181] hover:text-[#DFBF00] transition-colors duration-200 text-sm">
            Remember your password? <span className="text-[#DFBF00] font-medium">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
