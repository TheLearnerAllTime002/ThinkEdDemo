import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const MobileMenuDemo = ({ isOpen, onClose, onNavigate }) => {
  const [activeSection, setActiveSection] = useState('main');

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      description: 'View your learning progress',
      action: () => onNavigate('/student-dashboard')
    },
    {
      id: 'courses',
      label: 'Courses',
      icon: 'BookOpen',
      description: 'Browse available courses',
      action: () => onNavigate('/courses-overview')
    },
    {
      id: 'ai-tutor',
      label: 'AI Tutor',
      icon: 'Bot',
      description: 'Chat with AI assistant',
      action: () => onNavigate('/ai-tutor-chat')
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      description: 'Manage your account',
      action: () => onNavigate('/user-profile')
    }
  ];

  const quickActions = [
    {
      id: 'new-course',
      label: 'Start New Course',
      icon: 'Plus',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'ai-help',
      label: 'Get AI Help',
      icon: 'Bot',
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 'practice',
      label: 'Practice Quiz',
      icon: 'Brain',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-80 max-w-[90vw] glass-sidebar z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-glass-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name="Menu" size={20} color="white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">Menu</h2>
                    <p className="text-xs text-muted-foreground">Navigation & Quick Actions</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  iconName="X"
                  className="rounded-full"
                />
              </div>
            </div>

            {/* Menu Content */}
            <div className="p-6 space-y-6">
              {/* Main Navigation */}
              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Navigation</h3>
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left group"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon name={item.icon} size={18} className="group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.description}</div>
                      </div>
                      <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-3">
                  {quickActions.map((action) => (
                    <motion.button
                      key={action.id}
                      onClick={() => {
                        console.log(`Quick action: ${action.id}`);
                        onClose();
                      }}
                      className="flex items-center space-x-3 p-4 rounded-xl glass border border-glass-border hover:shadow-lg transition-all group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                        <Icon name={action.icon} size={18} color="white" />
                      </div>
                      <span className="font-medium text-foreground">{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* User Section */}
              <motion.div variants={itemVariants}>
                <div className="glass-card p-4 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Icon name="User" size={20} color="white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">Alex Johnson</div>
                      <div className="text-xs text-muted-foreground">Level 12 • 1,250 XP</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Settings"
                      className="rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenuDemo;