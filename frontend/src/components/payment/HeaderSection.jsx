import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import profilePic from '../../assets/male.png';

const HeaderSection = () => {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();  // We can use this for navigation if needed

    useEffect(() => {
        const token = Cookies.get('token'); // Get token from cookies

        if (!token) {
            // If there's no token, redirect to login page (if needed)
            navigate('/login');
            return;
        }

        // Fetch the logged-in user's name using the token
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    withCredentials: true,
                });
                if (response.status === 200) {
                    setUserName(response.data.name); // Set the fetched name
                } else {
                    console.error('Error fetching user data:', response.status);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                // You can handle errors here (like redirecting to login)
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <div className="bg-white p-5 mb-5 shadow-lg rounded-2xl">
            <div className="flex items-center">
                <img
                    src={profilePic}
                    alt="Profile"
                    className="w-16 h-16 rounded-full mr-4 shadow-md"
                />
                <div>
                    <h2 className="text-lg font-semibold">Hi, {userName || 'Loading...'}</h2>
                    <p className="text-sm text-gray-500">Menu &gt; Shopping Cart &gt; Payment</p>
                </div>
            </div>
        </div>
    );
};

export default HeaderSection;
