import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import './Summary.css'; // Import the new styles

function Summary() {
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('/api/chart/summary', {
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
        console.error("Failed to fetch chart data", err);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="summary-container">
      <div className="summary-header">
        <h1>Economic Impact by Industry</h1>
        <p className="subtitle">Cost reductions attributed to Generative AI adoption</p>
      </div>

        <div className="chart-card">
          <h3>Respondents reporting cost decreases by function</h3>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart 
                data={chartData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                
                <XAxis 
                  dataKey="label" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100} 
                  interval={0}
                  tick={{fontSize: 12}}
                />
                
                <YAxis 
                  domain={[0, 70]} 
                  label={{ value: '% Reporting Savings', angle: -90, position: 'insideLeft' }} 
                />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '20px' }}/>
                
                <Bar 
                  dataKey="value" 
                  fill="#007bff" 
                  name="% of Respondents Saving Money" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-source">
            <strong>Source:</strong> McKinsey Global Survey on AI (2025)
          </div>
        </div>

      <div className="summary-content">
        <div className="summary-text-card">
          <h2>Efficiency Gains in Technical Sectors</h2>
          <p>
            The latest data from McKinsey’s 2025 report reveals a distinct correlation between technical density 
            and AI-driven cost savings. <strong>Software Engineering</strong> and <strong>Manufacturing</strong> lead the pack, 
            with 56% of respondents in both sectors reporting significant cost decreases. This aligns with the rise of 
            "Agentic AI," where autonomous coding assistants and predictive maintenance agents are now mature enough 
            to replace manual workflows.
          </p>
          <p>
            Service-oriented functions like <strong>HR (51%)</strong> and <strong>Marketing (49%)</strong> are following closely behind, 
            leveraging AI for automated drafting and candidate screening. However, highly regulated sectors like 
            <strong>Legal and Risk (45%)</strong> show slightly lower efficiency gains, likely due to the "human-in-the-loop" 
            requirements that limit full automation.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Summary;