import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
  PlusIcon, TrashIcon, Edit, Search, Filter, ChevronDown, ChevronUp, 
  RefreshCw, ArrowDownToLine, X, Info, Save
} from 'lucide-react';

const Inventory = () => {
    const [inventories, setInventories] = useState([]);
    const [filteredInventories, setFilteredInventories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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

    // Fetch all inventories on component mount
    useEffect(() => {
        fetchInventories();
    }, []);

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

    const fetchInventories = async () => {
        setIsLoading(true);
        setIsRefreshing(true);
        try {
            const response = await axios.get('http://localhost:5000/api/inventory');
            setInventories(response.data);
        } catch (error) {
            showError('Unable to load inventories.');
        } finally {
            setIsLoading(false);
            setTimeout(() => setIsRefreshing(false), 600); // Add a slight delay for better UX
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
        });
    };

    const StatusBadge = ({ status }) => {
        let bgColor, textColor, label;
        
        switch(status) {
            case 'available':
                bgColor = 'bg-emerald-100';
                textColor = 'text-emerald-800';
                label = 'Available';
                break;
            case 'assigned':
                bgColor = 'bg-blue-100';
                textColor = 'text-blue-800';
                label = 'Assigned';
                break;
            case 'archived':
                bgColor = 'bg-gray-100';
                textColor = 'text-gray-800';
                label = 'Archived';
                break;
            default:
                bgColor = 'bg-gray-100';
                textColor = 'text-gray-800';
                label = status;
        }
        
        return (
            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor} uppercase`}>
                {label}
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
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
                        <p className="mt-1 text-gray-500">Track and manage your company assets</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-2">
                        <button
                            onClick={fetchInventories}
                            className={`px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center ${isRefreshing ? 'opacity-75' : ''}`}
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
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center shadow-sm"
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

                {/* Inventory Form */}
                {isFormOpen && (
                    <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-xl shadow-md border border-gray-100 animate-fadeIn">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            {isEditing ? 'Edit Inventory Item' : 'Add New Inventory Item'}
                        </h2>
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
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center shadow-sm"
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

                {/* Filters and Search */}
                <div className="bg-white p-5 rounded-xl shadow-sm mb-6 border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="relative flex-grow max-w-md">
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

                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center">
                                <Filter className="h-5 w-5 text-gray-400 mr-2" />
                                <select
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    value={filters.status}
                                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="available">Available</option>
                                    <option value="assigned">Assigned</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>

                            <div className="flex items-center">
                                <select
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    value={filters.category}
                                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                                >
                                    {getUniqueCategories().map(category => (
                                        <option key={category} value={category}>
                                            {category === 'all' ? 'All Categories' : category}
                                        </option>
                                    ))}
                                </select>
                            </div>

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
                    </div>
                </div>

                {/* Inventory List */}
                <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
                    {isLoading && inventories.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading inventory data...</p>
                        </div>
                    ) : filteredInventories.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                                <Info className="w-full h-full" />
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
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    <PlusIcon className="w-4 h-4 mr-2" />
                                    Add new item
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                            onClick={() => handleSort('product.name')}
                                        >
                                            <div className="flex items-center">
                                                Product Name
                                                <SortIndicator columnKey="product.name" />
                                            </div>
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                            onClick={() => handleSort('product.category.name')}
                                        >
                                            <div className="flex items-center">
                                                Category
                                                <SortIndicator columnKey="product.category.name" />
                                            </div>
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                            onClick={() => handleSort('asset_code')}
                                        >
                                            <div className="flex items-center">
                                                Asset Code
                                                <SortIndicator columnKey="asset_code" />
                                            </div>
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                            onClick={() => handleSort('status')}
                                        >
                                            <div className="flex items-center">
                                                Status
                                                <SortIndicator columnKey="status" />
                                            </div>
                                        </th>
                                        <th 
                                            scope="col" 
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                            onClick={() => handleSort('assigned_at')}
                                        >
                                            <div className="flex items-center">
                                                Assigned At
                                                <SortIndicator columnKey="assigned_at" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredInventories.map((inventory) => (
                                        <tr key={inventory.inventory_id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {inventory.product ? inventory.product.name : 'Unknown Product'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {inventory.product && inventory.product.category ? 
                                                        inventory.product.category.name : 'Uncategorized'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded inline-block">
                                                    {inventory.asset_code}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={inventory.status} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {inventory.assigned_at ? 
                                                    new Date(inventory.assigned_at).toLocaleString() : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-3">
                                                    <button
                                                        onClick={() => handleEditInventory(inventory)}
                                                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteInventory(inventory.inventory_id)}
                                                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
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
                    )}
                </div>

                {filteredInventories.length > 0 && (
                    <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            Showing {filteredInventories.length} of {inventories.length} items
                        </div>
                        <button 
                            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                            onClick={() => {
                                // This would typically trigger an export function
                                console.log('Export data');
                            }}
                        >
                            <ArrowDownToLine className="w-4 h-4 mr-1" />
                            Export data
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inventory;