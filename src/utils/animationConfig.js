// Animation Configuration System

export const ANIMATION_VARIANTS = {
  // Page transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: 'easeInOut' }
  },

  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  },

  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },

  fadeInDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },

  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },

  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },

  bounceIn: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { opacity: 1, scale: 1 },
    transition: { 
      duration: 0.8, 
      ease: [0.68, -0.55, 0.265, 1.55] 
    }
  },

  // Hover animations
  hoverLift: {
    whileHover: { 
      y: -8, 
      transition: { duration: 0.3, ease: 'easeOut' } 
    },
    whileTap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  },

  hoverScale: {
    whileHover: { 
      scale: 1.05,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    whileTap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  },

  hoverGlow: {
    whileHover: {
      boxShadow: '0 0 40px rgba(74, 155, 142, 0.5)',
      transition: { duration: 0.3 }
    }
  },

  // Button animations
  buttonSpring: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  },

  buttonGradient: {
    whileHover: {
      backgroundPosition: '100% 0',
      transition: { duration: 0.3 }
    }
  },

  // Container animations
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const SPRING_CONFIGS = {
  gentle: { type: 'spring', stiffness: 120, damping: 14 },
  wobbly: { type: 'spring', stiffness: 180, damping: 12 },
  stiff: { type: 'spring', stiffness: 400, damping: 30 },
  slow: { type: 'spring', stiffness: 80, damping: 14 },
  bouncy: { type: 'spring', stiffness: 300, damping: 8 }
};

export const EASING_FUNCTIONS = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  anticipate: [0.175, 0.885, 0.32, 1.275]
};

export class AnimationPerformanceMonitor {
  constructor() {
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fps = 60;
    this.isMonitoring = false;
  }

  startMonitoring() {
    this.isMonitoring = true;
    this.monitor();
  }

  stopMonitoring() {
    this.isMonitoring = false;
  }

  monitor() {
    if (!this.isMonitoring) return;

    const currentTime = performance.now();
    this.frameCount++;

    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
      this.frameCount = 0;
      this.lastTime = currentTime;

      // Log performance warnings
      if (this.fps < 30) {
        console.warn(`Low FPS detected: ${this.fps}fps. Consider reducing animation complexity.`);
      }
    }

    requestAnimationFrame(() => this.monitor());
  }

  getFPS() {
    return this.fps;
  }
}

export const performanceMonitor = new AnimationPerformanceMonitor();

// Utility functions
export const getReducedMotionVariant = (normalVariant, reducedVariant = {}) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    return {
      ...normalVariant,
      ...reducedVariant,
      transition: { duration: 0.01 }
    };
  }
  
  return normalVariant;
};

export const createStaggeredAnimation = (itemCount, baseDelay = 0.1) => {
  return {
    animate: {
      transition: {
        staggerChildren: baseDelay,
        delayChildren: 0.1
      }
    }
  };
};

export const createScrollTriggeredAnimation = (threshold = 0.1) => {
  return {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: threshold },
    transition: { duration: 0.6, ease: 'easeOut' }
  };
};