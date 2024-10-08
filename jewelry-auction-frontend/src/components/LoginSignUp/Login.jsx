import React, { useState, useEffect} from 'react';
import './Login.css';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const Login = () => {

    const [action,setAction] = useState("LOG IN");
    const initialValues = { email: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
      console.log(e.target);
      const { name, value } = e.target;
      setFormValues({...formValues, [name]: value });
      console.log(formValues);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true);

      if (Object.keys(formErrors).length === 0) {
        try {
          const response = await axios.post('YOUR_BACKEND_LOGIN_ENDPOINT', {
            email: formValues.email,
            password: formValues.password
          });
          const token = response.data.token;
          
          // Save the token in local storage or cookies
          localStorage.setItem('token', token);
  
          // Decode JWT token to get user info
          const user = jwtDecode(token);
          console.log('Logged in user:', user);
  
          // Navigate to user account or dashboard
          navigate('/MyAccount');
        } catch (error) {
          console.error('Login error:', error);
          setFormErrors({ ...formErrors, auth: 'Invalid email or password' });
        }
      }
    };

    useEffect(() => {
      console.log(formErrors);
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
      }
    }, [formErrors]);

    

    const validate = (values) => {
      const errors = {}
      const regx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.email) {
        errors.email = "Email is required!";
      }
      if (!values.password) {
        errors.password = "Password is required!";
      }
      return errors;
    }

  return (
    <div>
      <div className="title">
        <div className="title-text">The Auction Room</div>
      </div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
            <div className="header">
              <div className="text">{action}</div>
              <div className="underline"></div>
            </div>
            <div className="inputs">
              <div className="input">
                  <input type="email" placeholder='Email' name="email" value={formValues.email} onChange={handleChange} autoComplete="off"/>
                  <p>{formErrors.email}</p>
              </div>
             
              <div className="input">
                  <input type="password" placeholder='Password' name="password" value={formValues.password} onChange={handleChange} autoComplete="off"/>
                  <p>{formErrors.password}</p>
              </div>
            
             
            </div>
            <div className="forgotPassword">Forgot your password?</div>
            <div className="submit-container">
              <button className="submit">Log in</button>
            </div>
            {formErrors.auth && <p className="auth-error">{formErrors.auth}</p>} 
            <div className="forgot-password">Not Registered? <span><Link to="/" className="btn">Register</Link></span> <Link to="/MyAccount"> Profile </Link></div>
            
        </form>
      
    </div>
    </div>
    
  )
}

export default Login
