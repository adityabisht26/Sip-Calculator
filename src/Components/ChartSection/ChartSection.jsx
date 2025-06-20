import React, { useRef } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from 'recharts';
import './ChartSection.css';

const ChartSection = ({ chartData, returnsPercentage, duration }) => {
  const chartRef = useRef(null);

  return (
    <div className="chart-section">
      <div className="chart-container">
        <div className="chart-header">
          <div className="chart-header__content">
            <span className="chart-header__label">Growth Over Time</span>
            <div className="chart-header__badge">
              {returnsPercentage}%
            </div>
          </div>
        </div>
        
        {/* Chart */}
        <div className="chart-wrapper" ref={chartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="year" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis hide />
              <Area 
                type="monotone" 
                dataKey="maturity" 
                stroke="#ef4444" 
                strokeWidth={3}
                fill="url(#colorGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Labels */}
        <div className="chart-labels">
          <span>0</span>
          <span>Years</span>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
};

export default ChartSection