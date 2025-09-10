import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from '../AppIcon';

const ThemeToggle = ({ variant = 'switch', size = 'md', className = '' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  if (variant === 'switch') {
    return (
      <motion.button
        onClick={toggleTheme}
        className={`relative inline-flex items-center h-8 w-16 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4A9B8E] focus:ring-offset-2 shadow-lg ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        {/* Background gradient overlay */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] opacity-0"
          animate={{ opacity: isDarkMode ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Toggle circle */}
        <motion.div
          className="relative inline-block h-6 w-6 rounded-full bg-white shadow-lg transform transition-transform duration-300 flex items-center justify-center"
          animate={{ 
            x: isDarkMode ? 32 : 4,
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff'
          }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30 
          }}
        >
          {/* Sun icon */}
          <motion.div
            animate={{
              scale: isDarkMode ? 0 : 1,
              rotate: isDarkMode ? 180 : 0,
              opacity: isDarkMode ? 0 : 1
            }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <Icon name="Sun" size={14} color="#F59E0B" />
          </motion.div>
          
          {/* Moon icon */}
          <motion.div
            animate={{
              scale: isDarkMode ? 1 : 0,
              rotate: isDarkMode ? 0 : -180,
              opacity: isDarkMode ? 1 : 0
            }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <Icon name="Moon" size={14} color="#4A9B8E" />
          </motion.div>
        </motion.div>
        
        {/* Light/Dark labels */}
        <div className="absolute inset-0 flex items-center justify-between px-2 text-xs font-medium pointer-events-none">
          <motion.span
            className="text-slate-600"
            animate={{ opacity: isDarkMode ? 0.5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            L
          </motion.span>
          <motion.span
            className="text-slate-300"
            animate={{ opacity: isDarkMode ? 0 : 0.5 }}
            transition={{ duration: 0.2 }}
          >
            D
          </motion.span>
        </div>
      </motion.button>
    );
  }

  // Icon variant (simplified)
  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative p-2.5 rounded-2xl glass border border-white/20 hover:border-[#4A9B8E]/30 transition-all duration-300 shadow-lg group ${className}`}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#4A9B8E]/20 to-[#F59E0B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{ opacity: isDarkMode ? 0.3 : 0 }}
      />
      
      <motion.div
        animate={{ 
          rotate: isDarkMode ? 360 : 0,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 0.5, ease: "easeInOut" },
          scale: { duration: 0.2 }
        }}
        className="relative z-10"
      >
        <Icon 
          name={isDarkMode ? "Moon" : "Sun"} 
          size={size === 'sm' ? 16 : 18} 
          color={isDarkMode ? "#4A9B8E" : "#F59E0B"}
        />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;