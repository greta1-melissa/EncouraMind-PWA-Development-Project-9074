import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBrain, FiActivity, FiUsers, FiSun, FiHome, FiTrendingUp, FiAlertCircle, FiCheckCircle, FiTarget, FiBookOpen, FiAward, FiHeart, FiEye, FiLightbulb, FiShield, FiCompass } = FiIcons;

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
      detailedDescription: 'Mental health encompasses your emotional, psychological, and social well-being. It affects how you think, feel, and act, influencing how you handle stress, relate to others, and make choices.',
      interpretation: {
        excellent: {
          summary: 'You demonstrate exceptional mental health with strong emotional regulation and a positive outlook.',
          detailed: 'Your responses indicate excellent mental health characterized by emotional stability, effective stress management, and a positive mindset. You likely experience good mood regulation, have healthy coping mechanisms, and maintain a balanced perspective on life challenges. This strong foundation supports your overall well-being and helps you navigate daily stressors effectively.',
          strengths: [
            'Strong emotional regulation and self-awareness',
            'Effective coping strategies for stress and challenges',
            'Positive outlook and resilient mindset',
            'Good self-esteem and confidence levels',
            'Ability to maintain perspective during difficulties'
          ],
          insights: 'Your excellent mental health serves as a protective factor against various life stressors. Continue nurturing these positive patterns while being mindful of maintaining this balance during challenging periods.',
          riskFactors: 'Minimal risk factors present. Continue monitoring for any changes during high-stress periods.',
          protectiveFactors: 'Strong emotional intelligence, effective coping strategies, positive self-concept, and resilient mindset.'
        },
        good: {
          summary: 'Your mental health is generally stable with some areas showing room for improvement.',
          detailed: 'You show good mental health overall with stable emotional patterns and generally effective coping strategies. While you handle most situations well, there may be occasional challenges with stress management or mood regulation. Your foundation is solid, but there are opportunities to strengthen certain aspects of your mental wellness.',
          strengths: [
            'Generally stable mood and emotional patterns',
            'Adequate coping strategies for most situations',
            'Reasonable self-awareness and insight',
            'Ability to function well in daily activities',
            'Some resilience to life stressors'
          ],
          insights: 'Your good mental health provides a stable foundation. Focus on identifying specific triggers that challenge your emotional balance and develop targeted strategies to address them.',
          riskFactors: 'Occasional stress overwhelm, potential for mood fluctuations during challenging periods.',
          protectiveFactors: 'Stable baseline functioning, some effective coping strategies, and general emotional awareness.'
        },
        fair: {
          summary: 'You may be experiencing some mental health challenges that would benefit from focused attention.',
          detailed: 'Your responses suggest moderate mental health concerns that may be impacting your daily functioning and overall well-being. You might experience frequent mood fluctuations, difficulty managing stress, or challenges with emotional regulation. While these concerns are manageable, addressing them proactively can significantly improve your quality of life.',
          strengths: [
            'Awareness of your mental health challenges',
            'Willingness to seek assessment and help',
            'Some periods of stable functioning',
            'Basic understanding of your emotional patterns'
          ],
          insights: 'Your mental health challenges are common and treatable. Focus on building consistent self-care routines and consider professional support to develop more effective coping strategies.',
          riskFactors: 'Frequent stress overwhelm, mood instability, potential for anxiety or depressive episodes, difficulty with emotional regulation.',
          protectiveFactors: 'Self-awareness, help-seeking behavior, and periods of stable functioning.'
        },
        poor: {
          summary: 'Significant mental health challenges that would benefit from professional support and comprehensive self-care strategies.',
          detailed: 'Your responses indicate substantial mental health concerns that may be significantly impacting your daily life, relationships, and overall functioning. You might be experiencing persistent negative emotions, severe stress, or difficulty managing basic daily activities. These challenges are serious but treatable with appropriate support and intervention.',
          strengths: [
            'Courage to complete this assessment',
            'Recognition that support may be needed',
            'Potential for significant improvement with proper care'
          ],
          insights: 'Your mental health challenges require immediate attention and professional support. Remember that seeking help is a sign of strength, and with proper treatment, significant improvement is possible.',
          riskFactors: 'Severe emotional distress, significant functional impairment, potential for crisis situations, persistent negative thought patterns.',
          protectiveFactors: 'Help-seeking behavior and completion of this assessment demonstrate some level of self-advocacy.'
        }
      }
    },
    physical_health: {
      title: 'Physical Health',
      icon: FiActivity,
      color: '#10b981',
      description: 'Your physical fitness and health habits',
      detailedDescription: 'Physical health involves the overall condition of your body, including fitness levels, nutrition habits, sleep quality, and general physical well-being. It directly impacts your energy levels, mood, and ability to engage in daily activities.',
      interpretation: {
        excellent: {
          summary: 'You maintain outstanding physical health habits including regular exercise, quality sleep, and good nutrition.',
          detailed: 'Your physical health practices are exemplary, demonstrating consistent exercise routines, quality sleep patterns, and nutritious eating habits. This strong foundation supports your mental health, energy levels, and overall life satisfaction. Your commitment to physical wellness likely enhances your resilience to stress and contributes to a positive mood.',
          strengths: [
            'Consistent exercise routine and physical activity',
            'Quality sleep patterns and adequate rest',
            'Balanced nutrition and healthy eating habits',
            'Good energy levels throughout the day',
            'Strong body awareness and health monitoring'
          ],
          insights: 'Your excellent physical health creates a strong foundation for overall wellness. This discipline likely benefits all areas of your life, from mental clarity to emotional stability.',
          riskFactors: 'Minimal physical health risks. Monitor for overexertion or perfectionist tendencies around health habits.',
          protectiveFactors: 'Regular exercise, quality sleep, good nutrition, and consistent healthy habits.'
        },
        good: {
          summary: 'Your physical health is generally good with opportunities for minor improvements in routine.',
          detailed: 'You maintain reasonably good physical health with most habits supporting your well-being. You likely exercise somewhat regularly, get adequate sleep most nights, and make generally healthy food choices. There are opportunities to optimize certain aspects of your physical health routine for even greater benefits.',
          strengths: [
            'Generally healthy lifestyle choices',
            'Some regular physical activity',
            'Adequate sleep most nights',
            'Awareness of healthy habits',
            'Decent energy levels for daily activities'
          ],
          insights: 'Your good physical health provides a solid foundation. Focus on consistency in areas where you sometimes struggle, such as regular exercise or sleep schedule.',
          riskFactors: 'Inconsistent exercise patterns, occasional poor sleep, some suboptimal nutrition choices.',
          protectiveFactors: 'Basic healthy habits, some physical activity, and general health awareness.'
        },
        fair: {
          summary: 'Your physical health could benefit from more consistent exercise routines and better sleep habits.',
          detailed: 'Your physical health shows mixed patterns with some areas of concern that may be impacting your energy, mood, and overall well-being. You might struggle with consistent exercise, irregular sleep patterns, or inconsistent nutrition. These areas significantly impact your mental health and daily functioning.',
          strengths: [
            'Awareness of physical health importance',
            'Some attempts at healthy behaviors',
            'Periods of better health habits',
            'Recognition of areas needing improvement'
          ],
          insights: 'Improving your physical health habits will likely have significant positive effects on your mental health, energy levels, and overall quality of life. Start with small, sustainable changes.',
          riskFactors: 'Sedentary lifestyle, poor sleep quality, inconsistent nutrition, low energy levels, potential health complications.',
          protectiveFactors: 'Health awareness and willingness to assess and improve habits.'
        },
        poor: {
          summary: 'Significant physical health challenges that require establishing regular exercise routines and consulting healthcare providers.',
          detailed: 'Your responses suggest substantial physical health concerns that may be significantly impacting your overall well-being, energy levels, and mental health. You might have very irregular or absent exercise routines, poor sleep quality, and suboptimal nutrition habits. These factors can create a cycle that affects mood, stress levels, and daily functioning.',
          strengths: [
            'Completion of this health assessment',
            'Potential awareness of health challenges',
            'Opportunity for significant improvement'
          ],
          insights: 'Your physical health significantly impacts your mental well-being. Starting with small, manageable changes in exercise, sleep, or nutrition can create positive momentum for overall improvement.',
          riskFactors: 'Sedentary lifestyle, chronic fatigue, poor sleep quality, nutritional deficiencies, potential chronic health conditions.',
          protectiveFactors: 'Assessment completion shows some level of health awareness and potential motivation for change.'
        }
      }
    },
    social_wellbeing: {
      title: 'Social Wellbeing',
      icon: FiUsers,
      color: '#3b82f6',
      description: 'Your relationships and social connections',
      detailedDescription: 'Social wellbeing encompasses the quality of your relationships, social support networks, communication skills, and sense of belonging. Strong social connections are crucial for mental health, providing emotional support, reducing stress, and enhancing life satisfaction.',
      interpretation: {
        excellent: {
          summary: 'You have strong, supportive relationships and healthy social connections that enhance your well-being.',
          detailed: 'Your social wellbeing is exceptional, characterized by meaningful relationships, strong support networks, and effective communication skills. You likely feel connected to others, have people you can rely on during difficult times, and contribute positively to your social environment. These strong connections serve as a protective factor for your mental health.',
          strengths: [
            'Strong, supportive relationships with family and friends',
            'Effective communication and interpersonal skills',
            'Healthy boundaries in relationships',
            'Active social engagement and community involvement',
            'Ability to both give and receive emotional support'
          ],
          insights: 'Your excellent social connections are a tremendous asset to your overall well-being. These relationships provide resilience during challenges and enhance life satisfaction.',
          riskFactors: 'Minimal social risks. Be mindful of maintaining balance and not overextending yourself for others.',
          protectiveFactors: 'Strong support network, effective communication skills, healthy relationships, and social engagement.'
        },
        good: {
          summary: 'Your social connections are generally positive with good support systems and room for growth.',
          detailed: 'You maintain good social wellbeing with generally positive relationships and adequate support systems. You likely have some close relationships and feel reasonably connected to others, though there may be opportunities to deepen connections or expand your social network. Your communication skills are generally effective.',
          strengths: [
            'Some meaningful relationships and connections',
            'Generally effective communication skills',
            'Adequate social support for most situations',
            'Some sense of belonging and community',
            'Ability to maintain relationships over time'
          ],
          insights: 'Your good social connections provide a solid foundation. Consider ways to deepen existing relationships or build new meaningful connections.',
          riskFactors: 'Some social isolation during stress, occasional communication difficulties, limited support network.',
          protectiveFactors: 'Existing relationships, basic social skills, and some community connections.'
        },
        fair: {
          summary: 'You might benefit from strengthening existing relationships or building new meaningful connections.',
          detailed: 'Your social wellbeing shows areas of concern that may be impacting your emotional support and sense of belonging. You might struggle with loneliness, have difficulty maintaining relationships, or feel disconnected from others. These challenges can significantly impact mental health and stress management.',
          strengths: [
            'Some existing relationships, even if limited',
            'Awareness of social connection importance',
            'Potential for building stronger connections',
            'Some social skills and experiences to build upon'
          ],
          insights: 'Improving your social connections can significantly enhance your mental health and overall life satisfaction. Start with small steps to reach out and connect with others.',
          riskFactors: 'Social isolation, loneliness, communication difficulties, limited emotional support, relationship conflicts.',
          protectiveFactors: 'Some existing connections and awareness of the importance of social relationships.'
        },
        poor: {
          summary: 'Significant social isolation and relationship challenges that would benefit from focused attention and possibly professional support.',
          detailed: 'Your responses indicate substantial social wellbeing concerns, including possible isolation, relationship difficulties, or lack of adequate support systems. This can significantly impact your mental health, stress levels, and overall quality of life. Social isolation is a serious risk factor for various mental health challenges.',
          strengths: [
            'Completion of this assessment shows self-awareness',
            'Recognition that social connections matter',
            'Potential for building new relationships and skills'
          ],
          insights: 'Social isolation significantly impacts mental health. Consider starting with small social interactions and possibly seeking professional support to develop social skills and connections.',
          riskFactors: 'Severe social isolation, chronic loneliness, relationship conflicts, lack of emotional support, communication barriers.',
          protectiveFactors: 'Self-awareness through assessment completion and potential motivation for social connection.'
        }
      }
    },
    stress_management: {
      title: 'Stress Management',
      icon: FiSun,
      color: '#f59e0b',
      description: 'How well you handle stress and pressure',
      detailedDescription: 'Stress management involves your ability to identify, cope with, and recover from stressful situations. Effective stress management includes healthy coping strategies, emotional regulation skills, and the ability to maintain perspective during challenging times.',
      interpretation: {
        excellent: {
          summary: 'You have exceptional stress management skills and healthy coping mechanisms that serve you well.',
          detailed: 'Your stress management abilities are outstanding, demonstrating effective coping strategies, emotional regulation, and resilience in the face of challenges. You likely have multiple healthy ways to manage stress, maintain perspective during difficult times, and recover quickly from setbacks. This skill set significantly protects your mental and physical health.',
          strengths: [
            'Multiple effective stress management techniques',
            'Strong emotional regulation and self-control',
            'Ability to maintain perspective during challenges',
            'Quick recovery from stressful situations',
            'Proactive approach to stress prevention'
          ],
          insights: 'Your excellent stress management skills are a tremendous asset. These abilities protect your health and enhance your resilience across all life areas.',
          riskFactors: 'Minimal stress-related risks. Monitor for potential overconfidence in handling extreme stressors.',
          protectiveFactors: 'Multiple coping strategies, emotional regulation skills, resilience, and stress awareness.'
        },
        good: {
          summary: 'You generally manage stress well with effective coping strategies and room for enhancement.',
          detailed: 'Your stress management is generally effective with some good coping strategies and reasonable emotional regulation. You handle most stressful situations adequately, though you might occasionally feel overwhelmed or struggle with particularly challenging circumstances. Your foundation is solid with opportunities for improvement.',
          strengths: [
            'Some effective coping strategies',
            'Generally good emotional regulation',
            'Ability to handle routine stressors',
            'Some awareness of stress triggers',
            'Reasonable recovery time from stress'
          ],
          insights: 'Your good stress management provides a solid foundation. Focus on expanding your toolkit of coping strategies for more challenging situations.',
          riskFactors: 'Occasional stress overwhelm, limited coping strategies for severe stress, some emotional reactivity.',
          protectiveFactors: 'Basic coping skills, some emotional awareness, and generally effective stress response.'
        },
        fair: {
          summary: 'You could benefit from developing better stress management techniques and building resilience.',
          detailed: 'Your stress management shows areas of concern that may be impacting your daily functioning and overall well-being. You might frequently feel overwhelmed, struggle to cope with challenging situations, or have limited effective stress management strategies. This can create a cycle of increasing stress and decreased resilience.',
          strengths: [
            'Some awareness of stress and its impacts',
            'Occasional use of coping strategies',
            'Recognition that improvement is needed',
            'Basic understanding of stress responses'
          ],
          insights: 'Improving your stress management skills will significantly enhance your overall well-being and life satisfaction. Start with learning basic relaxation techniques.',
          riskFactors: 'Frequent stress overwhelm, limited coping strategies, emotional reactivity, potential for burnout.',
          protectiveFactors: 'Some stress awareness and recognition of the need for better coping strategies.'
        },
        poor: {
          summary: 'Significant stress management challenges that require learning new coping techniques and possibly professional support.',
          detailed: 'Your responses indicate substantial difficulties with stress management that may be significantly impacting your mental health, relationships, and daily functioning. You might feel frequently overwhelmed, have few effective coping strategies, or struggle to recover from stressful events. This pattern can contribute to various mental and physical health concerns.',
          strengths: [
            'Recognition of stress management challenges',
            'Completion of this assessment for insight',
            'Potential for learning new coping skills'
          ],
          insights: 'Poor stress management significantly impacts overall health. Learning effective coping strategies and possibly seeking professional support can dramatically improve your quality of life.',
          riskFactors: 'Chronic stress overwhelm, lack of effective coping strategies, emotional dysregulation, risk for burnout and health complications.',
          protectiveFactors: 'Awareness of stress issues through assessment completion and potential motivation for change.'
        }
      }
    },
    lifestyle_habits: {
      title: 'Lifestyle & Habits',
      icon: FiHome,
      color: '#ef4444',
      description: 'Your daily routines and lifestyle choices',
      detailedDescription: 'Lifestyle habits encompass your daily routines, work-life balance, time management, self-care practices, and overall life structure. These habits significantly influence your mental health, productivity, and life satisfaction.',
      interpretation: {
        excellent: {
          summary: 'You maintain exceptional daily habits that strongly support your overall wellbeing and life satisfaction.',
          detailed: 'Your lifestyle habits are exemplary, demonstrating excellent work-life balance, structured routines, effective time management, and consistent self-care practices. You likely have healthy boundaries, engage in meaningful activities, and maintain routines that support your physical and mental health. This lifestyle foundation enhances all areas of your well-being.',
          strengths: [
            'Excellent work-life balance and boundaries',
            'Structured, health-supporting daily routines',
            'Effective time management and prioritization',
            'Regular self-care and relaxation practices',
            'Meaningful engagement in enjoyable activities'
          ],
          insights: 'Your excellent lifestyle habits create a strong foundation for overall wellness. This structure and balance significantly contribute to your resilience and life satisfaction.',
          riskFactors: 'Minimal lifestyle risks. Monitor for potential rigidity or difficulty adapting to changes.',
          protectiveFactors: 'Structured routines, work-life balance, self-care practices, and meaningful activities.'
        },
        good: {
          summary: 'Your lifestyle habits are generally healthy with some positive routines and opportunities for optimization.',
          detailed: 'You maintain reasonably good lifestyle habits with some structure and positive routines. You likely have some work-life balance, engage in self-care occasionally, and have some meaningful activities in your life. There are opportunities to optimize your routines and habits for even greater well-being benefits.',
          strengths: [
            'Some positive daily routines and structure',
            'Generally reasonable work-life balance',
            'Occasional self-care and relaxation',
            'Some engagement in enjoyable activities',
            'Basic time management skills'
          ],
          insights: 'Your good lifestyle foundation provides stability. Focus on increasing consistency in areas like self-care routines or work-life boundaries.',
          riskFactors: 'Inconsistent routines, occasional work-life imbalance, irregular self-care practices.',
          protectiveFactors: 'Some positive habits, basic life structure, and awareness of lifestyle importance.'
        },
        fair: {
          summary: 'Your daily habits could use improvement to better support your wellness and life satisfaction.',
          detailed: 'Your lifestyle habits show mixed patterns with several areas that may be impacting your well-being. You might struggle with work-life balance, have inconsistent routines, or lack adequate self-care practices. These patterns can contribute to stress, fatigue, and decreased life satisfaction.',
          strengths: [
            'Some awareness of lifestyle impact on well-being',
            'Occasional positive habits and routines',
            'Recognition of areas needing improvement',
            'Some attempts at self-care or balance'
          ],
          insights: 'Improving your lifestyle habits can significantly enhance your overall well-being. Start with establishing one consistent positive routine.',
          riskFactors: 'Poor work-life balance, inconsistent routines, inadequate self-care, time management difficulties.',
          protectiveFactors: 'Some lifestyle awareness and occasional positive habits.'
        },
        poor: {
          summary: 'Significant lifestyle challenges that require establishing healthier daily routines and better life balance.',
          detailed: 'Your responses indicate substantial lifestyle challenges that may be significantly impacting your overall well-being. You might have poor work-life balance, chaotic or unhealthy routines, minimal self-care, or difficulty managing daily responsibilities. These patterns can contribute to stress, health problems, and decreased life satisfaction.',
          strengths: [
            'Awareness of lifestyle challenges through assessment',
            'Potential for establishing new, healthier habits',
            'Recognition that change may be needed'
          ],
          insights: 'Poor lifestyle habits significantly impact overall wellness. Establishing basic healthy routines and boundaries can create positive momentum for improvement in all life areas.',
          riskFactors: 'Chaotic lifestyle, poor work-life balance, minimal self-care, ineffective time management, potential for burnout.',
          protectiveFactors: 'Assessment completion shows some awareness and potential motivation for lifestyle changes.'
        }
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
          'Continue practicing mindfulness and self-awareness exercises',
          'Maintain your positive mental health habits and routines',
          'Consider sharing your successful strategies with others',
          'Keep monitoring your mental health regularly, even during good periods',
          'Stay connected with mental health resources for ongoing support'
        ],
        good: [
          'Incorporate daily meditation or mindfulness practice (5-10 minutes)',
          'Start a gratitude journaling practice to enhance positive thinking',
          'Consider talking to a mental health counselor for preventive care',
          'Maintain regular sleep schedule and stress management routines',
          'Build stronger emotional awareness through self-reflection'
        ],
        fair: [
          'Prioritize seeking professional mental health support and assessment',
          'Establish a comprehensive daily self-care routine with specific activities',
          'Connect regularly with trusted friends, family members, or support groups',
          'Consider mindfulness apps, guided meditation, or relaxation techniques',
          'Monitor mood patterns and identify triggers for emotional difficulties'
        ],
        poor: [
          'Immediately prioritize seeking professional mental health support',
          'Create a crisis support plan with emergency contacts and resources',
          'Build a strong support network and communicate your needs clearly',
          'Consider therapy, counseling, or psychiatric evaluation as appropriate',
          'Focus on basic self-care: sleep, nutrition, and safety first'
        ]
      },
      physical_health: {
        excellent: [
          'Maintain your excellent fitness routine and continue challenging yourself',
          'Continue prioritizing quality sleep and balanced nutrition habits',
          'Consider setting new fitness goals or trying different activities',
          'Share your healthy habits and knowledge with others who could benefit',
          'Regular health check-ups to maintain your excellent health status'
        ],
        good: [
          'Aim for 150 minutes of moderate exercise per week as recommended',
          'Establish a consistent sleep schedule with 7-9 hours nightly',
          'Focus on balanced, nutritious meals with regular eating patterns',
          'Stay consistently hydrated and limit processed foods',
          'Consider working with a fitness professional to optimize your routine'
        ],
        fair: [
          'Start with 10-15 minutes of daily walking and gradually increase',
          'Prioritize sleep hygiene: consistent bedtime, dark room, no screens before bed',
          'Consult with healthcare providers about nutrition and exercise plans',
          'Consider working with a fitness professional or joining group activities',
          'Track your physical activities and sleep to identify patterns'
        ],
        poor: [
          'Begin with very gentle, low-impact exercises like short walks',
          'Focus on establishing basic healthy routines before major changes',
          'Consult healthcare providers for comprehensive health assessment',
          'Consider gradual lifestyle changes with professional support',
          'Address any underlying health conditions that may be impacting wellness'
        ]
      },
      social_wellbeing: {
        excellent: [
          'Continue nurturing and investing in your meaningful relationships',
          'Consider mentoring others in building healthy social connections',
          'Maintain your strong social support network through regular contact',
          'Practice active listening and empathy in all your interactions',
          'Use your social skills to help build community and support others'
        ],
        good: [
          'Schedule regular check-ins and quality time with friends and family',
          'Join clubs, groups, or activities aligned with your interests and values',
          'Practice active listening and empathy to deepen existing relationships',
          'Be open to meeting new people and forming new friendships',
          'Work on communication skills through books, courses, or practice'
        ],
        fair: [
          'Start with small, manageable social interactions daily',
          'Consider joining support groups, community activities, or volunteer work',
          'Practice reaching out to one person per week to maintain connections',
          'Work on basic communication skills and social confidence',
          'Consider social skills training or counseling if needed'
        ],
        poor: [
          'Take very small steps toward social connection, starting with brief interactions',
          'Consider professional help for social anxiety or relationship difficulties',
          'Start with online communities or structured social activities',
          'Focus on building one meaningful relationship at a time',
          'Address any underlying mental health issues that may impact social functioning'
        ]
      },
      stress_management: {
        excellent: [
          'Share your effective stress management techniques with others who could benefit',
          'Continue practicing and refining your successful coping strategies',
          'Consider learning advanced relaxation techniques like progressive muscle relaxation',
          'Maintain excellent work-life balance and continue setting healthy boundaries',
          'Help others develop stress management skills through mentoring or sharing'
        ],
        good: [
          'Practice deep breathing exercises daily, especially during stressful moments',
          'Set clear boundaries between work and personal time',
          'Try progressive muscle relaxation or other stress-reduction techniques',
          'Maintain regular exercise routine as it significantly helps with stress',
          'Identify and address specific stress triggers proactively'
        ],
        fair: [
          'Learn and practice basic stress reduction techniques like deep breathing',
          'Consider professional stress management counseling or therapy',
          'Identify and work on addressing major stressors in your life',
          'Establish daily relaxation routines and stress-relief activities',
          'Build better time management and organizational skills'
        ],
        poor: [
          'Seek immediate professional help for stress management and coping skills',
          'Learn basic breathing and grounding techniques for crisis moments',
          'Consider major lifestyle changes to reduce overwhelming stressors',
          'Build a strong support system and don\'t hesitate to ask for help',
          'Address any underlying anxiety or depression that may worsen stress'
        ]
      },
      lifestyle_habits: {
        excellent: [
          'Maintain your healthy daily routines and continue optimizing them',
          'Continue balancing screen time effectively and maintaining digital wellness',
          'Share your successful lifestyle strategies with others',
          'Keep adapting and evolving your habits as your life circumstances change',
          'Consider helping others develop similar healthy lifestyle patterns'
        ],
        good: [
          'Create more structured and consistent daily routines',
          'Increase time spent in nature and outdoor activities',
          'Set specific limits on screen time and implement digital wellness practices',
          'Focus on maintaining a consistent sleep schedule and work-life boundaries',
          'Develop better time management and prioritization skills'
        ],
        fair: [
          'Start with small, achievable daily routines and build consistency',
          'Schedule regular outdoor time and nature exposure',
          'Use apps or tools to monitor and limit recreational screen time',
          'Focus on changing one habit at a time rather than everything at once',
          'Create better work-life boundaries and establish transition rituals'
        ],
        poor: [
          'Begin with very basic daily structure and simple, achievable routines',
          'Seek support from professionals in building healthy lifestyle habits',
          'Make very gradual, sustainable changes rather than dramatic overhauls',
          'Consider professional guidance for habit formation and lifestyle coaching',
          'Address any underlying issues (depression, anxiety) that impact daily functioning'
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
        detailed: 'Your comprehensive wellness assessment reveals exceptional overall health across multiple dimensions. This high level of wellness indicates strong resilience, effective coping strategies, and lifestyle choices that support your mental, physical, and social well-being. Your excellent scores suggest you have developed sustainable habits that serve as protective factors against stress and life challenges.',
        icon: FiCheckCircle
      };
    } else if (score >= 60) {
      return {
        level: 'Good',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100 dark:bg-blue-900/20',
        message: 'Your wellness is in good shape overall. There are some areas where small improvements could make a significant positive impact.',
        detailed: 'Your wellness assessment shows good overall health with solid foundations in most areas. You have developed some effective strategies and habits that support your well-being. While you\'re doing well, there are specific areas where targeted improvements could enhance your overall quality of life and resilience to stress.',
        icon: FiHeart
      };
    } else if (score >= 40) {
      return {
        level: 'Fair',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
        message: 'Your wellness shows a mixed picture. Focus on the areas that need attention while building on your existing strengths.',
        detailed: 'Your wellness assessment reveals a mixed profile with both strengths and areas of concern. While you have some positive aspects to build upon, there are several areas that would benefit from focused attention and improvement. This is a common and manageable situation that can be significantly improved with targeted interventions.',
        icon: FiTarget
      };
    } else {
      return {
        level: 'Needs Attention',
        color: 'text-red-600',
        bgColor: 'bg-red-100 dark:bg-red-900/20',
        message: 'Several areas of your wellness could benefit from focused attention. Consider seeking support and making gradual, sustainable changes.',
        detailed: 'Your wellness assessment indicates significant challenges across multiple areas that may be impacting your daily functioning and quality of life. While this may feel overwhelming, it\'s important to remember that these challenges are addressable with appropriate support, professional help, and gradual lifestyle changes. Taking this assessment is an important first step.',
        icon: FiAlertCircle
      };
    }
  };

  const overallInterpretation = getOverallInterpretation(overallScore);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiTrendingUp },
    { id: 'detailed', label: 'Detailed Analysis', icon: FiTarget },
    { id: 'interpretation', label: 'Professional Insights', icon: FiBrain },
    { id: 'recommendations', label: 'Action Plan', icon: FiBookOpen }
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
        <h1 className="text-3xl font-bold mb-2">Your Comprehensive Wellness Assessment Results</h1>
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${overallInterpretation.bgColor} mb-4`}>
          <SafeIcon icon={overallInterpretation.icon} className={`w-5 h-5 ${overallInterpretation.color}`} />
          <span className={`font-semibold ${overallInterpretation.color}`}>
            Overall Wellness: {overallInterpretation.level}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4">
          {overallInterpretation.message}
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Assessment completed on {new Date(assessmentData.completedAt).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
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
                <SafeIcon icon={FiCompass} className="w-6 h-6 text-indigo-500" />
                <h3 className="text-xl font-semibold">Comprehensive Assessment Interpretation</h3>
              </div>
              <div className={`p-4 rounded-lg ${overallInterpretation.bgColor} mb-4`}>
                <div className="flex items-center space-x-3 mb-3">
                  <SafeIcon icon={overallInterpretation.icon} className={`w-6 h-6 ${overallInterpretation.color}`} />
                  <h4 className={`text-lg font-semibold ${overallInterpretation.color}`}>
                    {overallInterpretation.level} Overall Wellness (Score: {overallScore}/100)
                  </h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{overallInterpretation.detailed}</p>
              </div>
            </div>

            {/* Individual Section Interpretations */}
            <div className="space-y-6">
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
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{config.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{config.detailedDescription}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-2xl font-bold" style={{ color: getScoreColor(data.percentage) }}>
                            {data.percentage}%
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
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

                    {/* Professional Summary */}
                    <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <SafeIcon icon={FiLightbulb} className="w-4 h-4 text-amber-500" />
                        <h4 className="font-semibold text-sm">Professional Summary</h4>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {interpretation.summary}
                      </p>
                    </div>

                    {/* Detailed Analysis */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <SafeIcon icon={FiEye} className="w-4 h-4 text-blue-500" />
                        <h4 className="font-semibold text-sm">Detailed Analysis</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {interpretation.detailed}
                      </p>
                    </div>

                    {/* Strengths */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-green-500" />
                        <h4 className="font-semibold text-sm">Identified Strengths</h4>
                      </div>
                      <ul className="space-y-1">
                        {interpretation.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600 dark:text-gray-400">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Professional Insights */}
                    <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                      <div className="flex items-center space-x-2 mb-2">
                        <SafeIcon icon={FiBrain} className="w-4 h-4 text-indigo-500" />
                        <h4 className="font-semibold text-sm text-indigo-800 dark:text-indigo-300">Professional Insights</h4>
                      </div>
                      <p className="text-sm text-indigo-700 dark:text-indigo-300">
                        {interpretation.insights}
                      </p>
                    </div>

                    {/* Risk and Protective Factors */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                        <div className="flex items-center space-x-2 mb-2">
                          <SafeIcon icon={FiAlertCircle} className="w-4 h-4 text-red-500" />
                          <h4 className="font-semibold text-sm text-red-800 dark:text-red-300">Risk Factors</h4>
                        </div>
                        <p className="text-xs text-red-700 dark:text-red-300">
                          {interpretation.riskFactors}
                        </p>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center space-x-2 mb-2">
                          <SafeIcon icon={FiShield} className="w-4 h-4 text-green-500" />
                          <h4 className="font-semibold text-sm text-green-800 dark:text-green-300">Protective Factors</h4>
                        </div>
                        <p className="text-xs text-green-700 dark:text-green-300">
                          {interpretation.protectiveFactors}
                        </p>
                      </div>
                    </div>
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
                Based on your comprehensive assessment results, here are specific, evidence-based recommendations to improve your wellness:
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
                          {data.percentage}% - {getScoreLabel(data.percentage)}
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

            {/* Priority Actions */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-gray-700' : 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200'} shadow-lg`}>
              <h3 className="text-lg font-semibold mb-4">Priority Action Timeline</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-indigo-600 dark:text-indigo-400">Immediate (This Week)</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-green-500" />
                      <span>Choose your top priority area from results</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-green-500" />
                      <span>Set up daily wellness tracking routine</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-green-500" />
                      <span>Schedule dedicated time for self-care</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-purple-600 dark:text-purple-400">Short-term (Next Month)</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiTarget} className="w-4 h-4 text-purple-500" />
                      <span>Establish consistent wellness routines</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiTarget} className="w-4 h-4 text-purple-500" />
                      <span>Address areas scoring below 60%</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiTarget} className="w-4 h-4 text-purple-500" />
                      <span>Seek professional support if needed</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-green-600 dark:text-green-400">Long-term (3+ Months)</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiAward} className="w-4 h-4 text-green-500" />
                      <span>Retake assessment to track progress</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiAward} className="w-4 h-4 text-green-500" />
                      <span>Maintain improved wellness habits</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SafeIcon icon={FiAward} className="w-4 h-4 text-green-500" />
                      <span>Consider helping others with their wellness</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Professional Resources */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
              <h3 className="text-lg font-semibold mb-4">When to Seek Professional Support</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-amber-600 dark:text-amber-400 mb-2">Consider Professional Help If:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Multiple areas scored below 40%</li>
                    <li>• You're experiencing persistent distress</li>
                    <li>• Daily functioning is significantly impacted</li>
                    <li>• You have thoughts of self-harm</li>
                    <li>• Substance use is affecting your life</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Types of Professional Support:</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Licensed therapists or counselors</li>
                    <li>• Psychiatrists for medication evaluation</li>
                    <li>• Support groups and peer counseling</li>
                    <li>• Wellness coaches and lifestyle specialists</li>
                    <li>• Crisis hotlines for immediate support</li>
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