import React,{createContext,useContext,useState,useEffect} from 'react';

const DataContext=createContext();

export const useData=()=> {
  const context=useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider=({children})=> {
  const [userData,setUserData]=useState({
    goals: [],
    progress: [],
    achievements: [],
    quizResults: [],
    dailyStreak: 0,
    totalPoints: 0
  });
  const [dailyEncouragement,setDailyEncouragement]=useState('');
  const [stories,setStories]=useState([]);
  const [quizzes,setQuizzes]=useState([]);

  useEffect(()=> {
    // Load data from localStorage
    const saved=localStorage.getItem('encouramindData');
    if (saved) {
      setUserData(JSON.parse(saved));
    }
    initializeContent();
  },[]);

  const initializeContent=()=> {
    // Initialize daily encouragement
    const encouragements=[
      "Every small step forward is progress worth celebrating.",
      "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
      "Today is a new opportunity to grow and thrive.",
      "You have the strength to overcome any challenge.",
      "Believe in yourself and your ability to create positive change.",
      "Your wellness matters,and you deserve care and compassion.",
      "Progress isn't always linear,and that's perfectly okay.",
      "You are worthy of love,happiness,and inner peace."
    ];

    const today=new Date().toDateString();
    const savedDay=localStorage.getItem('dailyEncouragementDate');
    if (savedDay !==today) {
      const randomEncouragement=encouragements[Math.floor(Math.random() * encouragements.length)];
      setDailyEncouragement(randomEncouragement);
      localStorage.setItem('dailyEncouragement',randomEncouragement);
      localStorage.setItem('dailyEncouragementDate',today);
    } else {
      setDailyEncouragement(localStorage.getItem('dailyEncouragement') || encouragements[0]);
    }

    // Initialize expanded stories collection with 6 inspiring stories
    setStories([
      {
        id: 1,
        title: "Sarah's Journey to Self-Discovery",
        excerpt: "How mindfulness changed my perspective on life...",
        content: "Sarah discovered that taking just 10 minutes each morning for mindfulness meditation transformed her entire outlook on daily challenges. She learned to observe her thoughts without judgment and found inner peace she never knew existed. The practice helped her navigate work stress,relationship challenges,and personal doubts with greater clarity and compassion. What started as a desperate attempt to find calm became a lifelong practice that grounded her in presence and gratitude.",
        author: "Sarah M.",
        date: "2024-01-15",
        category: "Mindfulness",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
      },
      {
        id: 2,
        title: "Overcoming Anxiety Through Small Steps",
        excerpt: "My path to managing anxiety with daily practices...",
        content: "Through consistent breathing exercises,regular journaling,and building a support network,I learned that anxiety doesn't have to control my life. Small,daily actions created profound changes over time. I started by simply naming my anxious thoughts,then learned to question their validity. Each small victory built my confidence,and gradually,the overwhelming feelings became manageable whispers. Today,I still experience anxiety,but I have tools to work with it rather than against it.",
        author: "Mike T.",
        date: "2024-01-12",
        category: "Anxiety",
        image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400"
      },
      {
        id: 3,
        title: "Finding Joy in Everyday Moments",
        excerpt: "Discovering happiness in the simple things...",
        content: "I learned to appreciate the small moments - a warm cup of coffee,a sunset,a kind word from a friend. This shift in perspective brought more joy into my daily life than I ever imagined possible. Depression had taught me to overlook these gifts,but recovery taught me to seek them out. Now I keep a joy journal,writing down three beautiful moments each day. This practice has rewired my brain to notice light even in dark times.",
        author: "Emma L.",
        date: "2024-01-10",
        category: "Happiness",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
      },
      {
        id: 4,
        title: "Breaking Free from Depression's Grip",
        excerpt: "How I climbed out of the deepest valley of my life...",
        content: "Depression felt like living underwater - everything was muffled,distant,and exhausting. Simple tasks became mountains. But with therapy,medication,and the support of loved ones,I slowly began to surface. The journey wasn't linear;some days I felt like I was drowning again. But I learned that healing happens in waves,not straight lines. Today,I can recognize the early signs and have tools to prevent falling as deep. My scars remind me of my strength,not my weakness.",
        author: "David R.",
        date: "2024-01-08",
        category: "Depression",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
      },
      {
        id: 5,
        title: "Learning to Love Myself After Trauma",
        excerpt: "The long road to self-compassion and healing...",
        content: "Trauma taught me to hate myself,to blame myself for things beyond my control. Recovery taught me that healing isn't about forgetting - it's about integrating and growing. Through EMDR therapy,support groups,and patient self-work,I learned that my worth wasn't diminished by what happened to me. I discovered that self-compassion isn't selfish;it's necessary. Today,I speak to myself like I would to a dear friend,with kindness and understanding.",
        author: "Maria S.",
        date: "2024-01-05",
        category: "Trauma Recovery",
        image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400"
      },
      {
        id: 6,
        title: "Rebuilding After Burnout",
        excerpt: "From exhaustion to intentional living...",
        content: "I thought burnout was just being tired. I was wrong. Burnout was my soul screaming that something fundamental needed to change. I had to learn to say no,to set boundaries,and to prioritize my wellbeing over others' expectations. The recovery process taught me that productivity isn't my worth,and rest isn't laziness. Now I work with intention rather than compulsion,and I've found a sustainable rhythm that honors both my ambitions and my humanity.",
        author: "James K.",
        date: "2024-01-03",
        category: "Burnout",
        image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400"
      }
    ]);

    // Initialize comprehensive quizzes
    setQuizzes([
      {
        id: 1,
        title: "Mental Wellness Assessment",
        description: "Evaluate your current mental wellness state across multiple dimensions",
        category: "General Wellness",
        duration: "8-10 minutes",
        questions: [
          {
            id: 1,
            question: "How often do you feel nervous,anxious,or on edge?",
            options: ["Never","Rarely","Sometimes","Often","Always"],
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
            question: "How often do you feel down,depressed,or hopeless?",
            options: ["Never","Rarely","Sometimes","Often","Always"],
            type: "multiple-choice"
          },
          {
            id: 4,
            question: "What helps you feel most relaxed?",
            options: ["Exercise","Reading","Music","Nature","Meditation"],
            type: "multiple-choice"
          },
          {
            id: 5,
            question: "How satisfied are you with your current life balance? (1-10)",
            type: "scale",
            min: 1,
            max: 10
          }
        ]
      },
      {
        id: 2,
        title: "Stress Management Quiz",
        description: "Discover your stress management style and coping mechanisms",
        category: "Stress & Anxiety",
        duration: "5-7 minutes",
        questions: [
          {
            id: 1,
            question: "When faced with stress,what's your first reaction?",
            options: ["Take deep breaths","Talk to someone","Exercise","Avoid the situation","Plan a solution"],
            type: "multiple-choice"
          },
          {
            id: 2,
            question: "How effective are your current stress management techniques? (1-10)",
            type: "scale",
            min: 1,
            max: 10
          },
          {
            id: 3,
            question: "How often do you feel overwhelmed by daily responsibilities?",
            options: ["Never","Rarely","Sometimes","Often","Always"],
            type: "multiple-choice"
          },
          {
            id: 4,
            question: "What physical symptoms do you experience when stressed?",
            options: ["Headaches","Muscle tension","Fatigue","Sleep problems","Digestive issues"],
            type: "multiple-choice"
          }
        ]
      },
      {
        id: 3,
        title: "Anxiety Self-Assessment",
        description: "Understand your anxiety patterns and triggers",
        category: "Anxiety",
        duration: "6-8 minutes",
        questions: [
          {
            id: 1,
            question: "How often do you worry about things that might go wrong?",
            options: ["Never","Rarely","Sometimes","Often","Constantly"],
            type: "multiple-choice"
          },
          {
            id: 2,
            question: "Rate your general anxiety level over the past month (1-10)",
            type: "scale",
            min: 1,
            max: 10
          },
          {
            id: 3,
            question: "Which situations make you most anxious?",
            options: ["Social situations","Work/School","Health concerns","Future planning","Relationships"],
            type: "multiple-choice"
          },
          {
            id: 4,
            question: "How often do anxiety symptoms interfere with daily activities?",
            options: ["Never","Rarely","Sometimes","Often","Always"],
            type: "multiple-choice"
          },
          {
            id: 5,
            question: "What anxiety management techniques have you tried?",
            options: ["Deep breathing","Meditation","Exercise","Therapy","Medication"],
            type: "multiple-choice"
          }
        ]
      },
      {
        id: 4,
        title: "Depression Screening Tool",
        description: "A gentle assessment to understand your mood patterns",
        category: "Mood & Depression",
        duration: "7-9 minutes",
        questions: [
          {
            id: 1,
            question: "Over the past two weeks,how often have you felt down or hopeless?",
            options: ["Not at all","Several days","More than half the days","Nearly every day"],
            type: "multiple-choice"
          },
          {
            id: 2,
            question: "How would you rate your energy levels lately? (1-10)",
            type: "scale",
            min: 1,
            max: 10
          },
          {
            id: 3,
            question: "How often do you lose interest in activities you usually enjoy?",
            options: ["Never","Rarely","Sometimes","Often","Always"],
            type: "multiple-choice"
          },
          {
            id: 4,
            question: "How has your appetite been recently?",
            options: ["Much less than usual","Somewhat less","About the same","Somewhat more","Much more than usual"],
            type: "multiple-choice"
          },
          {
            id: 5,
            question: "How often do you have trouble concentrating?",
            options: ["Never","Rarely","Sometimes","Often","Always"],
            type: "multiple-choice"
          }
        ]
      },
      {
        id: 5,
        title: "Self-Esteem & Confidence Assessment",
        description: "Explore your self-perception and confidence levels",
        category: "Self-Esteem",
        duration: "5-7 minutes",
        questions: [
          {
            id: 1,
            question: "How often do you feel good about yourself?",
            options: ["Never","Rarely","Sometimes","Often","Always"],
            type: "multiple-choice"
          },
          {
            id: 2,
            question: "Rate your overall self-confidence (1-10)",
            type: "scale",
            min: 1,
            max: 10
          },
          {
            id: 3,
            question: "How do you typically handle criticism?",
            options: ["Take it personally","Feel defensive","Consider it objectively","Use it for growth","Ignore it completely"],
            type: "multiple-choice"
          },
          {
            id: 4,
            question: "How often do you compare yourself to others?",
            options: ["Never","Rarely","Sometimes","Often","Constantly"],
            type: "multiple-choice"
          },
          {
            id: 5,
            question: "What affects your self-esteem most?",
            options: ["Achievement","Appearance","Relationships","Others' opinions","Personal values"],
            type: "multiple-choice"
          }
        ]
      },
      {
        id: 6,
        title: "Sleep Quality Assessment",
        description: "Evaluate your sleep patterns and identify areas for improvement",
        category: "Sleep & Rest",
        duration: "4-6 minutes",
        questions: [
          {
            id: 1,
            question: "How long does it typically take you to fall asleep?",
            options: ["Less than 15 minutes","15-30 minutes","30-60 minutes","1-2 hours","More than 2 hours"],
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
            question: "How often do you wake up feeling refreshed?",
            options: ["Never","Rarely","Sometimes","Often","Always"],
            type: "multiple-choice"
          },
          {
            id: 4,
            question: "How many hours of sleep do you typically get per night?",
            options: ["Less than 5","5-6 hours","6-7 hours","7-8 hours","More than 8 hours"],
            type: "multiple-choice"
          },
          {
            id: 5,
            question: "What most commonly disrupts your sleep?",
            options: ["Stress/Worry","Noise","Physical discomfort","Technology","Irregular schedule"],
            type: "multiple-choice"
          }
        ]
      },
      {
        id: 7,
        title: "Relationship & Social Health Quiz",
        description: "Assess the quality of your relationships and social connections",
        category: "Relationships",
        duration: "6-8 minutes",
        questions: [
          {
            id: 1,
            question: "How satisfied are you with your close relationships?",
            options: ["Very dissatisfied","Somewhat dissatisfied","Neutral","Somewhat satisfied","Very satisfied"],
            type: "multiple-choice"
          },
          {
            id: 2,
            question: "Rate your comfort level in social situations (1-10)",
            type: "scale",
            min: 1,
            max: 10
          },
          {
            id: 3,
            question: "How often do you feel lonely?",
            options: ["Never","Rarely","Sometimes","Often","Always"],
            type: "multiple-choice"
          },
          {
            id: 4,
            question: "How easy is it for you to ask for help when needed?",
            options: ["Very difficult","Difficult","Neutral","Easy","Very easy"],
            type: "multiple-choice"
          },
          {
            id: 5,
            question: "What type of social support do you value most?",
            options: ["Emotional support","Practical help","Advice/Guidance","Companionship","Professional support"],
            type: "multiple-choice"
          }
        ]
      },
      {
        id: 8,
        title: "Work-Life Balance Assessment",
        description: "Evaluate how well you balance work and personal life",
        category: "Work & Life",
        duration: "5-7 minutes",
        questions: [
          {
            id: 1,
            question: "How often does work stress affect your personal life?",
            options: ["Never","Rarely","Sometimes","Often","Always"],
            type: "multiple-choice"
          },
          {
            id: 2,
            question: "Rate your current work-life balance (1-10)",
            type: "scale",
            min: 1,
            max: 10
          },
          {
            id: 3,
            question: "How often do you work outside of regular hours?",
            options: ["Never","Rarely","Sometimes","Often","Always"],
            type: "multiple-choice"
          },
          {
            id: 4,
            question: "How satisfied are you with your current job/career?",
            options: ["Very dissatisfied","Somewhat dissatisfied","Neutral","Somewhat satisfied","Very satisfied"],
            type: "multiple-choice"
          },
          {
            id: 5,
            question: "What would most improve your work-life balance?",
            options: ["Flexible schedule","Less workload","Better boundaries","More vacation time","Different career"],
            type: "multiple-choice"
          }
        ]
      },
      {
        id: 9,
        title: "Mindfulness & Present Moment Awareness",
        description: "Discover your mindfulness practices and present-moment awareness",
        category: "Mindfulness",
        duration: "4-6 minutes",
        questions: [
          {
            id: 1,
            question: "How often do you practice mindfulness or meditation?",
            options: ["Never","Rarely","Weekly","Daily","Multiple times daily"],
            type: "multiple-choice"
          },
          {
            id: 2,
            question: "Rate how present and focused you feel during daily activities (1-10)",
            type: "scale",
            min: 1,
            max: 10
          },
          {
            id: 3,
            question: "How often do you notice your thoughts without judgment?",
            options: ["Never","Rarely","Sometimes","Often","Always"],
            type: "multiple-choice"
          },
          {
            id: 4,
            question: "What helps you feel most grounded and present?",
            options: ["Deep breathing","Nature","Physical exercise","Meditation","Creative activities"],
            type: "multiple-choice"
          },
          {
            id: 5,
            question: "How aware are you of your emotional responses in the moment?",
            options: ["Not at all aware","Slightly aware","Moderately aware","Very aware","Extremely aware"],
            type: "multiple-choice"
          }
        ]
      },
      {
        id: 10,
        title: "Resilience & Coping Skills Assessment",
        description: "Evaluate your ability to bounce back from challenges",
        category: "Resilience",
        duration: "6-8 minutes",
        questions: [
          {
            id: 1,
            question: "How quickly do you typically recover from setbacks?",
            options: ["Very slowly","Slowly","Moderately","Quickly","Very quickly"],
            type: "multiple-choice"
          },
          {
            id: 2,
            question: "Rate your overall resilience to life challenges (1-10)",
            type: "scale",
            min: 1,
            max: 10
          },
          {
            id: 3,
            question: "How do you typically view challenges and obstacles?",
            options: ["As threats","As problems","As neutral events","As opportunities","As growth experiences"],
            type: "multiple-choice"
          },
          {
            id: 4,
            question: "What is your primary coping strategy during difficult times?",
            options: ["Seek support","Problem-solving","Self-care","Distraction","Acceptance"],
            type: "multiple-choice"
          },
          {
            id: 5,
            question: "How optimistic do you feel about your future?",
            options: ["Very pessimistic","Somewhat pessimistic","Neutral","Somewhat optimistic","Very optimistic"],
            type: "multiple-choice"
          },
          {
            id: 6,
            question: "How well do you adapt to change?",
            options: ["Very poorly","Poorly","Moderately","Well","Very well"],
            type: "multiple-choice"
          }
        ]
      },
      {
        id: 11,
        title: "Emotional Intelligence Assessment",
        description: "Explore your ability to understand and manage emotions",
        category: "Emotional Intelligence",
        duration: "7-9 minutes",
        questions: [
          {
            id: 1,
            question: "How well can you identify your own emotions as they occur?",
            options: ["Very poorly","Poorly","Moderately","Well","Very well"],
            type: "multiple-choice"
          },
          {
            id: 2,
            question: "Rate your ability to manage strong emotions (1-10)",
            type: "scale",
            min: 1,
            max: 10
          },
          {
            id: 3,
            question: "How easily can you read others' emotions?",
            options: ["Very difficult","Difficult","Moderate","Easy","Very easy"],
            type: "multiple-choice"
          },
          {
            id: 4,
            question: "How do you typically respond to others' emotional distress?",
            options: ["Feel overwhelmed","Try to fix it","Listen supportively","Offer practical help","Give space"],
            type: "multiple-choice"
          },
          {
            id: 5,
            question: "How well do you handle conflict in relationships?",
            options: ["Very poorly","Poorly","Moderately","Well","Very well"],
            type: "multiple-choice"
          },
          {
            id: 6,
            question: "What motivates you most in life?",
            options: ["Achievement","Relationships","Personal growth","Security","Making a difference"],
            type: "multiple-choice"
          }
        ]
      },
      {
        id: 12,
        title: "Digital Wellness & Technology Balance",
        description: "Assess your relationship with technology and digital devices",
        category: "Digital Wellness",
        duration: "4-6 minutes",
        questions: [
          {
            id: 1,
            question: "How many hours per day do you spend on digital devices?",
            options: ["Less than 2","2-4 hours","4-6 hours","6-8 hours","More than 8 hours"],
            type: "multiple-choice"
          },
          {
            id: 2,
            question: "Rate how technology impacts your well-being (1-10,1=very negative,10=very positive)",
            type: "scale",
            min: 1,
            max: 10
          },
          {
            id: 3,
            question: "How often do you feel anxious when away from your phone?",
            options: ["Never","Rarely","Sometimes","Often","Always"],
            type: "multiple-choice"
          },
          {
            id: 4,
            question: "How does social media typically make you feel?",
            options: ["Anxious/Depressed","Neutral","Connected","Inspired","I don't use social media"],
            type: "multiple-choice"
          },
          {
            id: 5,
            question: "What would most improve your digital wellness?",
            options: ["Less screen time","Digital detox","Better boundaries","Mindful usage","Different apps"],
            type: "multiple-choice"
          }
        ]
      }
    ]);
  };

  const saveUserData=(data)=> {
    const newData={...userData,...data};
    setUserData(newData);
    localStorage.setItem('encouramindData',JSON.stringify(newData));
  };

  const addGoal=(goal)=> {
    const newGoal={
      id: Date.now(),
      ...goal,
      createdAt: new Date().toISOString(),
      progress: 0,
      completed: false
    };
    saveUserData({goals: [...userData.goals,newGoal]});
  };

  const updateGoal=(goalId,updates)=> {
    const updatedGoals=userData.goals.map(goal=>
      goal.id===goalId ? {...goal,...updates} : goal
    );
    saveUserData({goals: updatedGoals});
  };

  const addProgress=(entry)=> {
    const newEntry={
      id: Date.now() + Math.random(), // Ensure unique ID
      ...entry,
      date: entry.date || new Date().toISOString()
    };

    // Add to progress array
    const updatedProgress=[...(userData.progress || []),newEntry];

    // Update daily streak if it's a new day
    const today=new Date().toDateString();
    const lastEntryDate=userData.progress?.length > 0 
      ? new Date(userData.progress[userData.progress.length - 1].date).toDateString() 
      : null;
    const newStreak=lastEntryDate !==today ? (userData.dailyStreak || 0) + 1 : userData.dailyStreak || 0;

    saveUserData({
      progress: updatedProgress,
      dailyStreak: newStreak
    });
  };

  const completeQuiz=(quizId,answers,score)=> {
    const result={
      id: Date.now(),
      quizId,
      answers,
      score,
      completedAt: new Date().toISOString()
    };
    saveUserData({
      quizResults: [...userData.quizResults,result],
      totalPoints: userData.totalPoints + score
    });
  };

  // New function to sync assessment data with progress
  const syncAssessmentToProgress=(assessmentData)=> {
    if (!assessmentData || !assessmentData.scores) return;

    const assessmentDate=assessmentData.completedAt;
    const existingProgress=userData.progress || [];

    // Check if this assessment is already synced
    const alreadySynced=existingProgress.some(entry=>
      entry.source==='assessment' && entry.assessmentId===assessmentData.id
    );

    if (!alreadySynced) {
      // Add progress entries for each assessment section
      Object.entries(assessmentData.scores).forEach(([sectionId,scoreData])=> {
        const progressEntry={
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

  const mapAssessmentToProgressType=(sectionId)=> {
    const mapping={
      'mental_health': 'mood',
      'physical_health': 'exercise',
      'social_wellbeing': 'social',
      'stress_management': 'stress',
      'lifestyle_habits': 'habits'
    };
    return mapping[sectionId] || 'mood';
  };

  const getScoreInterpretation=(percentage)=> {
    if (percentage >=80) return 'Excellent wellness level';
    if (percentage >=60) return 'Good wellness level';
    if (percentage >=40) return 'Fair wellness level';
    return 'Needs attention';
  };

  const value={
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