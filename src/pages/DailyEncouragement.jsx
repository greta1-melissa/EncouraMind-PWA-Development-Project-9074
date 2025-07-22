import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiShare2, FiBookmark, FiClock } = FiIcons;

const DailyEncouragement = () => {
  const { dailyEncouragement } = useData();
  const { isDark } = useTheme();
  const [isSaved, setIsSaved] = useState(false);
  const [isShared, setIsShared] = useState(false);

  // Additional encouragements
  const encouragements = [
    {
      quote: "Small steps every day lead to big changes over time.",
      author: "Unknown",
      category: "Growth"
    },
    {
      quote: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
      author: "Unknown",
      category: "Self-care"
    },
    {
      quote: "Be gentle with yourself, you're doing the best you can.",
      author: "Unknown",
      category: "Compassion"
    }
  ];

  const handleSave = () => {
    setIsSaved(!isSaved);
    // In a real app, would save to user's favorites
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Daily Encouragement',
          text: dailyEncouragement,
          url: window.location.href,
        });
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(dailyEncouragement);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Encouragement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'} shadow-lg text-center relative overflow-hidden`}
        style={{
          backgroundImage: isDark
            ? `linear-gradient(to bottom right, rgba(31, 41, 55, 0.97), rgba(17, 24, 39, 0.97)), 
               radial-gradient(circle at 90% 10%, rgba(236, 72, 153, 0.15) 0%, transparent 70%), 
               radial-gradient(circle at 10% 90%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)`
            : `linear-gradient(to bottom right, rgba(255, 255, 255, 0.97), rgba(249, 250, 251, 0.97)), 
               radial-gradient(circle at 90% 10%, rgba(236, 72, 153, 0.1) 0%, transparent 70%), 
               radial-gradient(circle at 10% 90%, rgba(139, 92, 246, 0.05) 0%, transparent 70%)`
        }}
      >
        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-4`}>
          <SafeIcon icon={FiHeart} className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold mb-6">Today's Encouragement</h1>
        
        <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          "{dailyEncouragement}"
        </p>
        
        <div className="flex items-center justify-center space-x-4 mb-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className={`p-3 rounded-full ${
              isSaved
                ? 'bg-pink-100 dark:bg-pink-900/30 text-primary-600 dark:text-primary-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            } transition-colors`}
          >
            <SafeIcon icon={FiBookmark} className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className={`p-3 rounded-full ${
              isShared
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-accent-600 dark:text-accent-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            } transition-colors`}
          >
            <SafeIcon icon={FiShare2} className="w-5 h-5" />
          </motion.button>
        </div>
        
        {isShared && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-accent-600 dark:text-accent-400"
          >
            {navigator.share ? 'Shared successfully!' : 'Copied to clipboard!'}
          </motion.p>
        )}
        
        <div className="flex items-center justify-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
          <span>Refreshes daily</span>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/5 dark:bg-primary-500/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent-500/5 dark:bg-accent-500/10 rounded-full -translate-x-1/2 translate-y-1/2"></div>
      </motion.div>

      {/* More Encouragements */}
      <div className="grid md:grid-cols-3 gap-6">
        {encouragements.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className={`p-6 rounded-xl ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            } shadow-lg relative overflow-hidden`}
            style={{
              backgroundImage: isDark
                ? `linear-gradient(to bottom right, rgba(31, 41, 55, 0.85), rgba(17, 24, 39, 0.85)),
                   radial-gradient(circle at ${index % 2 === 0 ? '90% 10%' : '10% 90%'}, rgba(236, 72, 153, 0.15) 0%, transparent 70%)`
                : `linear-gradient(to bottom right, rgba(255, 255, 255, 0.85), rgba(249, 250, 251, 0.85)),
                   radial-gradient(circle at ${index % 2 === 0 ? '90% 10%' : '10% 90%'}, rgba(236, 72, 153, 0.1) 0%, transparent 70%)`
            }}
          >
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary-500/10 to-accent-500/10 dark:from-primary-500/20 dark:to-accent-500/20 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium mb-4">
              {item.category}
            </span>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              "{item.quote}"
            </p>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              — {item.author}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-xl text-center"
      >
        <button className="bg-gradient-to-r from-primary-500 to-accent-600 text-white rounded-lg hover:shadow-lg transition-all px-6 py-3">
          Get Personalized Encouragement
        </button>
      </motion.div>
    </div>
  );
};

export default DailyEncouragement;