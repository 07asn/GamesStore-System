import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ForgotPasswordLink = () => {
  return (
    <div className="flex justify-end mb-4">
      <Link
        to="/forgot-password"
        className="text-sm text-[#818181] hover:text-[#1a1a1a] transition-colors duration-200 flex items-center group"
      >
        <FaQuestionCircle className="mr-1.5 text-[#1a1a1a] group-hover:animate-pulse" />
        <span className="border-b border-dashed border-[#1a1a1a]/50 group-hover:border-[#1a1a1a]">
          Forgot password?
        </span>
      </Link>
    </div>
  );
};

export default ForgotPasswordLink;