import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import './Reports.css';

function Reports() {
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  // Colors for the Pie Chart slices (Light -> Dark)
  // Experimenting (Grey) -> Piloting (Light Blue) -> Scaling (Blue) -> Fully Scaled (Deep Blue)
  const COLORS = ['#003f5c', '#58508d', '#bc5090', '#ff6361'];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('/api/chart/reports', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        const data = await response.json();
        setChartData(data);

      } catch (err) {
        console.error("Failed to fetch report data", err);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>GenAI Maturity Curve</h1>
        <p className="subtitle">Current state of enterprise adoption phases</p>
      </div>

      <div className="reports-content">
        
        {/* Text Section */}
        <div className="reports-text-card">
          <h2>Moving Beyond Experimentation</h2>
          <p>
            This breakdown illustrates the "Maturity Gap" currently facing the industry. While nearly 
            everyone is trying GenAI, only a select few have crossed the chasm into full production. 
            <strong>Experimenting (32%)</strong> remains the largest segment, representing organizations 
            that are still running ad-hoc tests without a centralized strategy.
          </p>
          <p>
            However, the combined weight of <strong>Scaling (31%)</strong> and <strong>Piloting (30%)</strong> 
            suggests a massive shift is underway. Over 60% of companies have moved past the initial hype 
            phase and are actively building infrastructure. The "Fully Scaled" group (7%) represents the 
            early adopters who have successfully integrated Agentic AI into core workflows, likely serving 
            as the blueprint for the rest of the market in 2026.
          </p>
        </div>

        {/* Chart Section */}
        <div className="reports-chart-card">
          <h3>Adoption Stage Distribution</h3>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-source">
            <strong>Source:</strong> Internal API / Aggregated Industry Metrics
          </div>
        </div>

      </div>
    </div>
  );
}

export default Reports;