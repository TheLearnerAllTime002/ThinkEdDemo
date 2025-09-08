import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, icon, color, subtitle, trend }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="modern-glass-card rounded-xl p-6 spring-bounce hover:shadow-3"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        {trend && (
          <div className="flex items-center space-x-1 text-success">
            <Icon name="TrendingUp" size={16} />
            <span className="text-sm font-medium">+{trend}%</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <motion.h3
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-3xl font-bold text-foreground"
        >
          {value?.toLocaleString()}
        </motion.h3>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
};

export default MetricsCard;