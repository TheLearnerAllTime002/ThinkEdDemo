import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Icon from '../AppIcon';

const StreakTracker = ({ streak = 7 }) => {
  const { t } = useTranslation();
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <motion.div 
      className="glass rounded-2xl p-5 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center justify-center mb-3">
        <Icon name="Flame" size={24} className="text-orange-500" />
        <h3 className="font-semibold text-foreground ml-2">{t('dashboard.dailyStreak')}</h3>
      </div>
      <div className="text-4xl font-bold text-orange-500 mb-3">{streak}</div>
      <p className="text-sm text-muted-foreground mb-4">{t('dashboard.daysInRow')}</p>
      <div className="flex justify-center space-x-2">
        {days.map((day, index) => (
          <div 
            key={index}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              index < streak
                ? 'bg-gradient-to-br from-orange-500 to-yellow-500 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-muted-foreground'
            }`}
          >
            <span className="text-xs font-bold">{day}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StreakTracker;