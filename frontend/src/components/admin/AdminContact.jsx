// src/pages/AdminContact.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminContact = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/contacts', { withCredentials: true });
            if (response.data.success) {
                setMessages(response.data.data);
            } else {
                setMessages([]);
            }
        } catch (err) {
            console.error('Error fetching contact messages:', err);
            setError('Failed to load contact messages.');
        } finally {
            setLoading(false);
        }
    };

    const filteredMessages = messages.filter((msg) =>
        msg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        };
        return new Date(dateString).toLocaleString('en-US', options);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-blue-600"></div>
                <span className="mt-4 text-gray-600 text-base sm:text-xl">Loading...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-6 rounded-lg shadow-md w-full max-w-md">
                    <div className="flex items-center">
                        <svg className="h-8 w-8 sm:h-10 sm:w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="ml-4 text-red-700 text-base sm:text-xl font-medium">{error}</span>
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={fetchMessages}
                            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm sm:text-base"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gray-100 py-4 sm:py-8 px-2 sm:px-4">
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-4 sm:p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 border-b pb-4">
                    <div className="flex items-center">
                        <div className="bg-blue-100 p-3 sm:p-4 rounded-full">
                            <svg className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <div className="ml-4 sm:ml-6">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Contact Messages</h2>
                            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Manage contact messages</p>
                        </div>
                    </div>
                    <div className="mt-4 sm:mt-0 w-full sm:w-1/3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search messages..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full py-2 sm:py-3 px-4 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                            />
                            <svg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 absolute right-4 top-2.5 sm:top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-blue-50 p-4 sm:p-6 rounded-xl shadow-md">
                        <div className="text-base sm:text-lg text-gray-900 font-semibold">Total Messages</div>
                        <div className="text-2xl sm:text-4xl font-bold mt-2 sm:mt-3">{messages.length}</div>
                    </div>
                    <div className="bg-green-50 p-4 sm:p-6 rounded-xl shadow-md">
                        <div className="text-base sm:text-lg text-green-800 font-semibold">New Messages (Last 7 Days)</div>
                        <div className="text-2xl sm:text-4xl font-bold mt-2 sm:mt-3">
                            {messages.filter(m => new Date(m.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                        </div>
                    </div>
                    <div className="bg-yellow-50 p-4 sm:p-6 rounded-xl shadow-md">
                        <div className="text-base sm:text-lg text-yellow-800 font-semibold">Latest Message</div>
                        <div className="text-lg sm:text-xl font-bold mt-2 sm:mt-3">
                            {messages.length > 0 ? formatDate(messages[0].created_at) : "No messages"}
                        </div>
                    </div>
                </div>

                {/* Messages Table */}
                <div className="overflow-x-auto rounded-xl shadow-lg border">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="px-4 sm:px-8 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Name</th>
                                <th className="px-4 sm:px-8 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Email</th>
                                <th className="px-4 sm:px-8 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold hidden md:table-cell">Date</th>
                                <th className="px-4 sm:px-8 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Subject</th>
                                <th className="px-4 sm:px-8 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                            {filteredMessages.length > 0 ? (
                                filteredMessages.map((message) => (
                                    <tr key={message.id} className="hover:bg-gray-100 transition-colors">
                                        <td className="px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">{message.full_name}</td>
                                        <td className="px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">
                                            <a href={`mailto:${message.email}`} className="text-blue-600 hover:underline">
                                                {message.email}
                                            </a>
                                        </td>
                                        <td className="px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base hidden md:table-cell">{formatDate(message.created_at)}</td>
                                        <td className="px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">{message.subject}</td>
                                        <td className="px-4 sm:px-8 py-3 sm:py-4">
                                            <button
                                                onClick={() => setSelectedMessage(message)}
                                                className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs sm:text-sm"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center px-4 sm:px-8 py-8 sm:py-10">
                                        <div className="flex flex-col items-center">
                                            <svg className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                            </svg>
                                            <span className="mt-4 text-base sm:text-xl font-medium text-gray-600">No messages found.</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredMessages.length > 0 && (
                    <div className="flex justify-center mt-6 sm:mt-8">
                        <nav className="flex items-center space-x-2 sm:space-x-4">
                            <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm sm:text-base">Previous</button>
                            <button className="px-3 sm:px-4 py-2 sm:py-3 rounded-md bg-[#727D73] text-white hover:bg-[#D0DDD0] text-sm sm:text-base">1</button>
                            <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm sm:text-base">Next</button>
                        </nav>
                    </div>
                )}

                {/* Message Details Modal */}
                {selectedMessage && (
                    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-auto max-h-[90vh] overflow-y-auto">
                            <div className="p-4 sm:p-6 md:p-8">
                                <div className="flex justify-between items-center mb-6 sm:mb-8">
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Message Details</h3>
                                    <button
                                        onClick={() => setSelectedMessage(null)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                                        <div className="text-xs sm:text-sm text-gray-500">Name</div>
                                        <div className="text-base sm:text-xl font-semibold text-gray-900">{selectedMessage.full_name}</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                                        <div className="text-xs sm:text-sm text-gray-500">Email</div>
                                        <div className="text-base sm:text-xl font-semibold text-blue-600">
                                            <a href={`mailto:${selectedMessage.email}`}>{selectedMessage.email}</a>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                                        <div className="text-xs sm:text-sm text-gray-500">Sent Date</div>
                                        <div className="text-base sm:text-xl font-semibold">{formatDate(selectedMessage.created_at)}</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                                        <div className="text-xs sm:text-sm text-gray-500">Subject</div>
                                        <div className="text-base sm:text-xl font-semibold">{selectedMessage.subject}</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                                        <div className="text-xs sm:text-sm text-gray-500">Message</div>
                                        <div className="mt-2 text-sm sm:text-base text-gray-800 whitespace-pre-line leading-relaxed">{selectedMessage.message}</div>
                                    </div>
                                </div>
                                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                                    <button
                                        onClick={() => window.open(`mailto:${selectedMessage.email}`)}
                                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
                                    >
                                        Reply via Email
                                    </button>
                                    <button
                                        onClick={() => setSelectedMessage(null)}
                                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm sm:text-base"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminContact;
