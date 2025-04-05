import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
  TrashIcon, 
  ArchiveIcon, 
  StarIcon,
  StarHalfIcon,
  Star,
  MessageSquareIcon,
  UserIcon,
  MailIcon,
  PackageIcon,
  RotateCwIcon,
  XIcon,
  CheckIcon,
  ChevronLeft,
  ChevronRight,
  FilterIcon
} from 'lucide-react';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [deletedReviews, setDeletedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeletedReviews, setShowDeletedReviews] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  
  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    totalItems: 0
  });

  // Fetch reviews with pagination and filters
  const fetchReviews = async (page = 1, limit = 10, search = '', rating = 'all') => {
    setIsLoading(true);
    try {
      let url = `http://localhost:5000/api/reviews/all?page=${page}&limit=${limit}`;
      
      // Add search query if it exists
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      
      // Add rating filter if it's not 'all'
      if (rating !== 'all') {
        url += `&rating=${rating}`;
      }
      
      const response = await axios.get(url, { withCredentials: true });
      setReviews(response.data.data);
      setPagination({
        currentPage: response.data.meta.currentPage,
        totalPages: response.data.meta.pages,
        perPage: response.data.meta.perPage,
        totalItems: response.data.meta.total
      });
    } catch (error) {
      showError('Fetch Error', 'Unable to load reviews.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch deleted reviews with pagination and search
  const fetchDeletedReviews = async (page = 1, limit = 10, search = '') => {
    setIsLoading(true);
    try {
      let url = `http://localhost:5000/api/reviews/deleted?page=${page}&limit=${limit}`;
      
      // Add search query if it exists
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      
      const response = await axios.get(url, { withCredentials: true });
      setDeletedReviews(response.data.data);
      setPagination({
        currentPage: response.data.meta.currentPage,
        totalPages: response.data.meta.pages,
        perPage: response.data.meta.perPage,
        totalItems: response.data.meta.total
      });
    } catch (error) {
      showError('Fetch Error', 'Unable to load deleted reviews.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    
    if (showDeletedReviews) {
      fetchDeletedReviews(newPage, pagination.perPage, searchQuery);
    } else {
      fetchReviews(newPage, pagination.perPage, searchQuery, ratingFilter);
    }
  };

  // Handle per page change
  const handlePerPageChange = (e) => {
    const newPerPage = parseInt(e.target.value);
    setPagination(prev => ({ ...prev, perPage: newPerPage, currentPage: 1 }));
    
    if (showDeletedReviews) {
      fetchDeletedReviews(1, newPerPage, searchQuery);
    } else {
      fetchReviews(1, newPerPage, searchQuery, ratingFilter);
    }
  };

  // Handle review deletion
  const handleDeleteReview = async (reviewId) => {
    const result = await Swal.fire({
      title: 'Archive Review?',
      text: 'This will move the review to the archive section.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, archive it',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      customClass: {
        popup: 'rounded-xl shadow-xl border border-gray-100',
        confirmButton: 'bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 text-white font-medium',
        cancelButton: 'bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg px-4 py-2 font-medium',
      },
    });

    if (result.isConfirmed) {
      try {
        await axios.patch(`http://localhost:5000/api/reviews/${reviewId}/delete`,{}, { withCredentials: true });
        showSuccess('Review Archived');
        fetchReviews(pagination.currentPage, pagination.perPage, searchQuery, ratingFilter);
      } catch (error) {
        showError('Archive Error', 'Unable to archive review.');
      }
    }
  };

  // Handle review restoration
  const handleRestoreReview = async (reviewId) => {
    try {
      await axios.patch(`http://localhost:5000/api/reviews/${reviewId}/restore`,{},{ withCredentials: true });
      showSuccess('Review Restored');
      fetchDeletedReviews(pagination.currentPage, pagination.perPage, searchQuery);
    } catch (error) {
      showError('Restore Error', 'Unable to restore review.');
    }
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

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="w-5 h-5 text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarHalfIcon key={i} className="w-5 h-5 text-yellow-400" />);
      } else {
        stars.push(<StarIcon key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    
    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-2 text-gray-600 text-sm">({rating})</span>
      </div>
    );
  };

  // Apply filters when they change
  useEffect(() => {
    // Debounce the search to avoid too many API calls
    const timer = setTimeout(() => {
      if (showDeletedReviews) {
        fetchDeletedReviews(1, pagination.perPage, searchQuery);
      } else {
        fetchReviews(1, pagination.perPage, searchQuery, ratingFilter);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, ratingFilter]);

  // Toggle between active and deleted reviews
  const toggleReviewView = () => {
    setShowDeletedReviews(!showDeletedReviews);
    setSearchQuery('');
    setRatingFilter('all');
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setRatingFilter('all');
    if (showDeletedReviews) {
      fetchDeletedReviews(1, pagination.perPage, '');
    } else {
      fetchReviews(1, pagination.perPage, '', 'all');
    }
  };

  useEffect(() => {
    if (showDeletedReviews) {
      fetchDeletedReviews();
    } else {
      fetchReviews();
    }
  }, [showDeletedReviews]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Review Management
            </h1>
            <p className="text-gray-600 mt-2">
              Moderate and manage customer product reviews
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleReviewView}
              className={`flex items-center px-4 py-2 rounded-lg transition ${
                showDeletedReviews ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              <ArchiveIcon className="mr-2 w-5 h-5" />
              {showDeletedReviews ? 'View Active' : 'View Archived'}
            </button>
            <button
              onClick={() => showDeletedReviews ? fetchDeletedReviews(pagination.currentPage, pagination.perPage, searchQuery) : fetchReviews(pagination.currentPage, pagination.perPage, searchQuery, ratingFilter)}
              className={`p-2 bg-blue-50 text-blue-600 rounded-lg shadow-sm hover:bg-blue-100 transition-colors ${
                isLoading ? 'animate-spin' : ''
              }`}
              disabled={isLoading}
              title="Refresh Reviews"
            >
              <RotateCwIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8 border border-gray-200">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Reviews</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by product, review text, or user..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <MessageSquareIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Rating</label>
                <div className="relative">
                  <select
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                    disabled={showDeletedReviews}
                  >
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4+">4+ Stars</option>
                    <option value="3+">3+ Stars</option>
                    <option value="2+">2+ Stars</option>
                    <option value="1+">1+ Stars</option>
                  </select>
                  <Star className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div>
            {(searchQuery || ratingFilter !== 'all') && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  <XIcon className="w-4 h-4" />
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reviews List */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => {
                  setShowDeletedReviews(false);
                  setPagination(prev => ({ ...prev, currentPage: 1 }));
                }}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition ${
                  !showDeletedReviews ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Active Reviews ({pagination.totalItems})
              </button>
              <button
                onClick={() => {
                  setShowDeletedReviews(true);
                  setPagination(prev => ({ ...prev, currentPage: 1 }));
                }}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition ${
                  showDeletedReviews ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Archived Reviews ({pagination.totalItems})
              </button>
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <RotateCwIcon className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            ) : !showDeletedReviews ? (
              <>
                {reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <MessageSquareIcon className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No active reviews</h3>
                    <p className="mt-2 text-gray-500">
                      {searchQuery || ratingFilter !== 'all' 
                        ? 'No reviews match your search criteria' 
                        : 'No reviews have been submitted yet'}
                    </p>
                    {(searchQuery || ratingFilter !== 'all') && (
                      <button
                        onClick={clearFilters}
                        className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        <XIcon className="w-4 h-4 mr-2" />
                        Clear Filters
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.review_id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <PackageIcon className="w-5 h-5 text-blue-500" />
                              <h3 className="text-lg font-bold text-gray-800">{review.product_name}</h3>
                            </div>
                            {renderStars(review.rating)}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleDeleteReview(review.review_id)}
                              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                              title="Archive Review"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg mb-3">
                          <p className="text-gray-700">{review.review_text}</p>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4" />
                            <span>{review.user_name}</span>
                            <MailIcon className="w-4 h-4 ml-2" />
                            <span>{review.user_email}</span>
                          </div>
                          <div>
                            {new Date(review.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                {deletedReviews.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <ArchiveIcon className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No archived reviews</h3>
                    <p className="mt-2 text-gray-500">
                      {searchQuery 
                        ? 'No archived reviews match your search criteria' 
                        : 'No reviews have been archived yet'}
                    </p>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        <XIcon className="w-4 h-4 mr-2" />
                        Clear Search
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {deletedReviews.map((review) => (
                      <div key={review.review_id} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <PackageIcon className="w-5 h-5 text-gray-500" />
                              <h3 className="text-lg font-bold text-gray-500 line-through">{review.product_name}</h3>
                            </div>
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <button
                            onClick={() => handleRestoreReview(review.review_id)}
                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
                            title="Restore Review"
                          >
                            <CheckIcon className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="bg-gray-100 p-4 rounded-lg mb-3">
                          <p className="text-gray-500">{review.review_text}</p>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4" />
                            <span>{review.user_name}</span>
                            <MailIcon className="w-4 h-4 ml-2" />
                            <span>{review.user_email}</span>
                          </div>
                          <div>
                            {new Date(review.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Pagination Controls */}
          {(!isLoading && (reviews.length > 0 || deletedReviews.length > 0)) && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Showing {(pagination.currentPage - 1) * pagination.perPage + 1}-
                  {Math.min(pagination.currentPage * pagination.perPage, pagination.totalItems)} of {pagination.totalItems}
                </span>
                
                <select
                  value={pagination.perPage}
                  onChange={handlePerPageChange}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="5">5 per page</option>
                  <option value="10">10 per page</option>
                  <option value="20">20 per page</option>
                  <option value="50">50 per page</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className={`p-2 rounded-md ${pagination.currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-1">
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
                        className={`w-8 h-8 rounded-md text-sm ${pagination.currentPage === pageNum ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {pagination.totalPages > 5 && pagination.currentPage < pagination.totalPages - 2 && (
                    <span className="mx-1">...</span>
                  )}
                  
                  {pagination.totalPages > 5 && pagination.currentPage < pagination.totalPages - 2 && (
                    <button
                      onClick={() => handlePageChange(pagination.totalPages)}
                      className={`w-8 h-8 rounded-md text-sm ${pagination.currentPage === pagination.totalPages ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {pagination.totalPages}
                    </button>
                  )}
                </div>
                
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className={`p-2 rounded-md ${pagination.currentPage === pagination.totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;