import React from 'react';
import loadingSpinner from '../../assets/loading-spinner.png';
const Processing = () => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 shadow-lg text-center space-y-4">
      <div className="flex justify-center">
        <img src={loadingSpinner} alt="Processing" className="w-16 h-16 animate-spin" />
      </div>
      <h2 className="text-2xl font-bold text-yellow-800">Your order is still being processed ⏳</h2>
      <p className="text-yellow-700 max-w-xl mx-auto">
        Hang tight! We're finalizing your purchase. Once it's confirmed, your product keys and download links will appear here.
      </p>
    </div>
  );
};

export default Processing;
