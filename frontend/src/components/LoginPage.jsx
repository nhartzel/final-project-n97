import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; 

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // specific success message (e.g., "Account created!")
  const [message, setMessage] = useState(''); 

  const navigate = useNavigate();

  // Helper function to handle both actions since they are 90% similar
  const performAuth = async (endpoint) => {
      setError('');
      setMessage('');

      try {
        const response = await fetch(`${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          console.log('Authentication successful');
          localStorage.setItem('token', data.token);
          
          // Show a quick message before redirecting
          if (endpoint === '/api/signup') {
             setMessage('Account created! Redirecting...');
             setTimeout(() => navigate('/dashboard'), 1000);
          } else {
             navigate('/dashboard');
          }
        } else {
          // Failure
          setError(data.message || 'Authentication failed');
        }

      } catch (err) {
        console.error('Network error:', err);
        setError('Server not responding. Please try again later.');
      }
  };

  // 1. The Login Handler (Triggered by Form Submit / Enter Key)
  const handleLogin = (e) => {
      e.preventDefault();
      performAuth('/api/login');
  };

  // 2. The Signup Handler (Triggered by Button Click)
  const handleSignup = (e) => {
      e.preventDefault(); // Prevent default form submission
      performAuth('/api/signup');
  };

  return (
    <div className="login-container">
      {/* Default submit action handled as 'login' attempt */}
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Welcome</h2>
        
        {/* Error & Success Messages */}
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* BUTTON GROUP */}
        <div className="button-group">
            {/* Type="submit" makes this the default action */}
            <button type="submit" className="login-button">
                Log In
            </button>
            
            {/* Type="button" ensures this doesn't submit the form as a login */}
            <button 
                type="button" 
                onClick={handleSignup} 
                className="signup-button"
            >
                Sign Up
            </button>
        </div>

      </form>
    </div>
  );
}

export default LoginPage;