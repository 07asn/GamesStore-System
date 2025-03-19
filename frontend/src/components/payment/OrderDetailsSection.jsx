// src/components/OrderDetailsSection.jsx
import React from 'react';

const OrderDetailsSection = () => {
    return (
        <div className="bg-white p-5 mb-5 shadow-lg rounded-2xl">
            <div className="space-y-2">
                <p className="flex justify-between text-base">
                    <strong>Order Total:</strong> <span>57.49JD</span>
                </p>
                <p className="flex justify-between text-base">
                    <strong>Discount:</strong> <span>0</span>
                </p>
            </div>
        </div>
    );
};

export default OrderDetailsSection;
