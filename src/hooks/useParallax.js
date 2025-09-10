import { useEffect, useState } from 'react';
import { useTransform, useScroll } from 'framer-motion';

export const useParallax = (speed = 0.5) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, speed * 1000]);
  
  return y;
};

export const useParallaxElement = (speed = 0.5, offset = 0) => {
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateDimensions = () => {
      setClientHeight(window.innerHeight);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const y = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + offset],
    [speed * clientHeight, -speed * clientHeight]
  );

  return { y, setElementTop };
};

export const useMouseParallax = (strength = 0.1) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) * strength;
      const y = (e.clientY - window.innerHeight / 2) * strength;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return mousePosition;
};