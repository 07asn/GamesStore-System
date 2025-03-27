// src/components/OrdersHistory.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders', {
          withCredentials: true,
        });
        setOrders(response.data.orders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Unable to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleRowClick = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-700 text-lg">No orders found.</p>
        <Link to="/shop" className="mt-4 text-blue-500 underline hover:text-blue-700">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F6F6] text-[#69707a] pt-8">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8">
          Orders History
        </h1>
        <hr className="mt-0 mb-8 border-gray-300" />
        <div className="bg-white rounded-xl shadow-2xl mb-8 overflow-hidden">
          <div className="px-6 py-4 bg-gray-100 border-b border-gray-300 font-medium text-lg">
            Billing History
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-medium">
                    Transaction ID
                  </th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-medium">
                    Date
                  </th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-medium">
                    Amount
                  </th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.order_id}
                    className="transition-all duration-300 hover:bg-white hover:shadow-lg cursor-pointer"
                    onClick={() => handleRowClick(order.order_id)}
                  >
                    <td className="px-4 py-3 text-sm">{order.order_id}</td>
                    <td className="px-4 py-3 text-sm">{new Date(order.order_date).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">JD {parseFloat(order.total_amount).toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm">
                      {order.order_status.toLowerCase() === 'pending' ? (
                        <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {order.order_status}
                        </span>
                      ) : (
                        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {order.order_status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            to="/shop"
            className="inline-flex items-center border border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-3 rounded-full transition-colors text-lg font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrdersHistory;
