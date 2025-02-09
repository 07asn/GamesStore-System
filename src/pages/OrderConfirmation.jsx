// src/components/OrderConfirmation.jsx
import React from 'react';
import checkmark from '../assets/checkmark.png'; // Adjust the path as needed

const OrderConfirmation = () => {
  return (
    <section className="max-w-[800px] mx-auto p-5 flex flex-col items-center justify-center min-h-[65vh]">
      <div className="space-y-5 w-full">
        {/* Header Section */}
        <div className="bg-white p-5 mb-5 shadow-lg rounded-xl text-center transition-all duration-300">
          <img
            src={checkmark}
            alt="Checkmark"
            className="w-20 mx-auto mb-4"
          />
          <h1 className="text-2xl sm:text-2xl text-[#2c3e50] mb-3 font-bold">
            Thank you! Your order has been received.
          </h1>
          <p className="text-base text-[#7f8c8d] my-2">
            Your order: <span className="font-semibold text-[#2c3e50]">Z5383263862</span>
          </p>
        </div>

        {/* Order Details Section */}
        <div className="bg-white p-5 mb-5 shadow-lg rounded-xl text-center transition-all duration-300">
          <p className="flex justify-between text-base my-2">
            <span className="font-semibold text-[#2c3e50]">Buy Order:</span>
            <span>Z5383263862</span>
          </p>
          <p className="flex justify-between text-base my-2">
            <span className="font-semibold text-[#2c3e50]">Purchase Date:</span>
            <span>Dec 30/24 - 7:35 PM</span>
          </p>
          <p className="flex justify-between text-base my-2">
            <span className="font-semibold text-[#2c3e50]">Order Status:</span>
            <span className='text-[#00903c]'>Completed</span>
          </p>
        </div>

        {/* Button Section */}
        <div className="w-full flex justify-center pt-5">
          <a href="order-details.html">
            <button className="w-full sm:w-64 py-3 text-xl font-semibold text-white bg-[#DFBF00] rounded shadow cursor-pointer transition-all duration-300 hover:bg-[#6c757d] hover:-translate-y-1">
              Show Order Details
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmation;
