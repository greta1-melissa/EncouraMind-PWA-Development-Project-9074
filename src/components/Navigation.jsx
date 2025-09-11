import React from 'react';
import {Link,useLocation,useNavigate} from 'react-router-dom';
import {motion,AnimatePresence} from 'framer-motion';
import {useAuth} from '../contexts/AuthContext';
import {useTheme} from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import Logo from './Logo';
import * as FiIcons from 'react-icons/fi';

const {FiHome,FiHeart,FiTarget,FiBookOpen,FiUser,FiX,FiActivity,FiClipboard,FiEdit3,FiLeaf,FiLogOut,FiMoon,FiSun} = FiIcons;

const Navigation = ({isOpen,onClose}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {isDark,toggleTheme} = useTheme();
  const {logout,user} = useAuth();

  const navItems = [
    {path: '/',label: 'Dashboard',icon: FiHome},
    {path: '/daily',label: 'Daily Encouragement',icon: FiHeart},
    {path: '/wellness-assessment',label: 'Wellness Assessment',icon: FiClipboard},
    {path: '/goals',label: 'Goals',icon: FiTarget},
    {path: '/progress',label: 'Progress',icon: FiActivity},
    {path: '/journal',label: 'Personal Journal',icon: FiEdit3},
    {path: '/stories',label: 'Stories',icon: FiBookOpen},
    {path: '/quiz',label: 'Quizzes',icon: FiActivity},
    {path: '/resources',label: 'Wellness Resources',icon: FiLeaf},
    {path: '/profile',label: 'Profile',icon: FiUser}
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      onClose(); // Close mobile menu if open
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Navigation Sidebar - Always visible on desktop */}
      <nav
        className={`fixed left-0 top-0 bottom-0 w-64 z-50 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logo size="sm" />
              <div>
                <h2 className="font-bold text-lg bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 bg-clip-text text-transparent">
                  EncouraMind
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Wellness Journey
                </p>
              </div>
            </div>
            {/* Close button - only visible on mobile */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden transition-colors"
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User Info Section */}
        {user && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.user_metadata?.full_name?.[0] || user.email?.[0] || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user.user_metadata?.full_name || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div className="p-4 space-y-2 overflow-y-auto" style={{height: 'calc(100vh - 280px)'}}>
          {navItems.map((item,index) => (
            <motion.div
              key={item.path}
              initial={{opacity: 0,x: -20}}
              animate={{opacity: 1,x: 0}}
              transition={{delay: index * 0.05}}
            >
              <Link
                to={item.path}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all group relative overflow-hidden ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-primary-500 to-accent-600 text-white shadow-lg'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <SafeIcon
                  icon={item.icon}
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    location.pathname === item.path ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                  }`}
                />
                <span className="font-medium">{item.label}</span>
                
                {/* Active Indicator */}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-4 w-2 h-2 bg-white rounded-full"
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{type: "spring",stiffness: 500,damping: 30}}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer with Theme Toggle and Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
          {/* Theme Toggle and Logout Buttons */}
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              onClick={toggleTheme}
              className="flex items-center space-x-2 flex-1 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <SafeIcon icon={isDark ? FiSun : FiMoon} className="w-4 h-4" />
              <span className="text-sm">{isDark ? 'Light' : 'Dark'}</span>
            </motion.button>
            
            <motion.button
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              onClick={handleLogout}
              className="flex items-center space-x-2 flex-1 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiLogOut} className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </motion.button>
          </div>

          {/* App Info */}
          <div className="p-3 rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-700 dark:to-gray-700 border border-primary-200 dark:border-gray-600">
            <div className="text-center">
              <p className="text-sm font-medium mb-1">Your Wellness Journey</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Every step counts! 🌟
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;