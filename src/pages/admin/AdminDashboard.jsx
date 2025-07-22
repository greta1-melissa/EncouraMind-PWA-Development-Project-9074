import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiFileText, FiActivity, FiAward, FiAlertCircle, FiCheck, FiTrendingUp, FiCalendar } = FiIcons;

const AdminDashboard = () => {
  const { isDark } = useTheme();

  // Mock data for dashboard
  const stats = [
    { label: 'Total Users', value: 752, icon: FiUsers, color: 'from-blue-500 to-indigo-600' },
    { label: 'Active Today', value: 128, icon: FiActivity, color: 'from-green-500 to-teal-600' },
    { label: 'Content Items', value: 89, icon: FiFileText, color: 'from-purple-500 to-pink-600' },
    { label: 'Awards Given', value: 246, icon: FiAward, color: 'from-orange-500 to-amber-600' }
  ];

  const recentAlerts = [
    { id: 1, type: 'warning', message: 'User reported inappropriate content', time: '2 hours ago' },
    { id: 2, type: 'success', message: 'Weekly backup completed successfully', time: '5 hours ago' },
    { id: 3, type: 'warning', message: 'High server load detected', time: 'Yesterday' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Last updated:</span>
          <span className="text-sm font-medium">{new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            } shadow-lg`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`lg:col-span-2 p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">User Activity</h2>
            <div className="flex items-center space-x-2">
              <button className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                Weekly
              </button>
              <button className="text-xs px-3 py-1 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                Monthly
              </button>
            </div>
          </div>
          
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Activity chart placeholder</p>
          </div>
        </motion.div>

        {/* Recent Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}
        >
          <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
          <div className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`p-3 rounded-lg border ${
                  alert.type === 'warning'
                    ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'
                    : 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-1 rounded-full ${
                    alert.type === 'warning' ? 'bg-amber-400' : 'bg-green-500'
                  }`}>
                    <SafeIcon 
                      icon={alert.type === 'warning' ? FiAlertCircle : FiCheck} 
                      className="w-4 h-4 text-white" 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{alert.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="w-full mt-4 text-center text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
            View all alerts
          </button>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}
        >
          <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
          <div className="space-y-3">
            {[
              { name: 'Sarah Johnson', email: 'sarah@example.com', time: '2 hours ago' },
              { name: 'Michael Chen', email: 'michael@example.com', time: '5 hours ago' },
              { name: 'Emma Thompson', email: 'emma@example.com', time: 'Yesterday' }
            ].map((user, index) => (
              <div 
                key={user.email} 
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">{user.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{user.time}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-center text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
            View all users
          </button>
        </motion.div>

        {/* Recent Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}
        >
          <h2 className="text-lg font-semibold mb-4">Latest Content</h2>
          <div className="space-y-3">
            {[
              { title: 'Mindfulness Techniques', type: 'Article', time: '1 day ago' },
              { title: 'Managing Anxiety', type: 'Quiz', time: '2 days ago' },
              { title: 'Finding Inner Peace', type: 'Story', time: '3 days ago' }
            ].map((content, index) => (
              <div 
                key={content.title} 
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium">{content.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full">
                      {content.type}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{content.time}</span>
                  </div>
                </div>
                <button className="p-1 text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400">
                  <SafeIcon icon={FiFileText} className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-center text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
            View all content
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;