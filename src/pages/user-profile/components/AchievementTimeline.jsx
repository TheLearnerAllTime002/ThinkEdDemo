import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const AchievementTimeline = ({ achievements, xpData, currentLanguage }) => {
  const translations = {
    en: {
      timeline: "Achievement Timeline",
      xpProgress: "XP Progress",
      recentAchievements: "Recent Achievements",
      viewAll: "View All",
      xpEarned: "XP Earned",
      date: "Date",
      noAchievements: "No recent achievements"
    },
    hi: {
      timeline: "उपलब्धि समयरेखा",
      xpProgress: "XP प्रगति",
      recentAchievements: "हाल की उपलब्धियां",
      viewAll: "सभी देखें",
      xpEarned: "XP अर्जित",
      date: "दिनांक",
      noAchievements: "कोई हाल की उपलब्धियां नहीं"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const getAchievementIcon = (type) => {
    const iconMap = {
      streak: 'Flame',
      course: 'BookOpen',
      quiz: 'Brain',
      milestone: 'Trophy',
      badge: 'Award',
      level: 'Star'
    };
    return iconMap?.[type] || 'CheckCircle';
  };

  const getAchievementColor = (type) => {
    const colorMap = {
      streak: 'var(--color-accent)',
      course: 'var(--color-success)',
      quiz: 'var(--color-secondary)',
      milestone: 'var(--color-warning)',
      badge: 'var(--color-primary)',
      level: 'var(--color-accent)'
    };
    return colorMap?.[type] || 'var(--color-primary)';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return currentLanguage === 'hi' ? date?.toLocaleDateString('hi-IN')
      : date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass rounded-lg p-3 border border-glass-border">
          <p className="text-sm font-medium">{`${t?.date}: ${label}`}</p>
          <p className="text-sm text-primary">
            {`${t?.xpEarned}: ${payload?.[0]?.value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="glass rounded-xl p-6 border border-glass-border"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="TrendingUp" size={24} color="var(--color-primary)" />
          <h2 className="heading-3">{t?.timeline}</h2>
        </div>
      </div>
      {/* XP Progress Chart */}
      <div className="mb-8">
        <h3 className="heading-4 mb-4">{t?.xpProgress}</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={xpData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="xp" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Recent Achievements */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="heading-4">{t?.recentAchievements}</h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            {t?.viewAll}
          </button>
        </div>

        {achievements?.length > 0 ? (
          <div className="space-y-4">
            {achievements?.slice(0, 5)?.map((achievement, index) => (
              <motion.div
                key={achievement?.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 glass rounded-lg border border-glass-border hover:border-primary/30 transition-colors"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${getAchievementColor(achievement?.type)}20` }}
                >
                  <Icon 
                    name={getAchievementIcon(achievement?.type)} 
                    size={20} 
                    color={getAchievementColor(achievement?.type)} 
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{achievement?.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement?.description}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-primary">+{achievement?.xpReward} XP</div>
                  <div className="text-xs text-muted-foreground">{formatDate(achievement?.date)}</div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <p className="text-muted-foreground">{t?.noAchievements}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AchievementTimeline;