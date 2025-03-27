import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import visaImg from '../../assets/visa.png';
import paypalImg from '../../assets/paypal.png';
import bankTransferImg from '../../assets/bank-transfer.svg';

const PaymentMethodsSection = ({
    totalAmount = "10.00",
    onPayPalSuccess = () => { },
    onPayPalError = () => { }
}) => {
    const [selectedMethod, setSelectedMethod] = useState('credit-card');

    return (
        <div className="bg-white p-5 mb-5 shadow-lg rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Payment</h3>

            {/* Payment Options */}
            <div className="flex flex-wrap gap-5 mb-4">
                {/* Credit Card Option */}
                <label
                    className={`flex flex-col items-center p-3 border-2 border-gray-300 rounded-2xl text-center cursor-pointer transition-all duration-300 ${selectedMethod === 'credit-card' ? 'border-blue-500 bg-gray-50' : ''
                        }`}
                >
                    <input
                        type="radio"
                        name="payment"
                        className="hidden"
                        checked={selectedMethod === 'credit-card'}
                        onChange={() => setSelectedMethod('credit-card')}
                    />
                    <img src={visaImg} alt="Credit Card" className="w-16 mb-2" />
                    <span className="font-semibold text-sm">Credit Card</span>
                </label>

                {/* PayPal Option */}
                <label
                    className={`flex flex-col items-center p-3 border-2 border-gray-300 rounded-2xl text-center cursor-pointer transition-all duration-300 ${selectedMethod === 'paypal' ? 'border-blue-500 bg-gray-50' : ''
                        }`}
                >
                    <input
                        type="radio"
                        name="payment"
                        className="hidden"
                        checked={selectedMethod === 'paypal'}
                        onChange={() => setSelectedMethod('paypal')}
                    />
                    <img src={paypalImg} alt="PayPal" className="w-16 mb-2" />
                    <span className="font-semibold text-sm">PayPal</span>
                </label>

                {/* Bank Transfer Option */}
                <label
                    className={`flex flex-col items-center p-3 border-2 border-gray-300 rounded-2xl text-center cursor-pointer transition-all duration-300 ${selectedMethod === 'bank-transfer' ? 'border-blue-500 bg-gray-50' : ''
                        }`}
                >
                    <input
                        type="radio"
                        name="payment"
                        className="hidden"
                        checked={selectedMethod === 'bank-transfer'}
                        onChange={() => setSelectedMethod('bank-transfer')}
                    />
                    <img src={bankTransferImg} alt="Bank Transfer" className="w-16 mb-2" />
                    <span className="font-semibold text-sm">Bank Transfer</span>
                </label>
            </div>

            {/* If user selects Credit Card */}
            {selectedMethod === 'credit-card' && (
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none transition-colors duration-300 focus:border-yellow-500"
                    />
                    <input
                        type="text"
                        placeholder="Expiry Date (MM/YY)"
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none transition-colors duration-300 focus:border-yellow-500"
                    />
                    <input
                        type="text"
                        placeholder="CVV"
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none transition-colors duration-300 focus:border-yellow-500"
                    />
                    <input
                        type="text"
                        placeholder="Card Holder Name"
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none transition-colors duration-300 focus:border-yellow-500"
                    />
                </div>
            )}

            {/* If user selects PayPal */}
            {selectedMethod === 'paypal' && (
                <div className="mt-3">
                    <PayPalScriptProvider
                        options={{
                            'client-id': 'AWgGhJmGIrAsfdp_yq25DQ9qE3Le5Q2BkjpXA2p7ANzG8ROvwXrVUo3NZsxpCdgXqabaLks7n5owpxMi',
                            currency: 'USD'
                        }}
                    >
                        <PayPalButtons
                            style={{ layout: 'horizontal' }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: totalAmount
                                            }
                                        }
                                    ]
                                });
                            }}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then((details) => {
                                    console.log('PayPal Transaction completed by:', details.payer.name.given_name);
                                    onPayPalSuccess(details);
                                });
                            }}
                            onError={(err) => {
                                console.error('PayPal Checkout Error:', err);
                                onPayPalError(err);
                            }}
                        />
                    </PayPalScriptProvider>
                </div>
            )}

            {/* If user selects Bank Transfer */}
            {selectedMethod === 'bank-transfer' && (
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Bank Account Number"
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none transition-colors duration-300 focus:border-yellow-500"
                    />
                    <input
                        type="text"
                        placeholder="Bank Name"
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none transition-colors duration-300 focus:border-yellow-500"
                    />
                    <input
                        type="text"
                        placeholder="Account Holder Name"
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none transition-colors duration-300 focus:border-yellow-500"
                    />
                </div>
            )}
        </div>
    );
};

export default PaymentMethodsSection;
