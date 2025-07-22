import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import Logo from './Logo';
import * as FiIcons from 'react-icons/fi';

const {FiDownload, FiX, FiSmartphone} = FiIcons;

const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Check if user has dismissed the prompt before
      const dismissed = localStorage.getItem('installPromptDismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    const handleAppInstalled = () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
      localStorage.setItem('appInstalled', 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const {outcome} = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA installation accepted');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('installPromptDismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{opacity: 0, y: 100}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: 100}}
        className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-start space-x-3">
            <Logo size="sm" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Install EncouraMind
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Get the full app experience with offline access and push notifications.
              </p>
              <div className="flex space-x-2 mt-3">
                <motion.button
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                  onClick={handleInstall}
                  className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow"
                >
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  <span>Install</span>
                </motion.button>
                <button
                  onClick={handleDismiss}
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Not now
                </button>
              </div>
            </div>
            <button
              onClick={handleDismiss}
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

export default InstallPrompt;