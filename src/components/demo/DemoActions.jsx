import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const DemoActions = ({ onAction, disabled = false }) => {
  const [activeDemo, setActiveDemo] = useState(null);

  const demoActions = [
    {
      id: 'ai-chat',
      title: 'AI Chat Demo',
      description: 'Experience our AI tutor in action',
      icon: 'Bot',
      color: 'from-blue-500 to-purple-600',
      action: () => onAction('ai-chat')
    },
    {
      id: 'dashboard',
      title: 'Dashboard Tour',
      description: 'Explore the student dashboard',
      icon: 'LayoutDashboard',
      color: 'from-green-500 to-teal-600',
      action: () => onAction('dashboard')
    },
    {
      id: 'courses',
      title: 'Course Preview',
      description: 'Browse available courses',
      icon: 'BookOpen',
      color: 'from-orange-500 to-red-600',
      action: () => onAction('courses')
    },
    {
      id: 'analytics',
      title: 'Analytics Demo',
      description: 'View learning analytics',
      icon: 'BarChart3',
      color: 'from-purple-500 to-pink-600',
      action: () => onAction('analytics')
    }
  ];

  const handleDemoClick = (demo) => {
    if (disabled) return;
    
    setActiveDemo(demo.id);
    setTimeout(() => {
      demo.action();
      setActiveDemo(null);
    }, 500);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {demoActions.map((demo, index) => (
        <motion.div
          key={demo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="relative"
        >
          <motion.button
            onClick={() => handleDemoClick(demo)}
            disabled={disabled}
            className={`w-full p-6 rounded-2xl glass border border-white/20 hover:border-white/30 transition-all duration-300 group ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
            }`}
            whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${demo.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            {/* Icon */}
            <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${demo.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <Icon name={demo.icon} size={24} color="white" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {demo.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {demo.description}
              </p>
            </div>

            {/* Loading Indicator */}
            {activeDemo === demo.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 rounded-2xl bg-black/20 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </motion.div>
            )}
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
};

export default DemoActions;