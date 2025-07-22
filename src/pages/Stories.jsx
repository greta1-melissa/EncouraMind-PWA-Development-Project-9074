import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBookOpen, FiHeart, FiUser, FiCalendar, FiTag, FiArrowLeft, FiShare2 } = FiIcons;

const Stories = () => {
  const { stories } = useData();
  const { isDark } = useTheme();
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Stories' },
    { value: 'Mindfulness', label: 'Mindfulness' },
    { value: 'Anxiety', label: 'Anxiety' },
    { value: 'Happiness', label: 'Happiness' },
    { value: 'Depression', label: 'Depression' },
    { value: 'Growth', label: 'Personal Growth' }
  ];

  const filteredStories =
    selectedCategory === 'all' ? stories : stories.filter(story => story.category === selectedCategory);

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
    }
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
            className="flex items-center space-x-2 text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 mb-4"
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
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-2">
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
          className={`p-8 rounded-2xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          } shadow-lg`}
          style={{
            backgroundImage: isDark
              ? 'linear-gradient(to bottom right, rgba(31, 41, 55, 0.97), rgba(17, 24, 39, 0.97)), url(https://images.unsplash.com/photo-1506252374453-ef5237291d83?q=80&w=800&auto=format&fit=crop)'
              : 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.97), rgba(249, 250, 251, 0.97)), url(https://images.unsplash.com/photo-1506252374453-ef5237291d83?q=80&w=800&auto=format&fit=crop)',
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
          <h3 className="text-xl font-semibold mb-4">More Inspiring Stories</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {stories
              .filter(
                story => story.id !== selectedStory.id && story.category === selectedStory.category
              )
              .slice(0, 2)
              .map(story => (
                <motion.div
                  key={story.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedStory(story)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    isDark
                      ? 'bg-gray-800 border border-gray-700 hover:border-secondary-500'
                      : 'bg-white border border-gray-200 hover:border-secondary-300'
                  } shadow-lg hover:shadow-xl`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center">
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
        <h1 className="text-3xl font-bold mb-2">Inspiring Stories</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Real stories of hope, healing, and personal growth from our community
        </p>
      </div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-2 justify-center"
      >
        {categories.map(category => (
          <motion.button
            key={category.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category.value
                ? 'bg-gradient-to-r from-primary-500 to-secondary-600 text-white shadow-lg'
                : `${
                    isDark
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`
            }`}
          >
            {category.label}
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
              className={`cursor-pointer rounded-2xl overflow-hidden ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              } shadow-lg hover:shadow-xl transition-all duration-300`}
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
                  <span className="inline-block px-3 py-1 bg-black/20 backdrop-blur-sm text-white text-xs rounded-full">
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
                  className="mt-4 flex items-center space-x-2 text-secondary-600 dark:text-secondary-400 font-medium"
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
            No stories available in this category yet. Check back soon for inspiring content!
          </p>
        </motion.div>
      )}

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`p-6 rounded-2xl text-center ${
          isDark
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700'
            : 'bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200'
        }`}
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(to bottom right, rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.9)), url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop)'
            : 'linear-gradient(to bottom right, rgba(252, 231, 243, 0.9), rgba(237, 233, 254, 0.9)), url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <SafeIcon icon={FiHeart} className="w-12 h-12 text-primary-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Share Your Story</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Your journey could inspire others. Share your story of growth, healing, and hope.
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