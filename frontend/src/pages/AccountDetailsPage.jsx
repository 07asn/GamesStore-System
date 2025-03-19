import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileCard from '../components/account-details/ProfileCard';
import AccountForm from '../components/account-details/AccountForm';
import ChangePasswordModal from '../components/account-details/ChangePasswordModal';
import { openModal, closeModal } from '../redux/accountDetailsSlice';

const AccountDetailsPage = () => {
    const dispatch = useDispatch();
    const showModal = useSelector((state) => state.accountDetails.showModal);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-[#69707a]">
            {/* Main Content */}
            <div className="container md:w-4xl mx-auto px-6 py-10 flex-1">
                <div className="flex flex-col md:flex-col gap-8">
                    <ProfileCard />
                    <AccountForm openModal={() => dispatch(openModal())} />
                </div>
            </div>

            {/* Change Password Modal */}
            {showModal && <ChangePasswordModal closeModal={() => dispatch(closeModal())} />}
        </div>
    );
};

export default AccountDetailsPage;
