import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiHeart, FiActivity, FiBrain, FiUsers, FiHome, FiSun, FiArrowRight, FiArrowLeft, FiCheck } = FiIcons

const WellnessAssessment = ({ onComplete }) => {
  const { isDark } = useTheme()
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState({})
  const [isComplete, setIsComplete] = useState(false)

  const assessmentSections = [
    {
      id: 'mental_health',
      title: 'Mental Health',
      icon: FiBrain,
      color: 'from-purple-500 to-indigo-600',
      questions: [
        {
          id: 'mh_1',
          question: 'How often have you felt nervous, anxious, or on edge over the past 2 weeks?',
          type: 'scale',
          scale: {
            min: 0,
            max: 3,
            labels: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
          }
        },
        {
          id: 'mh_2',
          question: 'How often have you felt down, depressed, or hopeless over the past 2 weeks?',
          type: 'scale',
          scale: {
            min: 0,
            max: 3,
            labels: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
          }
        },
        {
          id: 'mh_3',
          question: 'How would you rate your overall mood in the past week?',
          type: 'scale',
          scale: {
            min: 1,
            max: 5,
            labels: ['Very poor', 'Poor', 'Fair', 'Good', 'Excellent']
          }
        },
        {
          id: 'mh_4',
          question: 'How well are you able to concentrate on tasks?',
          type: 'scale',
          scale: {
            min: 1,
            max: 5,
            labels: ['Very difficult', 'Difficult', 'Moderate', 'Good', 'Excellent']
          }
        }
      ]
    },
    {
      id: 'physical_health',
      title: 'Physical Health',
      icon: FiActivity,
      color: 'from-green-500 to-teal-600',
      questions: [
        {
          id: 'ph_1',
          question: 'How many days per week do you engage in physical exercise?',
          type: 'scale',
          scale: {
            min: 0,
            max: 7,
            labels: ['0 days', '1-2 days', '3-4 days', '5-6 days', '7 days']
          }
        },
        {
          id: 'ph_2',
          question: 'How would you rate your sleep quality?',
          type: 'scale',
          scale: {
            min: 1,
            max: 5,
            labels: ['Very poor', 'Poor', 'Fair', 'Good', 'Excellent']
          }
        },
        {
          id: 'ph_3',
          question: 'How many hours of sleep do you get on average per night?',
          type: 'scale',
          scale: {
            min: 1,
            max: 5,
            labels: ['Less than 5', '5-6 hours', '6-7 hours', '7-8 hours', '8+ hours']
          }
        },
        {
          id: 'ph_4',
          question: 'How often do you eat balanced, nutritious meals?',
          type: 'scale',
          scale: {
            min: 1,
            max: 5,
            labels: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always']
          }
        }
      ]
    },
    {
      id: 'social_wellbeing',
      title: 'Social Wellbeing',
      icon: FiUsers,
      color: 'from-blue-500 to-cyan-600',
      questions: [
        {
          id: 'sw_1',
          question: 'How satisfied are you with your personal relationships?',
          type: 'scale',
          scale: {
            min: 1,
            max: 5,
            labels: ['Very dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very satisfied']
          }
        },
        {
          id: 'sw_2',
          question: 'How often do you feel lonely or isolated?',
          type: 'scale',
          scale: {
            min: 1,
            max: 5,
            labels: ['Very often', 'Often', 'Sometimes', 'Rarely', 'Never']
          }
        },
        {
          id: 'sw_3',
          question: 'How comfortable do you feel asking for help when you need it?',
          type: 'scale',
          scale: {
            min: 1,
            max: 5,
            labels: ['Very uncomfortable', 'Uncomfortable', 'Neutral', 'Comfortable', 'Very comfortable']
          }
        },
        {
          id: 'sw_4',
          question: 'How often do you engage in social activities?',
          type: 'scale',
          scale: {
            min: 1,
            max: 5,
            labels: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often']
          }
        }
      ]
    },
    {
      id: 'stress_management',
      title: 'Stress Management',
      icon: FiSun,
      color: 'from-orange-500 to-red-600',
      questions: [
        {
          id: 'sm_1',
          question: 'How often do you feel overwhelmed by daily responsibilities?',
          type: 'scale',
          scale: {
            min: 1,
            max: 5,
            labels: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often']
          }
        },
        {
          id: 'sm_2',
          question: 'How effective are your current stress management techniques?',
          type: 'scale',
          scale: {
            min: 1,
            max: 5,
            labels: ['Not effective', 'Slightly effective', 'Moderately effective', 'Very effective', 'Extremely effective']
          }
        },
        {
          id: 'sm_3',
          question: 'How often do you practice relaxation techniques (meditation, deep breathing, etc.)?',
          type: 'scale',
          scale: {
            min: 1,
            max: 5,
            labels: ['Never', 'Rarely', 'Sometimes', 'Often', 'Daily']
          }
        },
        {
          id: 'sm_4',
          question: 'How well do you maintain work-life balance?',
          type: 'scale',
          scale: {
            min: 1,
            max: 5,
            labels: ['Very poor', 'Poor', 'Fair', 'Good', 'Excellent']
          }
        }
      ]
    },
    {
      id: 'lifestyle_habits',
      title: 'Lifestyle & Habits',
      icon: FiHome,
      color: 'from-pink-500 to-rose-600',
      questions: [
        {
          id: 'lh_1',
          question: 'How often do you engage in activities you enjoy?',
          type: 'scale',
          scale: {
            min: 1,
            max: 5,
            labels: ['Never', 'Rarely', 'Sometimes', 'Often', 'Daily']
          }
        },
        {
          id: 'lh_2',
          question: 'How satisfied are you with your current daily routine?',
          type: 'scale',
          scale: {
            min: 1,
            max: 5,
            labels: ['Very dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very satisfied']
          }
        },
        {
          id: 'lh_3',
          question: 'How often do you spend time in nature or outdoors?',
          type: 'scale',
          scale: {
            min: 1,
            max: 5,
            labels: ['Never', 'Rarely', 'Sometimes', 'Often', 'Daily']
          }
        },
        {
          id: 'lh_4',
          question: 'How well do you manage your screen time and digital wellness?',
          type: 'scale',
          scale: {
            min: 1,
            max: 5,
            labels: ['Very poor', 'Poor', 'Fair', 'Good', 'Excellent']
          }
        }
      ]
    }
  ]

  const currentSectionData = assessmentSections[currentSection]
  const currentQuestionData = currentSectionData?.questions[currentQuestion]
  const totalQuestions = assessmentSections.reduce((sum, section) => sum + section.questions.length, 0)
  const answeredQuestions = Object.keys(responses).length
  const progress = (answeredQuestions / totalQuestions) * 100

  const handleResponse = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleNext = () => {
    const currentSectionQuestions = currentSectionData.questions
    
    if (currentQuestion < currentSectionQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (currentSection < assessmentSections.length - 1) {
      setCurrentSection(currentSection + 1)
      setCurrentQuestion(0)
    } else {
      // Assessment complete
      completeAssessment()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
      setCurrentQuestion(assessmentSections[currentSection - 1].questions.length - 1)
    }
  }

  const completeAssessment = () => {
    console.log('Starting assessment completion...')
    
    try {
      // Generate a simple ID
      const assessmentId = `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      const assessmentResult = {
        id: assessmentId,
        responses,
        completedAt: new Date().toISOString(),
        scores: calculateScores(),
        totalProgress: 100
      }

      console.log('Assessment result:', assessmentResult)
      setIsComplete(true)

      // Call onComplete after a short delay to ensure state updates
      setTimeout(() => {
        if (onComplete) {
          console.log('Calling onComplete callback...')
          onComplete(assessmentResult)
        }
      }, 500)
      
    } catch (error) {
      console.error('Error completing assessment:', error)
      // Still mark as complete even if there's an error
      setIsComplete(true)
    }
  }

  const calculateScores = () => {
    const scores = {}
    
    assessmentSections.forEach(section => {
      const sectionResponses = section.questions
        .map(q => responses[q.id])
        .filter(r => r !== undefined)

      if (sectionResponses.length > 0) {
        const average = sectionResponses.reduce((sum, val) => sum + val, 0) / sectionResponses.length
        
        // Calculate percentage based on section type
        let percentage
        if (section.id === 'mental_health') {
          // For mental health, reverse scale for anxiety/depression questions
          percentage = Math.max(0, (5 - average) * 20)
        } else {
          // For other sections, higher is better
          percentage = (average / 5) * 100
        }

        scores[section.id] = {
          raw: average,
          percentage: Math.round(percentage),
          responses: sectionResponses.length,
          total: section.questions.length
        }
      }
    })

    return scores
  }

  const isCurrentQuestionAnswered = () => {
    return responses[currentQuestionData?.id] !== undefined
  }

  const canGoBack = currentSection > 0 || currentQuestion > 0
  const isLastQuestion = currentSection === assessmentSections.length - 1 && 
                        currentQuestion === currentSectionData.questions.length - 1

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-8 rounded-2xl text-center ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } shadow-lg`}
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mb-6">
          <SafeIcon icon={FiCheck} className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Assessment Complete!</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Thank you for completing the wellness assessment. Your personalized results are being generated.
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Questions answered: {answeredQuestions} / {totalQuestions}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium">
            Section {currentSection + 1} of {assessmentSections.length}: {currentSectionData.title}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${currentSectionData.color} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
          <span>Question {currentQuestion + 1} of {currentSectionData.questions.length}</span>
          <span>{answeredQuestions} / {totalQuestions} answered</span>
        </div>
      </div>

      {/* Section Header */}
      <motion.div
        key={currentSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${currentSectionData.color} rounded-full mb-4`}>
          <SafeIcon icon={currentSectionData.icon} className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">{currentSectionData.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Understanding your {currentSectionData.title.toLowerCase()} patterns
        </p>
      </motion.div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentSection}-${currentQuestion}`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className={`p-8 rounded-2xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}
        >
          <h3 className="text-xl font-semibold mb-6 leading-relaxed">
            {currentQuestionData?.question}
          </h3>

          {currentQuestionData?.type === 'scale' && (
            <div className="space-y-4">
              <div className="grid gap-3">
                {currentQuestionData.scale.labels.map((label, index) => {
                  const value = currentQuestionData.scale.min + index
                  const isSelected = responses[currentQuestionData.id] === value

                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleResponse(currentQuestionData.id, value)}
                      className={`p-4 rounded-lg text-left transition-all ${
                        isSelected
                          ? `bg-gradient-to-r ${currentSectionData.color} text-white shadow-lg`
                          : isDark
                          ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 ${
                            isSelected
                              ? 'bg-white text-gray-800'
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          {isSelected ? (
                            <SafeIcon icon={FiCheck} className="w-4 h-4" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        <span className="font-medium">{label}</span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              disabled={!canGoBack}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                canGoBack
                  ? 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
              <span>Previous</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered()}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                isCurrentQuestionAnswered()
                  ? `bg-gradient-to-r ${currentSectionData.color} text-white hover:shadow-lg`
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>{isLastQuestion ? 'Complete Assessment' : 'Next'}</span>
              <SafeIcon icon={isLastQuestion ? FiCheck : FiArrowRight} className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default WellnessAssessment