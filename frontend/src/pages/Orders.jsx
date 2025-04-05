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
      <div className="min-h-screen flex flex-col items-center justify-center" style={{
        color: '#F5E6B3'
      }}>
        <div className="p-10 rounded-xl relative overflow-hidden" style={{
          background: 'linear-gradient(145deg, rgba(34, 34, 34, 0.7) 0%, rgba(14, 14, 14, 0.8) 100%)',
          boxShadow: '0 6px 30px rgba(0, 0, 0, 0.7), 0 0 10px rgba(212, 175, 55, 0.25)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          backdropFilter: 'blur(5px)'
        }}>
          {/* Gold decorative corner */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #E5C96D 0%, #A17C17 100%)',
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
            opacity: 0.9
          }}></div>
          
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '30px',
            height: '30px',
            background: 'linear-gradient(135deg, #E5C96D 0%, #A17C17 100%)',
            clipPath: 'polygon(0 100%, 0 40%, 100% 100%)',
            opacity: 0.6
          }}></div>
          
          <div className="flex flex-col items-center justify-center space-y-6 z-10 relative px-12 py-8">
            {/* Empty orders icon */}
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-2" style={{
              background: 'rgba(15, 15, 15, 0.7)',
              border: '1px solid rgba(212, 175, 55, 0.4)'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                stroke="#D4AF37" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" 
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold" style={{
              color: '#FFCC33',
              fontFamily: "'Cinzel', serif",
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.8), 0 0 5px rgba(212, 175, 55, 0.3)',
              letterSpacing: '1px'
            }}>
              No Orders Found
            </h3>
            
            <p className="text-lg text-center" style={{
              color: '#E5E4E2',
              fontFamily: "'Marcellus', serif"
            }}>
              There are currently no orders to display in your inventory.
            </p>
            
            <Link 
              to="/shop" 
              className="mt-6 px-6 py-3 rounded-md flex items-center transition-all duration-300 hover:transform hover:translate-y-1"
              style={{
                background: 'linear-gradient(145deg, rgba(25, 25, 25, 0.9) 0%, rgba(10, 10, 10, 0.9) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: '#F5E6B3',
                fontFamily: "'Cinzel', serif",
                fontWeight: 600,
                letterSpacing: '0.5px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.8)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5), 0 0 8px rgba(212, 175, 55, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Return to Shop
            </Link>
          </div>
        </div>
        
        {/* Decorative line at bottom */}
        <div className="mt-6 w-1/3 h-1 rounded-full opacity-40" style={{
          background: 'linear-gradient(to right, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0.2) 50%, rgba(212, 175, 55, 0.05) 100%)'
        }}></div>
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
