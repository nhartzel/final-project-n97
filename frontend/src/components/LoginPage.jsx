import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import hook for redirection
import './LoginPage.css'; 

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // 2. New state for error messages

  const navigate = useNavigate(); // 3. Initialize the hook

  const handleLogin = async (e) => { // 4. Mark function as async
      e.preventDefault();
      setError(''); // Clear previous errors

      try {
        // 5. Send POST request to your backend
        // Ensure the URL matches your backend port (usually 3000)
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // 6. On Success: Store token and redirect
          console.log('Login successful');
          localStorage.setItem('token', data.token); // Store the JWT
          navigate('/dashboard'); // Redirect to dashboard route
        } else {
          // 7. On Failure: Set error message from backend
          setError(data.message || 'Invalid username or password');
        }

      } catch (err) {
        console.error('Network error:', err);
        setError('Server not responding. Please try again later.');
      }
    };



  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
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
        <button type="submit" className="login-button">Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;