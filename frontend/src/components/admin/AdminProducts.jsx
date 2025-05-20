// src/components/AdminProducts.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { PlusIcon, ChevronUp } from 'lucide-react';
import ProductForm from './products/ProductForm';
import ProductsTable from './products/ProductsTable';

const AdminProducts = () => {
  // ─── State ─────────────────────────────────────────────────────────────
  const [products, setProducts] = useState([]);
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('active'); // 'active'|'outOfStock'|'deleted'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: '',
    discounted_price: '', stock: '',
    delivery_type: '', platform: '',
    category_id: '', featured: false,
    image: null, previewImage: '',
  });

  // Ref so we can skip the first tab/search effect
  const initialFetchDone = useRef(false);

  // ─── 1) On mount: load categories → then products & deleted ────────────
  useEffect(() => {
    (async () => {
      await fetchCategories();
      await fetchProducts();
      await fetchDeletedProducts();
      initialFetchDone.current = true;
    })();
  }, []);

  // ─── 2) Debounced refetch on tab or search changes (after initial) ─────
  useEffect(() => {
    if (!initialFetchDone.current) return;
    const t = setTimeout(() => {
      activeTab === 'deleted' ? fetchDeletedProducts() : fetchProducts();
    }, 300);
    return () => clearTimeout(t);
  }, [activeTab, searchQuery]);

  // ─── FETCH CATEGORIES ─────────────────────────────────────────────────
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/categories/all');
      setCategories(data);
    } catch {
      showError('Fetch Error', 'Unable to load categories.');
    }
  };

  // ─── ENRICH PRODUCTS WITH category_name ────────────────────────────────
  const enrichProductsWithCategories = async list =>
    Promise.all(
      list.map(async p => {
        if (!p.category_id) return { ...p, category_name: 'Uncategorized' };

        // 1) Find in our loaded list
        const found = categories.find(c => c.category_id === p.category_id);
        if (found) return { ...p, category_name: found.name };

        // 2) Fallback — fetch single category
        try {
          const { data } = await axios.get(
            `http://localhost:5000/api/categories/${p.category_id}`
          );
          return { ...p, category_name: data.name || 'Uncategorized' };
        } catch {
          return { ...p, category_name: 'Uncategorized' };
        }
      })
    );

  // ─── FETCH ACTIVE / OUT‑OF‑STOCK ────────────────────────────────────────
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const useSearch = searchQuery.trim() !== '';
      const url = useSearch
        ? 'http://localhost:5000/api/products/search-admin'
        : 'http://localhost:5000/api/products';
      const params = useSearch
        ? { q: searchQuery, tab: activeTab }
        : undefined;

      const { data } = await axios.get(url, { params });
      setProducts(await enrichProductsWithCategories(data));
    } catch {
      showError('Fetch Error', 'Unable to load products.');
    } finally {
      setIsLoading(false);
    }
  };

  // ─── FETCH DELETED ─────────────────────────────────────────────────────
  const fetchDeletedProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/api/products/deleted');
      // your deleted endpoint returns { products: [...] }
      const list = data.products || data;
      setDeletedProducts(await enrichProductsWithCategories(list));
    } catch {
      showError('Fetch Error', 'Unable to load archived products.');
    } finally {
      setIsLoading(false);
    }
  };

  // ─── FORM / CRUD HANDLERS (UNCHANGED) ─────────────────────────────────
  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageUpload = e => {
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
  const removeImage = () => setNewProduct(prev => ({ ...prev, image: null, previewImage: '' }));

  const prepareFormData = data => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'image' && value) {
        formData.append('image', value);
      } else if (key !== 'previewImage' && value !== null && value !== undefined && value !== '') {
        formData.append(key, value);
      }
    });
    return formData;
  };

  const handleCreateProduct = async e => {
    e.preventDefault();
    if (!validateProductForm()) return;
    setIsLoading(true);
    try {
      const formData = prepareFormData(newProduct);
      const { data } = await axios.post(
        'http://localhost:5000/api/products',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setProducts(prev => [data.product, ...prev]);
      resetForm();
      showSuccess('Product Created');
      await fetchProducts();
    } catch (err) {
      console.error('Creation error:', err);
      showError('Creation Error', err.response?.data?.message || 'Unable to create product.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async e => {
    e.preventDefault();
    if (!validateProductForm()) return;
    setIsLoading(true);
    try {
      const formData = prepareFormData(newProduct);
      const { data } = await axios.put(
        `http://localhost:5000/api/products/${selectedProduct.product_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setProducts(prev =>
        prev.map(p => p.product_id === data.product.product_id ? data.product : p)
      );
      resetForm();
      showSuccess('Product Updated');
      await fetchProducts();
    } catch (err) {
      console.error('Update error:', err);
      showError('Update Error', err.response?.data?.message || 'Unable to update product.');
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

  // Sync form when editing
  useEffect(() => {
    if (isEditing && selectedProduct) {
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
        image: null,
      });
      setIsFormOpen(true);
    }
  }, [isEditing, selectedProduct]);

  // Archive / restore / permanent delete
  const handleDeleteProduct = async id => {
    const ok = await confirmAction('Archive Product?', 'This will move it to the archive.');
    if (!ok) return;
    try {
      await axios.patch(`http://localhost:5000/api/products/${id}/delete`);
      setProducts(p => p.filter(x => x.product_id !== id));
      await fetchDeletedProducts();
      showSuccess('Product Archived');
    } catch (err) {
      showError('Archive Error', err.response?.data?.message || 'Unable to archive product.');
    }
  };

  const handleRestoreProduct = async id => {
    try {
      await axios.patch(`http://localhost:5000/api/products/${id}/restore`);
      await Promise.all([fetchProducts(), fetchDeletedProducts()]);
      showSuccess('Product Restored');
    } catch (err) {
      showError('Restore Error', err.response?.data?.message || 'Unable to restore.');
    }
  };

  const handlePermanentDelete = async id => {
    const ok = await confirmAction('Permanently Delete?', 'This cannot be undone!');
    if (!ok) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}/force`);
      setDeletedProducts(p => p.filter(x => x.product_id !== id));
      showSuccess('Product Permanently Deleted');
    } catch (err) {
      showError('Deletion Error', err.response?.data?.message || 'Unable to delete.');
    }
  };

  // ─── UI Helpers ─────────────────────────────────────────────────────────
  const confirmAction = (title, text) =>
    Swal.fire({ title, text, icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', cancelButtonColor: '#3085d6', confirmButtonText: 'Yes', cancelButtonText: 'No' })
      .then(r => r.isConfirmed);

  const showError = (title, text) =>
    Swal.fire({ icon: 'error', title, text, toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });

  const showSuccess = title =>
    Swal.fire({ icon: 'success', title, toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });

  const resetForm = () => {
    setNewProduct({
      name: '', description: '', price: '',
      discounted_price: '', stock: '',
      delivery_type: '', platform: '',
      category_id: '', featured: false,
      image: null, previewImage: '',
    });
    setIsEditing(false);
    setSelectedProduct(null);
    setIsFormOpen(false);
  };

  // ─── Tab filtering & counts ─────────────────────────────────────────────
  const getProductsToDisplay = () => {
    if (activeTab === 'outOfStock') return products.filter(p => p.stock <= 0);
    return activeTab === 'deleted' ? deletedProducts : products;
  };
  const getTabCount = tab => {
    if (tab === 'outOfStock') return products.filter(p => p.stock <= 0).length;
    return tab === 'deleted' ? deletedProducts.length : products.length;
  };

  const toggleForm = () => {
    if (isEditing) resetForm();
    else {
      setIsFormOpen(o => !o);
      if (!isFormOpen) window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header + Search + Add Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600">
              {isEditing ? 'Edit existing product' : 'Add and manage your products'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search products…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <button
              onClick={toggleForm}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-sm"
            >
              {isFormOpen
                ? <><ChevronUp className="w-5 h-5 mr-2" /> Hide Form</>
                : <><PlusIcon className="w-5 h-5 mr-2" /> Add New Product</>}
            </button>
          </div>
        </div>

        {/* Collapsible Form */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFormOpen ? 'max-h-[2000px] mb-6' : 'max-h-0 mb-0'
          }`}>
          {isFormOpen && (
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
          )}
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
