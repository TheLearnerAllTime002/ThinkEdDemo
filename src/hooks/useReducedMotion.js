import { useEffect, useState } from 'react';

export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

export const useAnimationConfig = () => {
  const prefersReducedMotion = useReducedMotion();
  
  const getAnimationProps = (normalProps, reducedProps = {}) => {
    if (prefersReducedMotion) {
      return {
        ...normalProps,
        ...reducedProps,
        transition: { duration: 0.01 },
        animate: reducedProps.animate || normalProps.initial || {}
      };
    }
    return normalProps;
  };

  const springConfig = prefersReducedMotion 
    ? { duration: 0.01 }
    : { type: 'spring', stiffness: 100, damping: 15 };

  return { prefersReducedMotion, getAnimationProps, springConfig };
};