//AccountDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileCard from '../components/account-details/ProfileCard';
import AccountForm from '../components/account-details/AccountForm';
import ChangePasswordModal from '../components/account-details/ChangePasswordModal';
import { openModal, closeModal } from '../redux/accountDetailsSlice';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const AccountDetailsPage = () => {
    const dispatch = useDispatch();
    const showModal = useSelector((state) => state.accountDetails.showModal);
    
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        name: '',
        phone: '',
        country: '',
        gender: ''
    });

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    withCredentials: true,
                });
                setUserData(response.data);
                setUpdatedData({
                    name: response.data.name,
                    phone: response.data.phone,
                    country: response.data.country,
                    gender: response.data.gender
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch user data');
                toast.error('Could not load your profile data');
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Handle change in form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleGenderChange = (newGender) => {
        setUpdatedData((prevData) => ({
            ...prevData,
            gender: newGender,
        }));
    };

    // Submit the form and update the user data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullName = `${updatedData.firstName || ''} ${updatedData.lastName || ''}`.trim();
        const updatedFormData = {
            ...updatedData,
            name: fullName,  // Combine the name fields here
        };
        
        toast.promise(
            axios.put(
                'http://localhost:5000/api/users/profile', 
                updatedFormData,
                { withCredentials: true }
            ),
            {
                loading: 'Updating your profile...',
                success: (response) => {
                    setUserData(response.data.user);
                    return 'Profile updated successfully';
                },
                error: (err) => {
                    console.error('Error updating profile:', err);
                    return 'Failed to update profile';
                },
            }
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg font-medium text-gray-600">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <div className="text-red-500 text-5xl mb-4 flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Error Loading Profile</h2>
                    <p className="text-gray-600 text-center mb-6">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800"
        >
            <div className="container max-w-5xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Your Account</h1>
                    <p className="text-gray-600 mt-2">Manage your personal information and account settings</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <ProfileCard 
                                userData={userData} 
                                setUserData={setUserData}
                                handleGenderChange={handleGenderChange}  
                            />
                        </motion.div>
                    </div>
                    
                    <div className="md:col-span-2">
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <AccountForm 
                                openModal={() => dispatch(openModal())} 
                                userData={userData} 
                                handleSubmit={handleSubmit}
                                handleChange={handleChange}
                                updatedData={updatedData}  
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Change Password Modal */}
            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChangePasswordModal closeModal={() => dispatch(closeModal())} />
                </motion.div>
            )}
            
            {/* Toast notifications */}
            <Toaster position="top-right" />
        </motion.div>
    );
};

export default AccountDetailsPage;