import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AuthCard = ({ children, activeTab }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.8
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md mx-auto"
    >
      <div className="modern-glass-card p-6 sm:p-10 hover:shadow-primary/20 transition-shadow duration-300">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
            className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary to-secondary shadow-lg"
          >
            <Icon name="GraduationCap" size={32} color="white" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Welcome to ThinkEd
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {activeTab === 'login' ?'Sign in to continue your learning journey' :'Create your account and start learning'
              }
            </p>
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AuthCard;