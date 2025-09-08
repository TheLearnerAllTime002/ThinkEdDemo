import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: "quiz_completed",
      title: "Completed Algebra Quiz",
      description: "Scored 95% and earned 50 XP",
      timestamp: "2 hours ago",
      icon: "CheckCircle",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: 2,
      type: "badge_earned",
      title: "Earned Math Wizard Badge",
      description: "Achieved 90%+ in 5 consecutive math quizzes",
      timestamp: "5 hours ago",
      icon: "Award",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      id: 3,
      type: "streak_milestone",
      title: "7-Day Streak Achieved!",
      description: "Keep up the great work",
      timestamp: "1 day ago",
      icon: "Flame",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      id: 4,
      type: "lesson_completed",
      title: "Finished Quadratic Equations",
      description: "Lesson completed with notes saved",
      timestamp: "1 day ago",
      icon: "BookOpen",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: 5,
      type: "forum_post",
      title: "Asked Question in Physics Forum",
      description: "About electromagnetic waves",
      timestamp: "2 days ago",
      icon: "MessageCircle",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="modern-glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <motion.div
            key={activity?.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 + index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/20 transition-colors"
          >
            <div className={`p-2 rounded-lg ${activity?.bgColor} flex-shrink-0`}>
              <Icon name={activity?.icon} size={16} className={activity?.color} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-foreground">{activity?.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{activity?.description}</p>
              <p className="text-xs text-muted-foreground mt-2">{activity?.timestamp}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-4 pt-4 border-t border-white/10 text-center"
      >
        <p className="text-xs text-muted-foreground">
          Stay active to earn more XP and badges!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ActivityFeed;