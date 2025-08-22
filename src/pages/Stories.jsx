import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBookOpen, FiHeart, FiUser, FiCalendar, FiTag, FiArrowLeft, FiShare2, FiSearch, FiFilter } = FiIcons;

const Stories = () => {
  const { stories } = useData();
  const { isDark } = useTheme();
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { value: 'all', label: 'All Stories', count: stories.length },
    { value: 'Mindfulness', label: 'Mindfulness', count: stories.filter(s => s.category === 'Mindfulness').length },
    { value: 'Anxiety', label: 'Anxiety', count: stories.filter(s => s.category === 'Anxiety').length },
    { value: 'Depression', label: 'Depression', count: stories.filter(s => s.category === 'Depression').length },
    { value: 'Trauma Recovery', label: 'Trauma Recovery', count: stories.filter(s => s.category === 'Trauma Recovery').length },
    { value: 'Personal Growth', label: 'Personal Growth', count: stories.filter(s => s.category === 'Personal Growth').length },
    { value: 'Relationships', label: 'Relationships', count: stories.filter(s => s.category === 'Relationships').length },
    { value: 'Life Transitions', label: 'Life Transitions', count: stories.filter(s => s.category === 'Life Transitions').length },
    { value: 'Grief', label: 'Grief & Loss', count: stories.filter(s => s.category === 'Grief').length },
    { value: 'Burnout', label: 'Burnout', count: stories.filter(s => s.category === 'Burnout').length },
    { value: 'Perfectionism', label: 'Perfectionism', count: stories.filter(s => s.category === 'Perfectionism').length },
    { value: 'Neurodiversity', label: 'Neurodiversity', count: stories.filter(s => s.category === 'Neurodiversity').length },
    { value: 'Social Anxiety', label: 'Social Anxiety', count: stories.filter(s => s.category === 'Social Anxiety').length },
    { value: 'Chronic Illness', label: 'Chronic Illness', count: stories.filter(s => s.category === 'Chronic Illness').length },
    { value: 'Bipolar Disorder', label: 'Bipolar Disorder', count: stories.filter(s => s.category === 'Bipolar Disorder').length },
    { value: 'Eating Disorders', label: 'Eating Disorders', count: stories.filter(s => s.category === 'Eating Disorders').length },
    { value: 'Family Healing', label: 'Family Healing', count: stories.filter(s => s.category === 'Family Healing').length },
    { value: 'Community Support', label: 'Community Support', count: stories.filter(s => s.category === 'Community Support').length },
    { value: 'Career Transition', label: 'Career Transition', count: stories.filter(s => s.category === 'Career Transition').length },
    { value: 'Happiness', label: 'Finding Joy', count: stories.filter(s => s.category === 'Happiness').length }
  ].filter(cat => cat.count > 0); // Only show categories that have stories

  const filteredStories = stories.filter(story => {
    const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory;
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShare = async (story) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: story.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      const shareText = `${story.title}\n\n${story.excerpt}\n\nRead more inspiring stories at EncouraMind`;
      navigator.clipboard.writeText(shareText);
      alert('Story details copied to clipboard!');
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Mindfulness': 'from-purple-500 to-indigo-500',
      'Anxiety': 'from-blue-500 to-cyan-500',
      'Depression': 'from-indigo-500 to-purple-500',
      'Trauma Recovery': 'from-pink-500 to-rose-500',
      'Personal Growth': 'from-green-500 to-teal-500',
      'Relationships': 'from-red-500 to-pink-500',
      'Life Transitions': 'from-orange-500 to-yellow-500',
      'Grief': 'from-gray-500 to-slate-500',
      'Burnout': 'from-amber-500 to-orange-500',
      'Perfectionism': 'from-violet-500 to-purple-500',
      'Neurodiversity': 'from-emerald-500 to-green-500',
      'Social Anxiety': 'from-sky-500 to-blue-500',
      'Chronic Illness': 'from-teal-500 to-cyan-500',
      'Bipolar Disorder': 'from-fuchsia-500 to-pink-500',
      'Eating Disorders': 'from-rose-500 to-red-500',
      'Family Healing': 'from-lime-500 to-green-500',
      'Community Support': 'from-blue-500 to-indigo-500',
      'Career Transition': 'from-yellow-500 to-amber-500',
      'Happiness': 'from-yellow-400 to-orange-400'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  if (selectedStory) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        className="max-w-4xl mx-auto"
      >
        {/* Story Header */}
        <div className="mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedStory(null)}
            className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-4"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
            <span>Back to Stories</span>
          </motion.button>

          <div className={`relative h-64 rounded-2xl overflow-hidden mb-6 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <img
              src={selectedStory.image || "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop"}
              alt={selectedStory.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden w-full h-full bg-gradient-to-br from-primary-500 to-secondary-600 items-center justify-center">
              <SafeIcon icon={FiBookOpen} className="w-16 h-16 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className={`inline-block px-3 py-1 bg-gradient-to-r ${getCategoryColor(selectedStory.category)} rounded-full text-sm mb-2`}>
                {selectedStory.category}
              </span>
              <h1 className="text-3xl font-bold mb-2">{selectedStory.title}</h1>
              <div className="flex items-center space-x-4 text-sm opacity-90">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiUser} className="w-4 h-4" />
                  <span>{selectedStory.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                  <span>{new Date(selectedStory.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
          style={{
            backgroundImage: isDark 
              ? 'linear-gradient(to bottom right, rgba(31,41,55,0.97), rgba(17,24,39,0.97)), url(https://images.unsplash.com/photo-1506252374453-ef5237291d83?q=80&w=800&auto=format&fit=crop)'
              : 'linear-gradient(to bottom right, rgba(255,255,255,0.97), rgba(249,250,251,0.97)), url(https://images.unsplash.com/photo-1506252374453-ef5237291d83?q=80&w=800&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="prose max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
              {selectedStory.content}
            </p>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiUser} className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{selectedStory.author}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Story Contributor</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare(selectedStory)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <SafeIcon icon={FiShare2} className="w-4 h-4" />
                  <span>Share Story</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h3 className="text-xl font-semibold mb-4">More Stories Like This</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {stories
              .filter(story => story.id !== selectedStory.id && story.category === selectedStory.category)
              .slice(0, 2)
              .map(story => (
                <motion.div
                  key={story.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedStory(story)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${isDark ? 'bg-gray-800 border border-gray-700 hover:border-primary-500' : 'bg-white border border-gray-200 hover:border-primary-300'} shadow-lg hover:shadow-xl`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${getCategoryColor(story.category)}`}>
                      <SafeIcon icon={FiBookOpen} className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{story.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {story.excerpt}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-full mb-4"
        >
          <SafeIcon icon={FiBookOpen} className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-3xl font-bold mb-2">Inspiring Stories of Hope & Healing</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Real stories of resilience, recovery, and personal growth from our community. 
          Find hope, understanding, and inspiration in these authentic journeys of mental health and wellness.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search stories by title, content, or author..."
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
              <option key={category.value} value={category.value}>
                {category.label} ({category.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-2 justify-center mb-6"
      >
        {categories.slice(0, 8).map(category => (
          <motion.button
            key={category.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category.value
                ? `bg-gradient-to-r ${getCategoryColor(category.label)} text-white shadow-lg`
                : `${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
            }`}
          >
            {category.label} ({category.count})
          </motion.button>
        ))}
      </motion.div>

      {/* Stories Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedStory(story)}
              className={`cursor-pointer rounded-2xl overflow-hidden ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={story.image || "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop"}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-primary-500 to-secondary-600 items-center justify-center">
                  <SafeIcon icon={FiBookOpen} className="w-12 h-12 text-white" />
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`inline-block px-3 py-1 bg-gradient-to-r ${getCategoryColor(story.category)} text-white text-xs rounded-full font-medium`}>
                    {story.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">{story.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {story.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiUser} className="w-4 h-4" />
                    <span>{story.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                    <span>{new Date(story.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="mt-4 flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-medium"
                >
                  <span>Read Story</span>
                  <SafeIcon icon={FiBookOpen} className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredStories.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <SafeIcon icon={FiBookOpen} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Stories Found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            No stories match your current search or filter. Try adjusting your criteria or explore different categories.
          </p>
        </motion.div>
      )}

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
      >
        <h3 className="text-lg font-semibold mb-4">Story Collection</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{stories.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Stories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">{categories.length - 1}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent-600 dark:text-accent-400">{new Set(stories.map(s => s.author)).size}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Contributors</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Real Stories</div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`p-6 rounded-2xl text-center ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' : 'bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200'}`}
        style={{
          backgroundImage: isDark 
            ? 'linear-gradient(to bottom right, rgba(31,41,55,0.9), rgba(17,24,39,0.9)), url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop)'
            : 'linear-gradient(to bottom right, rgba(252,231,243,0.9), rgba(237,233,254,0.9)), url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <SafeIcon icon={FiHeart} className="w-12 h-12 text-primary-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Share Your Story of Hope</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto">
          Your journey of healing, growth, and resilience could inspire others facing similar challenges. 
          Every story shared is a beacon of hope for someone who needs it.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          Submit Your Story
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Stories;