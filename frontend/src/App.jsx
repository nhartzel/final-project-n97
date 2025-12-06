import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import PrivateRoutes from './components/PrivateRoutes';
import Reports from './components/Reports';

import './App.css'; 

function App() {
  // replace with authentication
 const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* PROTECTED ROUTES GROUP */}
          {/* Anything inside this tag is automatically protected! */}
          <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reports" element={<Reports />} />
          </Route>

          {/* DEFAULT REDIRECT */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;