// src/components/order-summary/OrderStatusSection.jsx
import React from 'react';
import checkmark from '../../assets/checkmark.png';

const statusColors = {
  completed: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
    gradient: 'from-green-50 to-green-100',
    iconBg: 'bg-green-500',
  },
  pending: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
    gradient: 'from-yellow-50 to-yellow-100',
    iconBg: 'bg-yellow-400',
  },
  cancelled: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
    gradient: 'from-red-50 to-red-100',
    iconBg: 'bg-red-500',
  },
  processing: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200',
    gradient: 'from-blue-50 to-blue-100',
    iconBg: 'bg-blue-500',
  }
};

const OrderStatusSection = ({ orderNumber, purchaseDate, status = 'pending' }) => {
  const normalizedStatus = status.toLowerCase().trim();
  const color = statusColors[normalizedStatus] || statusColors['pending'];

  return (
    <div className={`bg-gradient-to-br ${color.gradient} rounded-2xl p-8 shadow-lg border ${color.border}`}>
      <div className="flex items-center space-x-6">
        <div className={`${color.iconBg} p-4 rounded-full shadow-lg`}>
          <img src={checkmark} alt="Status" className="w-12 h-12 filter brightness-0 invert" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {normalizedStatus === 'completed' ? 'Thank you for your order! 🎉' : `Order Status: ${status}`}
          </h1>
          <div className="space-y-1 text-gray-700">
            <p className="flex items-center">
              <span className="w-24 font-medium">Order:</span>
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">{orderNumber}</span>
            </p>
            <p className="flex items-center">
              <span className="w-24 font-medium">Date:</span> {purchaseDate}
            </p>
            <p className="flex items-center">
              <span className="w-24 font-medium">Status:</span>
              <span className={`${color.bg} ${color.text} px-3 py-1 rounded-full text-sm font-bold uppercase`}>
                {status}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusSection;
