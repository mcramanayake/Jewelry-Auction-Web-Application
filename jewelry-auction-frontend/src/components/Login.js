import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUserRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7137/api/user/login', {
        username,
        password
      });
      const { role } = response.data;
      setUserRole(role);
      localStorage.setItem('role', role);
    } catch (error) {
      alert('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
