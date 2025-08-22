import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import Logo from './Logo';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiHeart, FiTarget, FiBookOpen, FiUser, FiX, FiActivity, FiClipboard, FiEdit3 } = FiIcons;

const Navigation = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { isDark } = useTheme();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: FiHome },
    { path: '/daily', label: 'Daily Encouragement', icon: FiHeart },
    { path: '/wellness-assessment', label: 'Wellness Assessment', icon: FiClipboard },
    { path: '/goals', label: 'Goals', icon: FiTarget },
    { path: '/progress', label: 'Progress', icon: FiActivity },
    { path: '/journal', label: 'Personal Journal', icon: FiEdit3 },
    { path: '/stories', label: 'Stories', icon: FiBookOpen },
    { path: '/quiz', label: 'Quizzes', icon: FiActivity },
    { path: '/profile', label: 'Profile', icon: FiUser }
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        className={`fixed left-0 top-0 bottom-0 w-64 z-50 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } shadow-xl lg:shadow-none lg:translate-x-0 lg:static lg:z-0`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <Logo size="sm" />
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-2">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all group ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-primary-500 to-accent-600 text-white shadow-lg'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <SafeIcon
                icon={item.icon}
                className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                  location.pathname === item.path
                    ? 'text-white'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              />
              <span className="font-medium">{item.label}</span>
              {location.pathname === item.path && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute right-4 w-2 h-2 bg-white rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>
      </motion.nav>
    </>
  );
};

export default Navigation;