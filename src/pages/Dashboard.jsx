import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiTrendingUp, FiTarget, FiBookOpen, FiClipboard, FiActivity, FiArrowRight, FiEdit3, FiHelpCircle, FiUser, FiCalendar, FiAward, FiStar, FiUsers, FiBarChart3, FiSettings, FiSun, FiHome, FiLeaf, FiHeadphones, FiWind, FiZap, FiCoffee, FiMoon } = FiIcons;

const Dashboard = () => {
  const { userData, dailyEncouragement } = useData();
  const { isDark } = useTheme();

  const quickStats = [
    { label: 'Total Progress', value: userData?.progress?.length || 0, icon: FiTrendingUp, color: 'from-primary-500 to-secondary-600' },
    { label: 'Goals Active', value: userData?.goals?.filter(g => !g.completed).length || 0, icon: FiTarget, color: 'from-secondary-500 to-accent-500' },
    { label: 'Stories Read', value: userData?.storiesRead || 0, icon: FiBookOpen, color: 'from-accent-500 to-primary-500' },
    { label: 'Daily Streak', value: userData?.dailyStreak || 0, icon: FiHeart, color: 'from-primary-500 to-accent-500' }
  ];

  // Enhanced quick actions with wellness resources highlighted
  const quickActions = [
    {
      title: 'Take Wellness Assessment',
      description: 'Comprehensive evaluation of your mental wellness across 5 key areas',
      icon: FiClipboard,
      link: '/wellness-assessment',
      color: 'from-primary-500 to-secondary-600',
      highlight: true,
      category: 'Assessment'
    },
    {
      title: 'Daily Encouragement',
      description: 'Get your daily dose of motivation and positive affirmations',
      icon: FiHeart,
      link: '/daily',
      color: 'from-secondary-500 to-accent-600',
      category: 'Inspiration'
    },
    {
      title: 'Personal Journal',
      description: 'Express your thoughts in your completely private journal space',
      icon: FiEdit3,
      link: '/journal',
      color: 'from-accent-500 to-secondary-600',
      category: 'Reflection'
    },
    {
      title: 'Track Progress',
      description: 'Monitor your wellness journey with detailed analytics and insights',
      icon: FiActivity,
      link: '/progress',
      color: 'from-primary-500 to-accent-600',
      category: 'Analytics'
    },
    {
      title: 'Set & Manage Goals',
      description: 'Create meaningful wellness objectives and track your achievements',
      icon: FiTarget,
      link: '/goals',
      color: 'from-secondary-500 to-primary-600',
      category: 'Planning'
    },
    {
      title: 'Inspiring Stories',
      description: 'Read real stories of hope, healing, and personal transformation',
      icon: FiBookOpen,
      link: '/stories',
      color: 'from-accent-500 to-primary-600',
      category: 'Community'
    },
    {
      title: 'Wellness Quizzes',
      description: 'Take evidence-based quizzes to gain insights into your mental health',
      icon: FiHelpCircle,
      link: '/quiz',
      color: 'from-primary-500 to-secondary-500',
      category: 'Assessment'
    },
    {
      title: 'My Profile',
      description: 'Manage your account, view achievements, and track statistics',
      icon: FiUser,
      link: '/profile',
      color: 'from-secondary-600 to-accent-600',
      category: 'Account'
    }
  ];

  // Wellness resources preview data
  const featuredResources = [
    {
      title: '5-Minute Morning Meditation',
      category: 'Meditation',
      duration: '5 min',
      icon: FiSun,
      color: 'from-primary-500 to-secondary-500'
    },
    {
      title: '4-7-8 Breathing for Instant Calm',
      category: 'Breathing',
      duration: '3 min',
      icon: FiWind,
      color: 'from-secondary-500 to-accent-500'
    },
    {
      title: 'STOP Technique for Stress',
      category: 'Stress Management',
      duration: '1 min',
      icon: FiZap,
      color: 'from-accent-500 to-primary-500'
    },
    {
      title: 'Calming Chamomile Moon Milk',
      category: 'Wellness Recipe',
      duration: '10 min',
      icon: FiCoffee,
      color: 'from-secondary-500 to-primary-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section - Enhanced with better spacing and no cropping */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-10 rounded-2xl ${
          isDark ? 'bg-gray-800' : 'bg-gradient-to-br from-primary-500 via-secondary-600 to-accent-700'
        } text-white relative overflow-hidden`}
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '280px' // Ensure minimum height for proper display
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/90 to-secondary-600/90"></div>
        <div className="relative z-10 flex flex-col justify-center min-h-[240px]">
          <h1 className="text-5xl font-bold mb-6">Welcome to EncouraMind</h1>
          <p className="text-2xl opacity-90 mb-8 max-w-4xl">Your comprehensive wellness companion for mental health and personal growth</p>
          <div className="flex flex-wrap items-center gap-8 text-lg opacity-80">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiCalendar} className="w-6 h-6" />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiSun} className="w-6 h-6" />
              <span>Have a mindful day!</span>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-white/5 rounded-full"></div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            } shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300`}
          >
            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${stat.color} mb-4`}>
              <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        ))}
      </div>

      {/* DEDICATED WELLNESS RESOURCES TILE - NEW SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">🌿 Wellness Resources Hub</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Your complete toolkit for mental wellness - meditations, breathing techniques, stress management, and wellness recipes
          </p>
        </div>

        {/* Large Wellness Resources Tile */}
        <Link to="/resources" className="block">
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className={`p-10 rounded-2xl ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            } shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group`}
            style={{
              backgroundImage: isDark
                ? `linear-gradient(to bottom right, rgba(31,41,55,0.95), rgba(17,24,39,0.95)), radial-gradient(circle at 20% 80%, rgba(20,184,166,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(14,165,233,0.15) 0%, transparent 50%)`
                : `linear-gradient(to bottom right, rgba(255,255,255,0.95), rgba(249,250,251,0.95)), radial-gradient(circle at 20% 80%, rgba(20,184,166,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(14,165,233,0.1) 0%, transparent 50%)`
            }}
          >
            {/* Featured Badge */}
            <div className="absolute top-6 right-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-300">
                <SafeIcon icon={FiStar} className="w-4 h-4 mr-1" />
                Featured Resources
              </span>
            </div>

            {/* Main Content */}
            <div className="flex items-start space-x-8">
              {/* Icon */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-secondary-500 to-accent-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <SafeIcon icon={FiLeaf} className="w-12 h-12 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-4 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors">
                  Wellness Resources Library
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xl mb-6 leading-relaxed">
                  Access our comprehensive collection of guided meditations, breathing techniques, stress management tools, wellness recipes, and relaxation resources. Everything you need for your mental health journey.
                </p>

                {/* Resource Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { name: 'Meditation', icon: FiUser, count: '3', color: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' },
                    { name: 'Breathing', icon: FiWind, count: '2', color: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300' },
                    { name: 'Stress Relief', icon: FiZap, count: '2', color: 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300' },
                    { name: 'Recipes', icon: FiCoffee, count: '3', color: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300' }
                  ].map((category, idx) => (
                    <div key={category.name} className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${category.color} transition-all hover:scale-105`}>
                      <SafeIcon icon={category.icon} className="w-5 h-5" />
                      <span className="font-medium">{category.name}</span>
                      <span className="text-xs opacity-75">({category.count})</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="flex items-center text-xl font-semibold text-secondary-600 dark:text-secondary-400 group-hover:text-secondary-700 dark:group-hover:text-secondary-300 transition-colors">
                  <span>Explore All Resources</span>
                  <SafeIcon icon={FiArrowRight} className="w-6 h-6 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-secondary-500/10 to-accent-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
          </motion.div>
        </Link>
      </motion.div>

      {/* Featured Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">Your Wellness Toolkit</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Everything you need for your mental health and personal growth journey
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <Link to={action.link} className="block">
                <div
                  className={`p-6 rounded-2xl ${
                    isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  } shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
                    action.highlight ? 'ring-2 ring-primary-500 ring-opacity-50' : ''
                  }`}
                  style={{
                    backgroundImage: isDark
                      ? `linear-gradient(to bottom right, rgba(31,41,55,0.95), rgba(17,24,39,0.95)), radial-gradient(circle at ${
                          index % 2 === 0 ? '90% 10%' : '10% 90%'
                        }, rgba(14,165,233,0.1) 0%, transparent 60%)`
                      : `linear-gradient(to bottom right, rgba(255,255,255,0.95), rgba(249,250,251,0.95)), radial-gradient(circle at ${
                          index % 2 === 0 ? '90% 10%' : '10% 90%'
                        }, rgba(14,165,233,0.05) 0%, transparent 60%)`
                  }}
                >
                  {/* Category badge */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                      {action.category}
                    </span>
                  </div>

                  {/* Highlight badge */}
                  {action.highlight && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                        <SafeIcon icon={FiStar} className="w-3 h-3 mr-1" />
                        Featured
                      </span>
                    </div>
                  )}

                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${action.color} mb-4 mt-6`}>
                    <SafeIcon icon={action.icon} className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-bold mb-2">{action.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    {action.description}
                  </p>

                  <div className="flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                    <span>Get Started</span>
                    <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Decorative element */}
                  <div className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-r ${action.color} opacity-5 rounded-full blur-xl`}></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Daily Encouragement Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={`p-8 rounded-xl ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } shadow-lg relative overflow-hidden`}
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(to bottom right, rgba(31,41,55,0.9), rgba(17,24,39,0.9)), url(https://images.unsplash.com/photo-1506252374453-ef5237291d83?q=80&w=800&auto=format&fit=crop)'
            : 'linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(249,250,251,0.9)), url(https://images.unsplash.com/photo-1506252374453-ef5237291d83?q=80&w=800&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500">
            <SafeIcon icon={FiHeart} className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold">Daily Encouragement</h2>
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {dailyEncouragement}
        </p>

        <div className="flex items-center justify-between">
          <Link
            to="/daily"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium transition-colors"
          >
            <span>Get more encouragement</span>
            <SafeIcon icon={FiHeart} className="w-4 h-4" />
          </Link>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <SafeIcon icon={FiCalendar} className="w-4 h-4" />
            <span>Updates daily</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Access Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Recent Activity */}
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <SafeIcon icon={FiActivity} className="w-5 h-5 text-gray-400" />
          </div>

          {userData.progress && userData.progress.length > 0 ? (
            <div className="space-y-3">
              {userData.progress.slice(-3).reverse().map((entry, index) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        entry.type === 'mood'
                          ? 'bg-primary-500'
                          : entry.type === 'exercise'
                          ? 'bg-secondary-500'
                          : entry.type === 'meditation'
                          ? 'bg-accent-500'
                          : 'bg-gray-500'
                      }`}
                    ></div>
                    <div>
                      <p className="font-medium capitalize">{entry.type} Tracking</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">{entry.value}/5</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <SafeIcon icon={FiActivity} className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400 mb-3">No activity yet</p>
              <Link
                to="/progress"
                className="inline-flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:underline"
              >
                <span>Start tracking</span>
                <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Achievements */}
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Latest Achievement</h3>
            <SafeIcon icon={FiAward} className="w-5 h-5 text-yellow-500" />
          </div>

          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
              <SafeIcon icon={FiStar} className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold mb-2">Welcome Aboard!</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              You've taken the first step in your wellness journey
            </p>
            <Link
              to="/profile"
              className="inline-flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:underline"
            >
              <span>View all achievements</span>
              <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className={`p-8 rounded-2xl text-center ${
          isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' : 'bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200'
        } shadow-lg`}
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(to bottom right, rgba(31,41,55,0.9), rgba(17,24,39,0.9)), url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop)'
            : 'linear-gradient(to bottom right, rgba(240,249,255,0.9), rgba(204,251,241,0.9)), url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <SafeIcon icon={FiUsers} className="w-12 h-12 text-primary-500 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold mb-3">Ready to Begin Your Wellness Journey?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto text-lg">
          Start with our comprehensive wellness assessment to understand your current state and get personalized recommendations for your mental health and wellbeing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/wellness-assessment"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all text-lg font-medium"
          >
            <SafeIcon icon={FiClipboard} className="w-5 h-5" />
            <span>Take Wellness Assessment</span>
          </Link>
          <Link
            to="/resources"
            className="inline-flex items-center space-x-2 px-8 py-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-lg font-medium"
          >
            <SafeIcon icon={FiLeaf} className="w-5 h-5" />
            <span>Explore Resources</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;