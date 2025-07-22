import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSettings, FiUser, FiLock, FiEye, FiEyeOff, FiSave, FiAlertTriangle, FiCheck } = FiIcons;

const AdminSettings = () => {
  const { updateAdminCredentials } = useAuth();
  const { isDark } = useTheme();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [credentials, setCredentials] = useState({
    currentPassword: '',
    newUsername: 'encouramind',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    // Clear status when user starts typing again
    if (status.message) {
      setStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!credentials.currentPassword) {
      return setStatus({ type: 'error', message: 'Current password is required' });
    }
    
    if (credentials.newPassword && credentials.newPassword !== credentials.confirmPassword) {
      return setStatus({ type: 'error', message: 'New passwords do not match' });
    }

    setIsLoading(true);
    setStatus({ type: '', message: '' });
    
    try {
      const result = await updateAdminCredentials(
        credentials.currentPassword,
        credentials.newUsername,
        credentials.newPassword || credentials.currentPassword // If no new password, keep current one
      );
      
      if (result.success) {
        setStatus({ type: 'success', message: 'Admin credentials updated successfully' });
        setCredentials(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to update credentials' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred. Please try again.' });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold">Admin Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your admin account and system settings
        </p>
      </div>

      {/* Admin Credentials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`p-6 rounded-xl ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } shadow-lg`}
      >
        <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
          <SafeIcon icon={FiUser} className="w-5 h-5 text-indigo-500" />
          <span>Admin Credentials</span>
        </h2>

        {status.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 mb-6 rounded-lg ${
              status.type === 'error'
                ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <SafeIcon icon={status.type === 'error' ? FiAlertTriangle : FiCheck} className="w-5 h-5" />
              <span>{status.message}</span>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Current Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SafeIcon icon={FiLock} className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={credentials.currentPassword}
                onChange={handleChange}
                placeholder="Enter your current password"
                className="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <SafeIcon
                  icon={showCurrentPassword ? FiEyeOff : FiEye}
                  className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SafeIcon icon={FiUser} className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="newUsername"
                value={credentials.newUsername}
                onChange={handleChange}
                placeholder="Enter new username"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">New Password (Optional)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SafeIcon icon={FiLock} className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={credentials.newPassword}
                onChange={handleChange}
                placeholder="Enter new password (leave blank to keep current)"
                className="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <SafeIcon
                  icon={showNewPassword ? FiEyeOff : FiEye}
                  className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SafeIcon icon={FiLock} className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"
                disabled={!credentials.newPassword}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <SafeIcon
                  icon={showConfirmPassword ? FiEyeOff : FiEye}
                  className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                />
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            type="submit"
            className="flex items-center justify-center space-x-2 w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70"
          >
            <SafeIcon icon={FiSave} className="w-5 h-5" />
            <span>{isLoading ? 'Updating...' : 'Save Changes'}</span>
          </motion.button>
        </form>
      </motion.div>

      {/* System Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`p-6 rounded-xl ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } shadow-lg`}
      >
        <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
          <SafeIcon icon={FiSettings} className="w-5 h-5 text-indigo-500" />
          <span>System Settings</span>
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h3 className="font-medium">Enable User Registration</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Allow new users to register accounts
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked={true} />
              <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Send email notifications for system events
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked={true} />
              <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h3 className="font-medium">Content Moderation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Require approval for user-submitted content
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked={false} />
              <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-indigo-500"></div>
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <SafeIcon icon={FiSave} className="w-5 h-5" />
            <span>Save Settings</span>
          </motion.button>
        </div>
      </motion.div>

      {/* System Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`p-6 rounded-xl ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } shadow-lg`}
      >
        <h2 className="text-lg font-semibold mb-6">System Information</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Version</span>
            <span className="font-medium">EncouraMind v1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Last Backup</span>
            <span className="font-medium">June 15, 2023 (10:30 AM)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Environment</span>
            <span className="font-medium">Production</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Server Status</span>
            <span className="text-green-500 font-medium flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Operational
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminSettings;