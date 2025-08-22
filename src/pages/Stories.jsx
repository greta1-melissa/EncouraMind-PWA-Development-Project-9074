import React,{useState,useEffect} from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import {useData} from '../contexts/DataContext';
import {useTheme} from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiBookOpen,FiHeart,FiUser,FiCalendar,FiTag,FiArrowLeft,FiShare2,FiSearch,FiFilter,FiSend,FiX,FiCheck,FiClock,FiImage,FiUpload,FiLink,FiTrash2,FiEdit3,FiCamera,FiRotateCcw}=FiIcons;

const Stories=()=> {
  const {stories: defaultStories}=useData();
  const {isDark}=useTheme();
  const [selectedStory,setSelectedStory]=useState(null);
  const [selectedCategory,setSelectedCategory]=useState('all');
  const [searchTerm,setSearchTerm]=useState('');
  const [showSubmissionModal,setShowSubmissionModal]=useState(false);
  const [submittedStories,setSubmittedStories]=useState([]);
  const [submissionForm,setSubmissionForm]=useState({
    title: '',
    content: '',
    category: 'Personal Growth',
    authorName: '',
    isAnonymous: false,
    email: '',
    backgroundImage: '',
    imageType: 'preset' // 'preset', 'url', 'upload'
  });
  const [submissionStatus,setSubmissionStatus]=useState('');// '', 'submitting', 'success', 'error'
  const [imagePreview,setImagePreview]=useState('');
  const [uploadProgress,setUploadProgress]=useState(0);
  const [imageError,setImageError]=useState('');
  const [dragActive,setDragActive]=useState(false);

  // Enhanced preset background images for stories
  const presetImages = [
    {
      id: 'sunrise',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop',
      name: 'Peaceful Sunrise',
      category: 'Nature',
      mood: 'Hopeful'
    },
    {
      id: 'forest',
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop',
      name: 'Serene Forest',
      category: 'Nature',
      mood: 'Calm'
    },
    {
      id: 'ocean',
      url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&auto=format&fit=crop',
      name: 'Calm Ocean',
      category: 'Nature',
      mood: 'Peaceful'
    },
    {
      id: 'mountain',
      url: 'https://images.unsplash.com/photo-1464822759844-d150baef493e?w=800&auto=format&fit=crop',
      name: 'Mountain Vista',
      category: 'Nature',
      mood: 'Inspiring'
    },
    {
      id: 'sunset',
      url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&auto=format&fit=crop',
      name: 'Golden Sunset',
      category: 'Nature',
      mood: 'Warm'
    },
    {
      id: 'flowers',
      url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&auto=format&fit=crop',
      name: 'Blooming Flowers',
      category: 'Nature',
      mood: 'Joyful'
    },
    {
      id: 'abstract-1',
      url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&auto=format&fit=crop',
      name: 'Soft Abstract',
      category: 'Abstract',
      mood: 'Creative'
    },
    {
      id: 'abstract-2',
      url: 'https://images.unsplash.com/photo-1506252374453-ef5237291d83?w=800&auto=format&fit=crop',
      name: 'Gentle Waves',
      category: 'Abstract',
      mood: 'Flowing'
    },
    {
      id: 'library',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop',
      name: 'Cozy Library',
      category: 'Indoor',
      mood: 'Contemplative'
    },
    {
      id: 'coffee',
      url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop',
      name: 'Coffee Moment',
      category: 'Indoor',
      mood: 'Comfortable'
    },
    {
      id: 'bridge',
      url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&auto=format&fit=crop',
      name: 'Golden Gate Bridge',
      category: 'Urban',
      mood: 'Aspirational'
    },
    {
      id: 'city-lights',
      url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop',
      name: 'City Lights',
      category: 'Urban',
      mood: 'Dynamic'
    },
    {
      id: 'garden',
      url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop',
      name: 'Secret Garden',
      category: 'Nature',
      mood: 'Mysterious'
    },
    {
      id: 'waterfall',
      url: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&auto=format&fit=crop',
      name: 'Peaceful Waterfall',
      category: 'Nature',
      mood: 'Refreshing'
    },
    {
      id: 'desert',
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop',
      name: 'Desert Landscape',
      category: 'Nature',
      mood: 'Resilient'
    }
  ];

  // Load submitted stories from localStorage
  useEffect(()=> {
    loadSubmittedStories();
  },[]);

  const loadSubmittedStories=()=> {
    try {
      const saved=localStorage.getItem('storySubmissions');
      if (saved) {
        const submissions=JSON.parse(saved);
        // Convert submitted stories to the same format as default stories
        const formattedSubmissions=submissions.map(submission=> ({
          id: submission.id,
          title: submission.title,
          excerpt: submission.excerpt || submission.content.substring(0,150) + '...',
          content: submission.content,
          author: submission.author,
          date: submission.submittedAt,
          category: submission.category,
          image: submission.backgroundImage || null,
          isSubmitted: true // Flag to identify submitted stories
        }));
        setSubmittedStories(formattedSubmissions);
      }
    } catch (error) {
      console.error('Error loading submitted stories:',error);
    }
  };

  // Delete a submitted story
  const deleteSubmittedStory=(storyId)=> {
    if (confirm('Are you sure you want to delete this story? This action cannot be undone.')) {
      try {
        const saved=localStorage.getItem('storySubmissions');
        if (saved) {
          const submissions=JSON.parse(saved);
          const updatedSubmissions=submissions.filter(submission=> submission.id !==storyId);
          localStorage.setItem('storySubmissions',JSON.stringify(updatedSubmissions));
          loadSubmittedStories();// Reload the stories
          
          // If we're currently viewing the deleted story,go back to the list
          if (selectedStory && selectedStory.id===storyId) {
            setSelectedStory(null);
          }
          
          alert('Story deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting story:',error);
        alert('Failed to delete story. Please try again.');
      }
    }
  };

  // Combine default stories with submitted stories
  const allStories=[...defaultStories,...submittedStories];

  const submissionCategories=[
    'Personal Growth',
    'Mindfulness',
    'Anxiety',
    'Depression', 
    'Trauma Recovery',
    'Relationships',
    'Life Transitions',
    'Grief & Loss',
    'Burnout',
    'Perfectionism',
    'Neurodiversity',
    'Social Anxiety',
    'Chronic Illness',
    'Bipolar Disorder',
    'Eating Disorders',
    'Family Healing',
    'Community Support',
    'Career Transition',
    'Finding Joy'
  ];

  // Update categories to include all stories
  const categories=[
    {value: 'all',label: 'All Stories',count: allStories.length},
    {value: 'Mindfulness',label: 'Mindfulness',count: allStories.filter(s=> s.category==='Mindfulness').length},
    {value: 'Anxiety',label: 'Anxiety',count: allStories.filter(s=> s.category==='Anxiety').length},
    {value: 'Depression',label: 'Depression',count: allStories.filter(s=> s.category==='Depression').length},
    {value: 'Trauma Recovery',label: 'Trauma Recovery',count: allStories.filter(s=> s.category==='Trauma Recovery').length},
    {value: 'Personal Growth',label: 'Personal Growth',count: allStories.filter(s=> s.category==='Personal Growth').length},
    {value: 'Relationships',label: 'Relationships',count: allStories.filter(s=> s.category==='Relationships').length},
    {value: 'Life Transitions',label: 'Life Transitions',count: allStories.filter(s=> s.category==='Life Transitions').length},
    {value: 'Grief & Loss',label: 'Grief & Loss',count: allStories.filter(s=> s.category==='Grief & Loss' || s.category==='Grief').length},
    {value: 'Burnout',label: 'Burnout',count: allStories.filter(s=> s.category==='Burnout').length},
    {value: 'Perfectionism',label: 'Perfectionism',count: allStories.filter(s=> s.category==='Perfectionism').length},
    {value: 'Neurodiversity',label: 'Neurodiversity',count: allStories.filter(s=> s.category==='Neurodiversity').length},
    {value: 'Social Anxiety',label: 'Social Anxiety',count: allStories.filter(s=> s.category==='Social Anxiety').length},
    {value: 'Chronic Illness',label: 'Chronic Illness',count: allStories.filter(s=> s.category==='Chronic Illness').length},
    {value: 'Bipolar Disorder',label: 'Bipolar Disorder',count: allStories.filter(s=> s.category==='Bipolar Disorder').length},
    {value: 'Eating Disorders',label: 'Eating Disorders',count: allStories.filter(s=> s.category==='Eating Disorders').length},
    {value: 'Family Healing',label: 'Family Healing',count: allStories.filter(s=> s.category==='Family Healing').length},
    {value: 'Community Support',label: 'Community Support',count: allStories.filter(s=> s.category==='Community Support').length},
    {value: 'Career Transition',label: 'Career Transition',count: allStories.filter(s=> s.category==='Career Transition').length},
    {value: 'Finding Joy',label: 'Finding Joy',count: allStories.filter(s=> s.category==='Finding Joy' || s.category==='Happiness').length}
  ].filter(cat=> cat.count > 0);

  // Filter stories based on search and category
  const filteredStories=allStories.filter(story=> {
    const matchesCategory=selectedCategory==='all' || 
      story.category===selectedCategory || 
      (selectedCategory==='Grief & Loss' && story.category==='Grief') ||
      (selectedCategory==='Finding Joy' && story.category==='Happiness');
    
    const matchesSearch=story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        story.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        story.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShare=async (story)=> {
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: story.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:',err);
      }
    } else {
      const shareText=`${story.title}\n\n${story.excerpt}\n\nRead more inspiring stories at EncouraMind`;
      navigator.clipboard.writeText(shareText);
      alert('Story details copied to clipboard!');
    }
  };

  const getCategoryColor=(category)=> {
    const colors={
      'Mindfulness': 'from-purple-500 to-indigo-500',
      'Anxiety': 'from-blue-500 to-cyan-500',
      'Depression': 'from-indigo-500 to-purple-500',
      'Trauma Recovery': 'from-pink-500 to-rose-500',
      'Personal Growth': 'from-green-500 to-teal-500',
      'Relationships': 'from-red-500 to-pink-500',
      'Life Transitions': 'from-orange-500 to-yellow-500',
      'Grief': 'from-gray-500 to-slate-500',
      'Grief & Loss': 'from-gray-500 to-slate-500',
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
      'Happiness': 'from-yellow-400 to-orange-400',
      'Finding Joy': 'from-yellow-400 to-orange-400'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  const handleSubmissionChange=(field,value)=> {
    setSubmissionForm(prev=> ({
      ...prev,
      [field]: value
    }));

    // Handle image preview
    if (field==='backgroundImage' && submissionForm.imageType==='preset') {
      const presetImage=presetImages.find(img=> img.id===value);
      setImagePreview(presetImage ? presetImage.url : '');
    } else if (field==='backgroundImage' && submissionForm.imageType==='url') {
      setImagePreview(value);
    }
  };

  const handleImageTypeChange=(type)=> {
    setSubmissionForm(prev=> ({
      ...prev,
      imageType: type,
      backgroundImage: ''
    }));
    setImagePreview('');
    setImageError('');
    setUploadProgress(0);
  };

  // Enhanced file validation
  const validateImageFile=(file)=> {
    const validTypes=['image/jpeg','image/jpg','image/png','image/gif','image/webp'];
    const maxSize=10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      return 'Please select a valid image file (JPEG, PNG, GIF, or WebP)';
    }

    if (file.size > maxSize) {
      return 'Image size must be less than 10MB';
    }

    return null;
  };

  // Enhanced file upload with progress simulation
  const handleFileUpload=async (file)=> {
    const validationError=validateImageFile(file);
    if (validationError) {
      setImageError(validationError);
      return;
    }

    setImageError('');
    setUploadProgress(0);

    try {
      const reader=new FileReader();
      
      reader.onloadstart=()=> {
        setUploadProgress(10);
      };

      reader.onprogress=(event)=> {
        if (event.lengthComputable) {
          const progress=Math.round((event.loaded / event.total) * 80) + 10;
          setUploadProgress(progress);
        }
      };

      reader.onload=(e)=> {
        const base64=e.target.result;
        
        // Create image to check dimensions
        const img=new Image();
        img.onload=()=> {
          // Simulate final processing
          setTimeout(()=> {
            setSubmissionForm(prev=> ({
              ...prev,
              backgroundImage: base64
            }));
            setImagePreview(base64);
            setUploadProgress(100);
            
            // Reset progress after a short delay
            setTimeout(()=> {
              setUploadProgress(0);
            },1000);
          },300);
        };
        img.src=base64;
      };

      reader.onerror=()=> {
        setImageError('Error reading file. Please try again.');
        setUploadProgress(0);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      setImageError('Error uploading file. Please try again.');
      setUploadProgress(0);
    }
  };

  // Drag and drop handlers
  const handleDragEnter=(e)=> {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave=(e)=> {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver=(e)=> {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop=(e)=> {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files=e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInputChange=(event)=> {
    const file=event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const clearImage=()=> {
    setSubmissionForm(prev=> ({
      ...prev,
      backgroundImage: ''
    }));
    setImagePreview('');
    setImageError('');
    setUploadProgress(0);
  };

  const validateSubmission=()=> {
    const {title,content,authorName,isAnonymous,email}=submissionForm;
    
    if (!title.trim()) return 'Title is required';
    if (title.trim().length < 5) return 'Title must be at least 5 characters';
    if (!content.trim()) return 'Story content is required';
    if (content.trim().length < 100) return 'Story must be at least 100 characters';
    if (!isAnonymous && !authorName.trim()) return 'Author name is required when not submitting anonymously';
    if (!email.trim()) return 'Email is required for follow-up (will not be published)';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email address';
    
    return null;
  };

  const handleSubmitStory=async ()=> {
    const validationError=validateSubmission();
    if (validationError) {
      alert(validationError);
      return;
    }

    setSubmissionStatus('submitting');

    try {
      // Simulate submission process
      await new Promise(resolve=> setTimeout(resolve,2000));

      // Create new story object
      const newStory={
        id: Date.now(),
        title: submissionForm.title.trim(),
        content: submissionForm.content.trim(),
        category: submissionForm.category,
        author: submissionForm.isAnonymous ? 'Anonymous' : submissionForm.authorName.trim(),
        email: submissionForm.email.trim(),
        backgroundImage: submissionForm.backgroundImage || null,
        submittedAt: new Date().toISOString(),
        status: 'pending_review',
        excerpt: submissionForm.content.trim().substring(0,150) + '...'
      };

      // Save to localStorage
      const savedSubmissions=JSON.parse(localStorage.getItem('storySubmissions') || '[]');
      savedSubmissions.unshift(newStory);
      localStorage.setItem('storySubmissions',JSON.stringify(savedSubmissions));

      // Reload submitted stories to show the new one
      loadSubmittedStories();

      setSubmissionStatus('success');
      
      // Reset form after successful submission
      setTimeout(()=> {
        setSubmissionForm({
          title: '',
          content: '',
          category: 'Personal Growth',
          authorName: '',
          isAnonymous: false,
          email: '',
          backgroundImage: '',
          imageType: 'preset'
        });
        setImagePreview('');
        setImageError('');
        setUploadProgress(0);
        setSubmissionStatus('');
        setShowSubmissionModal(false);
      },3000);

    } catch (error) {
      console.error('Story submission error:',error);
      setSubmissionStatus('error');
      
      setTimeout(()=> {
        setSubmissionStatus('');
      },3000);
    }
  };

  const closeSubmissionModal=()=> {
    if (submissionStatus==='submitting') return; // Prevent closing during submission
    setShowSubmissionModal(false);
    setSubmissionStatus('');
    setImagePreview('');
    setImageError('');
    setUploadProgress(0);
  };

  if (selectedStory) {
    return (
      <motion.div
        initial={{opacity: 0,x: 300}}
        animate={{opacity: 1,x: 0}}
        exit={{opacity: 0,x: -300}}
        className="max-w-4xl mx-auto"
      >
        {/* Story Header */}
        <div className="mb-6">
          <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            onClick={()=> setSelectedStory(null)}
            className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-4"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
            <span>Back to Stories</span>
          </motion.button>

          <div className={`relative h-64 rounded-2xl overflow-hidden mb-6 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
            {selectedStory.image ? (
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="w-full h-full object-cover"
                onError={(e)=> {
                  e.target.style.display='none';
                  e.target.nextSibling.style.display='flex';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
                <SafeIcon icon={FiBookOpen} className="w-16 h-16 text-white" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              {selectedStory.isSubmitted && (
                <div className="flex items-center space-x-2 mb-2">
                  <span className="inline-block px-2 py-1 bg-green-500 rounded-full text-xs font-medium">
                    Community Story
                  </span>
                  <span className="inline-block px-2 py-1 bg-blue-500 rounded-full text-xs font-medium flex items-center space-x-1">
                    <SafeIcon icon={FiClock} className="w-3 h-3" />
                    <span>Recently Submitted</span>
                  </span>
                </div>
              )}
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
          initial={{opacity: 0,y: 20}}
          animate={{opacity: 1,y: 0}}
          transition={{delay: 0.2}}
          className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
          style={{
            backgroundImage: selectedStory.image 
              ? `linear-gradient(to bottom right,rgba(${isDark ? '31,41,55' : '255,255,255'},0.97),rgba(${isDark ? '17,24,39' : '249,250,251'},0.97)),url(${selectedStory.image})`
              : isDark 
                ? 'linear-gradient(to bottom right,rgba(31,41,55,0.97),rgba(17,24,39,0.97)),url(https://images.unsplash.com/photo-1506252374453-ef5237291d83?q=80&w=800&auto=format&fit=crop)'
                : 'linear-gradient(to bottom right,rgba(255,255,255,0.97),rgba(249,250,251,0.97)),url(https://images.unsplash.com/photo-1506252374453-ef5237291d83?q=80&w=800&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="prose max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedStory.isSubmitted ? 'Community Contributor' : 'Story Contributor'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    onClick={()=> handleShare(selectedStory)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    <SafeIcon icon={FiShare2} className="w-4 h-4" />
                    <span>Share Story</span>
                  </motion.button>
                  
                  {/* Delete button for submitted stories */}
                  {selectedStory.isSubmitted && (
                    <motion.button
                      whileHover={{scale: 1.05}}
                      whileTap={{scale: 0.95}}
                      onClick={()=> deleteSubmittedStory(selectedStory.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                      <span>Delete</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Stories */}
        <motion.div
          initial={{opacity: 0,y: 20}}
          animate={{opacity: 1,y: 0}}
          transition={{delay: 0.4}}
          className="mt-8"
        >
          <h3 className="text-xl font-semibold mb-4">More Stories Like This</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {allStories
              .filter(story=> story.id !==selectedStory.id && story.category===selectedStory.category)
              .slice(0,2)
              .map(story=> (
                <motion.div
                  key={story.id}
                  whileHover={{scale: 1.02}}
                  onClick={()=> setSelectedStory(story)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${isDark ? 'bg-gray-800 border border-gray-700 hover:border-primary-500' : 'bg-white border border-gray-200 hover:border-primary-300'} shadow-lg hover:shadow-xl`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${getCategoryColor(story.category)}`}>
                      <SafeIcon icon={FiBookOpen} className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{story.title}</h4>
                        {story.isSubmitted && (
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                        )}
                      </div>
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
      initial={{opacity: 0,y: 20}}
      animate={{opacity: 1,y: 0}}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{scale: 0}}
          animate={{scale: 1}}
          transition={{delay: 0.2,type: "spring",stiffness: 200}}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-full mb-4"
        >
          <SafeIcon icon={FiBookOpen} className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-3xl font-bold mb-2">Inspiring Stories of Hope & Healing</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Real stories of resilience,recovery,and personal growth from our community. Find hope,understanding,and inspiration in these authentic journeys of mental health and wellness.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search stories by title,content,or author..."
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e)=> setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
          >
            {categories.map(category=> (
              <option key={category.value} value={category.value}>
                {category.label} ({category.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Tags */}
      <motion.div
        initial={{opacity: 0,y: 20}}
        animate={{opacity: 1,y: 0}}
        transition={{delay: 0.3}}
        className="flex flex-wrap gap-2 justify-center mb-6"
      >
        {categories.slice(0,8).map(category=> (
          <motion.button
            key={category.value}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            onClick={()=> setSelectedCategory(category.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory===category.value
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
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0.4}}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredStories.map((story,index)=> (
            <motion.div
              key={story.id}
              initial={{opacity: 0,y: 20}}
              animate={{opacity: 1,y: 0}}
              exit={{opacity: 0,y: -20}}
              transition={{delay: index * 0.1}}
              whileHover={{y: -5}}
              className={`cursor-pointer rounded-2xl overflow-hidden ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg hover:shadow-xl transition-all duration-300 group relative`}
            >
              <div className="relative h-48 overflow-hidden">
                {story.image ? (
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e)=> {
                      e.target.style.display='none';
                      e.target.nextSibling.style.display='flex';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
                    <SafeIcon icon={FiBookOpen} className="w-12 h-12 text-white" />
                  </div>
                )}
                
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <span className={`inline-block px-3 py-1 bg-gradient-to-r ${getCategoryColor(story.category)} text-white text-xs rounded-full font-medium`}>
                    {story.category}
                  </span>
                  {story.isSubmitted && (
                    <span className="inline-block px-2 py-1 bg-green-500 text-white text-xs rounded-full font-medium">
                      New
                    </span>
                  )}
                </div>
                
                {/* Delete button for submitted stories - shown on hover */}
                {story.isSubmitted && (
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{scale: 1.1}}
                      whileTap={{scale: 0.9}}
                      onClick={(e)=> {
                        e.stopPropagation();
                        deleteSubmittedStory(story.id);
                      }}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors"
                      title="Delete this story"
                    >
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              <div className="p-6" onClick={()=> setSelectedStory(story)}>
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-xl font-semibold line-clamp-2 flex-1">{story.title}</h3>
                  {story.isSubmitted && (
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  )}
                </div>
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
                  whileHover={{scale: 1.05}}
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

      {filteredStories.length===0 && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
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
        initial={{opacity: 0,y: 20}}
        animate={{opacity: 1,y: 0}}
        transition={{delay: 0.5}}
        className={`p-6 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}
      >
        <h3 className="text-lg font-semibold mb-4">Story Collection</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{allStories.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Stories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">{categories.length - 1}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent-600 dark:text-accent-400">{new Set(allStories.map(s=> s.author)).size}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Contributors</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{submittedStories.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Community Stories</div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{opacity: 0,y: 20}}
        animate={{opacity: 1,y: 0}}
        transition={{delay: 0.6}}
        className={`p-6 rounded-2xl text-center ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' : 'bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200'}`}
        style={{
          backgroundImage: isDark 
            ? 'linear-gradient(to bottom right,rgba(31,41,55,0.9),rgba(17,24,39,0.9)),url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop)'
            : 'linear-gradient(to bottom right,rgba(252,231,243,0.9),rgba(237,233,254,0.9)),url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <SafeIcon icon={FiHeart} className="w-12 h-12 text-primary-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Share Your Story of Hope</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto">
          Your journey of healing,growth,and resilience could inspire others facing similar challenges. Every story shared is a beacon of hope for someone who needs it.
        </p>
        <motion.button
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          onClick={()=> setShowSubmissionModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          Submit Your Story
        </motion.button>
      </motion.div>

      {/* Enhanced Story Submission Modal */}
      <AnimatePresence>
        {showSubmissionModal && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={closeSubmissionModal}
          >
            <motion.div
              initial={{scale: 0.9,opacity: 0}}
              animate={{scale: 1,opacity: 1}}
              exit={{scale: 0.9,opacity: 0}}
              onClick={(e)=> e.stopPropagation()}
              className={`w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-2xl`}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold">Share Your Story</h3>
                  <p className="text-gray-600 dark:text-gray-400">Your story could inspire and help others on their journey</p>
                </div>
                {submissionStatus !=='submitting' && (
                  <button
                    onClick={closeSubmissionModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiX} className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Submission Status */}
              {submissionStatus==='success' && (
                <motion.div
                  initial={{opacity: 0,y: -10}}
                  animate={{opacity: 1,y: 0}}
                  className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-green-300">Story Submitted Successfully!</h4>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Thank you for sharing your story. It's now visible in the stories collection and will inspire others!
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {submissionStatus==='error' && (
                <motion.div
                  initial={{opacity: 0,y: -10}}
                  animate={{opacity: 1,y: 0}}
                  className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiX} className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <div>
                      <h4 className="font-semibold text-red-800 dark:text-red-300">Submission Failed</h4>
                      <p className="text-sm text-red-600 dark:text-red-400">
                        There was an error submitting your story. Please try again.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Form */}
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Story Title *</label>
                    <input
                      type="text"
                      value={submissionForm.title}
                      onChange={(e)=> handleSubmissionChange('title',e.target.value)}
                      placeholder="e.g., My Journey to Overcoming Anxiety"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
                      maxLength={100}
                      disabled={submissionStatus==='submitting'}
                    />
                    <div className="text-xs text-gray-500 mt-1">{submissionForm.title.length}/100 characters</div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <select
                      value={submissionForm.category}
                      onChange={(e)=> handleSubmissionChange('category',e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
                      disabled={submissionStatus==='submitting'}
                    >
                      {submissionCategories.map(category=> (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Story Content */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Story *</label>
                    <textarea
                      value={submissionForm.content}
                      onChange={(e)=> handleSubmissionChange('content',e.target.value)}
                      placeholder="Share your journey, challenges, breakthroughs, and what helped you. Be authentic and specific - your experience could help someone facing similar struggles..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 resize-none"
                      rows={6}
                      maxLength={3000}
                      disabled={submissionStatus==='submitting'}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {submissionForm.content.length}/3000 characters (minimum 100 required)
                    </div>
                  </div>

                  {/* Author Name */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Name {!submissionForm.isAnonymous && '*'}</label>
                      <input
                        type="text"
                        value={submissionForm.authorName}
                        onChange={(e)=> handleSubmissionChange('authorName',e.target.value)}
                        placeholder="How you'd like to be credited"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
                        maxLength={50}
                        disabled={submissionForm.isAnonymous || submissionStatus==='submitting'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        value={submissionForm.email}
                        onChange={(e)=> handleSubmissionChange('email',e.target.value)}
                        placeholder="your@email.com"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
                        disabled={submissionStatus==='submitting'}
                      />
                    </div>
                  </div>

                  {/* Anonymous Option */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={submissionForm.isAnonymous}
                      onChange={(e)=> handleSubmissionChange('isAnonymous',e.target.checked)}
                      className="mt-1 w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                      disabled={submissionStatus==='submitting'}
                    />
                    <label htmlFor="anonymous" className="text-sm">
                      <span className="font-medium">Submit anonymously</span>
                      <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                        Your story will be published as "Anonymous" to protect your privacy
                      </p>
                    </label>
                  </div>

                  {/* Privacy Notice */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Privacy & Review Process</h4>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Your email will only be used for communication and will never be published</li>
                      <li>• Stories are immediately visible to inspire others in our community</li>
                      <li>• You can request removal of your story at any time</li>
                      <li>• We may make minor edits for clarity while preserving your authentic voice</li>
                    </ul>
                  </div>
                </div>

                {/* Enhanced Background Image Selection */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">Background Image (Optional)</label>
                    
                    {/* Image Type Selection */}
                    <div className="flex space-x-2 mb-4">
                      {[
                        { type: 'preset', label: 'Choose Preset', icon: FiImage },
                        { type: 'url', label: 'Image URL', icon: FiLink },
                        { type: 'upload', label: 'Upload Photo', icon: FiUpload }
                      ].map(option => (
                        <button
                          key={option.type}
                          onClick={() => handleImageTypeChange(option.type)}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all ${
                            submissionForm.imageType === option.type
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                          disabled={submissionStatus === 'submitting'}
                        >
                          <SafeIcon icon={option.icon} className="w-4 h-4" />
                          <span>{option.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Preset Images */}
                    {submissionForm.imageType === 'preset' && (
                      <div>
                        <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                          {presetImages.map(image => (
                            <motion.div
                              key={image.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleSubmissionChange('backgroundImage', image.id)}
                              className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                                submissionForm.backgroundImage === image.id
                                  ? 'border-primary-500 ring-2 ring-primary-200'
                                  : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                              }`}
                            >
                              <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-16 object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <span className="text-white text-xs font-medium text-center px-1">
                                  {image.name}
                                </span>
                              </div>
                              {submissionForm.backgroundImage === image.id && (
                                <div className="absolute top-1 right-1 bg-primary-500 rounded-full p-1">
                                  <SafeIcon icon={FiCheck} className="w-2 h-2 text-white" />
                                </div>
                              )}
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1">
                                <div className="text-xs text-white font-medium">{image.mood}</div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* URL Input */}
                    {submissionForm.imageType === 'url' && (
                      <div className="space-y-3">
                        <input
                          type="url"
                          value={submissionForm.backgroundImage}
                          onChange={(e) => handleSubmissionChange('backgroundImage', e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
                          disabled={submissionStatus === 'submitting'}
                        />
                        <p className="text-xs text-gray-500">
                          Enter a direct link to your image. Make sure it's publicly accessible.
                        </p>
                      </div>
                    )}

                    {/* Enhanced File Upload */}
                    {submissionForm.imageType === 'upload' && (
                      <div className="space-y-4">
                        <div
                          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                            dragActive
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : imageError
                              ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
                              : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
                          }`}
                          onDragEnter={handleDragEnter}
                          onDragLeave={handleDragLeave}
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileInputChange}
                            className="hidden"
                            id="imageUpload"
                            disabled={submissionStatus === 'submitting'}
                          />
                          
                          {uploadProgress > 0 ? (
                            <div className="space-y-3">
                              <SafeIcon icon={FiUpload} className="w-8 h-8 text-primary-500 mx-auto animate-bounce" />
                              <p className="text-sm text-primary-600 dark:text-primary-400">
                                Uploading... {uploadProgress}%
                              </p>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${uploadProgress}%` }}
                                />
                              </div>
                            </div>
                          ) : (
                            <label
                              htmlFor="imageUpload"
                              className="cursor-pointer flex flex-col items-center space-y-3"
                            >
                              <SafeIcon icon={dragActive ? FiCamera : FiUpload} className="w-10 h-10 text-gray-400" />
                              <div>
                                <span className="text-primary-600 dark:text-primary-400 font-medium">
                                  Click to upload
                                </span>
                                <span className="text-gray-600 dark:text-gray-400"> or drag and drop</span>
                              </div>
                              <p className="text-xs text-gray-500">
                                JPEG, PNG, GIF, or WebP up to 10MB
                              </p>
                            </label>
                          )}
                        </div>

                        {imageError && (
                          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-sm text-red-600 dark:text-red-400">{imageError}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Enhanced Image Preview */}
                    {imagePreview && (
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Preview:</p>
                          <button
                            onClick={clearImage}
                            className="flex items-center space-x-1 text-sm text-red-600 dark:text-red-400 hover:underline"
                          >
                            <SafeIcon icon={FiTrash2} className="w-3 h-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                        <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-40 object-cover"
                            onError={() => {
                              setImagePreview('');
                              setSubmissionForm(prev => ({ ...prev, backgroundImage: '' }));
                              setImageError('Invalid image URL or corrupted file');
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="text-white text-sm font-medium">Background Preview</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Story Preview */}
                  <div>
                    <p className="text-sm font-medium mb-2">Story Card Preview:</p>
                    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                      <div className="relative h-32 bg-gradient-to-br from-primary-500 to-secondary-600">
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            alt="Story background"
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-2 left-3 right-3">
                          <span className={`inline-block px-2 py-1 bg-gradient-to-r ${getCategoryColor(submissionForm.category)} rounded-full text-xs text-white mb-1`}>
                            {submissionForm.category}
                          </span>
                          <h4 className="text-white font-semibold text-sm line-clamp-1">
                            {submissionForm.title || 'Your Story Title'}
                          </h4>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                          {submissionForm.content.substring(0, 100) || 'Your story content will appear here...'}
                          {submissionForm.content.length > 100 && '...'}
                        </p>
                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                          <span>{submissionForm.isAnonymous ? 'Anonymous' : submissionForm.authorName || 'Your Name'}</span>
                          <span>Just now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-8">
                <button
                  onClick={closeSubmissionModal}
                  disabled={submissionStatus === 'submitting'}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: submissionStatus === 'submitting' ? 1 : 1.02 }}
                  whileTap={{ scale: submissionStatus === 'submitting' ? 1 : 0.98 }}
                  onClick={handleSubmitStory}
                  disabled={submissionStatus === 'submitting'}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submissionStatus === 'submitting' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <SafeIcon icon={FiSend} className="w-4 h-4" />
                      <span>Submit Story</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Stories;