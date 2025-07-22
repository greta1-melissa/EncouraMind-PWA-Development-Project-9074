import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import Header from './Header';
import { useTheme } from '../contexts/ThemeContext';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark } = useTheme();
  const [bgPattern, setBgPattern] = useState('');

  // Generate a subtle background pattern using the updated color scheme
  useEffect(() => {
    const pattern = isDark
      ? `radial-gradient(circle at 90% 10%, rgba(236, 72, 153, 0.03) 0%, transparent 40%),
         radial-gradient(circle at 10% 90%, rgba(139, 92, 246, 0.03) 0%, transparent 40%),
         radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.02) 0%, transparent 60%)`
      : `radial-gradient(circle at 90% 10%, rgba(236, 72, 153, 0.05) 0%, transparent 40%),
         radial-gradient(circle at 10% 90%, rgba(139, 92, 246, 0.05) 0%, transparent 40%),
         radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.03) 0%, transparent 60%)`;
    
    setBgPattern(pattern);
  }, [isDark]);

  return (
    <div 
      className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}
      style={{ backgroundImage: bgPattern }}
    >
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <Navigation isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 lg:ml-64 transition-all duration-300">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-4 lg:p-6 pt-20"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;