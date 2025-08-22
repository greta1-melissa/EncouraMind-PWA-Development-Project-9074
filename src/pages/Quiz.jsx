import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheckCircle, FiHelpCircle, FiArrowRight, FiAward, FiFilter, FiSearch, FiClock, FiBookOpen, FiArrowLeft, FiShare2 } = FiIcons;

const Quiz = () => {
  const { quizzes, completeQuiz, userData } = useData();
  const { isDark } = useTheme();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories
  const categories = ['all', ...new Set(quizzes.map(quiz => quiz.category))];

  // Filter quizzes
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesCategory = selectedCategory === 'all' || quiz.category === selectedCategory;
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get completed quiz IDs
  const completedQuizIds = userData.quizResults?.map(result => result.quizId) || [];

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers({});
    setQuizComplete(false);
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score based on quiz type and answers
      const newScore = calculateQuizScore(selectedQuiz, answers);
      setScore(newScore);
      setQuizComplete(true);
      completeQuiz(selectedQuiz.id, answers, newScore);
    }
  };

  const calculateQuizScore = (quiz, answers) => {
    // Different scoring logic based on quiz category
    let totalScore = 0;
    const maxScore = quiz.questions.length * 10;

    quiz.questions.forEach(question => {
      const answer = answers[question.id];
      if (answer !== undefined) {
        if (question.type === 'scale') {
          // Scale questions: higher numbers = better score
          totalScore += (answer / question.max) * 10;
        } else if (question.type === 'multiple-choice') {
          // Multiple choice: assign points based on positive responses
          const optionIndex = question.options.indexOf(answer);
          if (quiz.category === 'Anxiety' || quiz.category === 'Mood & Depression') {
            // For anxiety/depression, lower frequency of negative symptoms = higher score
            totalScore += (question.options.length - optionIndex) * 2;
          } else {
            // For positive assessments, higher index generally = better score
            totalScore += (optionIndex + 1) * 2;
          }
        }
      }
    });

    return Math.min(Math.round((totalScore / maxScore) * 100), 100);
  };

  const getScoreInterpretation = (score, category) => {
    if (score >= 80) {
      return {
        level: 'Excellent',
        color: 'text-green-600',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        message: 'You show strong wellness in this area. Keep up the great work!'
      };
    } else if (score >= 60) {
      return {
        level: 'Good',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        message: 'You have a solid foundation with room for improvement.'
      };
    } else if (score >= 40) {
      return {
        level: 'Fair',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        message: 'There are areas that could benefit from attention and care.'
      };
    } else {
      return {
        level: 'Needs Attention',
        color: 'text-red-600',
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        message: 'Consider seeking support or focusing on self-care in this area.'
      };
    }
  };

  const handleReset = () => {
    setSelectedQuiz(null);
    setAnswers({});
    setQuizComplete(false);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const shareResults = async () => {
    const interpretation = getScoreInterpretation(score, selectedQuiz.category);
    const shareText = `I just completed the "${selectedQuiz.title}" quiz on EncouraMind and scored ${score}% (${interpretation.level})! 🌟`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'EncouraMind Quiz Results',
          text: shareText,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Results copied to clipboard!');
    }
  };

  if (!selectedQuiz) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-600 rounded-full mb-4"
          >
            <SafeIcon icon={FiHelpCircle} className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Mental Health & Wellness Quizzes</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Take evidence-based assessments to gain insights into your mental health, stress levels, relationships, and overall wellbeing. Track your progress over time.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Quizzes', value: quizzes.length, icon: FiBookOpen, color: 'from-blue-500 to-cyan-600' },
            { label: 'Completed', value: completedQuizIds.length, icon: FiCheckCircle, color: 'from-green-500 to-teal-600' },
            { label: 'Categories', value: categories.length - 1, icon: FiFilter, color: 'from-purple-500 to-pink-600' },
            { label: 'Total Points', value: userData.totalPoints || 0, icon: FiAward, color: 'from-orange-500 to-red-600' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`p-4 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
            >
              <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.color} mb-2`}>
                <SafeIcon icon={stat.icon} className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredQuizzes.map((quiz, index) => {
              const isCompleted = completedQuizIds.includes(quiz.id);
              const completedResult = userData.quizResults?.find(result => result.quizId === quiz.id);
              
              return (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                  style={{
                    backgroundImage: isDark 
                      ? `linear-gradient(to bottom right, rgba(31,41,55,0.95), rgba(17,24,39,0.95)), radial-gradient(circle at ${index % 2 === 0 ? '90% 10%' : '10% 90%'}, rgba(99,116,245,0.2) 0%, transparent 60%)`
                      : `linear-gradient(to bottom right, rgba(255,255,255,0.95), rgba(249,250,251,0.95)), radial-gradient(circle at ${index % 2 === 0 ? '90% 10%' : '10% 90%'}, rgba(99,116,245,0.1) 0%, transparent 60%)`
                  }}
                >
                  {isCompleted && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs">
                        <SafeIcon icon={FiCheckCircle} className="w-3 h-3" />
                        <span>Completed</span>
                      </div>
                    </div>
                  )}

                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-600 rounded-lg mb-4">
                    <SafeIcon icon={FiHelpCircle} className="w-6 h-6 text-white" />
                  </div>

                  <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium mb-3">
                    {quiz.category}
                  </span>

                  <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                    {quiz.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiHelpCircle} className="w-4 h-4" />
                      <span>{quiz.questions.length} questions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiClock} className="w-4 h-4" />
                      <span>{quiz.duration}</span>
                    </div>
                  </div>

                  {isCompleted && completedResult && (
                    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span>Last Score:</span>
                        <span className="font-semibold">{completedResult.score}%</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(completedResult.completedAt).toLocaleDateString()}
                      </div>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleStartQuiz(quiz)}
                    className="w-full bg-gradient-to-r from-primary-500 to-accent-600 text-white rounded-lg hover:shadow-lg transition-all py-3 font-medium"
                  >
                    {isCompleted ? 'Retake Quiz' : 'Start Quiz'}
                  </motion.button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredQuizzes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <SafeIcon icon={FiHelpCircle} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No quizzes found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or category filter.
            </p>
          </motion.div>
        )}
      </motion.div>
    );
  }

  if (quizComplete) {
    const interpretation = getScoreInterpretation(score, selectedQuiz.category);
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg text-center`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-600 rounded-full mb-6">
            <SafeIcon icon={FiAward} className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
          
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${interpretation.bgColor} mb-6`}>
            <span className={`font-bold text-4xl ${interpretation.color}`}>{score}%</span>
            <span className={`font-semibold ${interpretation.color}`}>({interpretation.level})</span>
          </div>

          <h3 className="text-xl font-semibold mb-2">{selectedQuiz.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            {interpretation.message}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareResults}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <SafeIcon icon={FiShare2} className="w-4 h-4" />
              <span>Share Results</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Back to Quizzes
            </motion.button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Results saved to your profile • Consider retaking periodically to track progress
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const currentQ = selectedQuiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;
  const isAnswered = answers[currentQ.id] !== undefined;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleReset}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        >
          <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
          <span>Back to Quizzes</span>
        </button>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {selectedQuiz.category}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium">Question {currentQuestion + 1} of {selectedQuiz.questions.length}</span>
          <span>{selectedQuiz.title}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-primary-500 to-accent-600 rounded-full"
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
        >
          <h3 className="text-xl font-semibold mb-6 leading-relaxed">{currentQ.question}</h3>

          {currentQ.type === 'multiple-choice' && (
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleAnswer(currentQ.id, option)}
                  className={`w-full p-4 rounded-lg text-left transition-all ${
                    answers[currentQ.id] === option
                      ? 'bg-gradient-to-r from-primary-500 to-accent-600 text-white shadow-lg'
                      : isDark
                      ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                        answers[currentQ.id] === option
                          ? 'bg-white text-primary-600'
                          : 'border-2 border-gray-300 dark:border-gray-500'
                      }`}
                    >
                      {answers[currentQ.id] === option && (
                        <SafeIcon icon={FiCheckCircle} className="w-4 h-4" />
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {currentQ.type === 'scale' && (
            <div className="py-4">
              <div className="flex justify-between mb-4">
                {Array.from({ length: currentQ.max - currentQ.min + 1 }, (_, i) => currentQ.min + i).map((value) => (
                  <motion.button
                    key={value}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAnswer(currentQ.id, value)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                      answers[currentQ.id] === value
                        ? 'bg-gradient-to-r from-primary-500 to-accent-600 text-white shadow-lg'
                        : isDark
                        ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
                        : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    {value}
                  </motion.button>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                currentQuestion === 0
                  ? 'opacity-50 cursor-not-allowed bg-gray-200 dark:bg-gray-700'
                  : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
              <span>Previous</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={!isAnswered}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                isAnswered
                  ? 'bg-gradient-to-r from-primary-500 to-accent-600 text-white hover:shadow-lg'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>{currentQuestion === selectedQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next'}</span>
              <SafeIcon icon={currentQuestion === selectedQuiz.questions.length - 1 ? FiCheckCircle : FiArrowRight} className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Quiz;