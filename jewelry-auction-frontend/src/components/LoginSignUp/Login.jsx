import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Email') setEmail(value);
    else if (name === 'Password') setPassword(value);
  }

  const HandleLogin = (e) => {
    e.preventDefault();

    const data = {
      Email: Email,
      Password: Password,
    };

    const url = 'https://localhost:7137/api/Users/Login';

    console.log('Attempting login with:', data); // Log the login attempt

    axios.post(url, data)
      .then((result) => {
        console.log('Full login response:', result); // Log the full response
        
        if (result.status === 200) {
          const { Message, Id, role } = result.data;
          localStorage.setItem('sessionId', result.data.userId); // Access result.data.userId if present
          // Navigate based on the role
          if (role === 'admin') {
            navigate("/AdminDashboard");
          } else {
            navigate("/HomePage");
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error response:', error.response); // Log error details
          alert(`Error: ${error.response.data.Message || 'An error occurred'}`);
        } else if (error.request) {
          alert('Error: No response received from the server');
        } else {
          alert(`Error: ${error.message}`);
        }
      });
    };

  return (
    <div>
      <div className="title">
        <div className="title-text">The Auction Room</div>
      </div>
      <div className='container'>
        <form>
          <div className="header">
            <div className="text">Login</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <input
                type="email"
                placeholder='Email'
                name="Email"
                value={Email}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>
            <div className="input">
              <input
                type="password"
                placeholder='Password'
                name="Password"
                value={Password}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>
          </div>
          <div className="forgotPassword"><Link to='/ForgotPassword' className="ForgotPasswordLink">Forgot your password?</Link></div>
          <div className="submit-container">
            <button type="submit" className="submit" onClick={HandleLogin}>Log in</button>
          </div>
          <div className="forgot-password">
            Not Registered? <span><Link to="/" className="btn">Register</Link></span> 
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
