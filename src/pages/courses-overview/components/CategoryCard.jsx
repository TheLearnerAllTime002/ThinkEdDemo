import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import Icon from '../../../components/AppIcon';

const CategoryCard = ({ category, onSelect, isSelected }) => {
  const { isDarkMode } = useTheme();
  
  const getIconColor = () => {
    switch (category?.type) {
      case 'math':
        return 'var(--color-primary)';
      case 'science':
        return 'var(--color-success)';
      case 'skills':
        return 'var(--color-secondary)';
      default:
        return 'var(--color-accent)';
    }
  };

  const getGradientClass = () => {
    switch (category?.type) {
      case 'math':
        return 'from-blue-500/20 to-blue-600/20';
      case 'science':
        return 'from-emerald-500/20 to-emerald-600/20';
      case 'skills':
        return 'from-violet-500/20 to-violet-600/20';
      default:
        return 'from-cyan-500/20 to-cyan-600/20';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(category)}
      className={`glass rounded-xl p-6 cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-xl'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradientClass()} rounded-xl opacity-50`} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isDarkMode ? 'bg-slate-700/50' : 'bg-white/10'
            }`}>
              <Icon name={category?.icon} size={24} color={getIconColor()} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{category?.name}</h3>
              <p className="text-sm text-muted-foreground">{category?.courseCount} courses</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{category?.completionRate}%</div>
            <p className="text-xs text-muted-foreground">Complete</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {category?.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
              <span className="text-xs text-muted-foreground">{category?.totalHours}h</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Zap" size={14} color="var(--color-warning)" />
              <span className="text-xs text-warning">{category?.totalXP} XP</span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={14} color="var(--color-success)" />
            <span className="text-xs text-success">{category?.difficulty}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className={`w-full rounded-full h-2 ${
            isDarkMode ? 'bg-slate-700/50' : 'bg-white/10'
          }`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${category?.completionRate}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className={`h-2 rounded-full bg-gradient-to-r ${
                category?.type === 'math' ? 'from-blue-500 to-blue-600' :
                category?.type === 'science'? 'from-emerald-500 to-emerald-600' : 'from-violet-500 to-violet-600'
              }`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;