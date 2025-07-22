import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiSearch, FiFilter, FiEdit2, FiTrash2, FiCheckCircle, FiXCircle, FiPlus } = FiIcons;

const AdminUsers = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock user data
  const users = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', active: true, role: 'user', lastLogin: '2023-06-01' },
    { id: 2, name: 'Michael Chen', email: 'michael@example.com', active: true, role: 'user', lastLogin: '2023-05-28' },
    { id: 3, name: 'Emma Thompson', email: 'emma@example.com', active: false, role: 'user', lastLogin: '2023-04-15' },
    { id: 4, name: 'James Wilson', email: 'james@example.com', active: true, role: 'admin', lastLogin: '2023-06-02' },
    { id: 5, name: 'Olivia Davis', email: 'olivia@example.com', active: true, role: 'user', lastLogin: '2023-05-30' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'active') return matchesSearch && user.active;
    if (selectedFilter === 'inactive') return matchesSearch && !user.active;
    if (selectedFilter === 'admin') return matchesSearch && user.role === 'admin';
    
    return matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage user accounts and permissions
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Add User</span>
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SafeIcon icon={FiSearch} className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users by name or email"
            className={`w-full pl-10 pr-4 py-2 border ${
              isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            } rounded-lg focus:ring-2 focus:ring-indigo-500`}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {['all', 'active', 'inactive', 'admin'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedFilter === filter
                    ? 'bg-indigo-500 text-white'
                    : `${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`overflow-hidden rounded-xl border ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } shadow-lg`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id}
                  className={`hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">{user.name[0]}</span>
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.active
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      <SafeIcon 
                        icon={user.active ? FiCheckCircle : FiXCircle} 
                        className="w-3 h-3 mr-1" 
                      />
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400">
                        <SafeIcon icon={FiEdit2} className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                        <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <SafeIcon icon={FiUsers} className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No users found matching your search</p>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing <span className="font-medium">{filteredUsers.length}</span> of{' '}
          <span className="font-medium">{users.length}</span> users
        </p>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm disabled:opacity-50">
            Previous
          </button>
          <button className="px-3 py-1 bg-indigo-500 text-white rounded-lg text-sm">1</button>
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm">
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminUsers;