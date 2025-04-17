import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { PlusIcon, ChevronDown, ChevronUp } from 'lucide-react';
import ProductForm from './products/ProductForm';
import ProductsTable from './products/ProductsTable';

const AdminProducts = () => {
    // State management
    const [products, setProducts] = useState([]);
    const [deletedProducts, setDeletedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('active');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        discounted_price: '',
        stock: '',
        delivery_type: '',
        platform: '',
        category_id: '',
        featured: false,
        image: null,
        previewImage: '',
    });

    // Data fetching
    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        await Promise.all([
            fetchProducts(),
            fetchDeletedProducts(),
            fetchCategories()
        ]);
    };

    // Form state synchronization
    useEffect(() => {
        if (isEditing && selectedProduct) {
            syncFormWithSelectedProduct();
            setIsFormOpen(true);
        }
    }, [isEditing, selectedProduct]);

    // API functions
    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            const productsWithCategories = await enrichProductsWithCategories(response.data);
            setProducts(productsWithCategories);
        } catch (error) {
            showError('Fetch Error', 'Unable to load products.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDeletedProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products/deleted');
            const productsWithCategories = await enrichProductsWithCategories(response.data.products || []);
            setDeletedProducts(productsWithCategories);
        } catch (error) {
            showError('Fetch Error', 'Unable to load archived products.');
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

    // Helper functions
    const enrichProductsWithCategories = async (products) => {
        return await Promise.all(
            products.map(async product => {
                if (!product.category_id) return product;
                try {
                    const category = categories.find(c => c.category_id === product.category_id) || 
                                    await axios.get(`http://localhost:5000/api/categories/${product.category_id}`);
                    return {
                        ...product,
                        category_name: category?.name || 'Uncategorized'
                    };
                } catch {
                    return {
                        ...product,
                        category_name: 'Uncategorized'
                    };
                }
            })
        );
    };

    const syncFormWithSelectedProduct = () => {
        setNewProduct({
            name: selectedProduct.name,
            description: selectedProduct.description,
            price: selectedProduct.price,
            discounted_price: selectedProduct.discounted_price || '',
            stock: selectedProduct.stock,
            delivery_type: selectedProduct.delivery_type,
            platform: selectedProduct.platform,
            category_id: selectedProduct.category_id,
            featured: selectedProduct.featured || false,
            previewImage: selectedProduct.images?.[0] || '',
            image: null
        });
    };

    // Form handlers
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            showError('File Too Large', 'Image must be less than 5MB');
            return;
        }

        setNewProduct(prev => ({
            ...prev,
            image: file,
            previewImage: URL.createObjectURL(file),
        }));
    };

    const removeImage = () => {
        setNewProduct(prev => ({
            ...prev,
            image: null,
            previewImage: '',
        }));
    };

    // Product CRUD operations
    const prepareFormData = (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                formData.append(key, value);
            }
        });
        return formData;
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        if (!validateProductForm()) return;

        setIsLoading(true);
        try {
            const formData = prepareFormData(newProduct);
            const response = await axios.post('http://localhost:5000/api/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setProducts(prev => [response.data.product, ...prev]);
            resetForm();
            showSuccess('Product Created');
            await fetchProducts();
        } catch (error) {
            showError('Creation Error', error.response?.data?.message || 'Unable to create product.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        if (!validateProductForm()) return;

        setIsLoading(true);
        try {
            const formData = prepareFormData(newProduct);
            const response = await axios.put(
                `http://localhost:5000/api/products/${selectedProduct.product_id}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            setProducts(prev => prev.map(prod =>
                prod.product_id === selectedProduct.product_id ? response.data.product : prod
            ));
            resetForm();
            showSuccess('Product Updated');
            await fetchProducts();
        } catch (error) {
            showError('Update Error', error.response?.data?.message || 'Unable to update product.');
        } finally {
            setIsLoading(false);
        }
    };

    const validateProductForm = () => {
        if (!newProduct.name || !newProduct.category_id) {
            showError('Validation Error', 'Product name and category are required!');
            return false;
        }
        return true;
    };

    // Product status management
    const handleDeleteProduct = async (productId) => {
        const result = await confirmAction(
            'Archive Product?',
            'This will move the product to the archive.'
        );
        
        if (!result.isConfirmed) return;

        try {
            await axios.patch(`http://localhost:5000/api/products/${productId}/delete`);
            setProducts(prev => prev.filter(p => p.product_id !== productId));
            await fetchDeletedProducts();
            showSuccess('Product Archived');
        } catch (error) {
            showError('Archive Error', error.response?.data?.message || 'Unable to archive product.');
        }
    };

    const handleRestoreProduct = async (productId) => {
        try {
            await axios.patch(`http://localhost:5000/api/products/${productId}/restore`);
            await Promise.all([fetchProducts(), fetchDeletedProducts()]);
            showSuccess('Product Restored');
        } catch (error) {
            showError('Restore Error', error.response?.data?.message || 'Unable to restore product.');
        }
    };

    const handlePermanentDelete = async (productId) => {
        const result = await confirmAction(
            'Permanently Delete Product?',
            'This action cannot be undone!'
        );
        
        if (!result.isConfirmed) return;

        try {
            await axios.delete(`http://localhost:5000/api/products/${productId}/force`);
            setDeletedProducts(prev => prev.filter(p => p.product_id !== productId));
            showSuccess('Product Permanently Deleted');
        } catch (error) {
            showError('Deletion Error', error.response?.data?.message || 'Unable to delete product.');
        }
    };

    // UI helpers
    const confirmAction = (title, text) => {
        return Swal.fire({
            title,
            text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, proceed!',
            cancelButtonText: 'Cancel',
        });
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
        });
    };

    const resetForm = () => {
        setNewProduct({
            name: '',
            description: '',
            price: '',
            discounted_price: '',
            stock: '',
            delivery_type: '',
            platform: '',
            category_id: '',
            featured: false,
            image: null,
            previewImage: '',
        });
        setIsEditing(false);
        setSelectedProduct(null);
        setIsFormOpen(false);
    };

    // Toggle form visibility
    const toggleForm = () => {
        if (isEditing) {
            resetForm();
        } else {
            setIsFormOpen(!isFormOpen);
            if (!isFormOpen) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    // Data filtering and counting
    const getProductsToDisplay = () => {
        switch (activeTab) {
            case 'active': return products;
            case 'deleted': return deletedProducts;
            case 'outOfStock': return products.filter(p => p.stock <= 0);
            default: return products;
        }
    };

    const getTabCount = (tab) => {
        switch (tab) {
            case 'active': return products.length;
            case 'deleted': return deletedProducts.length;
            case 'outOfStock': return products.filter(p => p.stock <= 0).length;
            default: return 0;
        }
    };

    // Render
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                        <p className="text-gray-600 mt-1">
                            {isEditing ? 'Edit existing product' : 'Add and manage your products'}
                        </p>
                    </div>
                    <button 
                        onClick={toggleForm}
                        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
                    >
                        {isFormOpen ? (
                            <>
                                <ChevronUp className="w-5 h-5 mr-2" />
                                Hide Form
                            </>
                        ) : (
                            <>
                                <PlusIcon className="w-5 h-5 mr-2" />
                                Add New Product
                            </>
                        )}
                    </button>
                </div>

                {/* Product Form - Collapsible Section */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFormOpen ? 'max-h-[2000px] mb-6' : 'max-h-0 mb-0'}`}>
                    <div className={`${isFormOpen ? 'block' : 'hidden'}`}>
                        <ProductForm
                            newProduct={newProduct}
                            categories={categories}
                            isLoading={isLoading}
                            isEditing={isEditing}
                            handleInputChange={handleInputChange}
                            handleImageUpload={handleImageUpload}
                            removeImage={removeImage}
                            handleSubmit={isEditing ? handleUpdateProduct : handleCreateProduct}
                            resetForm={resetForm}
                        />
                    </div>
                </div>

                {/* Products Table */}
                <ProductsTable
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isLoading={isLoading}
                    products={getProductsToDisplay()}
                    getTabCount={getTabCount}
                    setSelectedProduct={setSelectedProduct}
                    setIsEditing={setIsEditing}
                    handleDeleteProduct={handleDeleteProduct}
                    handleRestoreProduct={handleRestoreProduct}
                    handlePermanentDelete={handlePermanentDelete}
                />
            </div>
        </div>
    );
};

export default AdminProducts;