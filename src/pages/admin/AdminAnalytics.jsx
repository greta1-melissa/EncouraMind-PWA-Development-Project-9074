import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiBarChart2, FiUsers, FiActivity, FiTrendingUp, FiDownload, 
  FiCalendar, FiClock, FiPieChart, FiMap, FiStar
} = FiIcons;

const AdminAnalytics = () => {
  const { isDark } = useTheme();
  const [timeframe, setTimeframe] = useState('30d');

  // Mock analytics data
  const analyticsData = {
    totalUsers: 752,
    activeUsers: 428,
    newUsers: 128,
    userRetention: 86,
    avgSessionTime: '12:45',
    pageViews: 15283,
    completionRate: 72
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track user engagement and platform performance
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <SafeIcon icon={FiDownload} className="w-5 h-5" />
          <span>Export Data</span>
        </motion.button>
      </div>

      {/* Time Filter */}
      <div className="flex items-center space-x-2">
        <SafeIcon icon={FiCalendar} className="w-5 h-5 text-gray-400" />
        <div className="flex space-x-2">
          {['7d', '30d', '90d', '12m'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                timeframe === period
                  ? 'bg-indigo-500 text-white'
                  : `${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} hover:bg-gray-200 dark:hover:bg-gray-600`
              }`}
            >
              {period === '7d' ? 'Week' : 
               period === '30d' ? 'Month' : 
               period === '90d' ? 'Quarter' : 'Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: analyticsData.totalUsers, icon: FiUsers, color: 'from-blue-500 to-indigo-600' },
          { label: 'Active Users', value: analyticsData.activeUsers, icon: FiActivity, color: 'from-green-500 to-teal-600' },
          { label: 'New Users', value: analyticsData.newUsers, icon: FiUsers, color: 'from-purple-500 to-pink-600' },
          { label: 'Retention Rate', value: `${analyticsData.userRetention}%`, icon: FiTrendingUp, color: 'from-orange-500 to-amber-600' }
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            } shadow-lg`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{metric.label}</p>
                <h3 className="text-3xl font-bold">{metric.value}</h3>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${metric.color}`}>
                <SafeIcon icon={metric.icon} className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-indigo-500" />
              <span>User Growth</span>
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span>New</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Total</span>
              </span>
            </div>
          </div>
          
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">User growth chart placeholder</p>
          </div>
        </motion.div>

        {/* Engagement Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <SafeIcon icon={FiActivity} className="w-5 h-5 text-indigo-500" />
              <span>Engagement Metrics</span>
            </h2>
          </div>
          
          <div className="space-y-6">
            {[
              { label: 'Avg. Session Time', value: analyticsData.avgSessionTime, icon: FiClock },
              { label: 'Page Views', value: analyticsData.pageViews.toLocaleString(), icon: FiBarChart2 },
              { label: 'Completion Rate', value: `${analyticsData.completionRate}%`, icon: FiStar }
            ].map((metric, index) => (
              <div key={metric.label} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <SafeIcon icon={metric.icon} className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">{metric.label}</span>
                </div>
                <span className="font-bold text-lg">{metric.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Content Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <SafeIcon icon={FiPieChart} className="w-5 h-5 text-indigo-500" />
              <span>Content Performance</span>
            </h2>
          </div>
          
          <div className="space-y-4">
            {[
              { title: 'Mindfulness Techniques', views: 1245, completion: 78 },
              { title: 'Mental Wellness Quiz', views: 986, completion: 92 },
              { title: 'Finding Joy in Small Things', views: 756, completion: 63 }
            ].map((content, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{content.title}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {content.views} views
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Completion rate
                  </span>
                  <span className="font-medium">{content.completion}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 h-1.5 rounded-full mt-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1.5 rounded-full"
                    style={{ width: `${content.completion}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* User Demographics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <SafeIcon icon={FiMap} className="w-5 h-5 text-indigo-500" />
              <span>User Demographics</span>
            </h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Age Groups</h3>
              <div className="space-y-2">
                {[
                  { label: '18-24', percentage: 15 },
                  { label: '25-34', percentage: 42 },
                  { label: '35-44', percentage: 28 },
                  { label: '45+', percentage: 15 }
                ].map((group, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-sm w-12">{group.label}</span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-600 h-2 rounded-full">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${group.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{group.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Top Locations</h3>
              <div className="space-y-2">
                {[
                  { country: 'United States', percentage: 35 },
                  { country: 'United Kingdom', percentage: 18 },
                  { country: 'Canada', percentage: 12 },
                  { country: 'Australia', percentage: 10 }
                ].map((location, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{location.country}</span>
                    <span className="text-sm font-medium">{location.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminAnalytics;