// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      username,
      role: username === 'admin' ? 'admin' : 'user',
    };
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    navigate('/');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate('/signup')}>Go to Sign Up</button>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default LoginPage;
