import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    goals: [],
    progress: [],
    achievements: [],
    quizResults: [],
    dailyStreak: 0,
    totalPoints: 0
  });
  const [dailyEncouragement, setDailyEncouragement] = useState('');
  const [stories, setStories] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Load data from localStorage
    const saved = localStorage.getItem('encouramindData');
    if (saved) {
      setUserData(JSON.parse(saved));
    }
    initializeContent();
  }, []);

  const initializeContent = () => {
    // Initialize daily encouragement
    const encouragements = [
      "Every small step forward is progress worth celebrating.",
      "Your mental health journey is unique and valuable.",
      "Today is a new opportunity to grow and thrive.",
      "You have the strength to overcome any challenge.",
      "Believe in yourself and your ability to create positive change.",
      "Your wellness matters, and you deserve care and compassion.",
      "Progress isn't always linear, and that's perfectly okay.",
      "You are worthy of love, happiness, and inner peace."
    ];

    const today = new Date().toDateString();
    const savedDay = localStorage.getItem('dailyEncouragementDate');

    if (savedDay !== today) {
      const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
      setDailyEncouragement(randomEncouragement);
      localStorage.setItem('dailyEncouragement', randomEncouragement);
      localStorage.setItem('dailyEncouragementDate', today);
    } else {
      setDailyEncouragement(localStorage.getItem('dailyEncouragement') || encouragements[0]);
    }

    // Initialize stories
    setStories([
      {
        id: 1,
        title: "Sarah's Journey to Self-Discovery",
        excerpt: "How mindfulness changed my perspective on life...",
        content: "Sarah discovered that taking just 10 minutes each morning for mindfulness meditation transformed her entire outlook on daily challenges. She learned to observe her thoughts without judgment and found inner peace she never knew existed.",
        author: "Sarah M.",
        date: "2024-01-15",
        category: "Mindfulness",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
      },
      {
        id: 2,
        title: "Overcoming Anxiety Through Small Steps",
        excerpt: "My path to managing anxiety with daily practices...",
        content: "Through consistent breathing exercises, regular journaling, and building a support network, I learned that anxiety doesn't have to control my life. Small, daily actions created profound changes over time.",
        author: "Mike T.",
        date: "2024-01-12",
        category: "Anxiety",
        image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400"
      },
      {
        id: 3,
        title: "Finding Joy in Everyday Moments",
        excerpt: "Discovering happiness in the simple things...",
        content: "I learned to appreciate the small moments - a warm cup of coffee, a sunset, a kind word from a friend. This shift in perspective brought more joy into my daily life than I ever imagined possible.",
        author: "Emma L.",
        date: "2024-01-10",
        category: "Happiness",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
      }
    ]);

    // Initialize quizzes
    setQuizzes([
      {
        id: 1,
        title: "Mental Wellness Assessment",
        description: "Evaluate your current mental wellness state",
        questions: [
          {
            id: 1,
            question: "How often do you feel overwhelmed by daily tasks?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
            type: "multiple-choice"
          },
          {
            id: 2,
            question: "Rate your sleep quality over the past week (1-10)",
            type: "scale",
            min: 1,
            max: 10
          },
          {
            id: 3,
            question: "What helps you feel most relaxed?",
            options: ["Exercise", "Reading", "Music", "Nature", "Meditation"],
            type: "multiple-choice"
          }
        ]
      },
      {
        id: 2,
        title: "Stress Management Quiz",
        description: "Discover your stress management style",
        questions: [
          {
            id: 1,
            question: "When faced with stress, what's your first reaction?",
            options: ["Take deep breaths", "Talk to someone", "Exercise", "Avoid the situation", "Plan a solution"],
            type: "multiple-choice"
          },
          {
            id: 2,
            question: "How effective are your current stress management techniques? (1-10)",
            type: "scale",
            min: 1,
            max: 10
          }
        ]
      }
    ]);
  };

  const saveUserData = (data) => {
    const newData = { ...userData, ...data };
    setUserData(newData);
    localStorage.setItem('encouramindData', JSON.stringify(newData));
  };

  const addGoal = (goal) => {
    const newGoal = {
      id: Date.now(),
      ...goal,
      createdAt: new Date().toISOString(),
      progress: 0,
      completed: false
    };
    saveUserData({
      goals: [...userData.goals, newGoal]
    });
  };

  const updateGoal = (goalId, updates) => {
    const updatedGoals = userData.goals.map(goal =>
      goal.id === goalId ? { ...goal, ...updates } : goal
    );
    saveUserData({
      goals: updatedGoals
    });
  };

  const addProgress = (entry) => {
    const newEntry = {
      id: Date.now() + Math.random(), // Ensure unique ID
      ...entry,
      date: entry.date || new Date().toISOString()
    };
    
    // Add to progress array
    const updatedProgress = [...(userData.progress || []), newEntry];
    
    // Update daily streak if it's a new day
    const today = new Date().toDateString();
    const lastEntryDate = userData.progress?.length > 0 
      ? new Date(userData.progress[userData.progress.length - 1].date).toDateString()
      : null;
    
    const newStreak = lastEntryDate !== today 
      ? (userData.dailyStreak || 0) + 1 
      : userData.dailyStreak || 0;

    saveUserData({
      progress: updatedProgress,
      dailyStreak: newStreak
    });
  };

  const completeQuiz = (quizId, answers, score) => {
    const result = {
      id: Date.now(),
      quizId,
      answers,
      score,
      completedAt: new Date().toISOString()
    };
    saveUserData({
      quizResults: [...userData.quizResults, result],
      totalPoints: userData.totalPoints + score
    });
  };

  // New function to sync assessment data with progress
  const syncAssessmentToProgress = (assessmentData) => {
    if (!assessmentData || !assessmentData.scores) return;

    const assessmentDate = assessmentData.completedAt;
    const existingProgress = userData.progress || [];
    
    // Check if this assessment is already synced
    const alreadySynced = existingProgress.some(entry => 
      entry.source === 'assessment' && 
      entry.assessmentId === assessmentData.id
    );

    if (!alreadySynced) {
      // Add progress entries for each assessment section
      Object.entries(assessmentData.scores).forEach(([sectionId, scoreData]) => {
        const progressEntry = {
          type: mapAssessmentToProgressType(sectionId),
          value: Math.round(scoreData.percentage / 20), // Convert 0-100 to 1-5 scale
          date: assessmentDate,
          notes: `Auto-synced from wellness assessment - ${getScoreInterpretation(scoreData.percentage)}`,
          source: 'assessment',
          assessmentId: assessmentData.id,
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

  const value = {
    userData,
    dailyEncouragement,
    stories,
    quizzes,
    saveUserData,
    addGoal,
    updateGoal,
    addProgress,
    completeQuiz,
    syncAssessmentToProgress
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};