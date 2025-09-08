import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useAnimationConfig } from '../../hooks/useReducedMotion';

const HamburgerButton = ({ 
  isOpen, 
  onClick, 
  className,
  size = 'md',
  variant = 'default',
  ariaLabel = 'Toggle menu'
}) => {
  const { getAnimationProps } = useAnimationConfig();

  const sizeClasses = {
    sm: 'w-5 h-5 p-1',
    md: 'w-6 h-6 p-1.5',
    lg: 'w-8 h-8 p-2'
  };

  const lineHeight = {
    sm: 'h-0.5',
    md: 'h-0.5',
    lg: 'h-1'
  };

  const buttonVariants = getAnimationProps({
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  });

  // Animation variants for hamburger lines
  const topLineVariants = getAnimationProps({
    closed: { 
      rotate: 0, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    open: { 
      rotate: 45, 
      y: size === 'sm' ? 4 : size === 'md' ? 6 : 8,
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  });

  const middleLineVariants = getAnimationProps({
    closed: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    open: { 
      opacity: 0, 
      x: -10,
      transition: { duration: 0.2, ease: 'easeInOut' }
    }
  });

  const bottomLineVariants = getAnimationProps({
    closed: { 
      rotate: 0, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    open: { 
      rotate: -45, 
      y: size === 'sm' ? -4 : size === 'md' ? -6 : -8,
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  });

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'relative flex items-center justify-center rounded-lg transition-colors',
        'glass-button hover:bg-white/10 active:bg-white/15',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
        'touch-manipulation select-none',
        sizeClasses[size],
        variant === 'minimal' && 'bg-transparent hover:bg-white/5',
        variant === 'solid' && 'bg-white/10 hover:bg-white/20',
        className
      )}
      {...buttonVariants}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      type="button"
    >
      <div className="relative flex flex-col justify-center items-center w-full h-full">
        {/* Top Line */}
        <motion.span
          className={cn(
            'absolute bg-current rounded-full transform-gpu',
            lineHeight[size],
            size === 'sm' ? 'w-4' : size === 'md' ? 'w-5' : 'w-6'
          )}
          variants={topLineVariants}
          animate={isOpen ? 'open' : 'closed'}
          style={{ 
            transformOrigin: 'center',
            top: size === 'sm' ? '25%' : size === 'md' ? '30%' : '25%'
          }}
        />

        {/* Middle Line */}
        <motion.span
          className={cn(
            'absolute bg-current rounded-full transform-gpu',
            lineHeight[size],
            size === 'sm' ? 'w-4' : size === 'md' ? 'w-5' : 'w-6'
          )}
          variants={middleLineVariants}
          animate={isOpen ? 'open' : 'closed'}
          style={{ 
            transformOrigin: 'center',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />

        {/* Bottom Line */}
        <motion.span
          className={cn(
            'absolute bg-current rounded-full transform-gpu',
            lineHeight[size],
            size === 'sm' ? 'w-4' : size === 'md' ? 'w-5' : 'w-6'
          )}
          variants={bottomLineVariants}
          animate={isOpen ? 'open' : 'closed'}
          style={{ 
            transformOrigin: 'center',
            bottom: size === 'sm' ? '25%' : size === 'md' ? '30%' : '25%'
          }}
        />
      </div>

      {/* Ripple Effect on Touch */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-white/20"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1.2, opacity: 0.3 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

export default HamburgerButton;