import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarAdmin from '../components/admin/SidebarAdmin';
import UsersAdmin from '../components/admin/UsersAdmin';
import Categories from '../components/admin/Categories';
import AdminCoupons from '../components/admin/AdminCoupons';
import AdminReviews from '../components/admin/AdminReviews';
import AdminProducts from '../components/admin/AdminProducts';
import Inventory from '../components/admin/Inventory';
import Orders from '../components/admin/products/Orders';
import Messages from '../components/admin/AdminContact';

// Enhanced Royal Gold Color Palette with more sophisticated tones
const colors = {
    royalGold: '#D4AF37',
    brightGold: '#FFCC33',
    darkGold: '#967117',
    paleGold: '#F5E6B3',
    richBlack: '#0A0A0A',
    velvetBlack: '#0E0E0E',
    parchment: '#000000',
    lightParchment: '#FFFDF5',
    charcoal: '#222222',
    silver: '#C0C0C0',
    platinum: '#E5E4E2',
    accentBlue: '#1A2C42',
    accentRed: '#5A0B0B',
    goldGradient: 'linear-gradient(135deg, #E5C96D 0%, #A17C17 100%)',
    lightGoldGradient: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)',
    subtleGoldGradient: 'linear-gradient(to right, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0.2) 50%, rgba(212, 175, 55, 0.05) 100%)',
    deepShadow: '0 6px 30px rgba(0, 0, 0, 0.7)',
    subtleGlow: '0 0 10px rgba(212, 175, 55, 0.25)',
    sharpGlow: '0 0 4px rgba(255, 215, 0, 0.7)',
    royalBorder: '1px solid rgba(212, 175, 55, 0.3)',
    royalBorderHighlight: '1px solid rgba(212, 175, 55, 0.6)',
    goldTextShadow: '0 1px 2px rgba(0, 0, 0, 0.8), 0 0 5px rgba(212, 175, 55, 0.3)'
};

