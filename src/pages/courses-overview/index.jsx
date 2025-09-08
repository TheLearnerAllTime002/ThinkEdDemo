import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import CategoryCard from './components/CategoryCard';
import CourseCard from './components/CourseCard';
import FilterControls from './components/FilterControls';
import ProgressStats from './components/ProgressStats';
import CircularProgress from './components/CircularProgress';

const CoursesOverview = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [filterBy, setFilterBy] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Mock data for categories
  const categories = [
    {
      id: 'math',
      type: 'math',
      name: 'Mathematics',
      icon: 'Calculator',
      description: 'Master mathematical concepts from basic arithmetic to advanced calculus and statistics.',
      courseCount: 24,
      completionRate: 68,
      totalHours: 120,
      totalXP: 2400,
      difficulty: 'Mixed'
    },
    {
      id: 'science',
      type: 'science',
      name: 'Science',
      icon: 'Atom',
      description: 'Explore physics, chemistry, biology, and earth sciences through interactive lessons.',
      courseCount: 18,
      completionRate: 45,
      totalHours: 96,
      totalXP: 1800,
      difficulty: 'Mixed'
    },
    {
      id: 'skills',
      type: 'skills',
      name: 'Life Skills',
      icon: 'Lightbulb',
      description: 'Develop critical thinking, communication, and problem-solving abilities.',
      courseCount: 15,
      completionRate: 72,
      totalHours: 75,
      totalXP: 1500,
      difficulty: 'Beginner'
    }
  ];

  // Mock data for courses
  const allCourses = [
    // Math Courses
    {
      id: 1,
      category: 'math',
      title: 'Algebra Fundamentals',
      description: 'Learn the basics of algebraic expressions, equations, and problem-solving techniques.',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
      duration: '4h 30m',
      difficulty: 'Beginner',
      rating: 4.8,
      enrolledCount: '2.1k',
      lessonCount: 12,
      xpReward: 200,
      isStarted: true,
      isCompleted: false,
      progress: 65,
      prerequisites: []
    },
    {
      id: 2,
      category: 'math',
      title: 'Calculus I: Limits and Derivatives',
      description: 'Introduction to differential calculus with practical applications and problem-solving.',
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop',
      duration: '6h 15m',
      difficulty: 'Intermediate',
      rating: 4.9,
      enrolledCount: '1.8k',
      lessonCount: 18,
      xpReward: 350,
      isStarted: false,
      isCompleted: false,
      progress: 0,
      prerequisites: ['Algebra Fundamentals', 'Trigonometry']
    },
    {
      id: 3,
      category: 'math',
      title: 'Statistics and Probability',
      description: 'Master statistical analysis, probability theory, and data interpretation methods.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      duration: '5h 45m',
      difficulty: 'Intermediate',
      rating: 4.7,
      enrolledCount: '1.5k',
      lessonCount: 15,
      xpReward: 300,
      isStarted: true,
      isCompleted: true,
      progress: 100,
      prerequisites: ['Algebra Fundamentals']
    },
    // Science Courses
    {
      id: 4,
      category: 'science',
      title: 'Physics: Mechanics',
      description: 'Explore motion, forces, energy, and momentum through interactive simulations.',
      thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop',
      duration: '7h 20m',
      difficulty: 'Intermediate',
      rating: 4.6,
      enrolledCount: '1.9k',
      lessonCount: 20,
      xpReward: 400,
      isStarted: true,
      isCompleted: false,
      progress: 40,
      prerequisites: ['Basic Mathematics']
    },
    {
      id: 5,
      category: 'science',
      title: 'Chemistry: Atomic Structure',
      description: 'Understand atoms, molecules, chemical bonds, and periodic table relationships.',
      thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop',
      duration: '5h 30m',
      difficulty: 'Beginner',
      rating: 4.8,
      enrolledCount: '2.3k',
      lessonCount: 16,
      xpReward: 280,
      isStarted: false,
      isCompleted: false,
      progress: 0,
      prerequisites: []
    },
    {
      id: 6,
      category: 'science',
      title: 'Biology: Cell Structure and Function',
      description: 'Discover the building blocks of life and cellular processes in living organisms.',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      duration: '6h 10m',
      difficulty: 'Beginner',
      rating: 4.9,
      enrolledCount: '2.7k',
      lessonCount: 18,
      xpReward: 320,
      isStarted: true,
      isCompleted: true,
      progress: 100,
      prerequisites: []
    },
    // Skills Courses
    {
      id: 7,
      category: 'skills',
      title: 'Critical Thinking Essentials',
      description: 'Develop analytical skills, logical reasoning, and effective decision-making abilities.',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      duration: '4h 45m',
      difficulty: 'Beginner',
      rating: 4.7,
      enrolledCount: '3.1k',
      lessonCount: 14,
      xpReward: 250,
      isStarted: true,
      isCompleted: false,
      progress: 80,
      prerequisites: []
    },
    {
      id: 8,
      category: 'skills',
      title: 'Effective Communication',
      description: 'Master verbal and written communication skills for academic and professional success.',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      duration: '5h 15m',
      difficulty: 'Beginner',
      rating: 4.8,
      enrolledCount: '2.8k',
      lessonCount: 16,
      xpReward: 280,
      isStarted: false,
      isCompleted: false,
      progress: 0,
      prerequisites: []
    },
    {
      id: 9,
      category: 'skills',
      title: 'Problem Solving Strategies',
      description: 'Learn systematic approaches to tackle complex problems across various domains.',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
      duration: '4h 20m',
      difficulty: 'Intermediate',
      rating: 4.6,
      enrolledCount: '1.7k',
      lessonCount: 13,
      xpReward: 230,
      isStarted: true,
      isCompleted: true,
      progress: 100,
      prerequisites: ['Critical Thinking Essentials']
    }
  ];

  // Calculate progress stats
  const progressStats = {
    totalCourses: allCourses?.length,
    completedCourses: allCourses?.filter(course => course?.isCompleted)?.length,
    inProgressCourses: allCourses?.filter(course => course?.isStarted && !course?.isCompleted)?.length,
    totalXP: allCourses?.filter(course => course?.isCompleted)?.reduce((sum, course) => sum + course?.xpReward, 0)
  };

  // Filter and sort courses
  useEffect(() => {
    let filtered = [...allCourses];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(course => course?.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered?.filter(course =>
        course?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        course?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Filter by status
    if (filterBy !== 'all') {
      switch (filterBy) {
        case 'not-started':
          filtered = filtered?.filter(course => !course?.isStarted);
          break;
        case 'in-progress':
          filtered = filtered?.filter(course => course?.isStarted && !course?.isCompleted);
          break;
        case 'completed':
          filtered = filtered?.filter(course => course?.isCompleted);
          break;
      }
    }

    // Sort courses
    switch (sortBy) {
      case 'newest':
        filtered?.sort((a, b) => b?.id - a?.id);
        break;
      case 'difficulty':
        const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        filtered?.sort((a, b) => difficultyOrder?.[a?.difficulty] - difficultyOrder?.[b?.difficulty]);
        break;
      case 'progress':
        filtered?.sort((a, b) => b?.progress - a?.progress);
        break;
      default: // popular
        filtered?.sort((a, b) => parseFloat(b?.rating) - parseFloat(a?.rating));
    }

    setFilteredCourses(filtered);
  }, [selectedCategory, sortBy, filterBy, searchQuery]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category?.id);
  };

  const handleCourseSelect = (course) => {
    // Navigate to course detail page (would be implemented)
    console.log('Selected course:', course?.title);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSortBy('popular');
    setFilterBy('all');
    setSearchQuery('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Header />
      <div className={`min-h-screen pt-20 pb-24 lg:pb-8 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/30'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            Course Overview
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive learning paths designed to enhance your knowledge and skills across multiple domains.
          </p>
        </motion.div>

        {/* Progress Stats */}
        <ProgressStats stats={progressStats} />

        {/* Category Selection */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Learning Categories</h2>
            <div className="flex items-center space-x-2">
              <CircularProgress 
                progress={(progressStats?.completedCourses / progressStats?.totalCourses) * 100}
                size={50}
                strokeWidth={3}
                color="var(--color-success)"
              />
              <div className="text-sm">
                <p className="font-medium text-foreground">Overall Progress</p>
                <p className="text-muted-foreground">
                  {progressStats?.completedCourses}/{progressStats?.totalCourses} completed
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {categories?.map((category, index) => (
              <motion.div key={category?.id} variants={itemVariants}>
                <CategoryCard
                  category={category}
                  onSelect={handleCategorySelect}
                  isSelected={selectedCategory === category?.id}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filter Controls */}
        <FilterControls
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          filterBy={filterBy}
          searchQuery={searchQuery}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSortBy}
          onFilterChange={setFilterBy}
          onSearchChange={setSearchQuery}
          onClearFilters={handleClearFilters}
        />

        {/* Courses Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">
              {selectedCategory === 'all' ? 'All Courses' : 
               categories?.find(cat => cat?.id === selectedCategory)?.name + ' Courses'}
            </h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Grid3X3" size={16} />
              <span>{filteredCourses?.length} courses found</span>
            </div>
          </div>

          {filteredCourses?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses?.map((course, index) => (
                <motion.div key={course?.id} variants={itemVariants}>
                  <CourseCard
                    course={course}
                    onSelect={handleCourseSelect}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="glass rounded-xl p-8 max-w-md mx-auto">
                <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms to find more courses.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-xl p-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Need help choosing?</h3>
              <p className="text-muted-foreground">
                Our AI tutor can recommend courses based on your learning goals and progress.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate('/ai-tutor-chat')}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Icon name="Bot" size={18} />
                <span>Ask AI Tutor</span>
              </button>
              <button
                onClick={() => navigate('/student-dashboard')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-primary/10 text-foreground hover:bg-primary/20' 
                    : 'bg-white/10 text-foreground hover:bg-white/20'
                }`}
              >
                <Icon name="BarChart3" size={18} />
                <span>View Progress</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default CoursesOverview;