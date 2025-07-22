import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheckCircle, FiHelpCircle, FiArrowRight, FiAward } = FiIcons;

const Quiz = () => {
  const { quizzes, completeQuiz } = useData();
  const { isDark } = useTheme();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers({});
    setQuizComplete(false);
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score - simplified for demo
      const newScore = Object.keys(answers).length * 10;
      setScore(newScore);
      setQuizComplete(true);
      completeQuiz(selectedQuiz.id, answers, newScore);
    }
  };

  const handleReset = () => {
    setSelectedQuiz(null);
    setAnswers({});
    setQuizComplete(false);
  };

  if (!selectedQuiz) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Wellness Quizzes</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Take these quizzes to gain insights into your wellness journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg relative overflow-hidden`}
              style={{
                backgroundImage: isDark
                  ? `linear-gradient(to bottom right, rgba(31, 41, 55, 0.95), rgba(17, 24, 39, 0.95)),
                     radial-gradient(circle at ${index % 2 === 0 ? '90% 10%' : '10% 90%'}, rgba(99, 116, 245, 0.2) 0%, transparent 60%)`
                  : `linear-gradient(to bottom right, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.95)),
                     radial-gradient(circle at ${index % 2 === 0 ? '90% 10%' : '10% 90%'}, rgba(99, 116, 245, 0.1) 0%, transparent 60%)`
              }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-600 rounded-full mb-6">
                <SafeIcon icon={FiHelpCircle} className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold mb-3">{quiz.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {quiz.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                <span>{quiz.questions.length} questions</span>
                <span>~5 min</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStartQuiz(quiz)}
                className="w-full bg-gradient-to-r from-primary-500 to-accent-600 text-white rounded-lg hover:shadow-lg transition-all py-3"
              >
                Start Quiz
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (quizComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'} shadow-lg text-center`}
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-600 rounded-full mb-6">
          <SafeIcon icon={FiAward} className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          You scored {score} points
        </p>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Thank you for completing the {selectedQuiz.title}. Your responses will help us provide you with personalized wellness insights.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          Back to Quizzes
        </motion.button>
      </motion.div>
    );
  }

  const currentQ = selectedQuiz.questions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="space-y-6"
    >
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium">Question {currentQuestion + 1} of {selectedQuiz.questions.length}</span>
          <span>{selectedQuiz.title}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-600 rounded-full"
            style={{ width: `${((currentQuestion + 1) / selectedQuiz.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentQ.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'} shadow-lg`}
      >
        <h3 className="text-xl font-semibold mb-6">{currentQ.question}</h3>

        {currentQ.type === 'multiple-choice' && (
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(currentQ.id, option)}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  answers[currentQ.id] === option
                    ? 'bg-gradient-to-r from-primary-500 to-accent-600 text-white'
                    : isDark
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    answers[currentQ.id] === option
                      ? 'bg-white text-primary-600'
                      : 'bg-white dark:bg-gray-800'
                  }`}>
                    {answers[currentQ.id] === option ? (
                      <SafeIcon icon={FiCheckCircle} className="w-4 h-4" />
                    ) : (
                      <span className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                    )}
                  </div>
                  {option}
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {currentQ.type === 'scale' && (
          <div className="py-4">
            <div className="flex justify-between mb-2">
              {Array.from({ length: currentQ.max - currentQ.min + 1 }, (_, i) => currentQ.min + i).map((value) => (
                <motion.button
                  key={value}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAnswer(currentQ.id, value)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    answers[currentQ.id] === value
                      ? 'bg-gradient-to-r from-primary-500 to-accent-600 text-white'
                      : isDark
                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
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

        <div className="mt-8 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={!answers[currentQ.id]}
            className={`flex items-center px-6 py-3 rounded-lg ${
              answers[currentQ.id]
                ? 'bg-gradient-to-r from-primary-500 to-accent-600 text-white hover:shadow-lg'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            } transition-all`}
          >
            <span>{currentQuestion === selectedQuiz.questions.length - 1 ? 'Finish' : 'Next'}</span>
            <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-2" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Quiz;