import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import SafeIcon from '../../common/SafeIcon';
import Logo from '../../components/Logo';
import * as FiIcons from 'react-icons/fi';

const { FiLock, FiUser, FiEye, FiEyeOff } = FiIcons;

const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();
  const { isDark } = useTheme();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const result = await adminLogin(credentials.username, credentials.password);
      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: 'linear-gradient(to bottom right, rgba(236, 72, 153, 0.8), rgba(139, 92, 246, 0.8)), url(https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=1200&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`max-w-md w-full ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8`}
      >
        <div className="text-center mb-8">
          <Logo size="lg" className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold">EncouraMind Admin</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Sign in to access the admin dashboard
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SafeIcon icon={FiUser} className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter admin username"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-secondary-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SafeIcon icon={FiLock} className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-secondary-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <SafeIcon
                  icon={showPassword ? FiEyeOff : FiEye}
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
            className={`w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Need to return to the main app?{' '}
            <a
              href="/"
              className="font-medium text-secondary-600 dark:text-secondary-400 hover:text-secondary-500 transition-colors"
            >
              Go back
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;