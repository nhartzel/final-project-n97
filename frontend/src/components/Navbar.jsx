import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import './Navbar.css'; 

function Navbar() {
  const navigate = useNavigate(); // 2. Initialize the hook

  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  const handleLogout = () => {
    // 3. The Logout Logic
    localStorage.removeItem('token'); // Delete the key
    navigate('/login');               // Send user to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Final Project</Link>
      </div>
      <ul className="navbar-links">
        {/* 4. FIX: Added () to call the function. Before, this was always true. */}
        {isAuthenticated() ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/summary">Summary</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            {/* 5. Attach the click handler */}
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;