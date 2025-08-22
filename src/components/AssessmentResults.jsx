import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBrain, FiActivity, FiUsers, FiSun, FiHome, FiTrendingUp, FiAlertCircle, FiCheckCircle, FiTarget, FiBookOpen, FiAward, FiHeart } = FiIcons;

const AssessmentResults = ({ assessmentData, onRetakeAssessment }) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  console.log('AssessmentResults received data:', assessmentData);

  // Ensure we have valid data
  if (!assessmentData || !assessmentData.scores) {
    console.error('Invalid assessment data:', assessmentData);
    return (
      <div className="text-center p-8">
        <SafeIcon icon={FiAlertCircle} className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Assessment Data</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Unable to load assessment results. Please try taking the assessment again.
        </p>
        <button
          onClick={onRetakeAssessment}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          Take New Assessment
        </button>
      </div>
    );
  }

  const sectionConfig = {
    mental_health: {
      title: 'Mental Health',
      icon: FiBrain,
      color: '#8b5cf6',
      description: 'Your emotional wellbeing and mental state',
      interpretation: {
        excellent: 'You show strong mental health with good emotional regulation and positive outlook.',
        good: 'Your mental health is generally stable with some areas for improvement.',
        fair: 'You may be experiencing some mental health challenges that could benefit from attention.',
        poor: 'Consider seeking professional mental health support and implementing self-care strategies.'
      }
    },
    physical_health: {
      title: 'Physical Health',
      icon: FiActivity,
      color: '#10b981',
      description: 'Your physical fitness and health habits',
      interpretation: {
        excellent: 'You maintain excellent physical health habits including regular exercise and good sleep.',
        good: 'Your physical health is good with room for minor improvements in routine.',
        fair: 'Your physical health could benefit from more consistent exercise and better sleep habits.',
        poor: 'Consider establishing regular exercise routines and consulting healthcare providers.'
      }
    },
    social_wellbeing: {
      title: 'Social Wellbeing',
      icon: FiUsers,
      color: '#3b82f6',
      description: 'Your relationships and social connections',
      interpretation: {
        excellent: 'You have strong, supportive relationships and healthy social connections.',
        good: 'Your social connections are generally positive with good support systems.',
        fair: 'You might benefit from strengthening existing relationships or building new connections.',
        poor: 'Consider actively working on building meaningful social connections and relationships.'
      }
    },
    stress_management: {
      title: 'Stress Management',
      icon: FiSun,
      color: '#f59e0b',
      description: 'How well you handle stress and pressure',
      interpretation: {
        excellent: 'You have excellent stress management skills and healthy coping mechanisms.',
        good: 'You generally manage stress well with effective coping strategies.',
        fair: 'You could benefit from developing better stress management techniques.',
        poor: 'Consider learning stress reduction techniques and seeking support for stress management.'
      }
    },
    lifestyle_habits: {
      title: 'Lifestyle & Habits',
      icon: FiHome,
      color: '#ef4444',
      description: 'Your daily routines and lifestyle choices',
      interpretation: {
        excellent: 'You maintain excellent daily habits that support your overall wellbeing.',
        good: 'Your lifestyle habits are generally healthy with some positive routines.',
        fair: 'Your daily habits could use some improvement to better support your wellness.',
        poor: 'Consider making significant changes to your daily routines and habits.'
      }
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Attention';
  };

  const getInterpretationLevel = (score) => {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 40) return 'fair';
    return 'poor';
  };

  const getRecommendations = (sectionId, score) => {
    const recommendations = {
      mental_health: {
        excellent: [
          'Continue practicing mindfulness and self-care',
          'Maintain your positive mental health habits',
          'Consider sharing your strategies with others',
          'Keep monitoring your mental health regularly'
        ],
        good: [
          'Try incorporating daily meditation (5-10 minutes)',
          'Practice gratitude journaling',
          'Consider talking to a counselor for additional support',
          'Maintain regular sleep schedule'
        ],
        fair: [
          'Seek professional mental health support',
          'Establish a daily self-care routine',
          'Connect with trusted friends or family members',
          'Consider mindfulness apps or guided meditation'
        ],
        poor: [
          'Prioritize seeking professional mental health support',
          'Create a comprehensive self-care plan',
          'Build a strong support network',
          'Consider therapy or counseling services'
        ]
      },
      physical_health: {
        excellent: [
          'Maintain your excellent fitness routine',
          'Continue prioritizing sleep and nutrition',
          'Consider setting new fitness challenges',
          'Share your healthy habits with others'
        ],
        good: [
          'Aim for 150 minutes of moderate exercise per week',
          'Establish a consistent sleep schedule',
          'Focus on balanced, nutritious meals',
          'Stay hydrated throughout the day'
        ],
        fair: [
          'Start with 10-15 minutes of daily walking',
          'Prioritize 7-9 hours of sleep nightly',
          'Consult with healthcare providers about nutrition',
          'Consider working with a fitness professional'
        ],
        poor: [
          'Begin with gentle, low-impact exercises',
          'Focus on establishing basic healthy routines',
          'Consult healthcare providers for comprehensive health assessment',
          'Consider gradual lifestyle changes'
        ]
      },
      social_wellbeing: {
        excellent: [
          'Continue nurturing your relationships',
          'Consider mentoring others in building connections',
          'Maintain your social support network',
          'Practice active listening in conversations'
        ],
        good: [
          'Schedule regular check-ins with friends and family',
          'Join clubs or groups aligned with your interests',
          'Practice active listening in conversations',
          'Be open to meeting new people'
        ],
        fair: [
          'Start with small social interactions daily',
          'Consider joining support groups or community activities',
          'Practice reaching out to one person per week',
          'Work on communication skills'
        ],
        poor: [
          'Take small steps toward social connection',
          'Consider professional help for social anxiety if needed',
          'Start with online communities or support groups',
          'Focus on building one meaningful relationship'
        ]
      },
      stress_management: {
        excellent: [
          'Share your stress management techniques with others',
          'Continue your effective coping strategies',
          'Consider learning advanced relaxation techniques',
          'Maintain work-life balance'
        ],
        good: [
          'Practice deep breathing exercises daily',
          'Set boundaries between work and personal time',
          'Try progressive muscle relaxation',
          'Maintain regular exercise routine'
        ],
        fair: [
          'Learn and practice basic stress reduction techniques',
          'Consider professional stress management counseling',
          'Identify and address major stressors in your life',
          'Establish daily relaxation routines'
        ],
        poor: [
          'Seek professional help for stress management',
          'Learn basic breathing and relaxation techniques',
          'Consider major lifestyle changes to reduce stress',
          'Build a strong support system'
        ]
      },
      lifestyle_habits: {
        excellent: [
          'Maintain your healthy daily routines',
          'Continue balancing screen time effectively',
          'Share your healthy habits with others',
          'Keep adapting habits as needed'
        ],
        good: [
          'Create more structured daily routines',
          'Increase time spent in nature',
          'Set specific limits on screen time',
          'Focus on consistent sleep schedule'
        ],
        fair: [
          'Start with small, achievable daily routines',
          'Schedule regular outdoor time',
          'Use apps to monitor and limit screen time',
          'Focus on one habit change at a time'
        ],
        poor: [
          'Begin with very basic daily structure',
          'Seek support in building healthy routines',
          'Make gradual, sustainable changes',
          'Consider professional guidance for habit formation'
        ]
      }
    };

    const level = getInterpretationLevel(score);
    return recommendations[sectionId]?.[level] || [];
  };

  // Prepare chart data
  const chartData = Object.entries(assessmentData.scores).map(([key, data]) => ({
    name: sectionConfig[key]?.title || key,
    score: data.percentage,
    color: sectionConfig[key]?.color || '#8b5cf6'
  }));

  const radarData = chartData.map(item => ({
    subject: item.name.replace(' & ', '\n& '),
    A: item.score,
    fullMark: 100
  }));

  const overallScore = chartData.length > 0 
    ? Math.round(chartData.reduce((sum, item) => sum + item.score, 0) / chartData.length) 
    : 0;

  const getOverallInterpretation = (score) => {
    if (score >= 80) {
      return {
        level: 'Excellent',
        color: 'text-green-600',
        bgColor: 'bg-green-100 dark:bg-green-900/20',
        message: 'Your overall wellness is excellent! You demonstrate strong habits and positive patterns across multiple areas of your life. Continue maintaining these healthy practices.',
        icon: FiCheckCircle
      };
    } else if (score >= 60) {
      return {
        level: 'Good',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100 dark:bg-blue-900/20',
        message: 'Your wellness is in good shape overall. There are some areas where small improvements could make a significant positive impact.',
        icon: FiHeart
      };
    } else if (score >= 40) {
      return {
        level: 'Fair',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
        message: 'Your wellness shows a mixed picture. Focus on the areas that need attention while building on your existing strengths.',
        icon: FiTarget
      };
    } else {
      return {
        level: 'Needs Attention',
        color: 'text-red-600',
        bgColor: 'bg-red-100 dark:bg-red-900/20',
        message: 'Several areas of your wellness could benefit from focused attention. Consider seeking support and making gradual, sustainable changes.',
        icon: FiAlertCircle
      };
    }
  };

  const overallInterpretation = getOverallInterpretation(overallScore);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiTrendingUp },
    { id: 'detailed', label: 'Detailed Analysis', icon: FiTarget },
    { id: 'recommendations', label: 'Action Plan', icon: FiBookOpen },
    { id: 'interpretation', label: 'Interpretation', icon: FiBrain }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header with Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-2xl text-center ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
      >
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
          overallScore >= 80 ? 'bg-green-500' : 
          overallScore >= 60 ? 'bg-blue-500' : 
          overallScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
        }`}>
          <span className="text-3xl font-bold text-white">{overallScore}</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Your Wellness Assessment Results</h1>
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${overallInterpretation.bgColor} mb-4`}>
          <SafeIcon icon={overallInterpretation.icon} className={`w-5 h-5 ${overallInterpretation.color}`} />
          <span className={`font-semibold ${overallInterpretation.color}`}>
            Overall Wellness: {overallInterpretation.level}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {overallInterpretation.message}
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Completed on {new Date(assessmentData.completedAt).toLocaleDateString()}
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <SafeIcon icon={tab.icon} className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid lg:grid-cols-2 gap-6"
          >
            {/* Radar Chart */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <h3 className="text-lg font-semibold mb-4">Wellness Overview</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar
                      name="Score"
                      dataKey="A"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <h3 className="text-lg font-semibold mb-4">Score Breakdown</h3>
              <div className="space-y-4">
                {Object.entries(assessmentData.scores).map(([key, data]) => {
                  const config = sectionConfig[key];
                  if (!config) return null;

                  return (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: config.color + '20' }}>
                          <SafeIcon icon={config.icon} className="w-5 h-5" style={{ color: config.color }} />
                        </div>
                        <div>
                          <p className="font-medium">{config.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {getScoreLabel(data.percentage)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{ color: getScoreColor(data.percentage) }}>
                          {data.percentage}
                        </div>
                        <div className="text-xs text-gray-500">
                          {data.responses}/{data.total} answered
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'interpretation' && (
          <motion.div
            key="interpretation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Overall Interpretation */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <div className="flex items-center space-x-3 mb-4">
                <SafeIcon icon={FiAward} className="w-6 h-6 text-indigo-500" />
                <h3 className="text-xl font-semibold">Overall Assessment Interpretation</h3>
              </div>
              <div className={`p-4 rounded-lg ${overallInterpretation.bgColor} mb-4`}>
                <div className="flex items-center space-x-3 mb-3">
                  <SafeIcon icon={overallInterpretation.icon} className={`w-6 h-6 ${overallInterpretation.color}`} />
                  <h4 className={`text-lg font-semibold ${overallInterpretation.color}`}>
                    {overallInterpretation.level} Overall Wellness
                  </h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{overallInterpretation.message}</p>
              </div>
            </div>

            {/* Individual Section Interpretations */}
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(assessmentData.scores).map(([key, data]) => {
                const config = sectionConfig[key];
                if (!config) return null;

                const level = getInterpretationLevel(data.percentage);
                const interpretation = config.interpretation[level];

                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: config.color + '20' }}>
                        <SafeIcon icon={config.icon} className="w-6 h-6" style={{ color: config.color }} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{config.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold" style={{ color: getScoreColor(data.percentage) }}>
                            {data.percentage}%
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            data.percentage >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                            data.percentage >= 60 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                            data.percentage >= 40 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          }`}>
                            {getScoreLabel(data.percentage)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {interpretation}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'detailed' && (
          <motion.div
            key="detailed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Bar Chart */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <h3 className="text-lg font-semibold mb-4">Detailed Score Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={100} 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Score']}
                      labelStyle={{ color: isDark ? '#fff' : '#000' }}
                      contentStyle={{
                        backgroundColor: isDark ? '#374151' : '#fff',
                        border: `1px solid ${isDark ? '#4b5563' : '#e5e7eb'}`
                      }}
                    />
                    <Bar dataKey="score" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Detailed Section Analysis */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(assessmentData.scores).map(([key, data]) => {
                const config = sectionConfig[key];
                if (!config) return null;

                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: config.color + '20' }}>
                        <SafeIcon icon={config.icon} className="w-6 h-6" style={{ color: config.color }} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{config.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {config.description}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Score</span>
                        <span className="text-2xl font-bold" style={{ color: getScoreColor(data.percentage) }}>
                          {data.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${data.percentage}%`, 
                            backgroundColor: config.color 
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{getScoreLabel(data.percentage)}</span>
                        <span>{data.responses}/{data.total} questions</span>
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg ${
                      data.percentage >= 70 ? 'bg-green-50 dark:bg-green-900/20' :
                      data.percentage >= 40 ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                      'bg-red-50 dark:bg-red-900/20'
                    }`}>
                      <div className="flex items-center space-x-2">
                        <SafeIcon 
                          icon={data.percentage >= 70 ? FiCheckCircle : FiAlertCircle} 
                          className={`w-4 h-4 ${
                            data.percentage >= 70 ? 'text-green-600' :
                            data.percentage >= 40 ? 'text-yellow-600' : 'text-red-600'
                          }`}
                        />
                        <span className={`text-sm font-medium ${
                          data.percentage >= 70 ? 'text-green-800 dark:text-green-300' :
                          data.percentage >= 40 ? 'text-yellow-800 dark:text-yellow-300' :
                          'text-red-800 dark:text-red-300'
                        }`}>
                          {data.percentage >= 70 ? 'Strong Area' :
                           data.percentage >= 40 ? 'Room for Growth' : 'Needs Attention'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'recommendations' && (
          <motion.div
            key="recommendations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <h3 className="text-lg font-semibold mb-4">Personalized Action Plan</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Based on your assessment results, here are specific recommendations to improve your wellness:
              </p>

              <div className="space-y-6">
                {Object.entries(assessmentData.scores).map(([key, data]) => {
                  const config = sectionConfig[key];
                  const recommendations = getRecommendations(key, data.percentage);
                  if (!config || recommendations.length === 0) return null;

                  return (
                    <div key={key} className="border-l-4 pl-6" style={{ borderColor: config.color }}>
                      <div className="flex items-center space-x-3 mb-3">
                        <SafeIcon icon={config.icon} className="w-5 h-5" style={{ color: config.color }} />
                        <h4 className="font-semibold">{config.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          data.percentage >= 70 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          data.percentage >= 40 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {data.percentage}%
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Items */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-gray-700' : 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200'} shadow-lg`}>
              <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-indigo-600 dark:text-indigo-400">Immediate Actions (This Week)</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-green-500" />
                      <span>Choose one recommendation to focus on</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-green-500" />
                      <span>Set up daily wellness tracking</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-green-500" />
                      <span>Schedule time for self-care activities</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-purple-600 dark:text-purple-400">Long-term Goals (Next Month)</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiTarget} className="w-4 h-4 text-purple-500" />
                      <span>Establish consistent wellness routines</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiTarget} className="w-4 h-4 text-purple-500" />
                      <span>Retake assessment to track progress</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiTarget} className="w-4 h-4 text-purple-500" />
                      <span>Consider professional support if needed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetakeAssessment}
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Retake Assessment
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Save results to localStorage with timestamp
            const savedResults = JSON.parse(localStorage.getItem('wellnessAssessments') || '[]');
            const existingIndex = savedResults.findIndex(r => r.id === assessmentData.id);
            if (existingIndex === -1) {
              savedResults.unshift({
                ...assessmentData,
                savedAt: new Date().toISOString()
              });
              localStorage.setItem('wellnessAssessments', JSON.stringify(savedResults));
            }
            alert('Assessment results saved successfully!');
          }}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          Save Results
        </motion.button>
      </div>
    </div>
  );
};

export default AssessmentResults;