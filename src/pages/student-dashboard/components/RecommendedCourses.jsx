import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendedCourses = () => {
  const navigate = useNavigate();

  const recommendedCourses = [
    {
      id: 1,
      title: "Advanced Calculus",
      description: "Master derivatives and integrals with step-by-step guidance",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop",
      difficulty: "Advanced",
      duration: "6 weeks",
      lessons: 24,
      rating: 4.8,
      enrolled: 1250,
      category: "Mathematics",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Organic Chemistry Basics",
      description: "Understand molecular structures and chemical reactions",
      thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=200&fit=crop",
      difficulty: "Intermediate",
      duration: "4 weeks",
      lessons: 18,
      rating: 4.6,
      enrolled: 890,
      category: "Science",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "Creative Writing Workshop",
      description: "Develop your storytelling skills and narrative techniques",
      thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop",
      difficulty: "Beginner",
      duration: "3 weeks",
      lessons: 12,
      rating: 4.9,
      enrolled: 2100,
      category: "English",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success bg-success/10';
      case 'Intermediate': return 'text-warning bg-warning/10';
      case 'Advanced': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const handleCourseClick = (courseId) => {
    navigate('/courses-overview');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
      className="modern-glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recommended for You</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/courses-overview')}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={16}
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {recommendedCourses?.map((course, index) => (
          <motion.div
            key={course?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => handleCourseClick(course?.id)}
          >
            <div className="flex space-x-4 p-4 rounded-lg hover:bg-muted/20 transition-all duration-300 group-hover:shadow-lg">
              {/* Thumbnail */}
              <div className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  src={course?.thumbnail}
                  alt={course?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${course?.color} opacity-20`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {course?.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course?.difficulty)}`}>
                    {course?.difficulty}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {course?.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{course?.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="BookOpen" size={12} />
                      <span>{course?.lessons} lessons</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} color="var(--color-warning)" />
                      <span>{course?.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {course?.enrolled?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="mt-6 pt-4 border-t border-white/10 text-center"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/courses-overview')}
          iconName="Search"
          iconPosition="left"
          iconSize={16}
          className="w-full"
        >
          Explore More Courses
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default RecommendedCourses;