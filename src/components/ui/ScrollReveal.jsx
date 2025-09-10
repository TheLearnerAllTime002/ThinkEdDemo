import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, useStaggeredReveal } from '../../hooks/useScrollReveal';
import { useAnimationConfig } from '../../hooks/useReducedMotion';
import { cn } from '../../utils/cn';

const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 30,
  threshold = 0.1,
  triggerOnce = true,
  className,
  stagger = false,
  staggerDelay = 0.1,
  ...props
}) => {
  const { getAnimationProps } = useAnimationConfig();
  const { ref, isInView } = useScrollReveal({ 
    threshold, 
    triggerOnce,
    rootMargin: '0px 0px -50px 0px'
  });

  const getDirectionVariant = () => {
    const variants = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance },
      scale: { scale: 0.8 },
      fade: {}
    };

    return {
      initial: {
        opacity: 0,
        ...variants[direction]
      },
      animate: isInView ? {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: 'easeOut'
        }
      } : {
        opacity: 0,
        ...variants[direction]
      }
    };
  };

  const animationProps = getAnimationProps(getDirectionVariant());

  return (
    <motion.div
      ref={ref}
      className={cn('will-change-transform', className)}
      {...animationProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Staggered Reveal Component for multiple items
export const StaggeredReveal = ({
  children,
  direction = 'up',
  staggerDelay = 0.1,
  threshold = 0.1,
  className,
  ...props
}) => {
  const { getAnimationProps } = useAnimationConfig();
  const childrenArray = React.Children.toArray(children);
  const { ref, visibleItems, isInView } = useStaggeredReveal(
    childrenArray.length, 
    staggerDelay
  );

  const containerVariant = {
    animate: isInView ? {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    } : {}
  };

  const itemVariant = {
    initial: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
      scale: direction === 'scale' ? 0.8 : 1
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const containerProps = getAnimationProps(containerVariant);
  const itemProps = getAnimationProps(itemVariant);

  return (
    <motion.div
      ref={ref}
      className={cn('will-change-transform', className)}
      {...containerProps}
      {...props}
    >
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          {...itemProps}
          style={{
            opacity: visibleItems.has(index) ? 1 : 0
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Parallax Reveal Component
export const ParallaxReveal = ({
  children,
  speed = 0.5,
  className,
  ...props
}) => {
  const { ref, isInView } = useScrollReveal({ threshold: 0.1 });
  const { getAnimationProps } = useAnimationConfig();

  const parallaxVariant = {
    initial: { opacity: 0, y: 50 },
    animate: isInView ? {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    } : {
      opacity: 0,
      y: 50
    }
  };

  const animationProps = getAnimationProps(parallaxVariant);

  return (
    <motion.div
      ref={ref}
      className={cn('will-change-transform', className)}
      {...animationProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Reveal on Scroll Hook for custom implementations
export const useRevealOnScroll = (options = {}) => {
  const {
    direction = 'up',
    distance = 30,
    duration = 0.6,
    delay = 0,
    threshold = 0.1,
    triggerOnce = true
  } = options;

  const { ref, isInView } = useScrollReveal({ threshold, triggerOnce });
  const { getAnimationProps } = useAnimationConfig();

  const getVariant = () => {
    const variants = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance },
      scale: { scale: 0.8 },
      fade: {}
    };

    return {
      initial: {
        opacity: 0,
        ...variants[direction]
      },
      animate: isInView ? {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: 'easeOut'
        }
      } : {
        opacity: 0,
        ...variants[direction]
      }
    };
  };

  const animationProps = getAnimationProps(getVariant());

  return { ref, isInView, animationProps };
};

export default ScrollReveal;