import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useAnimationConfig } from '../../hooks/useReducedMotion';
import { ANIMATION_VARIANTS } from '../../utils/animationConfig';

const AnimatedCard = React.forwardRef(({
  className,
  variant = 'default',
  animationType = 'lift',
  glowColor,
  children,
  onClick,
  ...props
}, ref) => {
  const { getAnimationProps } = useAnimationConfig();

  const variants = {
    default: 'glass-card-enhanced bg-card text-card-foreground',
    glass: 'glass-enhanced bg-white/5 backdrop-blur-md border border-white/10',
    frosted: 'frosted-glass bg-white/5',
    liquid: 'liquid-glass bg-gradient-to-br from-white/10 to-white/5',
    gradient: 'glass-gradient-primary bg-gradient-to-br from-primary/10 to-secondary/10',
    outline: 'border border-border bg-background/50 backdrop-blur-sm',
    solid: 'bg-card border border-border shadow-lg'
  };

  const getAnimationVariant = () => {
    const baseVariant = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: 'easeOut' }
    };

    switch (animationType) {
      case 'scale':
        return {
          ...baseVariant,
          whileHover: { 
            scale: 1.02,
            transition: { duration: 0.3, ease: 'easeOut' }
          }
        };
      case 'glow':
        return {
          ...baseVariant,
          whileHover: {
            boxShadow: glowColor 
              ? `0 0 40px rgba(${glowColor}, 0.5)`
              : '0 0 40px rgba(74, 155, 142, 0.5)',
            transition: { duration: 0.3 }
          }
        };
      case 'tilt':
        return {
          ...baseVariant,
          whileHover: {
            rotateY: 5,
            rotateX: 5,
            transition: { duration: 0.3, ease: 'easeOut' }
          }
        };
      case 'lift':
      default:
        return {
          ...baseVariant,
          whileHover: { 
            y: -8,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.3, ease: 'easeOut' }
          },
          whileTap: onClick ? { 
            scale: 0.98,
            transition: { duration: 0.1 }
          } : {}
        };
    }
  };

  const animationProps = getAnimationProps(getAnimationVariant());

  const cardClasses = cn(
    'relative overflow-hidden rounded-2xl p-6 transition-all duration-300',
    variants[variant],
    {
      'cursor-pointer': onClick,
      'transform-gpu': true, // Enable GPU acceleration
    },
    className
  );

  return (
    <motion.div
      ref={ref}
      className={cardClasses}
      onClick={onClick}
      {...animationProps}
      {...props}
    >
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Glow effect for certain variants */}
      {(variant === 'glass' || variant === 'gradient') && (
        <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl" />
        </div>
      )}
    </motion.div>
  );
});

AnimatedCard.displayName = 'AnimatedCard';

// Card Header Component
export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

// Card Title Component
export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

// Card Description Component
export const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

// Card Content Component
export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

// Card Footer Component
export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export default AnimatedCard;