import React from 'react';
import { XIcon } from 'lucide-react';

const ProductDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-3 sm:p-4 sticky top-0 bg-white z-10">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Product Images */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-700">Images</h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                {product.images && product.images.length > 0 ? (
                  product.images.map((image, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-32 sm:h-40 object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 flex items-center justify-center h-32 sm:h-40 bg-gray-100 rounded-lg">
                    <p className="text-sm sm:text-base text-gray-500">No images available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-700">Details</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Description</p>
                  <p className="text-sm sm:text-base text-gray-800 mt-1">{product.description || 'No description provided'}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Category</p>
                    <p className="text-sm sm:text-base text-gray-800 mt-1">{product.category_name || 'Uncategorized'}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Status</p>
                    <p className="text-gray-800 mt-1">
                      {product.featured ? (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          Featured
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                          Standard
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Price</p>
                    <p className="text-sm sm:text-base text-gray-800 mt-1">
                      ${product.price}
                      {product.discounted_price && (
                        <span className="ml-2 text-xs sm:text-sm text-red-600 line-through">
                          ${product.discounted_price}
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Stock</p>
                    <p className="text-gray-800 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-800' :
                          product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                        {product.stock} in stock
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Delivery Type</p>
                    <p className="text-sm sm:text-base text-gray-800 mt-1 capitalize">{product.delivery_type || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Platform</p>
                    <p className="text-sm sm:text-base text-gray-800 mt-1 capitalize">{product.platform || 'Not specified'}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Product ID</p>
                  <p className="text-xs sm:text-sm text-gray-800 mt-1 font-mono">{product.product_id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-6 sm:mt-8 border-t pt-4 sm:pt-6">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-700">Additional Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Created At</p>
                <p className="text-sm sm:text-base text-gray-800 mt-1">
                  {product.created_at ? new Date(product.created_at).toLocaleString() : 'Unknown'}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Updated At</p>
                <p className="text-sm sm:text-base text-gray-800 mt-1">
                  {product.updated_at ? new Date(product.updated_at).toLocaleString() : 'Unknown'}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Deleted At</p>
                <p className="text-sm sm:text-base text-gray-800 mt-1">
                  {product.deleted_at ? new Date(product.deleted_at).toLocaleString() : 'Active'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;