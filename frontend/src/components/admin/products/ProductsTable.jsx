import React, { useState } from 'react';
import {
  TrashIcon,
  ArchiveIcon,
  EditIcon,
  PackageIcon,
  PackageCheckIcon,
  PackageXIcon,
  Loader2Icon,
  EyeIcon
} from 'lucide-react';
import ProductDetailsModal from './ProductDetailsModal';

const ProductsTable = ({
  activeTab,
  setActiveTab,
  isLoading,
  products,
  getTabCount,
  setSelectedProduct,
  setIsEditing,
  handleDeleteProduct,
  handleRestoreProduct,
  handlePermanentDelete
}) => {
  const [viewingProduct, setViewingProduct] = useState(null);

  const handleRowClick = (product) => {
    setViewingProduct(product);
  };

  const handleCloseModal = () => {
    setViewingProduct(null);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex items-center py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'active'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              <PackageCheckIcon className="w-5 h-5 mr-2" />
              Active Products
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {getTabCount('active')}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('outOfStock')}
              className={`flex items-center py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'outOfStock'
                ? 'border-yellow-500 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              <PackageXIcon className="w-5 h-5 mr-2" />
              Out of Stock
              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {getTabCount('outOfStock')}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('deleted')}
              className={`flex items-center py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'deleted'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              <PackageIcon className="w-5 h-5 mr-2" />
              Archived
              <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {getTabCount('deleted')}
              </span>
            </button>
          </nav>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2Icon className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {activeTab === 'active' && 'No active products found. Create your first product above.'}
            {activeTab === 'outOfStock' && 'All products are in stock.'}
            {activeTab === 'deleted' && 'No archived products found.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Platform
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr
                    key={product.product_id}
                    className="hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => handleRowClick(product)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {product.images && product.images[0] && (
                          <div className="flex-shrink-0 h-10 w-10 mr-3">
                            <img
                              className="h-10 w-10 rounded object-cover"
                              src={product.images[0]}
                              alt={product.name}
                            />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            <span className="truncate">{product.name}</span>
                            <EyeIcon className="w-4 h-4 ml-2 flex-shrink-0 text-gray-400" />
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-2">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-[200px] truncate">
                        {product.category_name || 'Uncategorized'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${product.price}
                        {product.discounted_price && (
                          <span className="ml-2 text-red-600">
                            ${product.discounted_price}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.stock}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-[150px] truncate">
                        {product.delivery_type}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-[150px] truncate">
                        {product.platform}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                            setIsEditing(true);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <EditIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProduct(product.product_id);
                          }}
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
        )}
      </div>

      {/* Product Details Modal */}
      {viewingProduct && (
        <ProductDetailsModal
          product={viewingProduct}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ProductsTable;