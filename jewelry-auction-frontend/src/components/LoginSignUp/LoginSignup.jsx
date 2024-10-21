import './LoginSignup.css';
import { Link , useNavigate} from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';

function LoginSignup() {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
          const newUser = {
            FirstName,
            LastName,
            Email,
            Password, // Ensure this matches your Signup model
            role: 'user',
          };
      
          await axios.post('https://localhost:7137/api/Users/signup', newUser);
          alert('Signup successful!');
          navigate('/login');
        } catch (error) {
          console.error('Error during signup:', error);
          alert('Failed to sign up. Please try again.');
        }
      };
      

    return (
        <div>
            <div className="title">
                <div className="title-text">The Auction Room</div>
            </div>
            <div className="container">
                <form onSubmit={handleSignup}>
                    <div className="header">
                        <div className="text">REGISTER</div>
                        <div className="underline"></div>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <input
                                type="text"
                                placeholder='First Name'
                                name="FirstName"
                                onChange={(e) => setFirstName(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        <div className="input">
                            <input
                                type="text"
                                placeholder='Last Name'
                                name="LastName"
                                onChange={(e) => setLastName(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        <div className="input">
                            <input
                                type="email"
                                placeholder='Email'
                                name="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                placeholder='Password'
                                name="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="submit-container">
                        <button className="submit" type="submit">Register</button>
                    </div>
                    
                    <div className="forgot-password">
                        Already registered? <span><Link to="/login" className="btn">Log in</Link></span>
                        <Link to="/MyAccount">Profile</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginSignup;
