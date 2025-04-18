import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
    PlusIcon, TrashIcon, Edit, Search, Filter, ChevronDown, ChevronUp,
    RefreshCw, ArrowDownToLine, X, Info, Save, Download, CheckCircle,
    HardDrive, Package, UserCheck, Archive, ListFilter
} from 'lucide-react';

const Inventory = () => {
    const [inventories, setInventories] = useState([]);
    const [filteredInventories, setFilteredInventories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        pageSize: 10,
        totalItems: 0,
    });

    const [inventoryForm, setInventoryForm] = useState({
        inventory_id: '',
        product_id: '',
        asset_code: '',
        status: 'available',
        assigned_at: '',
    });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        status: 'all',
        category: 'all',
    });
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending',
    });
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [exportFormat, setExportFormat] = useState('csv');
    const [showExportOptions, setShowExportOptions] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // Fetch all inventories on component mount
    useEffect(() => {
        fetchInventories(pagination.currentPage);
    }, [filters, searchTerm, pagination.currentPage]);


    // Apply filters and search whenever inventories, filters, or searchTerm changes
    useEffect(() => {
        let result = inventories;

        // Apply status filter
        if (filters.status !== 'all') {
            result = result.filter(item => item.status === filters.status);
        }

        // Apply category filter
        if (filters.category !== 'all') {
            result = result.filter(item =>
                item.product && item.product.category &&
                item.product.category.name === filters.category
            );
        }

        // Apply search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(item =>
                (item.product && item.product.name.toLowerCase().includes(term)) ||
                item.asset_code.toLowerCase().includes(term) ||
                (item.product && item.product.category &&
                    item.product.category.name.toLowerCase().includes(term)))
        }

        setFilteredInventories(result);
    }, [inventories, filters, searchTerm]);

    const fetchInventories = async (page = 1) => {
        setIsLoading(true);
        setIsRefreshing(true);
        try {
            const params = {
                page,
                pageSize: pagination.pageSize,
                search: searchTerm,
                status: filters.status,
                category: filters.category,
            };
            const response = await axios.get('http://localhost:5000/api/inventory', { params });

            setInventories(response.data.inventories);
            setPagination(response.data.pagination);
        } catch (error) {
            showError('Unable to load inventories.');
        } finally {
            setIsLoading(false);
            setTimeout(() => setIsRefreshing(false), 600);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInventoryForm({
            ...inventoryForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isEditing) {
                // Update existing inventory
                const response = await axios.put(
                    `http://localhost:5000/api/inventory/${inventoryForm.inventory_id}`,
                    inventoryForm
                );
                setInventories(inventories.map(inv =>
                    inv.inventory_id === inventoryForm.inventory_id ? response.data.inventory : inv
                ));
                showSuccess('Inventory item updated successfully!');
            } else {
                // Add new inventory
                const response = await axios.post('http://localhost:5000/api/inventory', inventoryForm);
                setInventories([...inventories, response.data.inventory]);
                showSuccess('Inventory item added successfully!');
            }

            resetForm();
        } catch (error) {
            showError(`Unable to ${isEditing ? 'update' : 'add'} inventory item.`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditInventory = (inventory) => {
        setInventoryForm({
            inventory_id: inventory.inventory_id,
            product_id: inventory.product_id,
            asset_code: inventory.asset_code,
            status: inventory.status,
            assigned_at: inventory.assigned_at ? inventory.assigned_at.slice(0, 16) : '',
        });
        setIsEditing(true);
        setIsFormOpen(true);
    };

    const resetForm = () => {
        setInventoryForm({
            inventory_id: '',
            product_id: '',
            asset_code: '',
            status: 'available',
            assigned_at: '',
        });
        setIsEditing(false);
        setIsFormOpen(false);
    };

    const handleDeleteInventory = async (inventory_id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the inventory item!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            customClass: {
                container: 'z-[9999]'
            }
        });

        if (result.isConfirmed) {
            setIsLoading(true);
            try {
                await axios.delete(`http://localhost:5000/api/inventory/${inventory_id}`);
                setInventories(inventories.filter((inv) => inv.inventory_id !== inventory_id));
                showSuccess('Inventory item deleted successfully!');
            } catch (error) {
                showError('Unable to delete inventory item.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        setFilteredInventories([...filteredInventories].sort((a, b) => {
            // Handle nested properties
            let aValue, bValue;
            if (key.includes('.')) {
                const keys = key.split('.');
                aValue = a[keys[0]] ? a[keys[0]][keys[1]] : '';
                bValue = b[keys[0]] ? b[keys[0]][keys[1]] : '';
            } else {
                aValue = a[key] || '';
                bValue = b[key] || '';
            }

            if (aValue < bValue) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        }));
    };

    const getUniqueCategories = () => {
        const categories = new Set();
        inventories.forEach(item => {
            if (item.product && item.product.category) {
                categories.add(item.product.category.name);
            }
        });
        return ['all', ...Array.from(categories)];
    };

    const handleExportData = async (format) => {
        setIsExporting(true);
        try {
            let dataStr;
            let filename;
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

            if (format === 'csv') {
                const headers = ['Product Name', 'Category', 'Asset Code', 'Status', 'Assigned At'];
                const rows = filteredInventories.map(item => [
                    item.product ? item.product.name : 'Unknown',
                    item.product && item.product.category ? item.product.category.name : 'Uncategorized',
                    item.asset_code,
                    item.status,
                    item.assigned_at ? new Date(item.assigned_at).toLocaleString() : 'N/A'
                ]);

                dataStr = [
                    headers.join(','),
                    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
                ].join('\n');

                filename = `inventory-export-${timestamp}.csv`;
            } else if (format === 'json') {
                dataStr = JSON.stringify(filteredInventories, null, 2);
                filename = `inventory-export-${timestamp}.json`;
            } else if (format === 'excel') {
                const headers = ['Product Name', 'Category', 'Asset Code', 'Status', 'Assigned At'];
                const rows = filteredInventories.map(item => [
                    item.product ? item.product.name : 'Unknown',
                    item.product && item.product.category ? item.product.category.name : 'Uncategorized',
                    item.asset_code,
                    item.status,
                    item.assigned_at ? new Date(item.assigned_at).toLocaleString() : 'N/A'
                ]);

                dataStr = [
                    headers.join(','),
                    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
                ].join('\n');

                filename = `inventory-export-${timestamp}.xlsx`;
            }

            const blob = new Blob([dataStr], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showSuccess(`Export successful! Downloaded as ${filename}`);
        } catch (error) {
            showError('Failed to export data. Please try again.');
            console.error('Export error:', error);
        } finally {
            setIsExporting(false);
            setShowExportOptions(false);
        }
    };

    const showSuccess = (message) => {
        Swal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            confirmButtonColor: '#4f46e5',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            customClass: {
                container: 'z-[9999]'
            }
        });
    };

    const showError = (message) => {
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonColor: '#ef4444',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            customClass: {
                container: 'z-[9999]'
            }
        });
    };

    const StatusBadge = ({ status }) => {
        let bgColor, textColor, label, icon;

        switch (status) {
            case 'available':
                bgColor = 'bg-emerald-100';
                textColor = 'text-emerald-800';
                label = 'Available';
                icon = <Package className="w-3 h-3 mr-1" />;
                break;
            case 'assigned':
                bgColor = 'bg-blue-100';
                textColor = 'text-blue-800';
                label = 'Assigned';
                icon = <UserCheck className="w-3 h-3 mr-1" />;
                break;
            case 'archived':
                bgColor = 'bg-gray-100';
                textColor = 'text-gray-800';
                label = 'Archived';
                icon = <Archive className="w-3 h-3 mr-1" />;
                break;
            default:
                bgColor = 'bg-gray-100';
                textColor = 'text-gray-800';
                label = status;
                icon = <HardDrive className="w-3 h-3 mr-1" />;
        }

        return (
            <span className={`px-2 py-1 inline-flex items-center text-xs leading-4 font-medium rounded-full ${bgColor} ${textColor} uppercase`}>
                {icon} {label}
            </span>
        );
    };

    const SortIndicator = ({ columnKey }) => {
        if (sortConfig.key !== columnKey) return null;
        return sortConfig.direction === 'ascending' ?
            <ChevronUp className="w-4 h-4 ml-1 inline" /> :
            <ChevronDown className="w-4 h-4 ml-1 inline" />;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-[#030303] to-[#030303] p-6 rounded-xl shadow-lg mb-8 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full transform -translate-x-20 translate-y-20"></div>
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <h1 className="text-3xl text-[#D4AF37] font-bold">Inventory Management</h1>
                            <p className="mt-1 text-[#C0C0C0]">Track and manage your company assets efficiently</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center gap-3">
                            <button
                                onClick={() => fetchInventories()}
                                className={`px-3 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors flex items-center ${isRefreshing ? 'opacity-75' : ''}`}
                                disabled={isRefreshing}
                            >
                                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                            <button
                                onClick={() => {
                                    resetForm();
                                    setIsFormOpen(true);
                                }}
                                className="px-4 py-2 bg-white text-indigo-700 rounded-lg hover:bg-indigo-50 transition-colors flex items-center shadow-sm font-medium hover:shadow-md"
                            >
                                {isFormOpen ? (
                                    <>
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </>
                                ) : (
                                    <>
                                        <PlusIcon className="w-4 h-4 mr-2" />
                                        Add New Item
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Inventory Form */}
                {isFormOpen && (
                    <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-indigo-100 animate-fadeIn">
                        <div className="border-b border-indigo-100 pb-4 mb-4">
                            <h2 className="text-xl font-semibold text-[#0E0E0E]">
                                {isEditing ? 'Edit Inventory Item' : 'Add New Inventory Item'}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {isEditing
                                    ? 'Update the details of this inventory item'
                                    : 'Fill out the form below to add a new item to your inventory'}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
                                <input
                                    type="number"
                                    name="product_id"
                                    value={inventoryForm.product_id}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    required
                                />
                                <p className="mt-1 text-xs text-gray-500">Enter the product catalog ID</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Asset Code</label>
                                <input
                                    type="text"
                                    name="asset_code"
                                    value={inventoryForm.asset_code}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    required
                                />
                                <p className="mt-1 text-xs text-gray-500">Unique identifier for this item</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    name="status"
                                    value={inventoryForm.status}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                >
                                    <option value="available">Available</option>
                                    <option value="assigned">Assigned</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned At</label>
                                <input
                                    type="datetime-local"
                                    name="assigned_at"
                                    value={inventoryForm.assigned_at}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                />
                                <p className="mt-1 text-xs text-gray-500">Required if status is "Assigned"</p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center shadow-sm hover:shadow-md"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        {isEditing ? (
                                            <>
                                                <Save className="w-4 h-4 mr-2" />
                                                Update Inventory
                                            </>
                                        ) : (
                                            <>
                                                <PlusIcon className="w-4 h-4 mr-2" />
                                                Add Inventory
                                            </>
                                        )}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}

                {/* Summary Stats - Always show but with loading state */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className={`bg-white p-4 rounded-xl shadow border-l-4 border-green-500 transition-all ${isLoading ? 'opacity-70' : ''}`}>
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                                <Package className="w-5 h-5" />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-sm font-medium text-gray-500">Available Items</h3>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {isLoading ? '...' : filteredInventories.filter(item => item.status === 'available').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={`bg-white p-4 rounded-xl shadow border-l-4 border-blue-500 transition-all ${isLoading ? 'opacity-70' : ''}`}>
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                <UserCheck className="w-5 h-5" />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-sm font-medium text-gray-500">Assigned Items</h3>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {isLoading ? '...' : filteredInventories.filter(item => item.status === 'assigned').length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={`bg-white p-4 rounded-xl shadow border-l-4 border-gray-500 transition-all ${isLoading ? 'opacity-70' : ''}`}>
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-gray-100 text-gray-600">
                                <Archive className="w-5 h-5" />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-sm font-medium text-gray-500">Archived Items</h3>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {isLoading ? '...' : filteredInventories.filter(item => item.status === 'archived').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white p-5 rounded-xl shadow-lg mb-6 border border-gray-100">
                    <div className="flex flex-col gap-4">
                        <div className="relative flex-grow max-w-full">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by product, asset code or category..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setSearchTerm('')}
                                >
                                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                </button>
                            )}
                        </div>

                        <div className="flex flex-wrap justify-between items-center gap-3">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                            >
                                <ListFilter className="w-4 h-4 mr-2" />
                                {showFilters ? 'Hide Filters' : 'Show Filters'}
                            </button>

                            {(searchTerm || filters.status !== 'all' || filters.category !== 'all') && (
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setFilters({ status: 'all', category: 'all' });
                                    }}
                                    className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center px-3 py-2"
                                >
                                    <X className="w-4 h-4 mr-1" />
                                    Clear filters
                                </button>
                            )}
                        </div>

                        {showFilters && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        value={filters.status}
                                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                    >
                                        <option value="all">All Statuses</option>
                                        <option value="available">Available</option>
                                        <option value="assigned">Assigned</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        value={filters.category}
                                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                    >
                                        {getUniqueCategories().map(category => (
                                            <option key={category} value={category}>
                                                {category === 'all' ? 'All Categories' : category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Inventory List */}
                <div className="bg-white shadow-lg rounded-xl overflow-visible border border-gray-100">                    {isLoading && inventories.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading inventory data...</p>
                        </div>
                    ) : filteredInventories.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                                <Package className="w-full h-full" />
                            </div>
                            <p className="text-gray-600 text-lg mb-2">No inventory items found</p>
                            <p className="text-gray-500 text-sm mb-4">
                                {searchTerm || filters.status !== 'all' || filters.category !== 'all' ?
                                    'Try adjusting your search criteria or filters' :
                                    'Add your first inventory item to get started'}
                            </p>
                            {searchTerm || filters.status !== 'all' || filters.category !== 'all' ? (
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setFilters({ status: 'all', category: 'all' });
                                    }}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Clear filters
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        resetForm();
                                        setIsFormOpen(true);
                                    }}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md"
                                >
                                    <PlusIcon className="w-4 h-4 mr-2" />
                                    Add new item
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-indigo-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 transition-colors"
                                                onClick={() => handleSort('product.name')}
                                            >
                                                <div className="flex items-center">
                                                    Product Name
                                                    <SortIndicator columnKey="product.name" />
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 transition-colors"
                                                onClick={() => handleSort('product.category.name')}
                                            >
                                                <div className="flex items-center">
                                                    Category
                                                    <SortIndicator columnKey="product.category.name" />
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 transition-colors"
                                                onClick={() => handleSort('asset_code')}
                                            >
                                                <div className="flex items-center">
                                                    Asset Code
                                                    <SortIndicator columnKey="asset_code" />
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 transition-colors"
                                                onClick={() => handleSort('status')}
                                            >
                                                <div className="flex items-center">
                                                    Status
                                                    <SortIndicator columnKey="status" />
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 transition-colors"
                                                onClick={() => handleSort('assigned_at')}
                                            >
                                                <div className="flex items-center">
                                                    Assigned At
                                                    <SortIndicator columnKey="assigned_at" />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-indigo-600 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredInventories.map((inventory) => (
                                            <tr key={inventory.inventory_id} className="hover:bg-indigo-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {inventory.product ? inventory.product.name : 'Unknown Product'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-600">
                                                        {inventory.product && inventory.product.category
                                                            ? inventory.product.category.name
                                                            : 'Uncategorized'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded inline-block">
                                                        {inventory.asset_code}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <StatusBadge status={inventory.status} />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-600">
                                                        {inventory.assigned_at
                                                            ? new Date(inventory.assigned_at).toLocaleString()
                                                            : '—'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <button
                                                            onClick={() => handleEditInventory(inventory)}
                                                            className="text-indigo-600 hover:text-indigo-900 p-1 hover:bg-indigo-100 rounded transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteInventory(inventory.inventory_id)}
                                                            className="text-red-600 hover:text-red-900 p-1 hover:bg-red-100 rounded transition-colors"
                                                            title="Delete"
                                                        >
                                                            <TrashIcon className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination and Export Controls */}
                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
                                <div className="flex items-center text-sm text-gray-700 mb-4 md:mb-0">
                                    <p>
                                        Showing <span className="font-medium">{(pagination.currentPage - 1) * pagination.pageSize + 1}</span> to{' '}
                                        <span className="font-medium">
                                            {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)}
                                        </span>{' '}
                                        of <span className="font-medium">{pagination.totalItems}</span> items
                                    </p>
                                </div>

                                <div className="flex items-center gap-x-4">
                                    {/* Export Options */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowExportOptions(!showExportOptions)}
                                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center text-sm shadow-sm hover:shadow"
                                            disabled={isExporting}
                                        >
                                            {isExporting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Exporting...
                                                </>
                                            ) : (
                                                <>
                                                    <ArrowDownToLine className="w-4 h-4 mr-2" />
                                                    Export
                                                    <ChevronDown className="w-4 h-4 ml-2" />
                                                </>
                                            )}
                                        </button>

                                        {showExportOptions && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 animate-fadeIn">                                                <button
                                                    onClick={() => handleExportData('csv')}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 flex items-center"
                                                >
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Export as CSV
                                                </button>
                                                <button
                                                    onClick={() => handleExportData('json')}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 flex items-center"
                                                >
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Export as JSON
                                                </button>
                                                <button
                                                    onClick={() => handleExportData('excel')}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 flex items-center"
                                                >
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Export as Excel
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Pagination */}
                                    <div className="flex items-center gap-x-2">
                                        <button
                                            onClick={() => setPagination({ ...pagination, currentPage: Math.max(1, pagination.currentPage - 1) })}
                                            disabled={pagination.currentPage === 1}
                                            className={`px-3 py-1 rounded-md ${pagination.currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
                                        >
                                            Previous
                                        </button>

                                        {[...Array(pagination.totalPages).keys()].map(page => {
                                            const pageNumber = page + 1;
                                            // Show pagination links: first, last, current, and numbers around current
                                            const isVisible =
                                                pageNumber === 1 ||
                                                pageNumber === pagination.totalPages ||
                                                (pageNumber >= pagination.currentPage - 1 && pageNumber <= pagination.currentPage + 1);

                                            if (!isVisible) {
                                                // Show ellipsis for page gaps
                                                if (pageNumber === 2 || pageNumber === pagination.totalPages - 1) {
                                                    return <span key={page} className="px-3 py-1">...</span>;
                                                }
                                                return null;
                                            }

                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => setPagination({ ...pagination, currentPage: pageNumber })}
                                                    className={`px-3 py-1 rounded-md ${pagination.currentPage === pageNumber ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
                                                >
                                                    {pageNumber}
                                                </button>
                                            );
                                        })}

                                        <button
                                            onClick={() => setPagination({ ...pagination, currentPage: Math.min(pagination.totalPages, pagination.currentPage + 1) })}
                                            disabled={pagination.currentPage === pagination.totalPages}
                                            className={`px-3 py-1 rounded-md ${pagination.currentPage === pagination.totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div></>
                    )}
                        </div>

                   
                </div>
            </div>
            
        
    );
};

export default Inventory;