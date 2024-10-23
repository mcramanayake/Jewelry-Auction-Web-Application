import './LoginSignup.css';
import { Link , useNavigate} from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';

const LoginSignup = () => {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'FirstName') setFirstName(value);
        else if (name === 'LastName') setLastName(value);
        else if (name === 'Email') setEmail(value);
        else if (name === 'Password') setPassword(value);
        
    }

    const HandleSave = (e) => {

        e.preventDefault();

        const data = {
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Password: Password,
            
        };
    
        const url = 'https://localhost:7137/api/Users/signup';
        axios.post(url, data)
            .then((result) => {
                if (result.status === 201) {
                    console.log(result.data);
                    alert(result.data.message);
                    navigate("/login");
                }
            })
            .catch((error) => {
                console.log(error); // Log the entire error object to the console
                if (error.response) {
                    // Server responded with an error status code
                    alert(`Error: ${error.response.data}`);
                } else if (error.request) {
                    // Request was made but no response was received
                    alert('Error: No response received from the server');
                } else {
                    // Something happened in setting up the request
                    alert(`Error: ${error.message}`);
                }
            });
    }

    return (
        <div>
            <div className="title">
                <div className="title-text">The Auction Room</div>
            </div>
            <div className="container">
                <form onSubmit={HandleSave}>
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
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className="input">
                            <input
                                type="text"
                                placeholder='Last Name'
                                name="LastName"
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
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
