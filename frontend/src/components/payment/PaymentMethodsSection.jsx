import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { FaUpload, FaInfoCircle, FaTimes } from 'react-icons/fa';

// Import payment method logos
import cliqImg from '../../assets/cliq.png';
import uwalletImg from '../../assets/uwallet.png';
import orangeMoneyImg from '../../assets/orange-money.png';
import paypalImg from '../../assets/paypal.png';
import bankTransferImg from '../../assets/bank-transfer.svg';

const PaymentMethodsSection = forwardRef(({
    totalAmount = "10.00",
    onPayPalSuccess = () => {},
    onPayPalError = () => {},
    cartItems = []
}, ref) => {
    const [selectedMethod, setSelectedMethod] = useState('cliq');
    const [paymentProof, setPaymentProof] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setError(null);

        // Validate file type
        if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
            setError('Only JPG, JPEG, and PNG files are allowed');
            return;
        }

        // Validate file size (2MB max)
        if (file.size > 2 * 1024 * 1024) {
            setError('File size should be less than 2MB');
            return;
        }

        setPaymentProof(file);

        // Create preview
        const reader = new FileReader();
        reader.onload = (event) => {
            setPreviewImage(event.target.result);
        };
        reader.readAsDataURL(file);
    };

    // Programmatically trigger file input
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // Remove selected image
    const removeImage = () => {
        setPreviewImage(null);
        setPaymentProof(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
        getPaymentData: () => {
            return {
                payment_method: selectedMethod,
                payment_proof: paymentProof,
                total_amount: totalAmount,
                cartItems: cartItems.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price_at_purchase: item.discounted_price || item.price
                }))
            };
        },
        validate: () => {
            const requiresProof = ['cliq', 'uwallet', 'orangeMoney', 'bank-transfer'].includes(selectedMethod);
            if (requiresProof && !paymentProof) {
                setError('Payment proof is required');
                return false;
            }
            setError(null);
            return true;
        }
    }));

    // Render payment details for mobile payment methods
    const renderMobilePaymentDetails = (paymentMethod) => {
        const paymentDetails = {
            cliq: {
                number: '0788862798',
                name: 'Hasan Omar Hasan Mansour',
                instructions: 'Send payment to this Cliq number and upload receipt'
            },
            uwallet: {
                number: '0799123456',
                name: 'Hasan Omar Hasan Mansour',
                instructions: 'Send payment to this UWallet number and upload receipt'
            },
            orangeMoney: {
                number: '0777654321',
                name: 'Hasan Omar Hasan Mansour',
                instructions: 'Send payment to this Orange Money number and upload receipt'
            },
            'bank-transfer': {
                number: 'JO84 JIBS 1234 5678 9012 3456 7890',
                name: 'Hasan Omar Hasan Mansour',
                bank: 'Jordan Islamic Bank',
                instructions: 'Transfer to our bank account and upload receipt'
            }
        };

        const details = paymentDetails[paymentMethod];

        return (
            <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <div className="flex items-start mb-2">
                        <FaInfoCircle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                        <p className="text-yellow-800">{details.instructions}</p>
                    </div>
                    <div className="bg-white p-3 rounded-md border border-yellow-200">
                        {paymentMethod === 'bank-transfer' ? (
                            <>
                                <p className="mb-1">
                                    <span className="font-medium text-gray-700">Bank:</span> 
                                    <span className="ml-2 font-bold text-gray-900">{details.bank}</span>
                                </p>
                                <p className="mb-1">
                                    <span className="font-medium text-gray-700">Account Number:</span> 
                                    <span className="ml-2 font-bold text-gray-900">{details.number}</span>
                                </p>
                            </>
                        ) : (
                            <p className="mb-1">
                                <span className="font-medium text-gray-700">
                                    {paymentMethod === 'cliq' ? 'Cliq No:' : 
                                     paymentMethod === 'uwallet' ? 'UWallet No:' : 'Orange Money No:'}
                                </span> 
                                <span className="ml-2 font-bold text-gray-900">{details.number}</span>
                            </p>
                        )}
                        <p>
                            <span className="font-medium text-gray-700">Account Name:</span> 
                            <span className="ml-2 font-bold text-gray-900">{details.name}</span>
                        </p>
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-2 text-gray-700">
                        Upload Payment Proof {['cliq', 'uwallet', 'orangeMoney', 'bank-transfer'].includes(paymentMethod) && '(Required)'}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-yellow-400 transition-colors">
                        {previewImage ? (
                            <div className="mb-3">
                                <div className="relative">
                                    <img 
                                        src={previewImage} 
                                        alt="Payment proof preview" 
                                        className="max-h-40 mx-auto mb-2 rounded-md"
                                    />
                                    <button
                                        onClick={removeImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                    >
                                        <FaTimes className="text-xs" />
                                    </button>
                                </div>
                                <button 
                                    onClick={triggerFileInput}
                                    className="px-4 py-2 bg-yellow-400 text-gray-800 rounded-md text-sm hover:bg-yellow-500 transition-colors"
                                >
                                    Change Image
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/jpeg, image/png, image/jpg"
                                    onChange={handleFileChange}
                                />
                            </div>
                        ) : (
                            <div 
                                className="flex flex-col items-center justify-center py-4 cursor-pointer"
                                onClick={triggerFileInput}
                            >
                                <div className="bg-yellow-100 p-3 rounded-full mb-3">
                                    <FaUpload className="text-xl text-yellow-500" />
                                </div>
                                <p className="text-gray-600">Click to upload payment receipt</p>
                                <p className="text-sm text-gray-400 mt-1">PNG, JPG (Max 2MB)</p>
                                <button 
                                    type="button"
                                    className="mt-3 px-4 py-2 bg-yellow-400 text-gray-800 rounded-md text-sm hover:bg-yellow-500 transition-colors"
                                >
                                    Select File
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/jpeg, image/png, image/jpg"
                                    onChange={handleFileChange}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white p-6 mb-5 shadow-lg rounded-xl border border-gray-100">
            <h3 className="text-xl font-semibold mb-5 text-gray-800">Payment Method</h3>

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
                    {error}
                </div>
            )}

            {/* Payment Options */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                {[
                    { id: 'cliq', name: 'Cliq', img: cliqImg },
                    { id: 'uwallet', name: 'UWallet', img: uwalletImg },
                    { id: 'orangeMoney', name: 'Orange Money', img: orangeMoneyImg },
                    { id: 'paypal', name: 'PayPal', img: paypalImg },
                    { id: 'bank-transfer', name: 'Bank Transfer', img: bankTransferImg }
                ].map((method) => (
                    <label
                        key={method.id}
                        className={`flex flex-col items-center p-3 border-2 rounded-xl text-center cursor-pointer transition-all duration-200 ${
                            selectedMethod === method.id 
                                ? 'border-yellow-500 bg-yellow-50 shadow-sm' 
                                : 'border-gray-200 hover:border-yellow-300'
                        }`}
                    >
                        <input
                            type="radio"
                            name="payment"
                            className="hidden"
                            checked={selectedMethod === method.id}
                            onChange={() => {
                                setSelectedMethod(method.id);
                                setError(null);
                            }}
                        />
                        <img 
                            src={method.img} 
                            alt={method.name} 
                            className="w-12 h-12 object-contain mb-2"
                        />
                        <span className="font-medium text-sm text-gray-700">{method.name}</span>
                    </label>
                ))}
            </div>

            {/* Payment Details Section */}
            <div className="border-t border-gray-200 pt-5">
                {/* Mobile Payment Options */}
                {(selectedMethod === 'cliq' || selectedMethod === 'uwallet' || 
                  selectedMethod === 'orangeMoney' || selectedMethod === 'bank-transfer') && 
                    renderMobilePaymentDetails(selectedMethod)
                }

                {/* PayPal Option */}
                {selectedMethod === 'paypal' && (
                    <div className="mt-3">
                        <PayPalScriptProvider
                            options={{
                                'client-id': 'AWgGhJmGIrAsfdp_yq25DQ9qE3Le5Q2BkjpXA2p7ANzG8ROvwXrVUo3NZsxpCdgXqabaLks7n5owpxMi',
                                currency: 'USD'
                            }}
                        >
                            <PayPalButtons
                                style={{ 
                                    layout: 'horizontal',
                                    color: 'blue',
                                    shape: 'pill',
                                    height: 40
                                }}
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
                                        onPayPalSuccess(details);
                                    });
                                }}
                                onError={(err) => {
                                    console.error('PayPal Checkout Error:', err);
                                    setError('PayPal payment failed. Please try again.');
                                }}
                            />
                        </PayPalScriptProvider>
                    </div>
                )}
            </div>
        </div>
    );
});

