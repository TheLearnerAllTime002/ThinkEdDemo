import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', progress: 60 },
  { name: 'Tue', progress: 75 },
  { name: 'Wed', progress: 80 },
  { name: 'Thu', progress: 65 },
  { name: 'Fri', progress: 85 },
  { name: 'Sat', progress: 90 },
  { name: 'Sun', progress: 95 },
];

const ProgressCharts = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
        <XAxis dataKey="name" tick={{ fill: '#A0AEC0' }} />
        <YAxis tick={{ fill: '#A0AEC0' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#2D3748',
            borderColor: '#4A5568',
            color: '#E2E8F0',
          }}
        />
        <Legend wrapperStyle={{ color: '#E2E8F0' }} />
        <Bar dataKey="progress" fill="#4A9B8E" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProgressCharts;