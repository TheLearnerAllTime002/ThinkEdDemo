import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useAnimationConfig } from '../../hooks/useReducedMotion';
import { ANIMATION_VARIANTS } from '../../utils/animationConfig';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const { getAnimationProps } = useAnimationConfig();

  const pageVariants = getAnimationProps({
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  });

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        className="min-h-screen"
        {...pageVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Alternative transition variants for different page types
export const SlidePageTransition = ({ children, direction = 'right' }) => {
  const location = useLocation();
  const { getAnimationProps } = useAnimationConfig();

  const getSlideVariants = () => {
    const distance = 50;
    const variants = {
      left: { x: -distance },
      right: { x: distance },
      up: { y: -distance },
      down: { y: distance }
    };

    return getAnimationProps({
      initial: { 
        opacity: 0, 
        ...variants[direction]
      },
      animate: { 
        opacity: 1, 
        x: 0,
        y: 0,
        transition: {
          duration: 0.5,
          ease: 'easeOut'
        }
      },
      exit: { 
        opacity: 0, 
        ...variants[direction === 'left' ? 'right' : direction === 'right' ? 'left' : direction === 'up' ? 'down' : 'up'],
        transition: {
          duration: 0.3,
          ease: 'easeIn'
        }
      }
    });
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        className="min-h-screen"
        {...getSlideVariants()}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Scale transition for modal-like pages
export const ScalePageTransition = ({ children }) => {
  const location = useLocation();
  const { getAnimationProps } = useAnimationConfig();

  const scaleVariants = getAnimationProps({
    initial: { 
      opacity: 0, 
      scale: 0.9,
      y: 20
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 1, 1]
      }
    }
  });

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        className="min-h-screen"
        {...scaleVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Fade transition for subtle page changes
export const FadePageTransition = ({ children }) => {
  const location = useLocation();
  const { getAnimationProps } = useAnimationConfig();

  const fadeVariants = getAnimationProps({
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    }
  });

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        className="min-h-screen"
        {...fadeVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Route-specific transition wrapper
export const RouteTransition = ({ children, transitionType = 'default' }) => {
  const TransitionComponent = {
    default: PageTransition,
    slide: SlidePageTransition,
    scale: ScalePageTransition,
    fade: FadePageTransition
  }[transitionType] || PageTransition;

  return <TransitionComponent>{children}</TransitionComponent>;
};

export default PageTransition;