export default PaymentMethodsSection;

// import React, { useState } from 'react';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// import visaImg from '../../assets/visa.png';
// import paypalImg from '../../assets/paypal.png';
// import bankTransferImg from '../../assets/bank-transfer.svg';

// const PaymentMethodsSection = ({
//     totalAmount = "10.00",
//     onPayPalSuccess = () => { },
//     onPayPalError = () => { }
// }) => {
//     const [selectedMethod, setSelectedMethod] = useState('credit-card');

//     return (
//         <div className="bg-white p-5 mb-5 shadow-lg rounded-2xl">
//             <h3 className="text-lg font-semibold mb-4">Payment</h3>

//             {/* Payment Options */}
//             <div className="flex flex-wrap gap-5 mb-4">
//                 {/* Credit Card Option */}
//                 <label
//                     className={`flex flex-col items-center p-3 border-2 border-gray-300 rounded-2xl text-center cursor-pointer transition-all duration-300 ${selectedMethod === 'credit-card' ? 'border-blue-500 bg-gray-50' : ''
//                         }`}
//                 >
//                     <input
//                         type="radio"
//                         name="payment"
//                         className="hidden"
//                         checked={selectedMethod === 'credit-card'}
//                         onChange={() => setSelectedMethod('credit-card')}
//                     />
//                     <img src={visaImg} alt="Credit Card" className="w-16 mb-2" />
//                     <span className="font-semibold text-sm">Credit Card</span>
//                 </label>

