import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTarget, FiPlus, FiCheck, FiEdit3, FiTrash2, FiCalendar, FiTrendingUp, FiStar } = FiIcons;

const Goals = () => {
  const { userData, addGoal, updateGoal } = useData();
  const { isDark } = useTheme();
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'wellness',
    targetDate: '',
    priority: 'medium'
  });

  const categories = [
    { value: 'wellness', label: 'Mental Wellness', color: 'from-primary-500 to-secondary-500' },
    { value: 'fitness', label: 'Physical Fitness', color: 'from-green-500 to-teal-500' },
    { value: 'habits', label: 'Healthy Habits', color: 'from-blue-500 to-cyan-500' },
    { value: 'mindfulness', label: 'Mindfulness', color: 'from-orange-500 to-red-500' },
    { value: 'social', label: 'Social Connection', color: 'from-primary-500 to-rose-500' },
    { value: 'personal', label: 'Personal Growth', color: 'from-yellow-500 to-amber-500' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-gray-500' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-500' },
    { value: 'high', label: 'High', color: 'text-red-500' }
  ];

  const handleAddGoal = () => {
    if (newGoal.title.trim()) {
      addGoal(newGoal);
      setNewGoal({
        title: '',
        description: '',
        category: 'wellness',
        targetDate: '',
        priority: 'medium'
      });
      setShowAddGoal(false);
    }
  };

  const handleUpdateGoal = (goalId, updates) => {
    updateGoal(goalId, updates);
    setEditingGoal(null);
  };

  const toggleComplete = (goal) => {
    handleUpdateGoal(goal.id, {
      completed: !goal.completed,
      completedDate: !goal.completed ? new Date().toISOString() : null
    });
  };

  const getCategoryColor = (category) => {
    return categories.find(c => c.value === category)?.color || 'from-gray-500 to-gray-600';
  };

  const getProgressPercentage = (goals) => {
    if (!goals.length) return 0;
    const completed = goals.filter(g => g.completed).length;
    return Math.round((completed / goals.length) * 100);
  };

  const goalsByCategory = categories.map(category => ({
    ...category,
    goals: userData.goals?.filter(g => g.category === category.value) || []
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Goals & Objectives</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Set meaningful goals and track your progress toward better wellness
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddGoal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Add Goal</span>
        </motion.button>
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`p-6 rounded-xl ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } shadow-lg`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Overall Progress</h2>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-green-500" />
            <span className="text-2xl font-bold text-green-500">
              {getProgressPercentage(userData.goals || [])}%
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${getProgressPercentage(userData.goals || [])}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{userData.goals?.length || 0}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Goals</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-500">
              {userData.goals?.filter(g => g.completed).length || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-500">
              {userData.goals?.filter(g => !g.completed).length || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
          </div>
        </div>
      </motion.div>

      {/* Goals by Category */}
      <div className="space-y-6">
        {goalsByCategory.map((category, categoryIndex) => (
          <motion.div
            key={category.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + categoryIndex * 0.1 }}
            className={`p-6 rounded-xl ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            } shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                  <SafeIcon icon={FiTarget} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{category.label}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {category.goals.length} goal{category.goals.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              {category.goals.length > 0 && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {getProgressPercentage(category.goals)}% complete
                </div>
              )}
            </div>

            {category.goals.length > 0 ? (
              <div className="space-y-3">
                <AnimatePresence>
                  {category.goals.map((goal, goalIndex) => (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: goalIndex * 0.1 }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        goal.completed
                          ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                          : 'border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleComplete(goal)}
                            className={`mt-1 p-1 rounded-full transition-all ${
                              goal.completed
                                ? 'bg-green-500 text-white'
                                : 'border-2 border-gray-300 dark:border-gray-600 hover:border-green-500'
                            }`}
                          >
                            <SafeIcon icon={FiCheck} className="w-4 h-4" />
                          </motion.button>
                          <div className="flex-1">
                            <h4 className={`font-medium ${goal.completed ? 'line-through text-gray-500' : ''}`}>
                              {goal.title}
                            </h4>
                            {goal.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {goal.description}
                              </p>
                            )}
                            <div className="flex items-center space-x-4 mt-2 text-xs">
                              <span className={`px-2 py-1 rounded-full ${priorities.find(p => p.value === goal.priority)?.color} bg-gray-100 dark:bg-gray-600`}>
                                {priorities.find(p => p.value === goal.priority)?.label} Priority
                              </span>
                              {goal.targetDate && (
                                <span className="flex items-center space-x-1 text-gray-500">
                                  <SafeIcon icon={FiCalendar} className="w-3 h-3" />
                                  <span>{new Date(goal.targetDate).toLocaleDateString()}</span>
                                </span>
                              )}
                              {goal.completed && goal.completedDate && (
                                <span className="flex items-center space-x-1 text-green-500">
                                  <SafeIcon icon={FiStar} className="w-3 h-3" />
                                  <span>Completed {new Date(goal.completedDate).toLocaleDateString()}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setEditingGoal(goal)}
                            className="p-2 text-gray-400 hover:text-secondary-500 transition-colors"
                          >
                            <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleUpdateGoal(goal.id, { deleted: true })}
                            className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
                          >
                            <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                <SafeIcon icon={FiTarget} className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No goals in this category yet</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Add Goal Modal */}
      <AnimatePresence>
        {showAddGoal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddGoal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}
            >
              <h3 className="text-xl font-semibold mb-4">Add New Goal</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Goal Title</label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    placeholder="e.g., Meditate 10 minutes daily"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-secondary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description (optional)</label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    placeholder="Describe your goal and why it matters to you"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-secondary-500"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={newGoal.category}
                      onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-secondary-500"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <select
                      value={newGoal.priority}
                      onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-secondary-500"
                    >
                      {priorities.map(priority => (
                        <option key={priority.value} value={priority.value}>
                          {priority.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Target Date (optional)</label>
                  <input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-secondary-500"
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddGoal}
                  disabled={!newGoal.title.trim()}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Goal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Goals;