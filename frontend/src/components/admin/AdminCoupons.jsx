import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { PlusIcon, EditIcon, TrashIcon, ArchiveIcon, XIcon, CheckIcon, ClockIcon, TagIcon, PercentIcon, DollarSignIcon, CalendarIcon, HashIcon, InfoIcon } from 'lucide-react';

const AdminCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [deletedCoupons, setDeletedCoupons] = useState([]);
    const [newCoupon, setNewCoupon] = useState({
        code: '',
        discount_value: '',
        discount_percentage: '',
        valid_from: '',
        valid_to: '',
        usage_limit: '',
        description: '',
        category_id: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeletedCoupons, setShowDeletedCoupons] = useState(false);
    const [activeTab, setActiveTab] = useState('active');

    useEffect(() => {
        fetchCoupons();
        fetchCategories();
    }, []);

    const fetchCoupons = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/coupons');
            const activeCoupons = response.data.filter(coupon => !coupon.is_deleted);
            const deleted = response.data.filter(coupon => coupon.is_deleted);
            setCoupons(activeCoupons);
            setDeletedCoupons(deleted);
        } catch (error) {
            showError('Fetch Error', 'Unable to load coupons.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories/all');
            setCategories(response.data);
        } catch (error) {
            showError('Fetch Error', 'Unable to load categories.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCoupon((prevCoupon) => ({
            ...prevCoupon,
            [name]: value,
        }));
    };

    const showError = (title, text) => {
        Swal.fire({
            icon: 'error',
            title,
            text,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#fff',
            iconColor: '#ef4444',
        });
    };

    const showSuccess = (title) => {
        Swal.fire({
            icon: 'success',
            title,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#fff',
            iconColor: '#10b981',
        });
    };

    const resetForm = () => {
        setNewCoupon({
            code: '',
            discount_value: '',
            discount_percentage: '',
            valid_from: '',
            valid_to: '',
            usage_limit: '',
            description: '',
            category_id: '',
        });
        setSelectedCoupon(null);
        setIsEditing(false);
    };

    const prepareEditForm = (coupon) => {
        setNewCoupon({
            code: coupon.code,
            discount_value: coupon.discount_value,
            discount_percentage: coupon.discount_percentage,
            valid_from: coupon.valid_from ? coupon.valid_from.split('T')[0] : '',
            valid_to: coupon.valid_to ? coupon.valid_to.split('T')[0] : '',
            usage_limit: coupon.usage_limit,
            description: coupon.description,
            category_id: coupon.category_id,
        });
        setSelectedCoupon(coupon);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCreateCoupon = async (e) => {
        e.preventDefault();
        if (!newCoupon.code) {
            showError('Validation Error', 'Coupon code is required!');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/coupons', newCoupon);
            setCoupons((prevCoupons) => [response.data.coupon, ...prevCoupons]);
            resetForm();
            showSuccess('Coupon Created Successfully');
        } catch (error) {
            showError('Creation Error', error.response?.data?.message || 'Unable to create coupon.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateCoupon = async (e) => {
        e.preventDefault();
        if (!newCoupon.code) {
            showError('Validation Error', 'Coupon code is required!');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.put(
                `http://localhost:5000/api/coupons/${selectedCoupon.coupon_id}`,
                newCoupon
            );
            setCoupons((prevCoupons) =>
                prevCoupons.map((coupon) =>
                    coupon.coupon_id === selectedCoupon.coupon_id ? response.data.coupon : coupon
                )
            );
            resetForm();
            showSuccess('Coupon Updated Successfully');
        } catch (error) {
            showError('Update Error', error.response?.data?.message || 'Unable to update coupon.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteCoupon = async (couponId) => {
        const result = await Swal.fire({
            title: 'Archive Coupon?',
            text: 'This will move the coupon to the archive section.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, archive it',
            cancelButtonText: 'Cancel',
            background: '#fff',
            backdrop: 'rgba(0,0,0,0.1)',
        });

        if (result.isConfirmed) {
            try {
                await axios.patch(`http://localhost:5000/api/coupons/${couponId}/delete`);
                const couponToMove = coupons.find((coupon) => coupon.coupon_id === couponId);
                const updatedCoupons = coupons.filter((coupon) => coupon.coupon_id !== couponId);
                setCoupons(updatedCoupons);
                setDeletedCoupons((prev) => [{ ...couponToMove, is_deleted: true }, ...prev]);
                showSuccess('Coupon Archived');
            } catch (error) {
                showError('Archive Error', error.response?.data?.message || 'Unable to archive coupon.');
            }
        }
    };

    const handleRestoreCoupon = async (couponId) => {
        try {
            await axios.patch(`http://localhost:5000/api/coupons/${couponId}/restore`);
            const couponToRestore = deletedCoupons.find((coupon) => coupon.coupon_id === couponId);
            const updatedDeletedCoupons = deletedCoupons.filter((coupon) => coupon.coupon_id !== couponId);
            setDeletedCoupons(updatedDeletedCoupons);
            setCoupons((prev) => [{ ...couponToRestore, is_deleted: false }, ...prev]);
            showSuccess('Coupon Restored Successfully');
            setActiveTab('active');
        } catch (error) {
            showError('Restore Error', error.response?.data?.message || 'Unable to restore coupon.');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getStatusBadge = (validFrom, validTo) => {
        const now = new Date();
        const from = new Date(validFrom);
        const to = new Date(validTo);
        
        if (!validFrom || !validTo) return 'Inactive';
        
        if (now < from) {
            return 'Upcoming';
        } else if (now >= from && now <= to) {
            return 'Active';
        } else {
            return 'Expired';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800';
            case 'Expired': return 'bg-red-100 text-red-800';
            case 'Upcoming': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Coupon Management
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Create, manage, and track your promotional coupons
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowDeletedCoupons(!showDeletedCoupons)}
                            className={`flex items-center px-4 py-2 rounded-lg transition ${showDeletedCoupons ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                        >
                            <ArchiveIcon className="mr-2 w-5 h-5" />
                            {showDeletedCoupons ? 'Hide' : 'Show'} Archived
                        </button>
                    </div>
                </div>

                {/* Form Section */}
                <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8 border border-gray-200">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                {isEditing ? (
                                    <>
                                        <EditIcon className="mr-3 text-yellow-500" />
                                        Edit Coupon
                                    </>
                                ) : (
                                    <>
                                        <PlusIcon className="mr-3 text-blue-500" />
                                        Create New Coupon
                                    </>
                                )}
                            </h2>
                            {isEditing && (
                                <button
                                    onClick={resetForm}
                                    className="text-gray-500 hover:text-gray-700 transition"
                                >
                                    <XIcon className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                        
                        <form onSubmit={isEditing ? handleUpdateCoupon : handleCreateCoupon} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Coupon Code */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                                        <TagIcon className="mr-2 w-4 h-4" />
                                        Coupon Code
                                    </label>
                                    <input
                                        type="text"
                                        name="code"
                                        value={newCoupon.code}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="SUMMER20"
                                        required
                                    />
                                </div>

                                {/* Discount Value */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                                        <DollarSignIcon className="mr-2 w-4 h-4" />
                                        Discount Value ($)
                                    </label>
                                    <input
                                        type="number"
                                        name="discount_value"
                                        value={newCoupon.discount_value}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>

                                {/* Discount Percentage */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                                        <PercentIcon className="mr-2 w-4 h-4" />
                                        Discount Percentage
                                    </label>
                                    <input
                                        type="number"
                                        name="discount_percentage"
                                        value={newCoupon.discount_percentage}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="0"
                                        min="0"
                                        max="100"
                                    />
                                </div>

                                {/* Valid From */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                                        <CalendarIcon className="mr-2 w-4 h-4" />
                                        Valid From
                                    </label>
                                    <input
                                        type="date"
                                        name="valid_from"
                                        value={newCoupon.valid_from}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>

                                {/* Valid To */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                                        <CalendarIcon className="mr-2 w-4 h-4" />
                                        Valid To
                                    </label>
                                    <input
                                        type="date"
                                        name="valid_to"
                                        value={newCoupon.valid_to}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>

                                {/* Usage Limit */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                                        <HashIcon className="mr-2 w-4 h-4" />
                                        Usage Limit
                                    </label>
                                    <input
                                        type="number"
                                        name="usage_limit"
                                        value={newCoupon.usage_limit}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="Unlimited if empty"
                                        min="1"
                                    />
                                </div>

                                {/* Description */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                                        <InfoIcon className="mr-2 w-4 h-4" />
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={newCoupon.description}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="Enter coupon description (optional)"
                                        rows="2"
                                    />
                                </div>

                                {/* Category Select */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Category (optional)
                                    </label>
                                    <select
                                        name="category_id"
                                        value={newCoupon.category_id}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.category_id} value={category.category_id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="mr-4 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition flex items-center justify-center shadow-md"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <ClockIcon className="mr-2 w-4 h-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : isEditing ? (
                                        <>
                                            <CheckIcon className="mr-2 w-4 h-4" />
                                            Update Coupon
                                        </>
                                    ) : (
                                        <>
                                            <PlusIcon className="mr-2 w-4 h-4" />
                                            Create Coupon
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Coupons List */}
                <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
                    <div className="border-b border-gray-200">
                        <div className="flex overflow-x-auto">
                            <button
                                onClick={() => setActiveTab('active')}
                                className={`px-6 py-4 font-medium text-sm border-b-2 transition ${activeTab === 'active' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            >
                                Active Coupons ({coupons.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('archived')}
                                className={`px-6 py-4 font-medium text-sm border-b-2 transition ${activeTab === 'archived' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            >
                                Archived Coupons ({deletedCoupons.length})
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {activeTab === 'active' ? (
                            <>
                                {coupons.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <TagIcon className="w-10 h-10 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900">No active coupons</h3>
                                        <p className="mt-2 text-gray-500">
                                            Create your first coupon to start offering discounts
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {coupons.map((coupon) => (
                                            <div key={coupon.coupon_id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                                                <div className="p-5">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <h3 className="text-lg font-bold text-gray-800">{coupon.code}</h3>
                                                            {coupon.category_id && (
                                                                <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                                                                    {categories.find(c => c.category_id === coupon.category_id)?.name || 'Category'}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(getStatusBadge(coupon.valid_from, coupon.valid_to))}`}>
                                                            {getStatusBadge(coupon.valid_from, coupon.valid_to)}
                                                        </span>
                                                    </div>
                                                    
                                                    {coupon.description && (
                                                        <p className="text-gray-600 text-sm mb-4">{coupon.description}</p>
                                                    )}
                                                    
                                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                                        <div>
                                                            <p className="text-xs text-gray-500">Discount</p>
                                                            <p className="font-medium">
                                                                {coupon.discount_percentage ? `${coupon.discount_percentage}%` : `$${coupon.discount_value}`}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Usage Limit</p>
                                                            <p className="font-medium">
                                                                {coupon.usage_limit || '∞'}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Valid From</p>
                                                            <p className="font-medium text-sm">
                                                                {formatDate(coupon.valid_from)}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">Valid To</p>
                                                            <p className="font-medium text-sm">
                                                                {formatDate(coupon.valid_to)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => prepareEditForm(coupon)}
                                                            className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition flex items-center justify-center text-sm font-medium"
                                                        >
                                                            <EditIcon className="mr-2 w-4 h-4" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteCoupon(coupon.coupon_id)}
                                                            className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition flex items-center justify-center text-sm font-medium"
                                                        >
                                                            <TrashIcon className="mr-2 w-4 h-4" />
                                                            Archive
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {deletedCoupons.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <ArchiveIcon className="w-10 h-10 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900">No archived coupons</h3>
                                        <p className="mt-2 text-gray-500">
                                            Archived coupons will appear here
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {deletedCoupons.map((coupon) => (
                                            <div key={coupon.coupon_id} className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                                                <div className="p-5">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <h3 className="text-lg font-bold text-gray-500 line-through">{coupon.code}</h3>
                                                            {coupon.category_id && (
                                                                <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-gray-200 text-gray-600 rounded-full">
                                                                    {categories.find(c => c.category_id === coupon.category_id)?.name || 'Category'}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                                                            Archived
                                                        </span>
                                                    </div>
                                                    
                                                    {coupon.description && (
                                                        <p className="text-gray-500 text-sm mb-4">{coupon.description}</p>
                                                    )}
                                                    
                                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                                        <div>
                                                            <p className="text-xs text-gray-400">Discount</p>
                                                            <p className="font-medium text-gray-500">
                                                                {coupon.discount_percentage ? `${coupon.discount_percentage}%` : `$${coupon.discount_value}`}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-400">Usage Limit</p>
                                                            <p className="font-medium text-gray-500">
                                                                {coupon.usage_limit || '∞'}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-400">Valid From</p>
                                                            <p className="font-medium text-sm text-gray-500">
                                                                {formatDate(coupon.valid_from)}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-400">Valid To</p>
                                                            <p className="font-medium text-sm text-gray-500">
                                                                {formatDate(coupon.valid_to)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    
                                                    <button
                                                        onClick={() => handleRestoreCoupon(coupon.coupon_id)}
                                                        className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition flex items-center justify-center text-sm font-medium"
                                                    >
                                                        <ArchiveIcon className="mr-2 w-4 h-4" />
                                                        Restore Coupon
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCoupons;