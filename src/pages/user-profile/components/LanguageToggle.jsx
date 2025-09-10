import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTranslation } from '../../../hooks/useTranslation';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageToggle = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिंदी' }
  ];

  const translations = {
    en: {
      language: "Language",
      selectLanguage: "Select Language",
      currentLanguage: "Current Language"
    },
    hi: {
      language: "भाषा",
      selectLanguage: "भाषा चुनें",
      currentLanguage: "वर्तमान भाषा"
    }
  };

  const localT = translations?.[currentLanguage] || translations?.en;
  const currentLang = languages?.find(lang => lang?.code === currentLanguage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass rounded-xl p-6 border border-glass-border"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Globe" size={24} color="var(--color-primary)" />
        <h2 className="heading-3">{localT?.language}</h2>
      </div>
      {/* Current Language Display */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-3">{localT?.currentLanguage}</p>
        <div className="glass rounded-lg p-4 border border-glass-border">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{currentLang?.flag}</span>
            <div>
              <div className="font-medium">{currentLang?.name}</div>
              <div className="text-sm text-muted-foreground">{currentLang?.nativeName}</div>
            </div>
            <div className="ml-auto">
              <Icon name="Check" size={20} color="var(--color-success)" />
            </div>
          </div>
        </div>
      </div>
      {/* Language Options */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground mb-3">{localT?.selectLanguage}</p>
        {languages?.map((language) => (
          <motion.div
            key={language?.code}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={currentLanguage === language?.code ? "default" : "ghost"}
              onClick={() => changeLanguage(language?.code)}
              className={`w-full justify-start space-x-3 h-auto p-4 ${
                currentLanguage === language?.code ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              <span className="text-2xl">{language?.flag}</span>
              <div className="text-left">
                <div className="font-medium">{language?.name}</div>
                <div className="text-sm opacity-70">{language?.nativeName}</div>
              </div>
              {currentLanguage === language?.code && (
                <div className="ml-auto">
                  <Icon name="Check" size={20} />
                </div>
              )}
            </Button>
          </motion.div>
        ))}
      </div>
      {/* Language Change Notice */}
      <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-primary mb-1">
              {currentLanguage === 'en' ? 'Language Change' : 'भाषा परिवर्तन'}
            </p>
            <p className="text-primary/80">
              {currentLanguage === 'en' ?'The interface will update immediately when you select a new language.' :'जब आप नई भाषा चुनेंगे तो इंटरफ़ेस तुरंत अपडेट हो जाएगा।'
              }
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LanguageToggle;