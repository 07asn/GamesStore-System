import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/4 h-40 sm:h-auto">
          <img 
            src={item.productImage}
            alt={item.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
              <button 
                onClick={() => onRemove(item.product_id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                aria-label="Remove item"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-500">{item.description}</p>

            {/* Conditionally display discounted price if available */}
            <div className="flex items-center">
              {item.discounted_price && item.discounted_price > 0 ? (
                <>
                  <p className="font-semibold text-gray-900 line-through mr-2">
                    JD {parseFloat(item.price.replace('JD', '').trim()).toFixed(2)}
                  </p>
                  <p className="font-semibold text-red-500">
                    JD {parseFloat(item.discounted_price).toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="font-semibold text-gray-900">
                  JD {parseFloat(item.price.replace('JD', '').trim()).toFixed(2)}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1 border border-gray-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => onDecrease(item.product_id)}
                className="p-2 bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-50"
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-1 font-medium">{item.quantity}</span>
              <button 
                onClick={() => onIncrease(item.product_id)}
                className="p-2 bg-gray-50 hover:bg-gray-100 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
            <p className="font-bold text-lg">
              JD {(parseFloat(item.discounted_price ? item.discounted_price : item.price.replace('JD', '').trim()) * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
);

export default CartItem;
