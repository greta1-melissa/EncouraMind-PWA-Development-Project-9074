import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiEdit3, FiSave, FiSettings, FiAward, FiTrendingUp, FiCalendar, FiMail, FiPhone, FiMapPin } = FiIcons;

const Profile = () => {
  const { user } = useAuth();
  const { userData } = useData();
  const { isDark } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex@encouramind.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Mental wellness enthusiast focused on mindfulness and personal growth.',
    joinDate: '2024-01-01',
    goals: 'Improve daily meditation practice and maintain work-life balance.',
    interests: ['Meditation', 'Yoga', 'Reading', 'Nature walks']
  });

  const handleSave = () => {
    // Save profile data (in a real app, this would sync with backend)
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    setIsEditing(false);
  };

  const stats = [
    {
      label: 'Days Active',
      value: userData.dailyStreak || 0,
      icon: FiCalendar,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      label: 'Goals Completed',
      value: userData.goals?.filter(g => g.completed).length || 0,
      icon: FiAward,
      color: 'from-green-500 to-teal-500'
    },
    {
      label: 'Total Points',
      value: userData.totalPoints || 0,
      icon: FiTrendingUp,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Achievements',
      value: userData.achievements?.length || 0,
      icon: FiAward,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const achievements = [
    {
      title: 'First Steps',
      description: 'Completed your first wellness assessment',
      earned: true,
      date: '2024-01-15'
    },
    {
      title: 'Consistent Tracker',
      description: 'Logged progress for 7 consecutive days',
      earned: true,
      date: '2024-01-22'
    },
    {
      title: 'Goal Achiever',
      description: 'Completed your first wellness goal',
      earned: userData.goals?.some(g => g.completed) || false,
      date: userData.goals?.find(g => g.completed)?.completedDate || null
    },
    {
      title: 'Mindful Reader',
      description: 'Read 5 inspiring stories',
      earned: false,
      date: null
    },
    {
      title: 'Quiz Master',
      description: 'Completed 3 wellness quizzes',
      earned: (userData.quizResults?.length || 0) >= 3,
      date: userData.quizResults?.[2]?.completedAt || null
    },
    {
      title: 'Wellness Warrior',
      description: 'Maintained a 30-day streak',
      earned: (userData.dailyStreak || 0) >= 30,
      date: null
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-2xl ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
            : 'bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600'
        } text-white relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUser} className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">{profileData.name}</h1>
                <p className="text-blue-100 mb-2">{profileData.email}</p>
                <p className="text-sm text-blue-200">
                  Member since {new Date(profileData.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
            >
              <SafeIcon icon={isEditing ? FiSave : FiEdit3} className="w-4 h-4" />
              <span>{isEditing ? 'Save' : 'Edit'}</span>
            </motion.button>
          </div>
          
          {isEditing ? (
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/70 resize-none"
              rows={3}
              placeholder="Tell us about your wellness journey..."
            />
          ) : (
            <p className="text-blue-100 leading-relaxed">{profileData.bio}</p>
          )}
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full"></div>
        <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-white/3 rounded-full"></div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`p-4 rounded-xl ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            } shadow-lg`}
          >
            <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.color} mb-3`}>
              <SafeIcon icon={stat.icon} className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <SafeIcon icon={FiSettings} className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiMail} className="w-5 h-5 text-gray-400" />
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              ) : (
                <span>{profileData.email}</span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiPhone} className="w-5 h-5 text-gray-400" />
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              ) : (
                <span>{profileData.phone}</span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiMapPin} className="w-5 h-5 text-gray-400" />
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              ) : (
                <span>{profileData.location}</span>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-3">Wellness Goals</h3>
            {isEditing ? (
              <textarea
                value={profileData.goals}
                onChange={(e) => setProfileData({ ...profileData, goals: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 resize-none"
                rows={3}
                placeholder="What are your current wellness goals?"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {profileData.goals}
              </p>
            )}
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`p-6 rounded-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Achievements</h2>
            <SafeIcon icon={FiAward} className="w-5 h-5 text-yellow-500" />
          </div>
          
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`flex items-start space-x-3 p-3 rounded-lg transition-all ${
                  achievement.earned
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                    : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  achievement.earned
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
                }`}>
                  <SafeIcon icon={FiAward} className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-sm ${
                    achievement.earned ? 'text-yellow-700 dark:text-yellow-300' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {achievement.description}
                  </p>
                  {achievement.earned && achievement.date && (
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">
                      Earned {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Progress</span>
              <span className="font-semibold">
                {achievements.filter(a => a.earned).length} / {achievements.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(achievements.filter(a => a.earned).length / achievements.length) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`p-6 rounded-xl ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } shadow-lg`}
      >
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        
        {userData.progress && userData.progress.length > 0 ? (
          <div className="space-y-3">
            {userData.progress.slice(-5).reverse().map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    entry.type === 'mood' ? 'bg-purple-500' :
                    entry.type === 'exercise' ? 'bg-green-500' :
                    entry.type === 'meditation' ? 'bg-blue-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div>
                    <p className="font-medium capitalize">{entry.type} Tracking</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-sm font-semibold">
                  {entry.value}/5
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <SafeIcon icon={FiTrendingUp} className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">
              No recent activity. Start tracking your wellness journey!
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Profile;