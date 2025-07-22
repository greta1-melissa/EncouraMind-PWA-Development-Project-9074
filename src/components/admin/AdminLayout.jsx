import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import SafeIcon from '../../common/SafeIcon';
import Logo from '../Logo';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiUsers, FiFileText, FiBarChart2, FiSettings, FiMenu, FiX, FiLogOut, FiMoon, FiSun } = FiIcons;

const AdminLayout = ({ children }) => {
  const { adminLogout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: FiHome },
    { path: '/admin/users', label: 'User Management', icon: FiUsers },
    { path: '/admin/content', label: 'Content Management', icon: FiFileText },
    { path: '/admin/analytics', label: 'Analytics', icon: FiBarChart2 },
    { path: '/admin/settings', label: 'Settings', icon: FiSettings }
  ];

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: -320, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  const itemVariants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.2 } },
    closed: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-b shadow-lg backdrop-blur-md bg-opacity-95`}>
        <div className="flex items-center justify-between px-4 py-3 lg:px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <SafeIcon icon={FiMenu} className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-3">
              <Logo size="sm" className="rounded-lg" />
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  EncouraMind Admin
                </h1>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <SafeIcon icon={isDark ? FiSun : FiMoon} className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <SafeIcon icon={FiLogOut} className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.nav
        variants={sidebarVariants}
        initial="closed"
        animate={sidebarOpen ? "open" : "closed"}
        className={`fixed left-0 top-0 bottom-0 w-64 z-50 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } shadow-2xl lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logo size="sm" className="rounded-lg" />
              <span className="font-bold text-lg">Admin Panel</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-2 mt-16 lg:mt-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              variants={itemVariants}
              initial="closed"
              animate="open"
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-600 text-white shadow-lg'
                    : `hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      }`
                }`}
              >
                <SafeIcon
                  icon={item.icon}
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    location.pathname === item.path ? 'text-white' : ''
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
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-700 dark:to-gray-700">
          <p className="text-sm font-medium mb-2">Admin Version</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            EncouraMind v1.0.0
          </p>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="lg:ml-64 pt-16">
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;