import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useData} from '../contexts/DataContext';
import {useTheme} from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiHeart,FiTrendingUp,FiTarget,FiBookOpen,FiClipboard,FiActivity,FiArrowRight,FiEdit3,FiHelpCircle,FiUser,FiCalendar,FiAward,FiStar,FiUsers,FiBarChart3,FiSettings,FiSun,FiHome,FiLeaf,FiHeadphones,FiWind,FiZap,FiCoffee,FiMoon}=FiIcons;

const Dashboard=()=> {
  const {userData,dailyEncouragement}=useData();
  const {isDark}=useTheme();

  const quickStats=[
    {label: 'Total Progress',value: userData?.progress?.length || 0,icon: FiTrendingUp,color: 'from-primary-500 to-secondary-600'},
    {label: 'Goals Active',value: userData?.goals?.filter(g=> !g.completed).length || 0,icon: FiTarget,color: 'from-secondary-500 to-accent-500'},
    {label: 'Stories Read',value: userData?.storiesRead || 0,icon: FiBookOpen,color: 'from-accent-500 to-primary-500'},
    {label: 'Daily Streak',value: userData?.dailyStreak || 0,icon: FiHeart,color: 'from-primary-500 to-accent-500'}
  ];

  // Enhanced quick actions with wellness resources highlighted
  const quickActions=[
    {title: 'Wellness Resources',description: 'Access guided meditations, breathing techniques, stress management tools, and wellness recipes',icon: FiLeaf,link: '/resources',color: 'from-emerald-500 to-teal-600',highlight: true,category: 'Featured',badge: 'New Resources'},
    {title: 'Take Wellness Assessment',description: 'Comprehensive evaluation of your mental wellness across 5 key areas',icon: FiClipboard,link: '/wellness-assessment',color: 'from-purple-500 to-indigo-600',highlight: true,category: 'Assessment'},
    {title: 'Daily Encouragement',description: 'Get your daily dose of motivation and positive affirmations',icon: FiHeart,link: '/daily',color: 'from-pink-500 to-rose-600',category: 'Inspiration'},
    {title: 'Personal Journal',description: 'Express your thoughts in your completely private journal space',icon: FiEdit3,link: '/journal',color: 'from-emerald-500 to-teal-600',category: 'Reflection'},
    {title: 'Track Progress',description: 'Monitor your wellness journey with detailed analytics and insights',icon: FiActivity,link: '/progress',color: 'from-blue-500 to-cyan-600',category: 'Analytics'},
    {title: 'Set & Manage Goals',description: 'Create meaningful wellness objectives and track your achievements',icon: FiTarget,link: '/goals',color: 'from-green-500 to-teal-600',category: 'Planning'},
    {title: 'Inspiring Stories',description: 'Read real stories of hope,healing,and personal transformation',icon: FiBookOpen,link: '/stories',color: 'from-orange-500 to-amber-600',category: 'Community'},
    {title: 'Wellness Quizzes',description: 'Take evidence-based quizzes to gain insights into your mental health',icon: FiHelpCircle,link: '/quiz',color: 'from-violet-500 to-purple-600',category: 'Assessment'},
    {title: 'My Profile',description: 'Manage your account,view achievements,and track statistics',icon: FiUser,link: '/profile',color: 'from-indigo-500 to-blue-600',category: 'Account'}
  ];

  // Wellness resources preview data
  const featuredResources=[
    {title: '5-Minute Morning Meditation',category: 'Meditation',duration: '5 min',icon: FiSun,color: 'from-purple-500 to-indigo-500'},
    {title: '4-7-8 Breathing for Instant Calm',category: 'Breathing',duration: '3 min',icon: FiWind,color: 'from-blue-500 to-cyan-500'},
    {title: 'STOP Technique for Stress',category: 'Stress Management',duration: '1 min',icon: FiZap,color: 'from-red-500 to-pink-500'},
    {title: 'Calming Chamomile Moon Milk',category: 'Wellness Recipe',duration: '10 min',icon: FiCoffee,color: 'from-green-500 to-teal-500'}
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{opacity: 0,y: 20}}
        animate={{opacity: 1,y: 0}}
        className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-gradient-to-br from-primary-500 via-secondary-600 to-accent-700'} text-white relative overflow-hidden`}
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/90 to-accent-600/90"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to EncouraMind</h1>
          <p className="text-xl opacity-90">Your comprehensive wellness companion for mental health and personal growth</p>
          <div className="mt-4 flex items-center space-x-4 text-sm opacity-80">
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiCalendar} className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('en-US',{weekday: 'long',month: 'long',day: 'numeric'})}</span>
            </div>
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiSun} className="w-4 h-4" />
              <span>Have a mindful day!</span>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-white/5 rounded-full"></div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat,index)=> (
          <motion.div
            key={stat.label}
            initial={{opacity: 0,y: 20}}
            animate={{opacity: 1,y: 0}}
            transition={{delay: index * 0.1}}
            className={`p-4 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300`}
          >
            <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.color} mb-3`}>
              <SafeIcon icon={stat.icon} className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        ))}
      </div>

      {/* Featured Actions */}
      <motion.div
        initial={{opacity: 0,y: 20}}
        animate={{opacity: 1,y: 0}}
        transition={{delay: 0.3}}
        className="space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Your Wellness Toolkit</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Everything you need for your mental health and personal growth journey
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action,index)=> (
            <motion.div
              key={action.title}
              initial={{opacity: 0,y: 20}}
              animate={{opacity: 1,y: 0}}
              transition={{delay: 0.1 * index}}
              whileHover={{y: -5,scale: 1.02}}
              className="relative group"
            >
              <Link to={action.link} className="block">
                <div className={`p-6 rounded-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden ${action.highlight ? 'ring-2 ring-purple-500 ring-opacity-50' : ''}`}
                  style={{
                    backgroundImage: isDark 
                      ? `linear-gradient(to bottom right,rgba(31,41,55,0.95),rgba(17,24,39,0.95)),radial-gradient(circle at ${index % 2 === 0 ? '90% 10%' : '10% 90%'},rgba(99,116,245,0.1) 0%,transparent 60%)`
                      : `linear-gradient(to bottom right,rgba(255,255,255,0.95),rgba(249,250,251,0.95)),radial-gradient(circle at ${index % 2 === 0 ? '90% 10%' : '10% 90%'},rgba(99,116,245,0.05) 0%,transparent 60%)`
                  }}
                >
                  {/* Category badge */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                      {action.category}
                    </span>
                  </div>

                  {/* Special badges */}
                  {action.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                        <SafeIcon icon={FiStar} className="w-3 h-3 mr-1" />
                        {action.badge}
                      </span>
                    </div>
                  )}

                  {/* Highlight badge */}
                  {action.highlight && !action.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                        <SafeIcon icon={FiStar} className="w-3 h-3 mr-1" />
                        Featured
                      </span>
                    </div>
                  )}

                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${action.color} mb-4 mt-6`}>
                    <SafeIcon icon={action.icon} className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-bold mb-2">{action.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    {action.description}
                  </p>

                  <div className="flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                    <span>Get Started</span>
                    <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Decorative element */}
                  <div className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-r ${action.color} opacity-5 rounded-full blur-xl`}></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Wellness Resources Preview Section */}
      <motion.div
        initial={{opacity: 0,y: 20}}
        animate={{opacity: 1,y: 0}}
        transition={{delay: 0.6}}
        className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600">
              <SafeIcon icon={FiLeaf} className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Featured Wellness Resources</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Quick access to popular meditation guides, techniques, and recipes</p>
            </div>
          </div>
          <Link 
            to="/resources" 
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium transition-colors"
          >
            <span>View All</span>
            <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredResources.map((resource,index)=> (
            <motion.div
              key={resource.title}
              initial={{opacity: 0,y: 20}}
              animate={{opacity: 1,y: 0}}
              transition={{delay: 0.7 + index * 0.1}}
              whileHover={{scale: 1.02}}
              className="group cursor-pointer"
            >
              <Link to="/resources" className="block">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} transition-all duration-300 border border-transparent hover:border-primary-200 dark:hover:border-primary-700`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${resource.color}`}>
                      <SafeIcon icon={resource.icon} className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {resource.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {resource.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {resource.title}
                  </h4>
                  <div className="mt-2 flex items-center text-xs text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore Resource</span>
                    <SafeIcon icon={FiArrowRight} className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Resource Categories */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              {name: 'Meditation',icon: FiUser,count: '3'},
              {name: 'Breathing',icon: FiWind,count: '2'},
              {name: 'Stress Relief',icon: FiZap,count: '2'},
              {name: 'Sleep & Rest',icon: FiMoon,count: '1'},
              {name: 'Audio Guides',icon: FiHeadphones,count: '1'},
              {name: 'Recipes',icon: FiCoffee,count: '3'}
            ].map((category,index)=> (
              <Link
                key={category.name}
                to="/resources"
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-full text-sm transition-colors group"
              >
                <SafeIcon icon={category.icon} className="w-4 h-4 text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-primary-700 dark:group-hover:text-primary-300">
                  {category.name}
                </span>
                <span className="text-xs text-gray-500 bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded-full">
                  {category.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Daily Encouragement Section */}
      <motion.div
        initial={{opacity: 0,y: 20}}
        animate={{opacity: 1,y: 0}}
        transition={{delay: 0.8}}
        className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg relative overflow-hidden`}
        style={{
          backgroundImage: isDark 
            ? 'linear-gradient(to bottom right,rgba(31,41,55,0.9),rgba(17,24,39,0.9)),url(https://images.unsplash.com/photo-1506252374453-ef5237291d83?q=80&w=800&auto=format&fit=crop)'
            : 'linear-gradient(to bottom right,rgba(255,255,255,0.9),rgba(249,250,251,0.9)),url(https://images.unsplash.com/photo-1506252374453-ef5237291d83?q=80&w=800&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500">
            <SafeIcon icon={FiHeart} className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold">Daily Encouragement</h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {dailyEncouragement}
        </p>
        <div className="flex items-center justify-between">
          <Link 
            to="/daily" 
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium transition-colors"
          >
            <span>Get more encouragement</span>
            <SafeIcon icon={FiHeart} className="w-4 h-4" />
          </Link>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <SafeIcon icon={FiCalendar} className="w-4 h-4" />
            <span>Updates daily</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Access Grid */}
      <motion.div
        initial={{opacity: 0,y: 20}}
        animate={{opacity: 1,y: 0}}
        transition={{delay: 0.9}}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Recent Activity */}
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <SafeIcon icon={FiActivity} className="w-5 h-5 text-gray-400" />
          </div>
          {userData.progress && userData.progress.length > 0 ? (
            <div className="space-y-3">
              {userData.progress.slice(-3).reverse().map((entry,index)=> (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      entry.type === 'mood' ? 'bg-purple-500' :
                      entry.type === 'exercise' ? 'bg-green-500' :
                      entry.type === 'meditation' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}></div>
                    <div>
                      <p className="font-medium capitalize">{entry.type} Tracking</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">
                    {entry.value}/5
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <SafeIcon icon={FiActivity} className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400 mb-3">No activity yet</p>
              <Link 
                to="/progress" 
                className="inline-flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:underline"
              >
                <span>Start tracking</span>
                <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Achievements */}
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Latest Achievement</h3>
            <SafeIcon icon={FiAward} className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
              <SafeIcon icon={FiStar} className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold mb-2">Welcome Aboard!</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              You've taken the first step in your wellness journey
            </p>
            <Link 
              to="/profile" 
              className="inline-flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:underline"
            >
              <span>View all achievements</span>
              <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{opacity: 0,y: 20}}
        animate={{opacity: 1,y: 0}}
        transition={{delay: 1.0}}
        className={`p-6 rounded-2xl text-center ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' : 'bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200'} shadow-lg`}
        style={{
          backgroundImage: isDark 
            ? 'linear-gradient(to bottom right,rgba(31,41,55,0.9),rgba(17,24,39,0.9)),url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop)'
            : 'linear-gradient(to bottom right,rgba(252,231,243,0.9),rgba(237,233,254,0.9)),url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <SafeIcon icon={FiUsers} className="w-12 h-12 text-primary-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Ready to Begin Your Wellness Journey?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Start with our comprehensive wellness assessment to understand your current state and get personalized recommendations for your mental health and wellbeing.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            to="/wellness-assessment" 
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <SafeIcon icon={FiClipboard} className="w-5 h-5" />
            <span>Take Wellness Assessment</span>
          </Link>
          <Link 
            to="/resources" 
            className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <SafeIcon icon={FiLeaf} className="w-5 h-5" />
            <span>Explore Resources</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;