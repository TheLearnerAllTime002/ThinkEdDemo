import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useAnimationConfig } from '../../hooks/useReducedMotion';
import { ANIMATION_VARIANTS, SPRING_CONFIGS } from '../../utils/animationConfig';
import Icon from '../AppIcon';

const AnimatedButton = React.forwardRef(({
  className,
  variant = 'default',
  size = 'md',
  animationType = 'spring',
  glowColor,
  children,
  iconName,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  ...props
}, ref) => {
  const { getAnimationProps, springConfig } = useAnimationConfig();

  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
    gradient: 'bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90',
    glass: 'glass-button text-foreground hover:bg-white/20',
    glow: `bg-primary text-primary-foreground hover:bg-primary/90 ${glowColor ? `glow-${glowColor}` : 'glow-primary'}`
  };

  const sizes = {
    sm: 'h-9 rounded-md px-3 text-sm',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-11 rounded-md px-8 text-base',
    xl: 'h-12 rounded-lg px-10 text-lg',
    icon: 'h-10 w-10'
  };

  const getAnimationVariant = () => {
    switch (animationType) {
      case 'scale':
        return ANIMATION_VARIANTS.hoverScale;
      case 'glow':
        return ANIMATION_VARIANTS.hoverGlow;
      case 'gradient':
        return ANIMATION_VARIANTS.buttonGradient;
      case 'spring':
      default:
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: springConfig
        };
    }
  };

  const animationProps = getAnimationProps(getAnimationVariant());

  const buttonClasses = cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    {
      'animate-gradient-shift': variant === 'gradient',
      'cursor-not-allowed opacity-50': disabled,
      'animate-pulse': loading
    },
    className
  );

  const renderIcon = () => {
    if (loading) {
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className={cn(
            'w-4 h-4',
            iconPosition === 'right' ? 'ml-2' : 'mr-2'
          )}
        >
          <Icon name="Loader2" size={16} />
        </motion.div>
      );
    }

    if (iconName) {
      return (
        <Icon 
          name={iconName} 
          size={16} 
          className={cn(
            iconPosition === 'right' ? 'ml-2' : 'mr-2'
          )}
        />
      );
    }

    return null;
  };

  return (
    <motion.button
      ref={ref}
      className={buttonClasses}
      disabled={disabled || loading}
      {...animationProps}
      {...props}
    >
      {iconPosition === 'left' && renderIcon()}
      {children}
      {iconPosition === 'right' && renderIcon()}
      
      {/* Shimmer effect for gradient buttons */}
      {variant === 'gradient' && (
        <motion.div
          className="absolute inset-0 -top-px overflow-hidden rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12" />
        </motion.div>
      )}
    </motion.button>
  );
});

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;