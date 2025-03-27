import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  ArchiveIcon,
  ImageIcon,
  XIcon,
} from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [deletedCategories, setDeletedCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    image: null,
    previewImage: '',
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeletedCategories, setShowDeletedCategories] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch all categories from the backend
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/categories/all');
      const activeCategories = response.data.filter((category) => !category.is_deleted);
      const deleted = response.data.filter((category) => category.is_deleted);

      setCategories(activeCategories);
      setDeletedCategories(deleted);
    } catch (error) {
      showError('Fetch Error', 'Unable to load categories.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form change for new category
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCategory(prev => ({
        ...prev,
        image: file,
        previewImage: URL.createObjectURL(file)
      }));
    }
  };

  // Remove selected image
  const removeImage = () => {
    setNewCategory({
      ...newCategory,
      image: null,
      previewImage: '',
    });
  };

  // Show error message
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

  // Show success message
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

  // Reset form
  const resetForm = () => {
    setNewCategory({
      name: '',
      description: '',
      image: null,
      previewImage: '',
    });
    setSelectedCategory(null);
    setIsEditing(false);
  };

  // Prepare form data for submission
  const prepareFormData = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    if (data.image) {
      formData.append('image', data.image);
    }
    return formData;
  };

  // Create new category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.name) {
      showError('Validation Error', 'Category name is required!');
      return;
    }

    setIsLoading(true);
    try {
      const formData = prepareFormData(newCategory);
      const response = await axios.post('http://localhost:5000/api/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setCategories((prevCategories) => [response.data.category, ...prevCategories]);
      resetForm();
      showSuccess('Category Created');
    } catch (error) {
      showError('Creation Error', 'Unable to create category.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.name) {
      showError('Validation Error', 'Category name is required!');
      return;
    }

    setIsLoading(true);
    try {
      const formData = prepareFormData(newCategory);
      const response = await axios.put(
        `http://localhost:5000/api/categories/${selectedCategory.category_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.category_id === selectedCategory.category_id ? response.data.category : cat
        )
      );
      resetForm();
      showSuccess('Category Updated');
    } catch (error) {
      showError('Update Error', 'Unable to update category.');
    } finally {
      setIsLoading(false);
    }
  };

  // Set category for editing
  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsEditing(true);
    setNewCategory({
      name: category.name,
      description: category.description || '',
      image: null,
      previewImage: category.image_url || '',
    });
  };

  // Soft delete category
  const handleDeleteCategory = async (categoryId) => {
    const result = await Swal.fire({
      title: 'Archive Category?',
      text: 'This will move the category to the archive.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, archive it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await axios.patch(`http://localhost:5000/api/categories/${categoryId}/delete`);
        
        const categoryToMove = categories.find((cat) => cat.category_id === categoryId);
        
        const updatedCategories = categories.filter(
          (category) => category.category_id !== categoryId
        );
        setCategories(updatedCategories);
        
        setDeletedCategories((prev) => [
          { ...categoryToMove, is_deleted: true },
          ...prev,
        ]);

        showSuccess('Category Archived');
      } catch (error) {
        showError('Archive Error', 'Unable to archive category.');
      }
    }
  };

  // Restore deleted category
  const handleRestoreCategory = async (categoryId) => {
    try {
      await axios.patch(`http://localhost:5000/api/categories/${categoryId}/restore`);
      
      const categoryToRestore = deletedCategories.find((cat) => cat.category_id === categoryId);
      
      const updatedDeletedCategories = deletedCategories.filter(
        (category) => category.category_id !== categoryId
      );
      setDeletedCategories(updatedDeletedCategories);
      
      setCategories((prev) => [
        { ...categoryToRestore, is_deleted: false },
        ...prev,
      ]);

      showSuccess('Category Restored');
    } catch (error) {
      showError('Restore Error', 'Unable to restore category.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Category Management
            </h1>
            <p className="text-gray-500 mt-1">Organize your product categories</p>
          </div>
          <button 
            onClick={() => setShowDeletedCategories(!showDeletedCategories)}
            className="flex items-center bg-white text-gray-800 px-4 py-2 rounded-full hover:bg-gray-100 transition-all shadow-sm hover:shadow-md border border-gray-200"
          >
            <ArchiveIcon className="mr-2 w-5 h-5" />
            {showDeletedCategories ? 'Hide' : 'Show'} Archived
            <span className="hidden sm:inline"> Categories</span>
          </button>
        </div>

        {/* Create/Edit Category Form */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-100 transition-all hover:shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center">
              {isEditing ? (
                <>
                  <EditIcon className="mr-3 text-yellow-600 w-6 h-6" />
                  Edit Category
                </>
              ) : (
                <>
                  <PlusIcon className="mr-3 text-blue-600 w-6 h-6" />
                  Create New Category
                </>
              )}
            </h2>
            {isEditing && (
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700 transition"
                title="Cancel editing"
              >
                <XIcon className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <form onSubmit={isEditing ? handleUpdateCategory : handleCreateCategory} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Category Name *</label>
              <input
                type="text"
                name="name"
                value={newCategory.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm"
                placeholder="e.g. Electronics"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                value={newCategory.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm"
                placeholder="Short description"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Category Image</label>
              <div className="flex flex-col">
              {newCategory.previewImage ? (
    <div className="relative group">
      <img 
        src={newCategory.previewImage} 
        alt="Preview" 
        className="w-full h-32 object-cover rounded-lg shadow-sm"
        onError={(e) => {
          // Fallback if image fails to load
          e.target.src = '/placeholder-image.jpg';
        }}
      />
      <button
        type="button"
        onClick={removeImage}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
        title="Remove image"
      >
        <XIcon className="w-4 h-4" />
      </button>
    </div>

                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                      <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF (Max. 5MB)</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
            
            <div className="md:col-span-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 py-3 rounded-lg transition-all flex items-center justify-center ${
                    isLoading 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-md hover:shadow-lg'
                  }`}
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : isEditing ? (
                    <>
                      <EditIcon className="mr-2 w-5 h-5" />
                      Update Category
                    </>
                  ) : (
                    <>
                      <PlusIcon className="mr-2 w-5 h-5" />
                      Create Category
                    </>
                  )}
                </button>
                
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition border border-gray-300 shadow-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Active Categories */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              Active Categories
            </h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {categories.length} active
            </span>
          </div>
          
          {categories.length === 0 ? (
            <div className="bg-white shadow-sm rounded-xl p-8 text-center border border-gray-200">
              <ImageIcon className="mx-auto w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No active categories</h3>
              <p className="text-gray-500 mt-1">Create your first category to get started</p>
              <button
                onClick={() => {
                  resetForm();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Create Category
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {categories.map((category) => (
                <div 
                  key={category.category_id} 
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-blue-100 group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {category.image_url ? (
                      <img 
                        src={category.image_url} 
                        alt={category.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div className="flex space-x-2 w-full">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="flex-1 bg-white/90 text-gray-800 py-1.5 rounded-md hover:bg-white transition flex items-center justify-center text-sm font-medium"
                        >
                          <EditIcon className="mr-1.5 w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.category_id)}
                          className="flex-1 bg-red-500/90 text-white py-1.5 rounded-md hover:bg-red-600 transition flex items-center justify-center text-sm font-medium"
                        >
                          <TrashIcon className="mr-1.5 w-4 h-4" />
                          Archive
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 line-clamp-1">{category.name}</h3>
                    {category.description && (
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2">{category.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Archived Categories */}
        {showDeletedCategories && (
          <div className="mt-12 pb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                Archived Categories
              </h2>
              <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {deletedCategories.length} archived
              </span>
            </div>
            
            {deletedCategories.length === 0 ? (
              <div className="bg-white shadow-sm rounded-xl p-8 text-center border border-gray-200">
                <ArchiveIcon className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No archived categories</h3>
                <p className="text-gray-500 mt-1">Archived categories will appear here</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {deletedCategories.map((category) => (
                  <div 
                    key={category.category_id} 
                    className="bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-200"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {category.image_url ? (
                        <img 
                          src={category.image_url} 
                          alt={category.name} 
                          className="w-full h-full object-cover filter grayscale"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <ArchiveIcon className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 flex items-end p-4">
                        <button
                          onClick={() => handleRestoreCategory(category.category_id)}
                          className="w-full bg-green-600 text-white py-1.5 rounded-md hover:bg-green-700 transition flex items-center justify-center text-sm font-medium"
                        >
                          <ArchiveIcon className="mr-1.5 w-4 h-4" />
                          Restore
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-700 line-through line-clamp-1">{category.name}</h3>
                      {category.description && (
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{category.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;