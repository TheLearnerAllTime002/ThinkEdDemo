import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useAnimationConfig } from '../../hooks/useReducedMotion';
import Icon from '../AppIcon';
import AppImage from '../AppImage';

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'default',
  className,
  text,
  showLogo = false
}) => {
  const { getAnimationProps } = useAnimationConfig();

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const spinAnimation = getAnimationProps({
    animate: { rotate: 360 },
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  });

  const pulseAnimation = getAnimationProps({
    animate: { 
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5]
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  });

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-primary rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <motion.div
            className={cn(
              'rounded-full bg-gradient-to-r from-primary to-secondary',
              sizes[size]
            )}
            {...pulseAnimation}
          />
        );

      case 'logo':
        return (
          <motion.div
            className={cn('relative', sizes[size])}
            {...spinAnimation}
          >
            <AppImage
              src="/assets/images/thinked-high-resolution-logo-transparent-1757342968260.png"
              alt="ThinkEd Logo"
              className="w-full h-full object-contain"
            />
          </motion.div>
        );

      case 'gradient':
        return (
          <motion.div
            className={cn(
              'rounded-full border-4 border-transparent bg-gradient-to-r from-primary via-secondary to-accent bg-clip-border',
              sizes[size]
            )}
            style={{
              background: 'conic-gradient(from 0deg, transparent, var(--color-primary), transparent)',
              borderRadius: '50%'
            }}
            {...spinAnimation}
          />
        );

      default:
        return (
          <motion.div
            className={cn(sizes[size])}
            {...spinAnimation}
          >
            <Icon name="Loader2" className="w-full h-full text-primary" />
          </motion.div>
        );
    }
  };

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
      {showLogo && (
        <motion.div
          className="w-16 h-16 mb-4"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <AppImage
            src="/assets/images/thinked-high-resolution-logo-transparent-1757342968260.png"
            alt="ThinkEd Logo"
            className="w-full h-full object-contain thinked-logo"
          />
        </motion.div>
      )}
      
      {renderSpinner()}
      
      {text && (
        <motion.p
          className="text-sm text-muted-foreground font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

// Skeleton Loader Component
export const SkeletonLoader = ({ 
  className,
  variant = 'text',
  lines = 3,
  width = '100%',
  height = '1rem'
}) => {
  const { getAnimationProps } = useAnimationConfig();

  const shimmerAnimation = getAnimationProps({
    animate: {
      backgroundPosition: ['200% 0', '-200% 0']
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear'
    }
  });

  const baseClasses = 'bg-gradient-to-r from-muted via-muted-foreground/20 to-muted rounded animate-pulse';

  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className={cn('space-y-4 p-6', className)}>
            <div className="w-16 h-16 bg-muted rounded-2xl" />
            <div className="space-y-2">
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </div>
        );

      case 'avatar':
        return (
          <div className={cn('flex items-center space-x-4', className)}>
            <div className="w-12 h-12 bg-muted rounded-full" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-muted rounded w-1/4" />
              <div className="h-3 bg-muted rounded w-1/3" />
            </div>
          </div>
        );

      case 'button':
        return (
          <div 
            className={cn('bg-muted rounded-lg', className)}
            style={{ width, height: height || '2.5rem' }}
          />
        );

      case 'text':
      default:
        return (
          <div className={cn('space-y-2', className)}>
            {Array.from({ length: lines }).map((_, i) => (
              <motion.div
                key={i}
                className={baseClasses}
                style={{
                  width: i === lines - 1 ? '75%' : width,
                  height,
                  backgroundSize: '200% 100%'
                }}
                {...shimmerAnimation}
              />
            ))}
          </div>
        );
    }
  };

  return renderSkeleton();
};

// Progress Bar Component
export const ProgressBar = ({ 
  progress = 0, 
  className,
  showPercentage = false,
  variant = 'default',
  size = 'md'
}) => {
  const { getAnimationProps } = useAnimationConfig();

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const progressAnimation = getAnimationProps({
    initial: { width: 0 },
    animate: { width: `${Math.min(100, Math.max(0, progress))}%` },
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  });

  const getProgressBarClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-primary via-secondary to-accent';
      case 'success':
        return 'bg-success';
      case 'warning':
        return 'bg-warning';
      case 'error':
        return 'bg-error';
      default:
        return 'bg-primary';
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <div className={cn(
        'w-full bg-muted rounded-full overflow-hidden',
        sizes[size]
      )}>
        <motion.div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            getProgressBarClasses()
          )}
          {...progressAnimation}
        />
      </div>
      {showPercentage && (
        <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
    </div>
  );
};

// Full Page Loader
export const FullPageLoader = ({ 
  text = "Loading...",
  showLogo = true 
}) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-card-enhanced p-12 rounded-3xl text-center">
        <LoadingSpinner 
          size="xl" 
          variant="logo" 
          text={text}
          showLogo={showLogo}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;