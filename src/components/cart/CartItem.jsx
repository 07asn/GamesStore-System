import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 relative transition hover:shadow-xl">
            {/* Remove (X) Button positioned at the top-right corner */}
            <button
                onClick={() => onRemove(item.id)}
                className="absolute top-0 right-0 p-2   rounded-full hover:bg-red-100 transition-colors focus:outline-none"
                aria-label="Remove item"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="flex flex-col md:flex-row items-center">
                {/* Product Image */}
                <div className="md:w-1/4 flex justify-center">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg"
                    />
                </div>

                {/* Product Details */}
                <div className="md:w-1/2 mt-4 md:mt-0 text-center md:text-left">
                    <h5 className="text-xl font-bold">{item.title}</h5>
                    <p className="text-gray-500">{item.description}</p>
                </div>

                {/* Quantity Controls and Price */}
                <div className="md:w-1/4 mt-4 md:mt-0 flex flex-col items-center md:items-end space-y-2">
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={() => onDecrease(item.id)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors text-xl"
                        >
                            –
                        </button>
                        <input
                            type="text"
                            readOnly
                            value={item.quantity}
                            className="w-12 h-8 text-center border border-gray-300 rounded-md bg-white shadow-sm"
                        />
                        <button
                            onClick={() => onIncrease(item.id)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors text-xl"
                        >
                            +
                        </button>
                    </div>
                    <p className="text-lg font-bold">{item.price}</p>
                </div>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.string,
        quantity: PropTypes.number,
    }).isRequired,
    onRemove: PropTypes.func.isRequired,
    onIncrease: PropTypes.func.isRequired,
    onDecrease: PropTypes.func.isRequired,
};

export default CartItem;
