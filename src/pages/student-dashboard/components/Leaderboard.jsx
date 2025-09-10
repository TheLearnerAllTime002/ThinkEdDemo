import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const Leaderboard = () => {
  const leaderboardData = [
    {
      id: 1,
      rank: 1,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      xp: 2850,
      streak: 15,
      badge: "Math Genius",
      isCurrentUser: false
    },
    {
      id: 2,
      rank: 2,
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      xp: 1250,
      streak: 7,
      badge: "Streak Master",
      isCurrentUser: true
    },
    {
      id: 3,
      rank: 3,
      name: "Maria Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      xp: 1180,
      streak: 12,
      badge: "Science Explorer",
      isCurrentUser: false
    },
    {
      id: 4,
      rank: 4,
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      xp: 980,
      streak: 5,
      badge: "Quick Learner",
      isCurrentUser: false
    },
    {
      id: 5,
      rank: 5,
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      xp: 875,
      streak: 9,
      badge: "Language Master",
      isCurrentUser: false
    }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return { icon: "Crown", color: "text-yellow-500" };
      case 2: return { icon: "Medal", color: "text-gray-400" };
      case 3: return { icon: "Award", color: "text-amber-600" };
      default: return { icon: "Hash", color: "text-muted-foreground" };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="modern-glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Leaderboard</h2>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Users" size={20} />
          <span className="text-sm">This Week</span>
        </div>
      </div>
      <div className="space-y-3">
        {leaderboardData?.map((user, index) => {
          const rankInfo = getRankIcon(user?.rank);
          return (
            <motion.div
              key={user?.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 ${
                user?.isCurrentUser 
                  ? 'bg-primary/10 border border-primary/20 shadow-lg' 
                  : 'hover:bg-muted/30'
              }`}
            >
              {/* Rank */}
              <div className="flex items-center justify-center w-8 h-8">
                {user?.rank <= 3 ? (
                  <Icon name={rankInfo?.icon} size={20} className={rankInfo?.color} />
                ) : (
                  <span className="text-sm font-bold text-muted-foreground">#{user?.rank}</span>
                )}
              </div>
              {/* Avatar */}
              <div className="relative">
                <Image
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {user?.isCurrentUser && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={10} color="white" />
                  </div>
                )}
              </div>
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className={`font-medium text-sm truncate ${
                    user?.isCurrentUser ? 'text-primary' : 'text-foreground'
                  }`}>
                    {user?.name}
                    {user?.isCurrentUser && <span className="text-xs ml-1">(You)</span>}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground truncate">{user?.badge}</p>
              </div>
              {/* Stats */}
              <div className="flex items-center space-x-4 text-right">
                <div className="flex items-center space-x-1">
                  <Icon name="Flame" size={14} color="var(--color-accent)" />
                  <span className="text-sm font-medium text-accent">{user?.streak}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Zap" size={14} color="var(--color-warning)" />
                  <span className="text-sm font-bold text-warning">{user?.xp?.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="mt-4 pt-4 border-t border-white/10"
      >
        <button className="w-full py-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
          View Full Leaderboard
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Leaderboard;