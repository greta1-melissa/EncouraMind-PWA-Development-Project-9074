import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFileText, FiSearch, FiFilter, FiEdit2, FiTrash2, FiEye, FiPlus } = FiIcons;

const AdminContent = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Mock content data
  const contentItems = [
    { 
      id: 1, 
      title: 'Mindfulness Techniques for Daily Life',
      type: 'article',
      author: 'Sarah Johnson',
      publishDate: '2023-06-01',
      status: 'published'
    },
    { 
      id: 2, 
      title: 'Mental Wellness Assessment Quiz',
      type: 'quiz',
      author: 'Dr. Michael Chen',
      publishDate: '2023-05-28',
      status: 'published'
    },
    { 
      id: 3, 
      title: 'Finding Joy in Small Things',
      type: 'story',
      author: 'Emma Thompson',
      publishDate: null,
      status: 'draft'
    },
    { 
      id: 4, 
      title: 'Managing Anxiety During Difficult Times',
      type: 'article',
      author: 'James Wilson',
      publishDate: '2023-06-02',
      status: 'published'
    },
    { 
      id: 5, 
      title: 'Setting Meaningful Wellness Goals',
      type: 'article',
      author: 'Olivia Davis',
      publishDate: '2023-05-30',
      status: 'published'
    }
  ];

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedType === 'all') return matchesSearch;
    return matchesSearch && item.type === selectedType;
  });

  const getStatusBadgeClasses = (status) => {
    if (status === 'published') {
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    } else if (status === 'draft') {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  };

  const getTypeBadgeClasses = (type) => {
    if (type === 'article') {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    } else if (type === 'quiz') {
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
    } else if (type === 'story') {
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400';
    }
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Content Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage articles, stories, and quizzes
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Add Content</span>
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
            placeholder="Search content by title or author"
            className={`w-full pl-10 pr-4 py-2 border ${
              isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            } rounded-lg focus:ring-2 focus:ring-indigo-500`}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {['all', 'article', 'quiz', 'story'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedType === type
                    ? 'bg-indigo-500 text-white'
                    : `${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Table */}
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
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Publish Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredContent.map((item) => (
                <tr 
                  key={item.id}
                  className={`hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiFileText} className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeBadgeClasses(item.type)}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClasses(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.publishDate ? new Date(item.publishDate).toLocaleDateString() : 'Not published'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                        <SafeIcon icon={FiEye} className="w-4 h-4" />
                      </button>
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

        {filteredContent.length === 0 && (
          <div className="text-center py-8">
            <SafeIcon icon={FiFileText} className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No content found matching your search</p>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing <span className="font-medium">{filteredContent.length}</span> of{' '}
          <span className="font-medium">{contentItems.length}</span> items
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

export default AdminContent;