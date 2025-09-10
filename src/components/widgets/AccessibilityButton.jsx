import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useTranslation } from 'react-i18next';
import Icon from '../AppIcon';

const AccessibilityButton = () => {
  const { 
    reducedMotion, 
    textToSpeechEnabled, 
    highContrast,
    toggleReducedMotion,
    toggleTextToSpeech,
    toggleHighContrast
  } = useAccessibility();
  
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 space-y-3"
          >
            {/* Text-to-Speech Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTextToSpeech}
              className={`flex items-center space-x-2 glass rounded-full px-4 py-2 ${
                textToSpeechEnabled 
                  ? 'bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] text-white' 
                  : 'bg-white/20 dark:bg-slate-800/50'
              }`}
            >
              <Icon 
                name={textToSpeechEnabled ? "Volume2" : "VolumeX"} 
                size={16} 
                className={textToSpeechEnabled ? "text-white" : "text-foreground"} 
              />
              <span className="text-sm font-medium">
                {t('accessibility.textToSpeech')}
              </span>
            </motion.button>

            {/* Reduced Motion Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleReducedMotion}
              className={`flex items-center space-x-2 glass rounded-full px-4 py-2 ${
                reducedMotion 
                  ? 'bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] text-white' 
                  : 'bg-white/20 dark:bg-slate-800/50'
              }`}
            >
              <Icon 
                name={reducedMotion ? "ZapOff" : "Zap"} 
                size={16} 
                className={reducedMotion ? "text-white" : "text-foreground"} 
              />
              <span className="text-sm font-medium">
                {t('accessibility.reducedMotion')}
              </span>
            </motion.button>

            {/* High Contrast Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleHighContrast}
              className={`flex items-center space-x-2 glass rounded-full px-4 py-2 ${
                highContrast 
                  ? 'bg-gradient-to-r from-[#4A9B8E] to-[#F59E0B] text-white' 
                  : 'bg-white/20 dark:bg-slate-800/50'
              }`}
            >
              <Icon 
                name={highContrast ? "Sun" : "Moon"} 
                size={16} 
                className={highContrast ? "text-white" : "text-foreground"} 
              />
              <span className="text-sm font-medium">
                {t('accessibility.highContrast')}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Accessibility Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMenu}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4A9B8E] to-[#F59E0B] flex items-center justify-center shadow-lg"
      >
        <Icon name="Accessibility" size={24} color="white" />
      </motion.button>
    </div>
  );
};

export default AccessibilityButton;