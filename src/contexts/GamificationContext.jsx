import React, { createContext, useState } from 'react';

export const GamificationContext = createContext();

export const GamificationProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);

  const addXp = (amount) => setXp(xp + amount);
  const incrementStreak = () => setStreak(streak + 1);
  const addBadge = (badge) => setBadges([...badges, badge]);

  return (
    <GamificationContext.Provider value={{ xp, streak, badges, addXp, incrementStreak, addBadge }}>
      {children}
    </GamificationContext.Provider>
  );
};