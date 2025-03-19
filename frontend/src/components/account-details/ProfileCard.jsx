import React, { useState, useEffect } from 'react';
import malePic from '../../assets/male.png';
import femalePic from '../../assets/female.png';

const ProfileCard = ({ userData, handleGenderChange }) => {
    // Set the initial gender state based on the userData, or default to 'male'
    const [gender, setGender] = useState(userData?.gender || 'male');
    
    // Set profilePic based on gender
    const profilePic = (gender === "male") ? malePic : femalePic;

    // Handle the gender change (local state)
    const handleGenderPhoto = (newGender) => {
        setGender(newGender);  // Update gender locally
        handleGenderChange(newGender);  // Pass the change to the parent
    };

    useEffect(() => {
        // Sync gender with userData when the component mounts
        if (userData?.gender) {
            setGender(userData.gender);
        }
    }, [userData?.gender]);  // Update when userData changes

    return (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gray-100 border-b border-gray-300 text-center py-4">
                <h2 className="text-lg font-semibold">Profile Picture</h2>
            </div>
            <div className="p-6 flex flex-col items-center">
                <img
                    id="profile-picture"
                    src={profilePic}
                    alt="Profile"
                    className="h-40 w-40 object-cover rounded-full shadow-lg mb-4 border-4 border-gray-200"
                />
                <p className="text-sm text-gray-500 mb-3">Select your gender</p>
                <select
                    id="gender-select"
                    className="w-1/2 p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-500"
                    value={gender}  // The selected gender for local state
                    onChange={(e) => handleGenderPhoto(e.target.value)}  // Update gender on change
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
        </div>
    );
};

export default ProfileCard;
