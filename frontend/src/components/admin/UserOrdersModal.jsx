import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { XCircle, Package, Calendar, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';

const StatusBadge = ({ status }) => {
    const statusColors = {
        'Completed': 'bg-green-100 text-green-800',
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Processing': 'bg-blue-100 text-blue-800',
        'Cancelled': 'bg-red-100 text-red-800'
    };

    const defaultColor = 'bg-gray-100 text-gray-800';
    const colorClass = statusColors[status] || defaultColor;

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
            {status}
        </span>
    );
};

const UserOrdersModal = ({ isOpen, onClose, userId }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && userId) {
            fetchUserOrders();
        }
        // eslint-disable-next-line
    }, [isOpen, userId]);

    const fetchUserOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:5000/api/admin/users/${userId}/orders`,
                { withCredentials: true }
            );
            setOrders(response.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Unable to fetch user orders.',
                background: '#f8f9fa',
                customClass: {
                    popup: 'rounded-2xl shadow-2xl',
                    confirmButton: 'bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2',
                },
            });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden transform transition-all duration-300 ease-in-out scale-100 hover:scale-[1.02]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <Package className="w-7 h-7 text-blue-600" />
                        <h2 className="text-2xl font-bold text-gray-800">Order History</h2>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                        <XCircle className="w-8 h-8" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 max-h-[70vh] overflow-auto bg-gray-50">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            <AlertCircle className="mx-auto w-16 h-16 mb-4 text-gray-300" />
                            <p className="text-xl">No orders found for this user</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div
                                    key={order.order_id}
                                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-5"
                                >
                                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                                <span><strong>Order ID:</strong> {order.order_id}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="w-5 h-5 text-blue-500" />
                                                <span>
                                                    <strong>Order Date:</strong>{' '}
                                                    {new Date(order.order_date).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <DollarSign className="w-5 h-5 text-green-500" />
                                                <span>
                                                    <strong>Total Amount:</strong> ${parseFloat(order.total_amount).toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <StatusBadge status={order.order_status} />
                                                <StatusBadge status={order.payment_status} />
                                                <StatusBadge status={order.delivery_status} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Items Table */}
                                    {order.order_items && order.order_items.length > 0 && (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm border-collapse">
                                                <thead>
                                                    <tr className="bg-blue-50 border-b border-gray-200">
                                                        <th className="py-3 px-4 text-left">Product Name</th>
                                                        <th className="py-3 px-4 text-left">Price</th>
                                                        <th className="py-3 px-4 text-left">Asset Code</th>
                                                        <th className="py-3 px-4 text-left">Status</th>
                                                        <th className="py-3 px-4 text-left">Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.order_items.map((item) => (
                                                        <tr 
                                                            key={item.order_item_id} 
                                                            className="border-b hover:bg-gray-50 transition-colors duration-200"
                                                        >
                                                            <td className="py-3 px-4">
                                                                {item.product ? item.product.name : 'N/A'}
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                ${parseFloat(item.product?.price || 0).toFixed(2)}
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                {item.inventory ? item.inventory.asset_code : 'N/A'}
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                {item.inventory ? 
                                                                    <StatusBadge status={item.inventory.status} /> : 
                                                                    'N/A'
                                                                }
                                                            </td>
                                                            <td className="py-3 px-4">{item.quantity}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserOrdersModal;