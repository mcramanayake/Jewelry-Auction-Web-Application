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
    e.preventDefault(); // Prevent form submission

    const data = {
        Email: Email,
        Password: Password,
    };

    const url = 'https://localhost:7137/api/Users/login';
    axios
        .post(url, data)
        .then((result) => {
            if (result.status === 200) {
                console.log(result.data);
                alert(result.data.Message); // Display login success message
                navigate("/");
                //backend eken gnn oyaa session id ekk user ge id eka ita passe methin eka save krgnn localstrge ekk vidht ethkot ussht lesi wei wd krgnn
            }
        })
        .catch((error) => {
            console.log(error); // Log the entire error object to the console
            if (error.response) {
                alert(`Error: ${error.response.data}`);
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
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className="input">
              <input
                type="password"
                placeholder='Password'
                name="Password"
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="forgotPassword">Forgot your password?</div>
          <div className="submit-container">
            <button type="button" className="submit" onClick={HandleLogin}>Log in</button>
          </div>
          <div className="forgot-password">
            Not Registered? <span><Link to="/" className="btn">Register</Link></span> <Link to="/MyAccount"> Profile </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
