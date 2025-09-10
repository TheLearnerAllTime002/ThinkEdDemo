import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export const useScrollReveal = ({
  threshold = 0.1,
  triggerOnce = true,
  rootMargin = '0px 0px -100px 0px'
} = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold,
    once: triggerOnce,
    rootMargin
  });

  return { ref, isInView };
};

export const useStaggeredReveal = (itemCount, delay = 0.1) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const { ref, isInView } = useScrollReveal();

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        for (let i = 0; i < itemCount; i++) {
          setTimeout(() => {
            setVisibleItems(prev => new Set([...prev, i]));
          }, i * delay * 1000);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isInView, itemCount, delay]);

  return { ref, visibleItems, isInView };
};