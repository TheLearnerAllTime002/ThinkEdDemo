import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CourseCard = ({ course, onSelect }) => {
  const { isDarkMode } = useTheme();
  
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'text-success';
      case 'intermediate':
        return 'text-warning';
      case 'advanced':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-success';
    if (progress >= 50) return 'text-warning';
    return 'text-primary';
  };

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(course)}
      className="glass rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl flex flex-col h-full"
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={course?.thumbnail}
          alt={course?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Course Status Badge */}
        <div className="absolute top-3 right-3">
          {course?.isCompleted ? (
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-success/20 backdrop-blur-sm">
              <Icon name="CheckCircle" size={14} color="var(--color-success)" />
              <span className="text-xs text-success font-medium">Complete</span>
            </div>
          ) : course?.isStarted ? (
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-warning/20 backdrop-blur-sm">
              <Icon name="Play" size={14} color="var(--color-warning)" />
              <span className="text-xs text-warning font-medium">In Progress</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-primary/20 backdrop-blur-sm">
              <Icon name="BookOpen" size={14} color="var(--color-primary)" />
              <span className="text-xs text-primary font-medium">New</span>
            </div>
          )}
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm">
            <Icon name="Clock" size={12} color="white" />
            <span className="text-xs text-white font-medium">{course?.duration}</span>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-semibold text-foreground line-clamp-2 flex-1">
            {course?.title}
          </h3>
          <div className="ml-2">
            <span className={`text-xs font-medium ${getDifficultyColor(course?.difficulty)}`}>
              {course?.difficulty}
            </span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">
          {course?.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} color="var(--color-muted-foreground)" />
              <span className="text-xs text-muted-foreground">{course?.enrolledCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} color="var(--color-warning)" />
              <span className="text-xs text-muted-foreground">{course?.rating}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Icon name="Zap" size={14} color="var(--color-warning)" />
            <span className="text-xs text-warning font-medium">{course?.xpReward} XP</span>
          </div>
        </div>

        {/* Progress Section */}
        {course?.isStarted && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className={`text-xs font-medium ${getProgressColor(course?.progress)}`}>
                {course?.progress}%
              </span>
            </div>
            <div className={`w-full rounded-full h-1.5 ${
              isDarkMode ? 'bg-slate-700/50' : 'bg-white/10'
            }`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course?.progress}%` }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="h-1.5 rounded-full bg-gradient-to-r from-primary to-accent"
              />
            </div>
          </div>
        )}

        {/* Prerequisites */}
        {course?.prerequisites && course?.prerequisites?.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center space-x-1 mb-1">
              <Icon name="AlertCircle" size={12} color="var(--color-muted-foreground)" />
              <span className="text-xs text-muted-foreground">Prerequisites:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {course?.prerequisites?.slice(0, 2)?.map((prereq, index) => (
                <span
                  key={index}
                  className={`text-xs px-2 py-0.5 rounded-full text-muted-foreground ${
                    isDarkMode ? 'bg-slate-700/50' : 'bg-white/10'
                  }`}
                >
                  {prereq}
                </span>
              ))}
              {course?.prerequisites?.length > 2 && (
                <span className={`text-xs px-2 py-0.5 rounded-full text-muted-foreground ${
                  isDarkMode ? 'bg-slate-700/50' : 'bg-white/10'
                }`}>
                  +{course?.prerequisites?.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Icon name="BookOpen" size={14} color="var(--color-muted-foreground)" />
            <span className="text-xs text-muted-foreground">{course?.lessonCount} lessons</span>
          </div>

          <div className="flex items-center space-x-1 text-primary">
            <span className="text-xs font-medium">
              {course?.isCompleted ? 'Review' : course?.isStarted ? 'Continue' : 'Start'}
            </span>
            <Icon name="ArrowRight" size={14} color="var(--color-primary)" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;