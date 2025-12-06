import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

function Summary() {
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:3000/api/chart/summary', {
          method: 'GET',
          headers: {
            // THIS is the key: Sending the token to pass the Backend Middleware
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Reactive Logout: If token is expired, backend sends 401. We kick them out.
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        const data = await response.json();
        setChartData(data); // Store the backend data in state

      } catch (err) {
        console.error("Failed to fetch chart data", err);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Project Summary</h1>
      <p>Here is a breakdown of the time spent on different phases of this project.</p>

      {/* The Chart - Only renders if we have data */}
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Hours Spent" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p style={{ marginTop: '20px', fontStyle: 'italic' }}>
        <strong>Source:</strong> Internal project tracking logs (Backend API).
      </p>
    </div>
  );
}

export default Summary;