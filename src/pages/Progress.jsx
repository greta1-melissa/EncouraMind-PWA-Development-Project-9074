import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiPlus, FiCalendar, FiActivity, FiTarget, FiAward, FiBrain, FiUsers, FiSun, FiHome, FiRefreshCw, FiBarChart3 } = FiIcons;

const Progress = () => {
  const { userData, addProgress } = useData();
  const { isDark } = useTheme();
  const [showAddProgress, setShowAddProgress] = useState(false);
  const [newEntry, setNewEntry] = useState({ type: 'mood', value: 5, notes: '' });
  const [assessmentData, setAssessmentData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('overall');
  const [timeRange, setTimeRange] = useState('30days');

  useEffect(() => {
    loadAssessmentData();
  }, []);

  const loadAssessmentData = () => {
    try {
      const saved = localStorage.getItem('wellnessAssessments');
      if (saved) {
        const assessments = JSON.parse(saved);
        // Sort by completion date
        const sortedAssessments = assessments.sort((a, b) => 
          new Date(a.completedAt) - new Date(b.completedAt)
        );
        setAssessmentData(sortedAssessments);
        
        // Auto-sync latest assessment to progress if not already synced
        if (sortedAssessments.length > 0) {
          syncLatestAssessmentToProgress(sortedAssessments[sortedAssessments.length - 1]);
        }
      }
    } catch (error) {
      console.error('Error loading assessment data:', error);
    }
  };

  const syncLatestAssessmentToProgress = (latestAssessment) => {
    const assessmentDate = new Date(latestAssessment.completedAt).toDateString();
    const existingProgress = userData.progress || [];
    
    // Check if this assessment is already synced
    const alreadySynced = existingProgress.some(entry => 
      entry.source === 'assessment' && 
      new Date(entry.date).toDateString() === assessmentDate
    );

    if (!alreadySynced && latestAssessment.scores) {
      // Add progress entries for each assessment section
      Object.entries(latestAssessment.scores).forEach(([sectionId, scoreData]) => {
        const progressEntry = {
          type: mapAssessmentToProgressType(sectionId),
          value: Math.round(scoreData.percentage / 20), // Convert 0-100 to 1-5 scale
          date: latestAssessment.completedAt,
          notes: `Auto-synced from wellness assessment - ${getScoreInterpretation(scoreData.percentage)}`,
          source: 'assessment',
          assessmentId: latestAssessment.id,
          rawScore: scoreData.percentage
        };
        addProgress(progressEntry);
      });
    }
  };

  const mapAssessmentToProgressType = (sectionId) => {
    const mapping = {
      'mental_health': 'mood',
      'physical_health': 'exercise',
      'social_wellbeing': 'social',
      'stress_management': 'stress',
      'lifestyle_habits': 'habits'
    };
    return mapping[sectionId] || 'mood';
  };

  const getScoreInterpretation = (percentage) => {
    if (percentage >= 80) return 'Excellent wellness level';
    if (percentage >= 60) return 'Good wellness level';
    if (percentage >= 40) return 'Fair wellness level';
    return 'Needs attention';
  };

  const moodOptions = [
    { value: 1, label: 'Very Low', color: '#ef4444' },
    { value: 2, label: 'Low', color: '#f97316' },
    { value: 3, label: 'Neutral', color: '#eab308' },
    { value: 4, label: 'Good', color: '#22c55e' },
    { value: 5, label: 'Excellent', color: '#10b981' }
  ];

  const progressTypes = [
    { value: 'mood', label: 'Mood Tracking', icon: FiBrain, color: '#8b5cf6' },
    { value: 'exercise', label: 'Physical Health', icon: FiActivity, color: '#10b981' },
    { value: 'social', label: 'Social Wellbeing', icon: FiUsers, color: '#3b82f6' },
    { value: 'stress', label: 'Stress Management', icon: FiSun, color: '#f59e0b' },
    { value: 'habits', label: 'Lifestyle Habits', icon: FiHome, color: '#ef4444' }
  ];

  const assessmentMetrics = [
    { value: 'overall', label: 'Overall Wellness', color: '#8b5cf6' },
    { value: 'mental_health', label: 'Mental Health', color: '#8b5cf6' },
    { value: 'physical_health', label: 'Physical Health', color: '#10b981' },
    { value: 'social_wellbeing', label: 'Social Wellbeing', color: '#3b82f6' },
    { value: 'stress_management', label: 'Stress Management', color: '#f59e0b' },
    { value: 'lifestyle_habits', label: 'Lifestyle Habits', color: '#ef4444' }
  ];

  const handleAddProgress = () => {
    addProgress(newEntry);
    setNewEntry({ type: 'mood', value: 5, notes: '' });
    setShowAddProgress(false);
  };

  const getAssessmentChartData = () => {
    if (!assessmentData.length) return { tooltip: {}, xAxis: { data: [] }, yAxis: {}, series: [] };

    const data = assessmentData.map(assessment => {
      const date = format(new Date(assessment.completedAt), 'MMM dd');
      
      if (selectedMetric === 'overall') {
        // Calculate overall average
        const scores = Object.values(assessment.scores || {});
        const average = scores.length > 0 
          ? scores.reduce((sum, score) => sum + score.percentage, 0) / scores.length 
          : 0;
        return { date, value: Math.round(average) };
      } else {
        // Get specific metric
        const score = assessment.scores?.[selectedMetric];
        return { date, value: score ? Math.round(score.percentage) : 0 };
      }
    });

    const selectedColor = assessmentMetrics.find(m => m.value === selectedMetric)?.color || '#8b5cf6';

    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: isDark ? '#374151' : '#ffffff',
        textStyle: { color: isDark ? '#f3f4f6' : '#374151' },
        formatter: function(params) {
          const point = params[0];
          return `${point.name}<br/>${point.seriesName}: ${point.value}%`;
        }
      },
      xAxis: {
        type: 'category',
        data: data.map(d => d.date),
        axisLine: { lineStyle: { color: isDark ? '#4b5563' : '#d1d5db' } },
        axisLabel: { color: isDark ? '#9ca3af' : '#6b7280' }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        axisLine: { lineStyle: { color: isDark ? '#4b5563' : '#d1d5db' } },
        axisLabel: { 
          color: isDark ? '#9ca3af' : '#6b7280',
          formatter: '{value}%'
        },
        splitLine: { lineStyle: { color: isDark ? '#374151' : '#f3f4f6' } }
      },
      series: [{
        name: assessmentMetrics.find(m => m.value === selectedMetric)?.label || 'Score',
        data: data.map(d => d.value),
        type: 'line',
        smooth: true,
        lineStyle: { color: selectedColor, width: 3 },
        itemStyle: { color: selectedColor },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: `${selectedColor}40` },
              { offset: 1, color: `${selectedColor}10` }
            ]
          }
        }
      }]
    };
  };

  // Enhanced weekly stats including assessment data
  const enhancedStats = {
    totalEntries: (userData.progress?.length || 0) + assessmentData.length,
    averageMood: userData.progress?.filter(p => p.type === 'mood')
      .reduce((sum, p, _, arr) => sum + p.value / arr.length, 0) || 0,
    streakDays: userData.dailyStreak || 0,
    completedAssessments: assessmentData.length,
    latestAssessmentScore: assessmentData.length > 0 
      ? Math.round(Object.values(assessmentData[assessmentData.length - 1].scores || {})
          .reduce((sum, score) => sum + score.percentage, 0) / 
          Math.max(Object.values(assessmentData[assessmentData.length - 1].scores || {}).length, 1))
      : 0
  };

  const getProgressTrend = () => {
    if (assessmentData.length < 2) return { trend: 0, direction: 'stable' };
    
    const latest = assessmentData[assessmentData.length - 1];
    const previous = assessmentData[assessmentData.length - 2];
    
    const latestAvg = Object.values(latest.scores || {})
      .reduce((sum, score) => sum + score.percentage, 0) / 
      Math.max(Object.values(latest.scores || {}).length, 1);
    
    const previousAvg = Object.values(previous.scores || {})
      .reduce((sum, score) => sum + score.percentage, 0) / 
      Math.max(Object.values(previous.scores || {}).length, 1);
    
    const trend = Math.round(latestAvg - previousAvg);
    const direction = trend > 0 ? 'improving' : trend < 0 ? 'declining' : 'stable';
    
    return { trend, direction };
  };

  const progressTrend = getProgressTrend();

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
            Monitor your wellness journey with assessment insights and daily tracking
          </p>
        </div>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadAssessmentData}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
            <span>Refresh</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddProgress(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5" />
            <span>Add Manual Entry</span>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            label: 'Total Entries',
            value: enhancedStats.totalEntries,
            icon: FiActivity,
            color: 'from-primary-500 to-secondary-500'
          },
          {
            label: 'Assessments',
            value: enhancedStats.completedAssessments,
            icon: FiBarChart3,
            color: 'from-secondary-500 to-accent-500'
          },
          {
            label: 'Latest Score',
            value: `${enhancedStats.latestAssessmentScore}%`,
            icon: FiTrendingUp,
            color: 'from-accent-500 to-primary-500'
          },
          {
            label: 'Streak Days',
            value: enhancedStats.streakDays,
            icon: FiCalendar,
            color: 'from-primary-500 to-accent-500'
          },
          {
            label: 'Trend',
            value: progressTrend.trend === 0 ? 'Stable' : `${progressTrend.trend > 0 ? '+' : ''}${progressTrend.trend}%`,
            icon: FiTarget,
            color: progressTrend.direction === 'improving' ? 'from-green-500 to-teal-500' : 
                   progressTrend.direction === 'declining' ? 'from-red-500 to-orange-500' : 
                   'from-gray-500 to-gray-600'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
          >
            <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.color} mb-3`}>
              <SafeIcon icon={stat.icon} className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Assessment Progress Chart */}
      {assessmentData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Assessment Progress Trend</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Metric:</span>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-indigo-500"
              >
                {assessmentMetrics.map(metric => (
                  <option key={metric.value} value={metric.value}>
                    {metric.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="h-64">
            <ReactECharts option={getAssessmentChartData()} style={{ height: '100%' }} />
          </div>
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Insight:</strong> {assessmentData.length} wellness assessments completed. 
              {progressTrend.direction === 'improving' && (
                <span className="text-green-600 dark:text-green-400"> Your wellness scores are trending upward! 📈</span>
              )}
              {progressTrend.direction === 'declining' && (
                <span className="text-orange-600 dark:text-orange-400"> Consider focusing on areas that need attention. 💪</span>
              )}
              {progressTrend.direction === 'stable' && (
                <span className="text-blue-600 dark:text-blue-400"> Your wellness levels are stable. Keep up the good work! ✨</span>
              )}
            </p>
          </div>
        </motion.div>
      )}

      {/* Assessment History */}
      {assessmentData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
        >
          <h2 className="text-xl font-semibold mb-4">Assessment History</h2>
          <div className="space-y-3">
            {assessmentData.slice(-5).reverse().map((assessment, index) => {
              const overallScore = Math.round(
                Object.values(assessment.scores || {})
                  .reduce((sum, score) => sum + score.percentage, 0) / 
                  Math.max(Object.values(assessment.scores || {}).length, 1)
              );
              
              const scoreColor = overallScore >= 80 ? 'bg-green-500' : 
                               overallScore >= 60 ? 'bg-blue-500' : 
                               overallScore >= 40 ? 'bg-yellow-500' : 'bg-red-500';

              return (
                <motion.div
                  key={assessment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${scoreColor}`}>
                      <span className="text-white font-bold">{overallScore}</span>
                    </div>
                    <div>
                      <p className="font-medium">
                        Wellness Assessment #{assessmentData.length - assessmentData.indexOf(assessment)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {format(new Date(assessment.completedAt), 'PPpp')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{overallScore}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {overallScore >= 80 ? 'Excellent' : 
                       overallScore >= 60 ? 'Good' : 
                       overallScore >= 40 ? 'Fair' : 'Needs Attention'}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Manual Entries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Manual Progress Entries</h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {userData.progress?.length || 0} entries
          </div>
        </div>
        
        {userData.progress && userData.progress.length > 0 ? (
          <div className="space-y-3">
            {userData.progress.slice(-5).reverse().map((entry, index) => {
              const progressType = progressTypes.find(t => t.type === entry.type) || progressTypes[0];
              
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: progressType.color }}
                    />
                    <div>
                      <p className="font-medium capitalize flex items-center space-x-2">
                        <span>{progressType.label}</span>
                        {entry.source === 'assessment' && (
                          <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded-full">
                            Assessment
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {format(new Date(entry.date), 'MMM dd, yyyy')}
                      </p>
                      {entry.notes && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md truncate">
                          {entry.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{entry.value}/5</div>
                    {entry.rawScore && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        ({entry.rawScore}%)
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <SafeIcon icon={FiTrendingUp} className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No manual progress entries yet. Add your first entry or take a wellness assessment!
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
            className={`w-full max-w-md p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}
          >
            <h3 className="text-xl font-semibold mb-4">Add Manual Progress Entry</h3>
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