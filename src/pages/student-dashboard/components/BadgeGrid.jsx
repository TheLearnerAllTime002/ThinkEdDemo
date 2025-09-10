import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const BadgeGrid = () => {
  const badges = [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first lesson",
      icon: "Award",
      earned: true,
      rarity: "common",
      earnedDate: "2025-01-05"
    },
    {
      id: 2,
      name: "Math Wizard",
      description: "Score 90%+ in 5 math quizzes",
      icon: "Calculator",
      earned: true,
      rarity: "rare",
      earnedDate: "2025-01-08"
    },
    {
      id: 3,
      name: "Streak Master",
      description: "Maintain 7-day learning streak",
      icon: "Flame",
      earned: true,
      rarity: "epic",
      earnedDate: "2025-01-10"
    },
    {
      id: 4,
      name: "Science Explorer",
      description: "Complete 15 science experiments",
      icon: "Microscope",
      earned: false,
      rarity: "rare",
      progress: 7
    },
    {
      id: 5,
      name: "Speed Learner",
      description: "Complete 10 lessons quickly",
      icon: "Zap",
      earned: false,
      rarity: "common",
      progress: 2
    },
    {
      id: 6,
      name: "Curious Mind",
      description: "Ask 50 questions in forum",
      icon: "MessageCircle",
      earned: false,
      rarity: "epic",
      progress: 23
    }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'from-slate-400 to-slate-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTargetValue = (rarity) => {
    switch (rarity) {
      case 'common': return 10;
      case 'rare': return 15;
      case 'epic': return 50;
      case 'legendary': return 100;
      default: return 10;
    }
  };

  return (
    <div className="modern-glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Achievements</h2>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Trophy" size={20} />
          <span className="text-sm">{badges?.filter(b => b?.earned)?.length}/{badges?.length}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {badges?.map((badge, index) => (
          <motion.div
            key={badge?.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
              badge?.earned 
                ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 shadow-lg' 
                : 'bg-muted/30 border-muted/50'
            } hover:scale-105 cursor-pointer`}
          >
            {badge?.earned && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={14} color="white" />
              </div>
            )}
            
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getRarityColor(badge?.rarity)} flex items-center justify-center mb-3 mx-auto ${
              badge?.earned ? 'shadow-lg' : 'opacity-50'
            }`}>
              <Icon name={badge?.icon} size={24} color="white" />
            </div>
            
            <div className="text-center space-y-1">
              <h3 className={`font-medium text-sm ${badge?.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                {badge?.name}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {badge?.description}
              </p>
              
              {!badge?.earned && badge?.progress && (
                <div className="mt-2">
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-primary h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (badge?.progress / getTargetValue(badge?.rarity)) * 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {badge?.progress}/{getTargetValue(badge?.rarity)}
                  </p>
                </div>
              )}
              
              {badge?.earned && (
                <p className="text-xs text-success font-medium">
                  Earned {new Date(badge.earnedDate)?.toLocaleDateString()}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BadgeGrid;