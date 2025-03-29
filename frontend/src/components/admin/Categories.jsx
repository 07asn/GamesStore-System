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
  TagIcon ,
  InfoIcon ,
  CheckIcon,
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon
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
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [activeTab, setActiveTab] = useState('active');

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
      showError('Fetch Error', error.response?.data?.message || 'Unable to load categories.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort categories
  const sortedCategories = [...categories].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

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
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showError('File Too Large', 'Image must be less than 5MB');
        return;
      }
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
      background: '#fff',
      iconColor: '#ef4444',
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
      background: '#fff',
      iconColor: '#10b981',
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
      showSuccess('Category Created Successfully');
    } catch (error) {
      showError('Creation Error', error.response?.data?.message || 'Unable to create category.');
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
      showSuccess('Category Updated Successfully');
    } catch (error) {
      showError('Update Error', error.response?.data?.message || 'Unable to update category.');
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Soft delete category
  const handleDeleteCategory = async (categoryId) => {
    const result = await Swal.fire({
      title: 'Archive Category?',
      text: 'This will move the category to the archive section.',
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
        showError('Archive Error', error.response?.data?.message || 'Unable to archive category.');
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

      showSuccess('Category Restored Successfully');
    } catch (error) {
      showError('Restore Error', error.response?.data?.message || 'Unable to restore category.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Category Management
            </h1>
            <p className="text-gray-600 mt-2">
              Organize and manage your product categories
            </p>
          </div>
          <button
            onClick={() => setShowDeletedCategories(!showDeletedCategories)}
            className={`flex items-center px-4 py-2 rounded-lg transition ${showDeletedCategories ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
          >
            <ArchiveIcon className="mr-2 w-5 h-5" />
            {showDeletedCategories ? 'Hide' : 'Show'} Archived
          </button>
        </div>

        {/* Create/Edit Category Form */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8 border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                {isEditing ? (
                  <>
                    <EditIcon className="mr-3 text-yellow-500" />
                    Edit Category
                  </>
                ) : (
                  <>
                    <PlusIcon className="mr-3 text-blue-500" />
                    Create New Category
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
            
            <form onSubmit={isEditing ? handleUpdateCategory : handleCreateCategory} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Category Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <TagIcon className="mr-2 w-4 h-4" />
                    Category Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newCategory.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="e.g. Electronics"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <InfoIcon className="mr-2 w-4 h-4" />
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={newCategory.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Short description (optional)"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <ImageIcon className="mr-2 w-4 h-4" />
                    Category Image
                  </label>
                  {newCategory.previewImage ? (
                    <div className="relative group">
                      <img 
                        src={newCategory.previewImage} 
                        alt="Preview" 
                        className="w-full h-32 object-cover rounded-lg shadow-sm"
                        onError={(e) => {
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
                      Update Category
                    </>
                  ) : (
                    <>
                      <PlusIcon className="mr-2 w-4 h-4" />
                      Create Category
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Categories List */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition ${activeTab === 'active' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Active Categories ({categories.length})
              </button>
              <button
                onClick={() => setActiveTab('archived')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition ${activeTab === 'archived' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Archived Categories ({deletedCategories.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'active' ? (
              <>
                {categories.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <ImageIcon className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No active categories</h3>
                    <p className="mt-2 text-gray-500">
                      Create your first category to start organizing products
                    </p>
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
                  <>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Image
                            </th>
                            <th 
                              scope="col" 
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                              onClick={() => requestSort('name')}
                            >
                              <div className="flex items-center">
                                Name
                                {sortConfig.key === 'name' && (
                                  sortConfig.direction === 'asc' ? 
                                    <ArrowUpIcon className="ml-1 w-3 h-3" /> : 
                                    <ArrowDownIcon className="ml-1 w-3 h-3" />
                                )}
                              </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Description
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {sortedCategories.map((category) => (
                            <tr key={category.category_id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex-shrink-0 h-10 w-10">
                                  {category.image_url ? (
                                    <img className="h-10 w-10 rounded-full object-cover" src={category.image_url} alt="" />
                                  ) : (
                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                      <ImageIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{category.name}</div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-500 line-clamp-2">{category.description || 'No description'}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => handleEditCategory(category)}
                                    className="text-blue-600 hover:text-blue-900"
                                  >
                                    <EditIcon className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCategory(category.category_id)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <TrashIcon className="w-5 h-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {deletedCategories.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <ArchiveIcon className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No archived categories</h3>
                    <p className="mt-2 text-gray-500">
                      Archived categories will appear here
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Image
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {deletedCategories.map((category) => (
                          <tr key={category.category_id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex-shrink-0 h-10 w-10">
                                {category.image_url ? (
                                  <img className="h-10 w-10 rounded-full object-cover filter grayscale" src={category.image_url} alt="" />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <ArchiveIcon className="w-5 h-5 text-gray-400" />
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-500 line-through">{category.name}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-400 line-clamp-2">{category.description || 'No description'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleRestoreCategory(category.category_id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                <ArchiveIcon className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default Categories;