export default function Admin() {
    const [selectedTab, setSelectedTab] = useState('users');
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [currentTime, setCurrentTime] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);

    // Replace static states with dynamic data
    const [dashboardStats, setDashboardStats] = useState({
        activeUsers: 0,
        totalUsers: 11,
        pendingOrders: 0,
    });

    // Fetch dashboard statistics
    const fetchDashboardStats = async () => {
        try {
            const [usersResponse, ordersResponse] = await Promise.all([
                axios.get('http://localhost:5000/api/orders/pending-count', { withCredentials: true })
            ]);

            setDashboardStats({
                totalUsers: 25,
                activeUsers: usersResponse.data.activeUsers || 0,
                pendingOrders: ordersResponse.data.pendingCount || 0,
            });
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            setDashboardStats(prev => ({
                ...prev,
            }));
        }
    };

    // Add search functionality
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.trim() !== '') {
                // You can modify this to search across different admin entities
                axios.get(`http://localhost:5000/api/admin/search?q=${encodeURIComponent(searchQuery)}`, {
                    withCredentials: true
                })
                    .then((response) => {
                        setSearchResults(response.data);
                        setShowSearchResults(true);
                    })
                    .catch((err) => {
                        console.error("Error searching:", err);
                        setSearchResults([]);
                    });
            } else {
                setSearchResults([]);
                setShowSearchResults(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.search-container')) {
                setShowSearchResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth < 1024) {
                setIsSidebarExpanded(false);
            } else {
                setIsSidebarExpanded(true);
            }
        };

        const updateClock = () => {
            setCurrentTime(formatTime());
        };

        // Initial fetches
        fetchDashboardStats();
        updateClock();

        // Set up intervals for regular updates
        const clockInterval = setInterval(updateClock, 60000);
        const statsInterval = setInterval(fetchDashboardStats, 300000); // Update stats every 5 minutes

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(clockInterval);
            clearInterval(statsInterval);
        };
    }, []);

    const handleSidebarExpansion = (expanded) => {
        setIsSidebarExpanded(expanded);
    };

    const renderContent = () => {
        const contentProps = { colors };

        switch (selectedTab) {
            case 'Users': return <UsersAdmin {...contentProps} />;
            case 'News': return <ArticalsAdmin {...contentProps} />;
            case 'Categories': return <Categories {...contentProps} />;
            case 'Coupons': return <AdminCoupons {...contentProps} />;
            case 'Comments': return <AdminReviews {...contentProps} />;
            case 'Products': return <AdminProducts {...contentProps} />;
            case 'Inventory': return <Inventory {...contentProps} />;
            case 'Orders': return <Orders {...contentProps} />;
            case 'Messages': return <Messages {...contentProps} />;

            default: return <UsersAdmin {...contentProps} />;
        }
    };

    const formatTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes} ${ampm}`;
    };

    return (
        <div className="flex min-h-screen overflow-hidden" style={{
            background: `radial-gradient(circle at center, ${colors.velvetBlack} 0%, ${colors.richBlack} 100%)`,
            backgroundSize: '200% 200%',
            color: colors.parchment,
            fontFamily: "'Marcellus', serif",
        }}>
            {/* Sidebar */}
            <SidebarAdmin
                setSelectedTab={setSelectedTab}
                selectedTab={selectedTab}
                onExpansionChange={handleSidebarExpansion}
                colors={colors}
            />

            {/* Main Content Area */}
            <div className={`flex-1 p-3 md:p-6 transition-all duration-300 mt-16 md:mt-0 overflow-auto`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="flex items-center">
                        <div className="w-2 h-10 rounded-full mr-3" style={{
                            background: colors.goldGradient,
                            boxShadow: colors.subtleGlow
                        }}></div>
                        <h1 className="text-3xl font-bold tracking-wide" style={{
                            color: colors.brightGold,
                            fontFamily: "'Cinzel', serif",
                            textShadow: colors.goldTextShadow,
                            letterSpacing: '1.5px'
                        }}>
                            07ASN Admin
                        </h1>
                    </div>

                    {/* Global Search Bar */}
                    <div className="search-container w-full md:w-1/3 relative">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search across admin panel..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 bg-opacity-20 bg-white backdrop-blur-sm rounded-lg border border-gray-600 focus:border-gray-400 focus:ring-2 focus:ring-gray-400 text-gray-200 placeholder-gray-400"
                                style={{
                                    boxShadow: colors.subtleGlow
                                }}
                            />
                            <svg
                                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>

                        {/* Search Results Dropdown */}
                        {showSearchResults && searchResults.length > 0 && (
                            <div className="absolute w-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                                {searchResults.map((result, index) => (
                                    <div
                                        key={index}
                                        className="p-3 hover:bg-gray-800 cursor-pointer border-b border-gray-700 last:border-0"
                                        onClick={() => {
                                            setSelectedTab(result.type);
                                            setShowSearchResults(false);
                                            setSearchQuery('');
                                        }}
                                    >
                                        <div className="flex items-center">
                                            <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300 mr-2">
                                                {result.type}
                                            </span>
                                            <span className="text-gray-200">{result.title}</span>
                                        </div>
                                        {result.description && (
                                            <p className="text-sm text-gray-400 mt-1">{result.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Stats Section */}
                    <div className="hidden md:flex items-center space-x-4" style={{
                        color: colors.platinum,
                    }}>
                        {/* Total Users Indicator */}
                        <div className="text-sm flex items-center px-4 py-2 rounded-lg" style={{
                            backgroundColor: 'rgba(15, 15, 15, 0.8)',
                            border: colors.royalBorder,
                            boxShadow: colors.deepShadow
                        }}>
                            <div className="w-2 h-2 rounded-full mr-2" style={{
                                background: colors.paleGold,
                                boxShadow: colors.sharpGlow
                            }}></div>
                            <span className="font-medium">{dashboardStats.totalUsers}</span>
                            <span className="ml-1 text-gray-400">total users</span>
                        </div>

                        {/* Pending Orders Notifications */}
                        <div
                            onClick={() => setSelectedTab('Orders')}
                            className="text-sm flex items-center px-4 py-2 rounded-lg cursor-pointer hover:bg-opacity-80 transition-all"
                            style={{
                                backgroundColor: 'rgba(15, 15, 15, 0.8)',
                                border: colors.royalBorder,
                                boxShadow: colors.deepShadow
                            }}
                            title="Click to view orders"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            {dashboardStats.pendingOrders > 0 && (
                                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 mr-1">
                                    {dashboardStats.pendingOrders}
                                </span>
                            )}
                            <span>Pending Orders</span>
                        </div>

                        {/* Clock */}
                        <div className="text-sm flex items-center px-4 py-2 rounded-lg" style={{
                            backgroundColor: 'rgba(15, 15, 15, 0.8)',
                            border: colors.royalBorder,
                            boxShadow: colors.deepShadow
                        }}>
                            <div className="w-2 h-2 rounded-full mr-2 animate-pulse" style={{
                                background: colors.royalGold,
                                boxShadow: colors.sharpGlow
                            }}></div>
                            {currentTime}
                        </div>
                    </div>
                </div>

                <div className="max-w-full mx-auto rounded-xl overflow-hidden" style={{
                    background: `linear-gradient(145deg, ${colors.charcoal} 0%, ${colors.richBlack} 100%)`,
                    boxShadow: colors.deepShadow,
                    border: colors.royalBorder,
                    position: 'relative'
                }}>
                    {/* Gold decorative elements */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '60px',
                        height: '60px',
                        background: colors.goldGradient,
                        clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                        opacity: 0.9
                    }}></div>

                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '40px',
                        height: '40px',
                        background: colors.goldGradient,
                        clipPath: 'polygon(0 100%, 0 60%, 100% 100%)',
                        opacity: 0.6
                    }}></div>

                    {/* Content Header with Enhanced Royal Styling */}
                    <div className="flex items-center border-b p-6" style={{
                        borderColor: 'rgba(212, 175, 55, 0.2)',
                        background: 'rgba(10, 10, 10, 0.7)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <div className="flex items-center">
                            <div className="w-1 h-8 rounded-full mr-3" style={{
                                background: colors.goldGradient,
                                boxShadow: colors.subtleGlow
                            }}></div>
                            <h2 className="text-2xl font-bold tracking-wide" style={{
                                color: colors.brightGold,
                                fontFamily: "'Cinzel', serif",
                                textShadow: colors.goldTextShadow,
                                letterSpacing: '1px'
                            }}>
                                {selectedTab}
                            </h2>
                        </div>
                        <div className="ml-auto text-sm md:hidden flex items-center" style={{
                            color: colors.platinum,
                            backgroundColor: 'rgba(15, 15, 15, 0.8)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: colors.royalBorder
                        }}>
                            <div className="w-2 h-2 rounded-full mr-2 animate-pulse" style={{
                                background: colors.royalGold,
                                boxShadow: colors.subtleGlow
                            }}></div>
                            {currentTime}
                        </div>
                    </div>

                    {/* Content Container */}
                    <div className="p-6" style={{
                        background: 'rgba(10, 10, 10, 0.6)',
                        borderTop: colors.royalBorderHighlight,
                        boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(5px)'
                    }}>
                        {renderContent()}
                    </div>
                </div>

                {/* Decorative footer element */}
                <div className="mt-6 mx-auto w-1/2 h-1 rounded-full opacity-40" style={{
                    background: colors.subtleGoldGradient
                }}></div>
            </div>

            {/* Global Styles */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Marcellus&family=Cormorant+Garamond:wght@400;500;700&display=swap');
                
                body {
                    font-family: 'Marcellus', serif;
                    background-color: ${colors.richBlack};
                    color: ${colors.parchment};
                    overflow-x: hidden;
                }
                
                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: ${colors.goldGradient};
                    border-radius: 6px;
                    border: 1px solid ${colors.darkGold};
                }
                
                ::-webkit-scrollbar-track {
                    background-color: rgba(10, 10, 10, 0.8);
                    border-radius: 6px;
                }

                /* Enhanced selection styling */
                ::selection {
                    background: rgba(212, 175, 55, 0.7);
                    color: ${colors.richBlack};
                    text-shadow: none;
                }

                /* Accessibility focus styling */
                *:focus {
                    outline: none;
                    box-shadow: 0 0 0 2px ${colors.royalGold};
                }
                
                /* Smooth transitions for all elements */
                * {
                    transition: all 0.2s ease-in-out;
                }
                
                /* Custom styling for buttons */
                button, 
                .btn {
                    background: linear-gradient(145deg, rgba(25, 25, 25, 0.9) 0%, rgba(10, 10, 10, 0.9) 100%);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    color: ${colors.paleGold};
                    border-radius: 4px;
                    padding: 8px 16px;
                    font-family: 'Cinzel', serif;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }
                
                button:hover, 
                .btn:hover {
                    border-color: rgba(212, 175, 55, 0.8);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5), 0 0 8px rgba(212, 175, 55, 0.3);
                    transform: translateY(-1px);
                }
                
                /* Custom styling for inputs */
                input, select, textarea {
                    background-color: rgba(255, 242, 169, 0.03);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    color: ${colors.parchment};
                    border-radius: 4px;
                    padding: 8px 12px;
                    transition: all 0.3s ease;
                }
                
                input:focus, select:focus, textarea:focus {
                    border-color: rgba(212, 175, 55, 0.6);
                    box-shadow: 0 0 0 1px rgba(212, 175, 55, 0.2), 0 0 8px rgba(212, 175, 55, 0.1);
                    background-color: rgba(254, 255, 181, 0.37);
                }
                
                /* Table styling */
                table {
                    border-collapse: separate;
                    border-spacing: 0;
                    width: 100%;
                    border: ${colors.royalBorder};
                    border-radius: 8px;
                    overflow: hidden;
                }
                
                th {
                    background: linear-gradient(to bottom, rgba(25, 25, 25, 0.95), rgba(15, 15, 15, 0.95));
                    color: ${colors.brightGold};
                    font-family: 'Cinzel', serif;
                    font-weight: 600;
                    text-align: left;
                    padding: 12px 16px;
                    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
                }
                
                td {
                    padding: 10px 16px;
                    border-bottom: 1px solid rgba(60, 60, 60, 0.2);
                    color: ${colors.parchment};
                }
                
                tr:last-child td {
                    border-bottom: none;
                }
                
                tr:hover td {
                    background-color: rgba(212, 175, 55, 0.05);
                }
                
                /* Card styling */
                .card {
                    background: linear-gradient(145deg, rgba(25, 25, 25, 0.8) 0%, rgba(10, 10, 10, 0.8) 100%);
                    border: ${colors.royalBorder};
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: ${colors.deepShadow};
                    transition: all 0.3s ease;
                }
                
                .card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5), 0 0 10px rgba(212, 175, 55, 0.1);
                    border-color: rgba(212, 175, 55, 0.4);
                }
                
                /* Add loading animation */
                @keyframes shimmer {
                    0% {
                        background-position: -100% 0;
                    }
                    100% {
                        background-position: 100% 0;
                    }
                }
                
                .loading-shimmer {
                    background: linear-gradient(90deg, 
                        rgba(30, 30, 30, 0.1) 0%, 
                        rgba(60, 60, 60, 0.2) 50%, 
                        rgba(30, 30, 30, 0.1) 100%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                }
            `}</style>
        </div>
    );
}