//                 {/* PayPal Option */}
//                 <label
//                     className={`flex flex-col items-center p-3 border-2 border-gray-300 rounded-2xl text-center cursor-pointer transition-all duration-300 ${selectedMethod === 'paypal' ? 'border-blue-500 bg-gray-50' : ''
//                         }`}
//                 >
//                     <input
//                         type="radio"
//                         name="payment"
//                         className="hidden"
//                         checked={selectedMethod === 'paypal'}
//                         onChange={() => setSelectedMethod('paypal')}
//                     />
//                     <img src={paypalImg} alt="PayPal" className="w-16 mb-2" />
//                     <span className="font-semibold text-sm">PayPal</span>
//                 </label>

//                 {/* Bank Transfer Option */}
//                 <label
//                     className={`flex flex-col items-center p-3 border-2 border-gray-300 rounded-2xl text-center cursor-pointer transition-all duration-300 ${selectedMethod === 'bank-transfer' ? 'border-blue-500 bg-gray-50' : ''
//                         }`}
//                 >
//                     <input
//                         type="radio"
//                         name="payment"
//                         className="hidden"
//                         checked={selectedMethod === 'bank-transfer'}
//                         onChange={() => setSelectedMethod('bank-transfer')}
//                     />
//                     <img src={bankTransferImg} alt="Bank Transfer" className="w-16 mb-2" />
//                     <span className="font-semibold text-sm">Bank Transfer</span>
//                 </label>
//             </div>

//             {/* If user selects Credit Card */}
//             {selectedMethod === 'credit-card' && (
//                 <div className="space-y-3">
//                     <input
//                         type="text"
//                         placeholder="Card Number"
//                         className="w-full p-3 border border-gray-300 rounded-lg outline-none transition-colors duration-300 focus:border-yellow-500"
//                     />
//                     <input
//                         type="text"
//                         placeholder="Expiry Date (MM/YY)"
//                         className="w-full p-3 border border-gray-300 rounded-lg outline-none transition-colors duration-300 focus:border-yellow-500"
//                     />
//                     <input
//                         type="text"
//                         placeholder="CVV"
//                         className="w-full p-3 border border-gray-300 rounded-lg outline-none transition-colors duration-300 focus:border-yellow-500"
//                     />
//                     <input
//                         type="text"
//                         placeholder="Card Holder Name"
//                         className="w-full p-3 border border-gray-300 rounded-lg outline-none transition-colors duration-300 focus:border-yellow-500"
//                     />
//                 </div>
//             )}

//             {/* If user selects PayPal */}
//             {selectedMethod === 'paypal' && (
//                 <div className="mt-3">
//                     <PayPalScriptProvider
//                         options={{
//                             'client-id': 'AWgGhJmGIrAsfdp_yq25DQ9qE3Le5Q2BkjpXA2p7ANzG8ROvwXrVUo3NZsxpCdgXqabaLks7n5owpxMi',
//                             currency: 'USD'
//                         }}
//                     >
//                         <PayPalButtons
//                             style={{ layout: 'horizontal' }}
//                             createOrder={(data, actions) => {
//                                 return actions.order.create({
//                                     purchase_units: [
//                                         {
//                                             amount: {
//                                                 value: totalAmount
//                                             }
//                                         }
//                                     ]
//                                 });
//                             }}
//                             onApprove={(data, actions) => {
//                                 return actions.order.capture().then((details) => {
//                                     console.log('PayPal Transaction completed by:', details.payer.name.given_name);
//                                     onPayPalSuccess(details);
//                                 });
//                             }}
//                             onError={(err) => {
//                                 console.error('PayPal Checkout Error:', err);
//                                 onPayPalError(err);
//                             }}
//                         />
//                     </PayPalScriptProvider>
//                 </div>
//             )}

//             {/* If user selects Bank Transfer */}
//             {selectedMethod === 'bank-transfer' && (
//                 <div className="space-y-3">
//                     <input
//                         type="text"
//                         placeholder="Bank Account Number"
//                         className="w-full p-3 border border-gray-300 rounded-lg outline-none transition-colors duration-300 focus:border-yellow-500"
//                     />
//                     <input
//                         type="text"
//                         placeholder="Bank Name"
//                         className="w-full p-3 border border-gray-300 rounded-lg outline-none transition-colors duration-300 focus:border-yellow-500"
//                     />
//                     <input
//                         type="text"
//                         placeholder="Account Holder Name"
//                         className="w-full p-3 border border-gray-300 rounded-lg outline-none transition-colors duration-300 focus:border-yellow-500"
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PaymentMethodsSection;
