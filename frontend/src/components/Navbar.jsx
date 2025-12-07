import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 

function Navbar() {
  const navigate = useNavigate();

  // quick check to see if stored token exists
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };
  
  // delete JWT token for user logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Final Project</Link>
      </div>
      
      <ul className="navbar-links">
        {/* 1. PERSISTENT LINKS: Always visible */}
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/summary">Summary</Link></li>
        <li><Link to="/reports">Reports</Link></li>

        {/* 2. DYNAMIC AUTH BUTTON: Logout/login based on auth */}
        {isAuthenticated() ? (
           <li>
             <button onClick={handleLogout} className="logout-button">Logout</button>
           </li>
        ) : (
           <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;