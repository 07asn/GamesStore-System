import React, { useState } from 'react';
import visaImg from '../../assets/visa.png';
import paypalImg from '../../assets/paypal.png';
import bankTransferImg from '../../assets/bank-transfer.svg';

const PaymentMethodsSection = () => {
    const [selectedMethod, setSelectedMethod] = useState('credit-card');

    return (
        <div className="bg-white p-5 mb-5 shadow-lg rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Payment</h3>
            <div className="flex flex-wrap gap-5 mb-4">
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
            {selectedMethod === 'paypal' && (
                <div>
                    <input
                        type="email"
                        placeholder="PayPal Email"
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none transition-colors duration-300 focus:border-yellow-500"
                    />
                </div>
            )}
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
