import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [textToSpeechEnabled, setTextToSpeechEnabled] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Check for user preferences on mount
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleReducedMotionChange = (e) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleReducedMotionChange);
    
    // Load settings from localStorage
    const savedReducedMotion = localStorage.getItem('reducedMotion');
    const savedTextToSpeech = localStorage.getItem('textToSpeechEnabled');
    const savedHighContrast = localStorage.getItem('highContrast');
    
    if (savedReducedMotion !== null) {
      setReducedMotion(JSON.parse(savedReducedMotion));
    }
    
    if (savedTextToSpeech !== null) {
      setTextToSpeechEnabled(JSON.parse(savedTextToSpeech));
    }
    
    if (savedHighContrast !== null) {
      setHighContrast(JSON.parse(savedHighContrast));
    }
    
    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('reducedMotion', JSON.stringify(reducedMotion));
  }, [reducedMotion]);

  useEffect(() => {
    localStorage.setItem('textToSpeechEnabled', JSON.stringify(textToSpeechEnabled));
  }, [textToSpeechEnabled]);

  useEffect(() => {
    localStorage.setItem('highContrast', JSON.stringify(highContrast));
  }, [highContrast]);

  const toggleReducedMotion = () => {
    setReducedMotion(prev => !prev);
  };

  const toggleTextToSpeech = () => {
    setTextToSpeechEnabled(prev => !prev);
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  return (
    <AccessibilityContext.Provider value={{
      reducedMotion,
      textToSpeechEnabled,
      highContrast,
      toggleReducedMotion,
      toggleTextToSpeech,
      toggleHighContrast
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};