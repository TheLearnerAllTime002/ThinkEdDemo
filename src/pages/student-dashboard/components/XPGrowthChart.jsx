import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const XPGrowthChart = () => {
  const xpData = [
    { date: '01 Jan', xp: 0, dailyXp: 0 },
    { date: '02 Jan', xp: 150, dailyXp: 150 },
    { date: '03 Jan', xp: 300, dailyXp: 150 },
    { date: '04 Jan', xp: 500, dailyXp: 200 },
    { date: '05 Jan', xp: 650, dailyXp: 150 },
    { date: '06 Jan', xp: 850, dailyXp: 200 },
    { date: '07 Jan', xp: 1000, dailyXp: 150 },
    { date: '08 Jan', xp: 1250, dailyXp: 250 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="modern-glass-card rounded-lg p-3 border border-white/20">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-primary">
            Total XP: {payload?.[0]?.value?.toLocaleString()}
          </p>
          <p className="text-sm text-accent">
            Daily XP: +{payload?.[0]?.payload?.dailyXp}
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
      transition={{ duration: 0.6, delay: 0.2 }}
      className="modern-glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">XP Growth</h2>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">Total XP</span>
          </div>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={xpData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `${value}`}
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
      <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">1,250</p>
          <p className="text-xs text-muted-foreground">Total XP</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">250</p>
          <p className="text-xs text-muted-foreground">Today's XP</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">156</p>
          <p className="text-xs text-muted-foreground">Daily Avg</p>
        </div>
      </div>
    </motion.div>
  );
};

export default XPGrowthChart;