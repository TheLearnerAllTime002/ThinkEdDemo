import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgressCharts({ data }) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
          <XAxis dataKey="subject" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0,0,0,0.7)', 
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px'
            }}
            itemStyle={{ color: 'white' }}
          />
          <Bar 
            dataKey="progress" 
            fill="#F59E0B" 
            name="Progress %" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
