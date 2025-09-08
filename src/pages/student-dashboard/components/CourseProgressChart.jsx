import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

const CourseProgressChart = () => {
  const { isDarkMode } = useTheme();
  
  const courseData = [
    { subject: 'Math', progress: 85, completed: 17, total: 20, color: isDarkMode ? '#60A5FA' : '#3B82F6' },
    { subject: 'Science', progress: 72, completed: 13, total: 18, color: isDarkMode ? '#34D399' : '#10B981' },
    { subject: 'English', progress: 90, completed: 18, total: 20, color: isDarkMode ? '#A78BFA' : '#8B5CF6' },
    { subject: 'History', progress: 45, completed: 9, total: 20, color: isDarkMode ? '#FBBF24' : '#F59E0B' },
    { subject: 'Geography', progress: 60, completed: 12, total: 20, color: isDarkMode ? '#22D3EE' : '#06B6D4' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className={`
          rounded-lg p-4 border shadow-xl backdrop-blur-md
          ${
            isDarkMode 
              ? 'bg-slate-800/95 border-slate-600/50 text-slate-100 shadow-2xl'
              : 'bg-slate-800/90 border-slate-600/40 text-slate-100 shadow-2xl'
          }
        `}>
          <p className="text-sm font-semibold text-slate-100 mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm flex items-center space-x-2">
              <span className="text-blue-300 font-medium">Progress:</span>
              <span className="font-bold text-slate-100">{data?.progress}%</span>
            </p>
            <p className="text-xs text-slate-300">
              {data?.completed}/{data?.total} lessons completed
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="modern-glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Course Progress</h2>
        <div className="text-sm text-muted-foreground">
          Overall: 70.4%
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={courseData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.2)'}
              vertical={false}
            />
            <XAxis 
              dataKey="subject" 
              stroke={isDarkMode ? 'rgba(241, 245, 249, 0.8)' : 'rgba(71, 85, 105, 0.8)'}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: isDarkMode ? 'rgba(241, 245, 249, 0.8)' : 'rgba(71, 85, 105, 0.8)' }}
            />
            <YAxis 
              stroke={isDarkMode ? 'rgba(241, 245, 249, 0.8)' : 'rgba(71, 85, 105, 0.8)'}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: isDarkMode ? 'rgba(241, 245, 249, 0.8)' : 'rgba(71, 85, 105, 0.8)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="progress"
              radius={[6, 6, 0, 0]}
              className="hover:brightness-110 transition-all duration-200 cursor-pointer"
            >
              {courseData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="hover:drop-shadow-lg transition-all duration-200"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-3 pt-4 border-t border-glass-border">
        {courseData?.map((course, index) => (
          <motion.div
            key={course?.subject}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/10 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: course?.color }}
              />
              <span className="text-sm font-medium text-foreground">{course?.subject}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`w-20 rounded-full h-2 transition-all duration-200 group-hover:h-2.5 ${
                isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
              }`}>
                <div 
                  className="h-full rounded-full transition-all duration-500 shadow-sm group-hover:shadow-md"
                  style={{ 
                    width: `${course?.progress}%`,
                    backgroundColor: course?.color,
                    boxShadow: `0 0 8px ${course?.color}40`
                  }}
                />
              </div>
              <span className="text-sm font-semibold text-foreground w-12 text-right group-hover:text-primary transition-colors duration-200">
                {course?.progress}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CourseProgressChart;