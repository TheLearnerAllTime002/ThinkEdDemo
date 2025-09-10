import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProgressStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Courses',
      value: stats?.totalCourses,
      icon: 'BookOpen',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/20'
    },
    {
      label: 'Completed',
      value: stats?.completedCourses,
      icon: 'CheckCircle',
      color: 'var(--color-success)',
      bgColor: 'bg-success/20'
    },
    {
      label: 'In Progress',
      value: stats?.inProgressCourses,
      icon: 'Play',
      color: 'var(--color-warning)',
      bgColor: 'bg-warning/20'
    },
    {
      label: 'Total XP Earned',
      value: `${stats?.totalXP?.toLocaleString()} XP`,
      icon: 'Zap',
      color: 'var(--color-accent)',
      bgColor: 'bg-accent/20'
    }
  ];

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    >
      {statItems?.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          className="glass rounded-lg p-4"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${item?.bgColor} flex items-center justify-center`}>
              <Icon name={item?.icon} size={20} color={item?.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground truncate">{item?.label}</p>
              <p className="text-lg font-semibold text-foreground">{item?.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProgressStats;