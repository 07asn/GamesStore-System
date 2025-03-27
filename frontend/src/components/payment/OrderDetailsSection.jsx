// src/components/payment/OrderDetailsSection.jsx
import React, { useEffect } from 'react';

const OrderDetailsSection = ({
    cartItems = [],
    onValuesCalculated = () => { },
    couponDiscount = 0
}) => {
    const baseSubtotal = cartItems.reduce((acc, item) => {
        const originalPrice = parseFloat(item.price);
        return acc + (originalPrice * (item.quantity || 1));
    }, 0);

    const itemDiscount = cartItems.reduce((acc, item) => {
        const originalPrice = parseFloat(item.price);
        const discountedPrice =
            item.discounted_price && item.discounted_price > 0
                ? parseFloat(item.discounted_price)
                : originalPrice;
        return acc + (originalPrice - discountedPrice) * (item.quantity || 1);
    }, 0);

    const itemsTotal = baseSubtotal - itemDiscount;
    const finalTotal = itemsTotal - couponDiscount;
    const hasDiscounts = itemDiscount > 0 || couponDiscount > 0;

    useEffect(() => {
        onValuesCalculated(baseSubtotal, itemDiscount, itemsTotal);
    }, [baseSubtotal, itemDiscount, itemsTotal, onValuesCalculated]);

    return (
        <div className="bg-white p-6 mb-5 shadow-lg rounded-2xl border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Order Summary</h3>

            <div className="space-y-3">
                <div className="flex justify-between text-base text-gray-600">
                    <span>Base Subtotal</span>
                    <span>{baseSubtotal.toFixed(2)} JD</span>
                </div>

                {itemDiscount > 0 && (
                    <div className="flex justify-between text-base text-gray-600">
                        <span className="flex items-center">
                            <span>Item Discount</span>
                            {itemDiscount > 10 && (
                                <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">Save {((itemDiscount / baseSubtotal) * 100).toFixed(0)}%</span>
                            )}
                        </span>
                        <span className="text-red-500">-{itemDiscount.toFixed(2)} JD</span>
                    </div>
                )}

                {itemDiscount > 0 && (
                    <div className="flex justify-between text-base text-gray-600">
                        <span>Subtotal After Discounts</span>
                        <span>{itemsTotal.toFixed(2)} JD</span>
                    </div>
                )}

                {couponDiscount > 0 && (
                    <div className="flex justify-between text-base text-gray-600">
                        <span className="flex items-center">
                            <span>Coupon Applied</span>
                            <span className="ml-2 bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">Coupon</span>
                        </span>
                        <span className="text-red-500">-{couponDiscount.toFixed(2)} JD</span>
                    </div>
                )}

                <div className="mt-4 pt-3 border-t border-dashed">
                    <div className="flex justify-between font-bold text-lg">
                        <span>Final Total</span>
                        <span className={hasDiscounts ? "text-green-600" : ""}>
                            {finalTotal.toFixed(2)} JD
                        </span>
                    </div>

                    {hasDiscounts && (
                        <div className="mt-2 bg-green-50 p-2 rounded-lg text-center text-sm text-green-700">
                            You saved {(itemDiscount + couponDiscount).toFixed(2)} JD on this order!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsSection;