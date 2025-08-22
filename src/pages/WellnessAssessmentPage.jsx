import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import WellnessAssessment from '../components/WellnessAssessment';
import AssessmentResults from '../components/AssessmentResults';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiTrendingUp, FiCalendar, FiPlay, FiFileText, FiUsers, FiArrowRight, FiDownload, FiEye } = FiIcons;

const WellnessAssessmentPage = () => {
  const { userData, syncAssessmentToProgress } = useData();
  const { isDark } = useTheme();
  const [currentView, setCurrentView] = useState('intro'); // intro, assessment, results
  const [assessmentResults, setAssessmentResults] = useState(null);
  const [previousAssessments, setPreviousAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPreviousAssessments();
  }, []);

  const loadPreviousAssessments = async () => {
    try {
      const saved = localStorage.getItem('wellnessAssessments');
      if (saved) {
        const assessments = JSON.parse(saved);
        // Sort by completion date, newest first
        const sortedAssessments = assessments.sort((a, b) => 
          new Date(b.completedAt) - new Date(a.completedAt)
        );
        setPreviousAssessments(sortedAssessments);
      }
    } catch (error) {
      console.error('Error loading assessments:', error);
    }
  };

  const saveAssessmentResults = async (results) => {
    try {
      setIsLoading(true);
      console.log('Saving assessment results:', results);

      // Save to localStorage
      const saved = localStorage.getItem('wellnessAssessments');
      const assessments = saved ? JSON.parse(saved) : [];

      // Add timestamp and ensure unique ID
      const enhancedResults = {
        ...results,
        savedAt: new Date().toISOString(),
        id: results.id || `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };

      assessments.unshift(enhancedResults);
      localStorage.setItem('wellnessAssessments', JSON.stringify(assessments));

      // Sync assessment data to progress tracker
      syncAssessmentToProgress(enhancedResults);

      setAssessmentResults(enhancedResults);
      setPreviousAssessments([enhancedResults, ...previousAssessments]);
      setCurrentView('results');
    } catch (error) {
      console.error('Error saving assessment:', error);
      // Still show results even if saving failed
      setAssessmentResults(results);
      setCurrentView('results');
    } finally {
      setIsLoading(false);
    }
  };

  const startNewAssessment = () => {
    setCurrentView('assessment');
    setAssessmentResults(null);
  };

  const viewResults = (results) => {
    console.log('Viewing assessment results:', results);
    setAssessmentResults(results);
    setCurrentView('results');
  };

  const backToIntro = () => {
    setCurrentView('intro');
    setAssessmentResults(null);
  };

  const exportResults = (assessment) => {
    const dataStr = JSON.stringify(assessment, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `wellness_assessment_${new Date(assessment.completedAt).toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const deleteAssessment = (assessmentId) => {
    if (confirm('Are you sure you want to delete this assessment?')) {
      const updated = previousAssessments.filter(a => a.id !== assessmentId);
      setPreviousAssessments(updated);
      localStorage.setItem('wellnessAssessments', JSON.stringify(updated));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (currentView === 'assessment') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Wellness Assessment</h1>
          <button
            onClick={backToIntro}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            Back to Overview
          </button>
        </div>
        <WellnessAssessment onComplete={saveAssessmentResults} />
      </div>
    );
  }

  if (currentView === 'results' && assessmentResults) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Assessment Results</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => exportResults(assessmentResults)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <SafeIcon icon={FiDownload} className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button
              onClick={backToIntro}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              Back to Overview
            </button>
          </div>
        </div>
        <AssessmentResults 
          assessmentData={assessmentResults} 
          onRetakeAssessment={startNewAssessment} 
        />
      </div>
    );
  }

  // Intro/Overview page
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Hero Section */}
      <div className={`p-8 rounded-2xl text-center ${isDark ? 'bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-gray-700' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200'} shadow-lg`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6"
        >
          <SafeIcon icon={FiHeart} className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4">Comprehensive Wellness Assessment</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
          Take our evidence-based wellness assessment to gain insights into your mental health, physical wellbeing, social connections, stress management, and lifestyle habits. Results automatically sync to your progress tracker.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startNewAssessment}
          className="flex items-center space-x-2 mx-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all text-lg font-medium"
        >
          <SafeIcon icon={FiPlay} className="w-6 h-6" />
          <span>Start Assessment</span>
        </motion.button>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: 'Comprehensive Analysis',
            description: 'Assess 5 key areas of wellness with 20 evidence-based questions',
            icon: FiTrendingUp,
            color: 'from-blue-500 to-cyan-600'
          },
          {
            title: 'Auto Progress Sync',
            description: 'Results automatically sync to your progress tracker for seamless monitoring',
            icon: FiFileText,
            color: 'from-purple-500 to-pink-600'
          },
          {
            title: 'Track Progress',
            description: 'Monitor your wellness journey over time with regular assessments',
            icon: FiCalendar,
            color: 'from-green-500 to-teal-600'
          }
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg mb-4`}>
              <SafeIcon icon={feature.icon} className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Assessment Areas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
      >
        <h2 className="text-2xl font-semibold mb-4">What We'll Assess</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { title: 'Mental Health', icon: '🧠', description: 'Mood, anxiety, and emotional wellbeing' },
            { title: 'Physical Health', icon: '💪', description: 'Exercise, sleep, and nutrition habits' },
            { title: 'Social Wellbeing', icon: '👥', description: 'Relationships and social connections' },
            { title: 'Stress Management', icon: '🌅', description: 'Coping strategies and resilience' },
            { title: 'Lifestyle Habits', icon: '🏠', description: 'Daily routines and life balance' }
          ].map((area, index) => (
            <div key={area.title} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl mb-2">{area.icon}</div>
              <h3 className="font-semibold mb-1">{area.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{area.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Previous Assessments */}
      {previousAssessments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Assessment History</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <SafeIcon icon={FiUsers} className="w-4 h-4" />
              <span>{previousAssessments.length} assessment{previousAssessments.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
          <div className="space-y-3">
            {previousAssessments.slice(0, 5).map((assessment, index) => {
              // Calculate overall score safely
              let overallScore = 0;
              if (assessment.scores && Object.keys(assessment.scores).length > 0) {
                const scores = Object.values(assessment.scores);
                const validScores = scores.filter(score => score && typeof score.percentage === 'number');
                if (validScores.length > 0) {
                  overallScore = Math.round(
                    validScores.reduce((sum, score) => sum + score.percentage, 0) / validScores.length
                  );
                }
              }

              const scoreColor = overallScore >= 80 ? 'bg-green-500' : 
                               overallScore >= 60 ? 'bg-blue-500' : 
                               overallScore >= 40 ? 'bg-yellow-500' : 'bg-red-500';

              return (
                <motion.div
                  key={assessment.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${scoreColor}`}>
                      <span className="text-white font-bold">{overallScore}</span>
                    </div>
                    <div>
                      <p className="font-medium">Assessment #{previousAssessments.length - index}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {assessment.completedAt ? new Date(assessment.completedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'Unknown date'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right mr-4">
                      <p className="text-sm font-medium">Overall Score: {overallScore}%</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {overallScore >= 80 ? 'Excellent' : 
                         overallScore >= 60 ? 'Good' : 
                         overallScore >= 40 ? 'Fair' : 'Needs Attention'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => viewResults(assessment)}
                        className="p-2 text-gray-400 hover:text-indigo-500 transition-colors"
                        title="View Results"
                      >
                        <SafeIcon icon={FiEye} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => exportResults(assessment)}
                        className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                        title="Export Results"
                      >
                        <SafeIcon icon={FiDownload} className="w-4 h-4" />
                      </button>
                    </div>
                    <SafeIcon 
                      icon={FiArrowRight} 
                      className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors cursor-pointer" 
                      onClick={() => viewResults(assessment)}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
          {previousAssessments.length > 5 && (
            <div className="text-center mt-4">
              <button
                onClick={() => {
                  // Show all assessments - could implement pagination here
                  console.log('Show all assessments');
                }}
                className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
              >
                View all {previousAssessments.length} assessments
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Statistics */}
      {previousAssessments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
        >
          <h3 className="text-lg font-semibold mb-4">Your Progress Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(() => {
              const totalAssessments = previousAssessments.length;
              const latestScore = previousAssessments[0]?.scores ? Math.round(
                Object.values(previousAssessments[0].scores)
                  .reduce((sum, score) => sum + score.percentage, 0) / 
                  Object.values(previousAssessments[0].scores).length
              ) : 0;
              
              const avgScore = previousAssessments.length > 0 ? Math.round(
                previousAssessments.reduce((sum, assessment) => {
                  if (assessment.scores) {
                    const scores = Object.values(assessment.scores);
                    const validScores = scores.filter(s => s && typeof s.percentage === 'number');
                    if (validScores.length > 0) {
                      return sum + (validScores.reduce((s, score) => s + score.percentage, 0) / validScores.length);
                    }
                  }
                  return sum;
                }, 0) / previousAssessments.length
              ) : 0;
              
              const trend = previousAssessments.length >= 2 ? 
                latestScore - Math.round(
                  Object.values(previousAssessments[1].scores || {})
                    .reduce((sum, score) => sum + (score.percentage || 0), 0) / 
                    Math.max(Object.values(previousAssessments[1].scores || {}).length, 1)
                ) : 0;

              return [
                { label: 'Total Assessments', value: totalAssessments, color: 'text-blue-600' },
                { label: 'Latest Score', value: `${latestScore}%`, color: 'text-green-600' },
                { label: 'Average Score', value: `${avgScore}%`, color: 'text-purple-600' },
                { 
                  label: 'Trend', 
                  value: trend === 0 ? 'No change' : `${trend > 0 ? '+' : ''}${trend}%`, 
                  color: trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600' 
                }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ));
            })()}
          </div>
        </motion.div>
      )}

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center p-6"
      >
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Ready to gain insights into your wellness? The assessment takes about 5-10 minutes to complete and results automatically sync to your progress tracker.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startNewAssessment}
          className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
        >
          {previousAssessments.length > 0 ? 'Take New Assessment' : 'Begin Your Wellness Assessment'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default WellnessAssessmentPage;