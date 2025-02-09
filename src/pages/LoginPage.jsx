import React, { useEffect } from 'react';
import { FaGoogle, FaUserPlus, FaHome, FaEnvelope, FaLock } from 'react-icons/fa';

const LoginPage = () => {
  useEffect(() => {
    document.title = "7SN Store - Login";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F4F6] to-[#DFBF0020] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#DFBF00]/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#1a1a1a]/10 rounded-full blur-3xl animate-float-delayed"></div>

      <div className="w-full max-w-md animate-zoom-in z-10">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 relative">
          {/* Glowing Border Effect */}
          <div className="absolute inset-0 rounded-3xl border-2 border-[#DFBF00]/10 pointer-events-none"></div>
          
          {/* Animated Title */}
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a] to-[#DFBF00] bg-[length:300%] animate-gradient-text">
              Welcome Back!
            </h2>
            <p className="mt-2 text-[#646464]">Continue your gaming journey</p>
          </div>

          {/* Login Form */}
          <form className="space-y-6">
            <div className="group relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#646464]" />
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#DFBF00] focus:border-[#DFBF00] transition-all bg-white/50"
                required
              />
            </div>

            <div className="group relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#646464]" />
              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#DFBF00] focus:border-[#DFBF00] transition-all bg-white/50"
                required
              />
            </div>

            <a href="#forgot" className="block text-sm text-[#646464] hover:text-[#DFBF00] transition-colors text-right">
              Trouble logging in?
            </a>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#DFBF00] text-white font-semibold rounded-xl hover:bg-[#c5a900] transition-all shadow-lg hover:shadow-[#DFBF00]/30 hover:scale-[1.02] active:scale-95"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-[#646464] text-sm">Or continue with</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Google Login */}
          <button className="w-full py-3.5 bg-[#1a1a1a] text-white rounded-xl flex items-center justify-center gap-3 hover:bg-[#DFBF00] transition-colors group">
            <FaGoogle className="text-xl group-hover:animate-bounce" />
            <span>Google Account</span>
          </button>

          {/* Action Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="#signup"
              className="p-4 border border-gray-200 rounded-xl flex flex-col items-center text-[#646464] hover:bg-[#1a1a1a] hover:text-white hover:transform hover:-translate-y-1 transition-all duration-300 group"
            >
              <FaUserPlus className="text-2xl mb-2 group-hover:text-[#DFBF00] transition-colors" />
              <span className="font-medium">Not a member?</span>
              <small className="text-xs mt-1 text-[#DFBF00] opacity-0 group-hover:opacity-100 transition-opacity">
                Join now →
              </small>
            </a>

            <a
              href="#home"
              className="p-4 border border-gray-200 rounded-xl flex flex-col items-center text-[#646464] hover:bg-[#1a1a1a] hover:text-white hover:transform hover:-translate-y-1 transition-all duration-300 group"
            >
              <FaHome className="text-2xl mb-2 group-hover:text-[#DFBF00] transition-colors" />
              <span className="font-medium">Return to Home</span>
              <small className="text-xs mt-1 text-[#DFBF00] opacity-0 group-hover:opacity-100 transition-opacity">
                Explore more →
              </small>
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes zoom-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes gradient-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }

        .animate-zoom-in {
          animation: zoom-in 0.5s ease-out;
        }

        .animate-gradient-text {
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-text 5s ease infinite;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 8s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;