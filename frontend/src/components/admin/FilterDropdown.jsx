import React, { useState, useEffect, useRef } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';

const countries = ['Jordan', 'Saudi Arabia', 'Other'];

const FilterDropdown = ({ filterOptions, setFilterOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasFilters, setHasFilters] = useState(false);
  const dropdownRef = useRef(null);

  // Check if any filters are active
  useEffect(() => {
    const isFiltered = 
      filterOptions.verificationStatus !== 'all' ||
      filterOptions.country !== 'all' ||
      filterOptions.gender !== 'all';
    setHasFilters(isFiltered);
  }, [filterOptions]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const clearFilters = () => {
    setFilterOptions({
      verificationStatus: 'all',
      country: 'all',
      gender: 'all'
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Filter button */}
      <button
        onClick={toggleDropdown}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                   focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2
                   ${hasFilters 
                     ? 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100' 
                     : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
                   shadow-sm`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
          {hasFilters && (
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg
                     border border-gray-200 p-4 z-50 animate-fade-in"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-800">Filter Users</h3>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Verification Status Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
                Verification Status
              </label>
              <select
                value={filterOptions.verificationStatus}
                onChange={(e) =>
                  setFilterOptions((prev) => ({
                    ...prev,
                    verificationStatus: e.target.value,
                  }))
                }
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent
                           text-gray-700 hover:border-gray-300 transition-colors"
              >
                <option value="all">All Users</option>
                <option value="verified">Verified only</option>
                <option value="unverified">Unverified only</option>
              </select>
            </div>

            {/* Country Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
                Country
              </label>
              <select
                value={filterOptions.country}
                onChange={(e) =>
                  setFilterOptions((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent
                           text-gray-700 hover:border-gray-300 transition-colors"
              >
                <option value="all">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
                Gender
              </label>
              <select
                value={filterOptions.gender}
                onChange={(e) =>
                  setFilterOptions((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }))
                }
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent
                           text-gray-700 hover:border-gray-300 transition-colors"
              >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;