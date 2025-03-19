// src/components/OrdersHistory.jsx
import React from 'react';

const orders = [
    {
        id: '#39201',
        date: 'Jan 01/25 - 2:43 PM',
        amount: '29.99JD',
        status: 'Pending',
        link: 'order-details.html',
    },
    {
        id: '#38594',
        date: 'Dec 30/24 - 7:35 PM',
        amount: '29.99JD',
        status: 'Completed',
        link: 'order-details.html',
    },
    {
        id: '#38223',
        date: 'Oct 18/24 - 0:43 AM',
        amount: '29.99JD',
        status: 'Completed',
        link: 'order-details.html',
    },
    {
        id: '#38125',
        date: 'May 11/24 - 5:43 PM',
        amount: '29.99JD',
        status: 'Completed',
        link: 'order-details.html',
    },
];

const Orders = () => {
    const handleRowClick = (link) => {
        window.location.href = link;
    };

    return (
        <div className="min-h-screen bg-[#F6F6F6] text-[#69707a] pt-8">
            <div className="container mx-auto px-4 py-8 sm:py-12">
                {/* Page Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8">
                    Orders History
                </h1>
                <hr className="mt-0 mb-8 border-gray-300" />

                {/* Billing History Card */}
                <div className="bg-white rounded-xl shadow-2xl mb-8 overflow-hidden">
                    {/* Card Header */}
                    <div className="px-6 py-4 bg-gray-100 border-b border-gray-300 font-medium text-lg">
                        Billing History
                    </div>

                    {/* Card Body - Responsive Table */}
                    <div className="p-0">
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
                                    {orders.map((order, index) => (
                                        <tr
                                            key={index}
                                            className="transition-all duration-300 hover:bg-white hover:shadow-lg cursor-pointer"
                                            onClick={() => handleRowClick(order.link)}
                                        >
                                            <td className="px-4 py-3 text-sm">{order.id}</td>
                                            <td className="px-4 py-3 text-sm">{order.date}</td>
                                            <td className="px-4 py-3 text-sm">{order.amount}</td>
                                            <td className="px-4 py-3 text-sm">
                                                {order.status === 'Pending' ? (
                                                    <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                                                        {order.status}
                                                    </span>
                                                ) : (
                                                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                                                        {order.status}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Continue Shopping Button */}
                <div>
                    <a
                        href="#"
                        className="inline-flex items-center border border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-3 rounded-full transition-colors text-lg font-medium"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Continue Shopping
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Orders;
