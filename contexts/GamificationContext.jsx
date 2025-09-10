import { createContext, useState, useContext, useEffect } from 'react';

const GamificationContext = createContext();

export const GamificationProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  const addXp = (amount) => {
    setXp(prev => prev + amount);
  };

  const incrementStreak = () => {
    setStreak(prev => prev + 1);
  };

  const addBadge = (badge) => {
    setBadges(prev => [...prev, badge]);
  };

  return (
    <GamificationContext.Provider 
      value={{ 
        xp, 
        streak, 
        badges, 
        leaderboard,
        addXp,
        incrementStreak,
        addBadge
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => useContext(GamificationContext);
