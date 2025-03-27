import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import {
  Search,
  PlusCircle,
  Edit2,
  UserX,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ArrowDownToLine,
  Phone,
  Globe,
} from 'lucide-react';

import UserModal from './UserModal';
import FilterDropdown from './FilterDropdown';
import UserOrdersModal from './UserOrdersModal';

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // For viewing the orders
  const [selectedUserOrdersId, setSelectedUserOrdersId] = useState(null);
  const [ordersModalOpen, setOrdersModalOpen] = useState(false);

  // Toggle between active/deleted
  const [showDeleted, setShowDeleted] = useState(false);

  // Filter & search
  const [filterOptions, setFilterOptions] = useState({
    verificationStatus: 'all',
    country: 'all',
    gender: 'all',
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  // GET active users
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/admin/users', {
        withCredentials: true,
      });
      setUsers(response.data);
      setFilteredUsers(response.data);
      setShowDeleted(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Unable to fetch users. Please check your connection.',
        background: '#ffffff',
        customClass: {
          popup: 'rounded-xl shadow-xl border border-gray-100',
          confirmButton: 'bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2 text-white font-medium',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // GET deleted users
  const fetchDeletedUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/admin/users/deleted', {
        withCredentials: true,
      });
      setUsers(response.data);
      setFilteredUsers(response.data);
      setShowDeleted(true);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Unable to fetch deleted users.',
        background: '#ffffff',
        customClass: {
          popup: 'rounded-xl shadow-xl border border-gray-100',
          confirmButton: 'bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2 text-white font-medium',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show order history for a user when row is clicked
  const handleRowClicked = (row) => {
    setSelectedUserOrdersId(row.user_id);
    setOrdersModalOpen(true);
  };

  // Toggle block/unblock user
  const handleToggleBlockUser = (user) => {
    const currentlyBlocked = user.is_deleted;

    Swal.fire({
      title: currentlyBlocked ? 'Unblock User?' : 'Block User?',
      text: currentlyBlocked
        ? 'Are you sure you want to unblock this user?'
        : 'Are you sure you want to block this user?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: currentlyBlocked ? '#3b82f6' : '#ef4444',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: currentlyBlocked ? 'Yes, Unblock' : 'Yes, Block',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      customClass: {
        popup: 'rounded-xl shadow-xl border border-gray-100',
        confirmButton: currentlyBlocked
          ? 'bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 text-white font-medium'
          : 'bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2 text-white font-medium',
        cancelButton: 'bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg px-4 py-2 font-medium',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Patch request to toggle block/unblock
          await axios.patch(`http://localhost:5000/api/admin/users/${user.user_id}/block`, null, {
            withCredentials: true,
          });

          Swal.fire({
            icon: 'success',
            title: currentlyBlocked ? 'User Unblocked' : 'User Blocked',
            text: currentlyBlocked
              ? 'The user has been successfully unblocked.'
              : 'The user has been successfully blocked.',
            background: '#ffffff',
            customClass: {
              popup: 'rounded-xl shadow-xl border border-gray-100',
              confirmButton: 'bg-green-500 hover:bg-green-600 rounded-lg px-4 py-2 text-white font-medium',
            },
          });

          // Refresh correct list
          showDeleted ? fetchDeletedUsers() : fetchUsers();
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Operation Failed',
            text: 'Unable to update the user status.',
            background: '#ffffff',
            customClass: {
              popup: 'rounded-xl shadow-xl border border-gray-100',
              confirmButton: 'bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2 text-white font-medium',
            },
          });
        }
      }
    });
  };

  // Searching & filtering
  const advancedFilterUsers = useMemo(() => {
    return users.filter((user) => {
      const searchMatch =
        !searchQuery ||
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase());

      const verificationMatch =
        filterOptions.verificationStatus === 'all' ||
        (filterOptions.verificationStatus === 'verified' && user.email_verified) ||
        (filterOptions.verificationStatus === 'unverified' && !user.email_verified);

      const countryMatch =
        filterOptions.country === 'all' || user.country === filterOptions.country;

      const genderMatch =
        filterOptions.gender === 'all' || user.gender === filterOptions.gender;

      return searchMatch && verificationMatch && countryMatch && genderMatch;
    });
  }, [users, searchQuery, filterOptions]);

  // CSV export
  const exportUsers = () => {
    const headers = ['Name', 'Email', 'Phone', 'Country', 'Gender', 'Email Verified'];
    const csvData = [
      headers,
      ...filteredUsers.map((user) => [
        user.name,
        user.email,
        user.phone,
        user.country,
        user.gender,
        user.email_verified ? 'Yes' : 'No',
      ]),
    ];

    const csvContent = csvData.map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'users_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Table columns
  const columns = [
    {
      name: 'User',
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3 py-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg shadow-sm border border-blue-100">
            {row.name ? row.name.charAt(0).toUpperCase() : '?'}
          </div>
          <div>
            <div className="font-medium text-gray-800">{row.name}</div>
            <div className="text-xs text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
      width: '250px',
    },
    {
      name: 'Contact',
      selector: (row) => row.phone,
      cell: (row) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-gray-700">
            <Phone className="w-4 h-4 text-gray-500" />
            <span>{row.phone || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <Globe className="w-4 h-4" />
            <span>{row.country || 'N/A'}</span>
          </div>
        </div>
      ),
      width: '200px',
    },
    {
      name: 'Status',
      selector: (row) => row.email_verified,
      cell: (row) => (
        <div className="flex items-center gap-2">
          {row.email_verified ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <span
            className={`font-medium ${
              row.email_verified ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {row.email_verified ? 'Verified' : 'Unverified'}
          </span>
        </div>
      ),
      width: '150px',
    },
    // Number of orders
    {
      name: 'Orders',
      selector: (row) => row.orderCount,
      sortable: true,
      width: '120px',
      cell: (row) => (
        <span className="font-medium text-gray-700">{row.orderCount || 0}</span>
      ),
    },
    // Total spent
    {
      name: 'Spent',
      selector: (row) => row.totalSpent,
      sortable: true,
      width: '120px',
      cell: (row) => {
        const spent = parseFloat(row.totalSpent || 0).toFixed(2);
        return <span className="font-medium text-gray-700">${spent}</span>;
      },
    },
    {
      // Show if user is blocked or not by row.is_deleted
      name: 'Blocked?',
      cell: (row) =>
        row.is_deleted ? (
          <span className="text-red-600 font-medium px-2 py-1 bg-red-50 rounded-md">Yes</span>
        ) : (
          <span className="text-green-600 font-medium px-2 py-1 bg-green-50 rounded-md">No</span>
        ),
      width: '100px',
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex space-x-2">
          {/* Edit user */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedUser(row);
              setModalOpen(true);
            }}
            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 
                       transition-colors shadow-sm hover:shadow focus:outline-none 
                       focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
            title="Update User"
          >
            <Edit2 className="w-5 h-5" />
          </button>

          {/* Toggle block/unblock */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleBlockUser(row);
            }}
            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 
                       transition-colors shadow-sm hover:shadow focus:outline-none 
                       focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
            title={row.is_deleted ? 'Unblock User' : 'Block User'}
          >
            <UserX className="w-5 h-5" />
          </button>
        </div>
      ),
      width: '140px',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">User Management</h1>
            <p className="text-gray-600 text-sm flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-500" />
              Advanced user control and insights
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Dropdown */}
            <FilterDropdown
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
            />

            {/* Export CSV */}
            <button
              onClick={exportUsers}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white 
                         rounded-lg shadow-sm hover:bg-emerald-600 transition-all 
                         focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2"
            >
              <ArrowDownToLine className="w-4 h-4" />
              <span className="text-sm font-medium">Export CSV</span>
            </button>

            {/* Toggle between Active / Deleted users */}
            {showDeleted ? (
              <button
                onClick={fetchUsers}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg shadow-sm 
                           hover:bg-amber-600 transition-all focus:outline-none 
                           focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 text-sm font-medium"
              >
                Show Active Users
              </button>
            ) : (
              <button
                onClick={fetchDeletedUsers}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-sm 
                           hover:bg-gray-600 transition-all focus:outline-none 
                           focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 text-sm font-medium"
              >
                Show Deleted Users
              </button>
            )}

            {/* Refresh */}
            <button
              onClick={() => {
                showDeleted ? fetchDeletedUsers() : fetchUsers();
              }}
              className={`p-2 bg-blue-50 text-blue-600 rounded-lg shadow-sm 
                         hover:bg-blue-100 transition-colors ${
                           isLoading ? 'animate-spin' : ''
                         } focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2`}
              disabled={isLoading}
              title="Refresh List"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            {/* Add User */}
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white 
                         rounded-lg shadow-sm hover:bg-blue-600 transition-all 
                         focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 group"
              onClick={() => {
                setSelectedUser(null);
                setModalOpen(true);
              }}
            >
              <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              <span className="text-sm font-medium">Add User</span>
            </button>
          </div>
        </header>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-300 
                           focus:border-transparent text-gray-700 text-sm
                           hover:shadow-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            </div>
          </div>

          <DataTable
            columns={columns}
            data={advancedFilterUsers}
            onRowClicked={handleRowClicked}
            pagination
            striped
            highlightOnHover
            progressPending={isLoading}
            persistTableHead
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            customStyles={{
              headRow: {
                style: {
                  backgroundColor: '#f9fafb',
                  borderBottomWidth: '1px',
                  borderBottomColor: '#e5e7eb',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#4b5563',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  paddingTop: '0.75rem',
                  paddingBottom: '0.75rem',
                },
              },
              headCells: {
                style: {
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                },
              },
              cells: {
                style: {
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                },
              },
              rows: {
                style: {
                  minHeight: '68px',
                  fontSize: '0.875rem',
                  backgroundColor: 'white',
                  transition: 'background-color 0.2s',
                  borderBottom: '1px solid #f3f4f6',
                },
                highlightOnHoverStyle: {
                  backgroundColor: 'rgba(59, 130, 246, 0.05)',
                  cursor: 'pointer',
                },
              },
              pagination: {
                style: {
                  borderTopWidth: '1px',
                  borderTopColor: '#e5e7eb',
                  backgroundColor: '#f9fafb',
                },
                pageButtonsStyle: {
                  borderRadius: '0.375rem',
                  backgroundColor: 'transparent',
                  color: '#4b5563',
                  height: '36px',
                  width: '36px',
                  margin: '0 2px',
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: '#e5e7eb',
                  },
                  '&:disabled': {
                    color: '#9ca3af',
                    cursor: 'not-allowed',
                  },
                },
              },
            }}
          />
        </div>

        {/* Order History Modal */}
        <UserOrdersModal
          isOpen={ordersModalOpen}
          onClose={() => setOrdersModalOpen(false)}
          userId={selectedUserOrdersId}
        />

        {/* Modal (Create/Update user) */}
        {modalOpen && (
          <UserModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            user={selectedUser}
            onUserUpdate={showDeleted ? fetchDeletedUsers : fetchUsers}
          />
        )}
      </div>
    </div>
  );
};

export default UsersAdmin;