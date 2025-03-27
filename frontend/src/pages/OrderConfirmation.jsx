// src/components/OrderConfirmation.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import checkmark from '../assets/checkmark.png';

const OrderConfirmation = () => {
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderId = location.state?.orderId; 

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    // 2) Fetch order details from the backend
    axios.get(`http://localhost:5000/api/orders/${orderId}`, { withCredentials: true })
      .then((res) => {
        setOrder(res.data.order);
      })
      .catch((err) => {
        console.error('Failed to fetch order details:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [orderId]);

  if (loading) {
    return (
      <section className="max-w-[800px] mx-auto p-5 flex flex-col items-center justify-center min-h-[65vh]">
        <p>Loading order details...</p>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="max-w-[800px] mx-auto p-5 flex flex-col items-center justify-center min-h-[65vh]">
        <p>No order found.</p>
        <Link to="/shop" className="mt-4 text-blue-500 underline">Go back to shop</Link>
      </section>
    );
  }

  // 3) Format your data
  const {
    order_id,
    order_status,
    payment_status,
    total_amount,
    order_date,
  } = order;

  // Suppose we want a date string:
  const purchaseDate = new Date(order_date).toLocaleString();

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
          {/* Real order ID from the DB */}
          <p className="text-base text-[#7f8c8d] my-2">
            Your order: <span className="font-semibold text-[#2c3e50]">{order_id}</span>
          </p>
        </div>

        {/* Order Details Section */}
        <div className="bg-white p-5 mb-5 shadow-lg rounded-xl text-center transition-all duration-300">
          <p className="flex justify-between text-base my-2">
            <span className="font-semibold text-[#2c3e50]">Order ID:</span>
            <span>{order_id}</span>
          </p>
          <p className="flex justify-between text-base my-2">
            <span className="font-semibold text-[#2c3e50]">Purchase Date:</span>
            <span>{purchaseDate}</span>
          </p>
          <p className="flex justify-between text-base my-2">
            <span className="font-semibold text-[#2c3e50]">Order Status:</span>
            <span className="text-[#00903c] capitalize">{order_status}</span>
          </p>
          <p className="flex justify-between text-base my-2">
            <span className="font-semibold text-[#2c3e50]">Payment Status:</span>
            <span className="text-[#00903c] capitalize">{payment_status}</span>
          </p>
          <p className="flex justify-between text-base my-2">
            <span className="font-semibold text-[#2c3e50]">Total Amount:</span>
            <span>{total_amount} JD</span>
          </p>
        </div>

        {/* Button Section */}
        <div className="w-full flex justify-center pt-5">
          <Link to={`/orders/${order_id}`}>
            <button className="w-full sm:w-64 py-3 text-xl font-semibold text-white bg-[#DFBF00] rounded shadow cursor-pointer transition-all duration-300 hover:bg-[#6c757d] hover:-translate-y-1">
              Show Order Details
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default OrderConfirmation;
