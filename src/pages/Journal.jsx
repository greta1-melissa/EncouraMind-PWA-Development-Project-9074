import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiBookOpen, FiPlus, FiSearch, FiFilter, FiEdit3, FiTrash2, 
  FiCalendar, FiClock, FiHeart, FiSave, FiX, FiEye, FiLock,
  FiSun, FiMoon, FiCloud, FiCloudRain, FiZap, FiStar,
  FiSmile, FiMeh, FiFrown, FiTrendingUp, FiBookmark,
  FiDownload, FiShare2
} = FiIcons;

const Journal = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [currentEntry, setCurrentEntry] = useState({
    title: '',
    content: '',
    mood: 'neutral',
    tags: [],
    isPrivate: true,
    weather: 'sunny'
  });

  const moods = [
    { value: 'excellent', label: 'Excellent', icon: FiStar, color: 'text-green-500' },
    { value: 'happy', label: 'Happy', icon: FiSmile, color: 'text-blue-500' },
    { value: 'neutral', label: 'Neutral', icon: FiMeh, color: 'text-yellow-500' },
    { value: 'sad', label: 'Sad', icon: FiFrown, color: 'text-orange-500' },
    { value: 'anxious', label: 'Anxious', icon: FiZap, color: 'text-red-500' }
  ];

  const weatherOptions = [
    { value: 'sunny', label: 'Sunny', icon: FiSun },
    { value: 'cloudy', label: 'Cloudy', icon: FiCloud },
    { value: 'rainy', label: 'Rainy', icon: FiCloudRain },
    { value: 'night', label: 'Night', icon: FiMoon }
  ];

  const commonTags = [
    'gratitude', 'reflection', 'goals', 'challenges', 'growth',
    'relationships', 'work', 'health', 'creativity', 'mindfulness',
    'anxiety', 'depression', 'therapy', 'self-care', 'breakthrough',
    'setback', 'learning', 'family', 'friends', 'dreams'
  ];

  // Load journal entries on component mount
  useEffect(() => {
    loadJournalEntries();
  }, [user]);

  const loadJournalEntries = () => {
    try {
      const userKey = `journal_entries_${user?.id || 'default'}`;
      const saved = localStorage.getItem(userKey);
      if (saved) {
        const parsedEntries = JSON.parse(saved);
        setEntries(parsedEntries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (error) {
      console.error('Error loading journal entries:', error);
    }
  };

  const saveJournalEntries = (updatedEntries) => {
    try {
      const userKey = `journal_entries_${user?.id || 'default'}`;
      localStorage.setItem(userKey, JSON.stringify(updatedEntries));
      setEntries(updatedEntries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error('Error saving journal entries:', error);
    }
  };

  const handleSaveEntry = () => {
    if (!currentEntry.title.trim() || !currentEntry.content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    const now = new Date().toISOString();
    let updatedEntries;

    if (editingEntry) {
      // Update existing entry
      updatedEntries = entries.map(entry =>
        entry.id === editingEntry.id
          ? { ...currentEntry, id: editingEntry.id, updatedAt: now }
          : entry
      );
    } else {
      // Create new entry
      const newEntry = {
        ...currentEntry,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now
      };
      updatedEntries = [newEntry, ...entries];
    }

    saveJournalEntries(updatedEntries);
    resetEditor();
  };

  const resetEditor = () => {
    setCurrentEntry({
      title: '',
      content: '',
      mood: 'neutral',
      tags: [],
      isPrivate: true,
      weather: 'sunny'
    });
    setShowEditor(false);
    setEditingEntry(null);
  };

  const handleEditEntry = (entry) => {
    setCurrentEntry({ ...entry });
    setEditingEntry(entry);
    setShowEditor(true);
  };

  const handleDeleteEntry = (entryId) => {
    if (confirm('Are you sure you want to delete this journal entry? This action cannot be undone.')) {
      const updatedEntries = entries.filter(entry => entry.id !== entryId);
      saveJournalEntries(updatedEntries);
    }
  };

  const handleTagToggle = (tag) => {
    const updatedTags = currentEntry.tags.includes(tag)
      ? currentEntry.tags.filter(t => t !== tag)
      : [...currentEntry.tags, tag];
    setCurrentEntry({ ...currentEntry, tags: updatedTags });
  };

  const exportEntries = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `journal_entries_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Filter entries based on search, mood, and tags
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = selectedMood === 'all' || entry.mood === selectedMood;
    const matchesTag = selectedTag === 'all' || entry.tags.includes(selectedTag);
    return matchesSearch && matchesMood && matchesTag;
  });

  // Get unique tags from all entries
  const allTags = [...new Set(entries.flatMap(entry => entry.tags))];

  const getMoodIcon = (mood) => {
    const moodData = moods.find(m => m.value === mood);
    return moodData ? moodData.icon : FiMeh;
  };

  const getMoodColor = (mood) => {
    const moodData = moods.find(m => m.value === mood);
    return moodData ? moodData.color : 'text-gray-500';
  };

  const getWeatherIcon = (weather) => {
    const weatherData = weatherOptions.find(w => w.value === weather);
    return weatherData ? weatherData.icon : FiSun;
  };

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getMoodStats = () => {
    const moodCounts = moods.reduce((acc, mood) => {
      acc[mood.value] = entries.filter(entry => entry.mood === mood.value).length;
      return acc;
    }, {});
    return moodCounts;
  };

  if (showEditor) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Editor Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {editingEntry ? 'Edit Journal Entry' : 'New Journal Entry'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Express your thoughts in your private space
            </p>
          </div>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetEditor}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <SafeIcon icon={FiX} className="w-4 h-4" />
              <span>Cancel</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveEntry}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <SafeIcon icon={FiSave} className="w-4 h-4" />
              <span>Save Entry</span>
            </motion.button>
          </div>
        </div>

        {/* Editor Form */}
        <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Entry Title</label>
              <input
                type="text"
                value={currentEntry.title}
                onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
                placeholder="What's on your mind today?"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
                maxLength={100}
              />
              <div className="text-xs text-gray-500 mt-1">{currentEntry.title.length}/100 characters</div>
            </div>

            {/* Mood and Weather */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">How are you feeling?</label>
                <div className="flex space-x-2">
                  {moods.map(mood => (
                    <button
                      key={mood.value}
                      onClick={() => setCurrentEntry({ ...currentEntry, mood: mood.value })}
                      className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                        currentEntry.mood === mood.value
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                      }`}
                    >
                      <SafeIcon icon={mood.icon} className={`w-6 h-6 mb-1 ${mood.color}`} />
                      <span className="text-xs font-medium">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Weather/Atmosphere</label>
                <div className="flex space-x-2">
                  {weatherOptions.map(weather => (
                    <button
                      key={weather.value}
                      onClick={() => setCurrentEntry({ ...currentEntry, weather: weather.value })}
                      className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                        currentEntry.weather === weather.value
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                      }`}
                    >
                      <SafeIcon icon={weather.icon} className="w-6 h-6 mb-1 text-gray-600 dark:text-gray-400" />
                      <span className="text-xs font-medium">{weather.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium mb-2">Your Thoughts</label>
              <textarea
                value={currentEntry.content}
                onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
                placeholder="Write about your day, feelings, thoughts, experiences, or anything that comes to mind..."
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 resize-none"
                rows={12}
                maxLength={5000}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{getWordCount(currentEntry.content)} words</span>
                <span>{currentEntry.content.length}/5000 characters</span>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2">Tags (optional)</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {commonTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 text-sm rounded-full border transition-all ${
                      currentEntry.tags.includes(tag)
                        ? 'bg-primary-500 text-white border-primary-500'
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="text-xs text-gray-500">
                Selected tags: {currentEntry.tags.length > 0 ? currentEntry.tags.join(', ') : 'None'}
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiLock} className="w-5 h-5 text-green-600 dark:text-green-400" />
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-300">Private & Secure</h4>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    This journal entry is completely private and only visible to you. It's stored securely in your personal account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Personal Journal</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your private space for thoughts, reflections, and personal growth
          </p>
        </div>
        <div className="flex space-x-2">
          {entries.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportEntries}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <SafeIcon icon={FiDownload} className="w-4 h-4" />
              <span>Export</span>
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowEditor(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <SafeIcon icon={FiPlus} className="w-5 h-5" />
            <span>New Entry</span>
          </motion.button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Entries', value: entries.length, icon: FiBookOpen, color: 'from-blue-500 to-cyan-600' },
          { label: 'This Month', value: entries.filter(e => new Date(e.createdAt).getMonth() === new Date().getMonth()).length, icon: FiCalendar, color: 'from-green-500 to-teal-600' },
          { label: 'Total Words', value: entries.reduce((sum, entry) => sum + getWordCount(entry.content), 0), icon: FiEdit3, color: 'from-purple-500 to-pink-600' },
          { label: 'Streak Days', value: 7, icon: FiTrendingUp, color: 'from-orange-500 to-red-600' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
          >
            <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.color} mb-3`}>
              <SafeIcon icon={stat.icon} className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Mood Overview */}
      {entries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
        >
          <h3 className="text-lg font-semibold mb-4">Mood Tracking</h3>
          <div className="grid grid-cols-5 gap-4">
            {moods.map(mood => {
              const count = getMoodStats()[mood.value];
              const percentage = entries.length > 0 ? Math.round((count / entries.length) * 100) : 0;
              return (
                <div key={mood.value} className="text-center">
                  <SafeIcon icon={mood.icon} className={`w-8 h-8 mx-auto mb-2 ${mood.color}`} />
                  <div className="text-lg font-bold">{count}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{mood.label}</div>
                  <div className="text-xs text-gray-500">{percentage}%</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Search and Filters */}
      {entries.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your journal entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-400" />
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Moods</option>
              {moods.map(mood => (
                <option key={mood.value} value={mood.value}>{mood.label}</option>
              ))}
            </select>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Journal Entries */}
      {filteredEntries.length > 0 ? (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <SafeIcon 
                        icon={getMoodIcon(entry.mood)} 
                        className={`w-5 h-5 ${getMoodColor(entry.mood)}`} 
                      />
                      <SafeIcon 
                        icon={getWeatherIcon(entry.weather)} 
                        className="w-4 h-4 text-gray-500" 
                      />
                      <h3 className="text-xl font-semibold flex-1">{entry.title}</h3>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                        <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiClock} className="w-4 h-4" />
                        <span>{new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <span>{getWordCount(entry.content)} words</span>
                      {entry.updatedAt !== entry.createdAt && (
                        <span className="text-xs text-blue-500">Edited</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditEntry(entry)}
                      className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                      title="Edit entry"
                    >
                      <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete entry"
                    >
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
                  {entry.content}
                </p>

                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : entries.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <SafeIcon icon={FiSearch} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No entries found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or filters
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center py-16 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
        >
          <SafeIcon icon={FiBookOpen} className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold mb-4">Welcome to Your Personal Journal</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            This is your private space to express thoughts, track moods, and reflect on your journey. 
            Start by writing your first entry.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowEditor(true)}
            className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
          >
            Write Your First Entry
          </motion.button>
          
          <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <SafeIcon icon={FiLock} className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="font-semibold text-green-800 dark:text-green-300">100% Private</span>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400">
              Your journal entries are completely private and only visible to you
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Journal;