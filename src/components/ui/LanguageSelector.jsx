import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import Icon from '../AppIcon';

const LanguageSelector = ({ variant = 'dropdown', className = '' }) => {
  const { currentLanguage, changeLanguage, availableLanguages } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/20 dark:bg-slate-800/50 backdrop-blur-xl border border-white/30 dark:border-slate-700/50 hover:bg-white/30 dark:hover:bg-slate-700/50 transition-all duration-300 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg">{currentLang?.flag}</span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:block">
            {currentLang?.name}
          </span>
          <Icon 
            name="ChevronDown" 
            size={14} 
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Dropdown */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
              >
                {availableLanguages.map((language) => (
                  <motion.button
                    key={language.code}
                    onClick={() => {
                      changeLanguage(language.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                      currentLanguage === language.code 
                        ? 'bg-gradient-to-r from-[#4A9B8E]/10 to-[#F59E0B]/10 text-[#4A9B8E]' 
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <span className="font-medium">{language.name}</span>
                    {currentLanguage === language.code && (
                      <Icon name="Check" size={16} className="ml-auto text-[#4A9B8E]" />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Simple flag variant
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {availableLanguages.map((language) => (
        <motion.button
          key={language.code}
          onClick={() => changeLanguage(language.code)}
          className={`p-2 rounded-xl transition-all duration-300 ${
            currentLanguage === language.code
              ? 'bg-gradient-to-r from-[#4A9B8E]/20 to-[#F59E0B]/20 scale-110'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800 opacity-60 hover:opacity-100'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={language.name}
        >
          <span className="text-lg">{language.flag}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default LanguageSelector;