import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
  Edit, Package, CheckCircle, AlertCircle, XCircle, Truck, 
  Clock, RefreshCw, User, CreditCard, Calendar, Info, X,
  ChevronLeft, ChevronRight, Search
} from 'lucide-react';

axios.defaults.withCredentials = true;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState({
    order_status: '',
    payment_status: '',
    delivery_status: '',
  });
  const [selectedInventory, setSelectedInventory] = useState({});
  const [activeTab, setActiveTab] = useState('pending');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderIdFilter, setOrderIdFilter] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1
  });

  useEffect(() => {
    fetchOrders();
    fetchInventories();
  }, [activeTab, pagination.currentPage, pagination.pageSize]);

  const fetchOrders = async () => {
    setIsLoading(true);
    setIsRefreshing(true);
    try {
      let endpoint = 'http://localhost:5000/api/orders/all';
      
      const params = new URLSearchParams();
      if (activeTab === 'pending') params.append('status', 'pending');
      else if (activeTab === 'completed') params.append('status', 'completed');
      else if (activeTab === 'canceled') params.append('status', 'canceled');
      else if (activeTab === 'processing') params.append('status', 'processing');
      
      if (orderIdFilter) params.append('orderId', orderIdFilter);
      params.append('page', pagination.currentPage);
      params.append('pageSize', pagination.pageSize);

      const response = await axios.get(`${endpoint}?${params.toString()}`);
      setOrders(response.data.orders);
      
      setPagination(prev => ({
        ...prev,
        totalItems: response.data.pagination.totalItems,
        totalPages: response.data.pagination.totalPages
      }));
    } catch (error) {
      showError('Unable to load orders.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
      setOrderDetails(response.data.order);
      setIsModalOpen(true);
    } catch (error) {
      showError('Unable to load order details.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInventories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/inventory');
      // Ensure we're working with an array
      setInventories(Array.isArray(response.data) ? response.data : response.data.inventories || []);
    } catch (error) {
      showError('Unable to load inventories.');
      setInventories([]); // Set to empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignInventory = async (order_item_id) => {
    if (!selectedInventory[order_item_id]) {
      showWarning('Please select an inventory item.');
      return;
    }

    setIsLoading(true);
    try {
      await axios.put('http://localhost:5000/api/orders/assign-inventory', {
        order_item_id,
        inventory_id: selectedInventory[order_item_id],
      });
      showSuccess('Inventory assigned successfully!');
      fetchOrders();
      if (orderDetails) {
        fetchOrderDetails(orderDetails.order_id);
      }
    } catch (error) {
      showError('Unable to assign inventory.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setStatusUpdate({
      ...statusUpdate,
      [name]: value,
    });
  };

  const handleUpdateStatus = async (e, order_id) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/orders/${order_id}`, statusUpdate);
      showSuccess('Order status updated!');
      setSelectedOrder(null);
      fetchOrders();
      if (orderDetails) {
        fetchOrderDetails(orderDetails.order_id);
      }
    } catch (error) {
      showError('Unable to update order status.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: newPage }));
    }
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setPagination(prev => ({ 
      ...prev, 
      pageSize: newSize,
      currentPage: 1
    }));
  };

  const handleOrderIdFilter = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    fetchOrders();
  };

  const clearFilters = () => {
    setOrderIdFilter('');
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    fetchOrders();
  };

  const showSuccess = (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      confirmButtonColor: '#3b82f6'
    });
  };

  const showError = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonColor: '#3b82f6'
    });
  };

  const showWarning = (message) => {
    Swal.fire({
      icon: 'warning',
      title: 'Warning',
      text: message,
      confirmButtonColor: '#3b82f6'
    });
  };

  const getStatusBadge = (status) => {
    let color, icon;
    
    switch(status) {
      case 'pending':
        color = 'bg-yellow-100 text-yellow-800';
        icon = <Clock className="w-4 h-4 mr-1" />;
        break;
      case 'completed':
        color = 'bg-green-100 text-green-800';
        icon = <CheckCircle className="w-4 h-4 mr-1" />;
        break;
      case 'canceled':
        color = 'bg-red-100 text-red-800';
        icon = <XCircle className="w-4 h-4 mr-1" />;
        break;
      case 'processing':
        color = 'bg-blue-100 text-blue-800';
        icon = <RefreshCw className="w-4 h-4 mr-1" />;
        break;
      case 'paid':
        color = 'bg-green-100 text-green-800';
        icon = <CheckCircle className="w-4 h-4 mr-1" />;
        break;
      case 'failed':
        color = 'bg-red-100 text-red-800';
        icon = <XCircle className="w-4 h-4 mr-1" />;
        break;
      case 'shipped':
        color = 'bg-purple-100 text-purple-800';
        icon = <Truck className="w-4 h-4 mr-1" />;
        break;
      case 'delivered':
        color = 'bg-indigo-100 text-indigo-800';
        icon = <Package className="w-4 h-4 mr-1" />;
        break;
      default:
        color = 'bg-gray-100 text-gray-800';
        icon = <AlertCircle className="w-4 h-4 mr-1" />;
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <button
            onClick={fetchOrders}
            className={`flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 ${isRefreshing ? 'opacity-75' : ''}`}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Filter Controls */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <form onSubmit={handleOrderIdFilter} className="flex-1 flex items-center space-x-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by Order ID"
                  value={orderIdFilter}
                  onChange={(e) => setOrderIdFilter(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </button>
              {(orderIdFilter) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Clear
                </button>
              )}
            </form>

            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Items per page:</label>
              <select
                value={pagination.pageSize}
                onChange={handlePageSizeChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => {
                setActiveTab('pending');
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pending'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending Orders
            </button>
            <button
              onClick={() => {
                setActiveTab('processing');
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'processing'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Processing Orders
            </button>
            <button
              onClick={() => {
                setActiveTab('completed');
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed Orders
            </button>
            <button
              onClick={() => {
                setActiveTab('canceled');
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'canceled'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Canceled Orders
            </button>
          </nav>
        </div>

        {/* Order Status Update Form */}
        {selectedOrder && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Update Order #{selectedOrder.order_id}</h2>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => handleUpdateStatus(e, selectedOrder.order_id)}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
                  <select
                    name="order_status"
                    value={statusUpdate.order_status}
                    onChange={handleStatusChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                  <select
                    name="payment_status"
                    value={statusUpdate.payment_status}
                    onChange={handleStatusChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select status</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Status</label>
                  <select
                    name="delivery_status"
                    value={statusUpdate.delivery_status}
                    onChange={handleStatusChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="mr-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Order'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Orders List */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {isLoading && orders.length === 0 ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading order data...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                <Package className="w-full h-full" />
              </div>
              <p className="text-gray-600 text-lg mb-2">No orders found</p>
              <p className="text-gray-500 text-sm mb-4">
                {orderIdFilter ? 
                  `No orders match your search for ID: ${orderIdFilter}` : 
                  `There are currently no ${activeTab} orders`}
              </p>
              <button 
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {orderIdFilter ? 'Clear Search' : 'Refresh'}
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Status</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr 
                        key={order.order_id} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => fetchOrderDetails(order.order_id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{order.order_id}</div>
                          <div className="text-xs text-gray-500">
                            {formatDate(order.created_at)}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${parseFloat(order.total_amount).toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(order.order_status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(order.payment_status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(order.delivery_status || 'pending')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOrder(order);
                                setStatusUpdate({
                                  order_status: order.order_status,
                                  payment_status: order.payment_status,
                                  delivery_status: order.delivery_status || 'pending',
                                });
                              }}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                              title="Edit Order"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(pagination.currentPage - 1) * pagination.pageSize + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)}
                      </span>{' '}
                      of <span className="font-medium">{pagination.totalItems}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                          pagination.currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                      </button>
                      
                      {/* Page numbers */}
                      {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                        let pageNum;
                        if (pagination.totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (pagination.currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (pagination.currentPage >= pagination.totalPages - 2) {
                          pageNum = pagination.totalPages - 4 + i;
                        } else {
                          pageNum = pagination.currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              pagination.currentPage === pageNum
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                          pagination.currentPage === pagination.totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Order Details Modal */}
        {isModalOpen && orderDetails && (
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setIsModalOpen(false)}></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Order #{orderDetails.order_id}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Created on {formatDate(orderDetails.created_at)}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Order Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                        <Package className="w-5 h-5 mr-2 text-blue-500" />
                        Order Summary
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Status:</span>
                          <span>{getStatusBadge(orderDetails.order_status)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Payment:</span>
                          <span>{getStatusBadge(orderDetails.payment_status)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Delivery:</span>
                          <span>{getStatusBadge(orderDetails.delivery_status || 'pending')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Payment Method:</span>
                          <span className="text-sm font-medium">{orderDetails.payment_method || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Total Amount:</span>
                          <span className="text-sm font-medium">
                            ${parseFloat(orderDetails.total_amount).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Information */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2 text-blue-500" />
                        Customer Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Name:</span>
                          <span className="text-sm font-medium">{orderDetails.user?.name || 'Guest'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Email:</span>
                          <span className="text-sm font-medium">{orderDetails.user?.email || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Phone:</span>
                          <span className="text-sm font-medium">{orderDetails.user?.phone || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Country:</span>
                          <span className="text-sm font-medium">{orderDetails.user?.country || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Proof of Payment */}
                  {orderDetails.proof_img && (
                    <div className="bg-gray-50 p-4 rounded-lg mt-6">
                      <h4 className="text-md font-medium text-gray-900 mb-2">Proof of Payment</h4>
                      <img
                        src={`${orderDetails.proof_img}`}
                        alt="Proof of Payment"
                        className="max-w-full h-auto rounded"
                      />
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                      <Package className="w-5 h-5 mr-2 text-blue-500" />
                      Order Items
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Inventory</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {orderDetails.order_items?.map((item) => (
                            <tr key={item.order_item_id}>
                              <td className="px-4 py-2 text-sm text-gray-900">
                                <div className="font-medium">{item.product?.name || `Product #${item.product_id}`}</div>
                                {item.product?.description && (
                                  <div className="text-xs text-gray-500 mt-1">
                                    {item.product.description.substring(0, 50)}...
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                              <td className="px-4 py-2 text-sm text-gray-900">
                                ${ (parseFloat(item.product?.price) || 0).toFixed(2) }
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-900">
                                ${ ((parseFloat(item.product?.price) || 0) * item.quantity).toFixed(2) }
                              </td>
                              <td className="px-4 py-2">
                                {item.inventory_id ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    {item.inventory?.asset_code || item.inventory_id}
                                  </span>
                                ) : (
                                  <div className="flex items-center space-x-2">
                                    <select
                                      onChange={(e) =>
                                        setSelectedInventory({
                                          ...selectedInventory,
                                          [item.order_item_id]: e.target.value,
                                        })
                                      }
                                      className="text-sm px-3 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                      value={selectedInventory[item.order_item_id] || ''}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <option value="">Select inventory</option>
                                      {inventories
                                        .filter((inv) => inv.status === 'available')
                                        .map((inventory) => (
                                          <option key={inventory.inventory_id} value={inventory.inventory_id}>
                                            {inventory.asset_code} ({inventory.product?.name || 'Unknown'})
                                          </option>
                                        ))}
                                    </select>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAssignInventory(item.order_item_id);
                                      }}
                                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                      disabled={isLoading}
                                    >
                                      Assign
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;