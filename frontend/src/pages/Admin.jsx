import React, { useState } from 'react';
import SidebarAdmin from '../components/admin/SidebarAdmin';
import UsersAdmin from '../components/admin/UsersAdmin';
import StatisticsAdmin from '../components/admin/StatisticsAdmin';
import ArticalsAdmin from '../components/admin/ArticalsAdmin';
import Categories from '../components/admin/Categories';
import AdminCoupons from '../components/admin/AdminCoupons';
import AdminReviews from '../components/admin/AdminReviews';
import AdminProducts from '../components/admin/AdminProducts';

export default function Admin() {
    const [selectedTab, setSelectedTab] = useState('Statistics'); // Default tab

    // Function to render the selected tab's content
    const renderContent = () => {
        switch (selectedTab) {
            case 'Statistics':
                return <StatisticsAdmin />;
            case 'Users':
                return <UsersAdmin />;
            case 'News':
                return <ArticalsAdmin />;
            case 'Categories':
                return <Categories />;
            case 'Coupons':
                return <AdminCoupons />;
            case 'Comments':
                return <AdminReviews />;
            case 'Products':
                return <AdminProducts />;
            default:
                return <StatisticsAdmin />;
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <SidebarAdmin setSelectedTab={setSelectedTab} />

            {/* Main Content */}
            <div className="flex-1 p-6">
                {renderContent()}
            </div>
        </div>
        
    );
}
