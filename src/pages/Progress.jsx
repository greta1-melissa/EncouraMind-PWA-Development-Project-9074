import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiPlus, FiCalendar, FiActivity, FiTarget, FiAward } = FiIcons;

const Progress = () => {
  const { userData, addProgress } = useData();
  const { isDark } = useTheme();
  const [showAddProgress, setShowAddProgress] = useState(false);
  const [newEntry, setNewEntry] = useState({
    type: 'mood',
    value: 5,
    notes: ''
  });

  const moodOptions = [
    { value: 1, label: 'Very Low', color: '#ef4444' },
    { value: 2, label: 'Low', color: '#f97316' },
    { value: 3, label: 'Neutral', color: '#eab308' },
    { value: 4, label: 'Good', color: '#22c55e' },
    { value: 5, label: 'Excellent', color: '#10b981' }
  ];

  const progressTypes = [
    { value: 'mood', label: 'Mood Tracking' },
    { value: 'exercise', label: 'Exercise' },
    { value: 'meditation', label: 'Meditation' },
    { value: 'sleep', label: 'Sleep Quality' },
    { value: 'anxiety', label: 'Anxiety Level' },
    { value: 'stress', label: 'Stress Level' }
  ];

  const handleAddProgress = () => {
    addProgress(newEntry);
    setNewEntry({
      type: 'mood',
      value: 5,
      notes: ''
    });
    setShowAddProgress(false);
  };

  // Generate chart data
  const getChartData = () => {
    const last7Days = eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date()
    });

    const moodData = last7Days.map(day => {
      const dayEntries = userData.progress?.filter(
        entry => 
          entry.type === 'mood' && 
          format(new Date(entry.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
      ) || [];
      
      const average = dayEntries.length > 0
        ? dayEntries.reduce((sum, entry) => sum + entry.value, 0) / dayEntries.length
        : 0;
        
      return {
        date: format(day, 'MMM dd'),
        value: Math.round(average * 10) / 10
      };
    });

    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: isDark ? '#374151' : '#ffffff',
        textStyle: {
          color: isDark ? '#f3f4f6' : '#374151'
        }
      },
      xAxis: {
        type: 'category',
        data: moodData.map(d => d.date),
        axisLine: {
          lineStyle: {
            color: isDark ? '#4b5563' : '#d1d5db'
          }
        },
        axisLabel: {
          color: isDark ? '#9ca3af' : '#6b7280'
        }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 5,
        axisLine: {
          lineStyle: {
            color: isDark ? '#4b5563' : '#d1d5db'
          }
        },
        axisLabel: {
          color: isDark ? '#9ca3af' : '#6b7280'
        },
        splitLine: {
          lineStyle: {
            color: isDark ? '#374151' : '#f3f4f6'
          }
        }
      },
      series: [
        {
          data: moodData.map(d => d.value),
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#8b5cf6',
            width: 3
          },
          itemStyle: {
            color: '#8b5cf6'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(139, 92, 246, 0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(139, 92, 246, 0.1)'
                }
              ]
            }
          }
        }
      ]
    };
  };

  const weeklyStats = {
    totalEntries: userData.progress?.length || 0,
    averageMood: userData.progress?.filter(p => p.type === 'mood')
      .reduce((sum, p, _, arr) => sum + p.value / arr.length, 0) || 0,
    streakDays: userData.dailyStreak || 0,
    completedGoals: userData.goals?.filter(g => g.completed).length || 0
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Progress Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor your wellness journey and celebrate your growth
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddProgress(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Add Entry</span>
        </motion.button>
      </div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Entries',
            value: weeklyStats.totalEntries,
            icon: FiActivity,
            color: 'from-primary-500 to-secondary-500'
          },
          {
            label: 'Avg Mood',
            value: weeklyStats.averageMood.toFixed(1),
            icon: FiTrendingUp,
            color: 'from-secondary-500 to-accent-500'
          },
          {
            label: 'Streak Days',
            value: weeklyStats.streakDays,
            icon: FiCalendar,
            color: 'from-accent-500 to-primary-500'
          },
          {
            label: 'Goals Done',
            value: weeklyStats.completedGoals,
            icon: FiTarget,
            color: 'from-primary-500 to-accent-500'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
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

      {/* Mood Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`p-6 rounded-xl ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } shadow-lg`}
      >
        <h2 className="text-xl font-semibold mb-4">7-Day Mood Trend</h2>
        <div className="h-64">
          <ReactECharts option={getChartData()} style={{ height: '100%' }} />
        </div>
      </motion.div>

      {/* Recent Entries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`p-6 rounded-xl ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } shadow-lg`}
      >
        <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
        {userData.progress && userData.progress.length > 0 ? (
          <div className="space-y-3">
            {userData.progress.slice(-5).reverse().map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      entry.type === 'mood'
                        ? 'bg-purple-500'
                        : entry.type === 'exercise'
                        ? 'bg-green-500'
                        : entry.type === 'meditation'
                        ? 'bg-blue-500'
                        : 'bg-gray-500'
                    }`}
                  ></div>
                  <div>
                    <p className="font-medium capitalize">{entry.type}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {format(new Date(entry.date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">{entry.value}/5</div>
                  {entry.notes && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-32 truncate">
                      {entry.notes}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <SafeIcon icon={FiTrendingUp} className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No progress entries yet. Start tracking your wellness journey!
            </p>
            <button
              onClick={() => setShowAddProgress(true)}
              className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Add First Entry
            </button>
          </div>
        )}
      </motion.div>

      {/* Add Progress Modal */}
      {showAddProgress && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddProgress(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md p-6 rounded-xl ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-2xl`}
          >
            <h3 className="text-xl font-semibold mb-4">Add Progress Entry</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  value={newEntry.type}
                  onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"
                >
                  {progressTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Rating (1-5)
                </label>
                <div className="flex space-x-2">
                  {moodOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setNewEntry({ ...newEntry, value: option.value })}
                      className={`flex-1 p-2 rounded-lg text-sm font-medium transition-all ${
                        newEntry.value === option.value
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {option.value}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                  placeholder="How are you feeling? Any observations?"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddProgress(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProgress}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Add Entry
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Progress;