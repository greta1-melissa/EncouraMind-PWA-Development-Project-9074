import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiTrendingUp, FiTarget, FiBookOpen, FiHelpCircle } = FiIcons;

const Dashboard = () => {
  const { userData, dailyEncouragement } = useData();
  const { isDark } = useTheme();

  const quickStats = [
    {
      label: 'Total Progress',
      value: userData?.progress?.length || 0,
      icon: FiTrendingUp,
      color: 'from-primary-500 to-secondary-600'
    },
    {
      label: 'Goals Active',
      value: userData?.goals?.filter(g => !g.completed).length || 0,
      icon: FiTarget,
      color: 'from-secondary-500 to-accent-500'
    },
    {
      label: 'Stories Read',
      value: userData?.storiesRead || 0,
      icon: FiBookOpen,
      color: 'from-accent-500 to-primary-500'
    },
    {
      label: 'Daily Streak',
      value: userData?.dailyStreak || 0,
      icon: FiHeart,
      color: 'from-primary-500 to-accent-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-2xl ${
          isDark ? 'bg-gray-800' : 'bg-gradient-to-br from-primary-500 via-secondary-600 to-accent-700'
        } text-white relative overflow-hidden`}
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/90 to-accent-600/90"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to EncouraMind</h1>
          <p className="text-xl opacity-90">Your daily dose of wellness and encouragement</p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-white/5 rounded-full"></div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            } shadow-lg relative overflow-hidden`}
          >
            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${stat.color} mb-3`}>
              <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Daily Encouragement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-xl ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
        } shadow-lg relative overflow-hidden`}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500">
            <SafeIcon icon={FiHeart} className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold">Daily Encouragement</h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          {dailyEncouragement}
        </p>
        <Link
          to="/daily"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          <span>Get more encouragement</span>
          <SafeIcon icon={FiHeart} className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
};

export default Dashboard;