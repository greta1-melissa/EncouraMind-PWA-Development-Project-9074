import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBell, FiCheck, FiX } = FiIcons;

const NotificationManager = () => {
  const [permission, setPermission] = useState(Notification.permission);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if we should show the notification prompt
    const hasAsked = localStorage.getItem('notificationPromptShown');
    if (!hasAsked && permission === 'default') {
      setTimeout(() => setShowPrompt(true), 5000); // Show after 5 seconds
    }
  }, [permission]);

  const requestNotificationPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      setShowPrompt(false);
      localStorage.setItem('notificationPromptShown', 'true');
      
      if (result === 'granted') {
        // Register for push notifications
        if ('serviceWorker' in navigator && 'PushManager' in window) {
          const registration = await navigator.serviceWorker.ready;
          // In a real app, you would subscribe to push notifications here
          console.log('Push notifications enabled');
          
          // Send a welcome notification
          setTimeout(() => {
            new Notification('Welcome to EncouraMind!', {
              body: 'You\'ll receive daily encouragement and wellness reminders.',
              icon: 'https://drive.google.com/uc?id=1bcrMG3wHbPxbmWKpyA7vR5o4OBhqYD2f',
              tag: 'welcome'
            });
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      setShowPrompt(false);
    }
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    localStorage.setItem('notificationPromptShown', 'true');
  };

  // Schedule daily notifications
  useEffect(() => {
    if (permission === 'granted') {
      const scheduleDaily = () => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(9, 0, 0, 0); // 9 AM

        const timeUntilTomorrow = tomorrow.getTime() - now.getTime();

        setTimeout(() => {
          new Notification('Daily Encouragement', {
            body: 'Start your day with a positive message from EncouraMind!',
            icon: 'https://drive.google.com/uc?id=1bcrMG3wHbPxbmWKpyA7vR5o4OBhqYD2f',
            tag: 'daily-encouragement',
            requireInteraction: true
          });
          
          // Schedule for the next day
          scheduleDaily();
        }, timeUntilTomorrow);
      };

      scheduleDaily();
    }
  }, [permission]);

  if (!showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed top-20 right-4 z-50 max-w-sm"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
              <SafeIcon icon={FiBell} className="w-5 h-5 text-white" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Stay Motivated
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Get daily encouragement and wellness reminders delivered right to your device.
              </p>
              
              <div className="flex space-x-2 mt-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={requestNotificationPermission}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow"
                >
                  <SafeIcon icon={FiCheck} className="w-4 h-4" />
                  <span>Enable</span>
                </motion.button>
                
                <button
                  onClick={dismissPrompt}
                  className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Later
                </button>
              </div>
            </div>
            
            <button
              onClick={dismissPrompt}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiX} className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotificationManager;