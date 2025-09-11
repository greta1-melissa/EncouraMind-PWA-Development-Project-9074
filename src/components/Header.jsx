import React from 'react';
import {motion} from 'framer-motion';
import {useAuth} from '../contexts/AuthContext';
import {useTheme} from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import Logo from './Logo';
import * as FiIcons from 'react-icons/fi';

const {FiMenu,FiLogOut,FiMoon,FiSun,FiUser} = FiIcons;

const Header = ({onMenuClick}) => {
  const {isDark,toggleTheme} = useTheme();
  const {logout,user} = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-30 lg:left-64 ${
      isDark ? 'bg-gray-800/95' : 'bg-white/95'
    } border-b border-gray-200 dark:border-gray-700 backdrop-blur-md shadow-sm`}>
      <div className="flex items-center justify-between px-4 py-4 min-h-[4rem]">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <SafeIcon icon={FiMenu} className="w-6 h-6" />
          </button>

          {/* Logo and title - visible on mobile when sidebar is closed */}
          <div className="flex items-center space-x-3 lg:hidden">
            <Logo size="sm" />
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 bg-clip-text text-transparent">
                EncouraMind
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Wellness Journey
              </p>
            </div>
          </div>

          {/* Desktop title */}
          <div className="hidden lg:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 bg-clip-text text-transparent">
              Your Wellness Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Encouraging Minds,Enriching Lives
            </p>
          </div>
        </div>

        {/* Header actions */}
        <div className="flex items-center space-x-2">
          {/* User info on desktop */}
          {user && (
            <div className="hidden md:flex items-center space-x-3 mr-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.user_metadata?.full_name?.[0] || user.email?.[0] || 'U'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">
                  {user.user_metadata?.full_name || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Welcome back!
                </p>
              </div>
            </div>
          )}

          {/* Theme toggle */}
          <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            <SafeIcon icon={isDark ? FiSun : FiMoon} className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </motion.button>

          {/* Logout button */}
          <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Logout"
          >
            <SafeIcon icon={FiLogOut} className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">Logout</span>
          </motion.button>

          {/* Decorative dots */}
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-primary-500"></div>
            <div className="w-2 h-2 rounded-full bg-secondary-500"></div>
            <div className="w-2 h-2 rounded-full bg-accent-500"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;