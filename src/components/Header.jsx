import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import Logo from './Logo';
import * as FiIcons from 'react-icons/fi';

const { FiMenu } = FiIcons;

const Header = ({ onMenuClick }) => {
  const { isDark } = useTheme();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${
      isDark ? 'bg-gray-800/90' : 'bg-white/90'
    } border-b border-gray-200 dark:border-gray-700 backdrop-blur-md`}>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <SafeIcon icon={FiMenu} className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-3">
            <Logo size="sm" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 bg-clip-text text-transparent">
                EncouraMind
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Encouraging Minds, Enriching Lives
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-primary-500"></div>
          <div className="w-2 h-2 rounded-full bg-secondary-500"></div>
          <div className="w-2 h-2 rounded-full bg-accent-500"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;