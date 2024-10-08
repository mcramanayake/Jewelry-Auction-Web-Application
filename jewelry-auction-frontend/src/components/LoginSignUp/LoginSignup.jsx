import React, { useState, useEffect } from 'react';
import './LoginSignup.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginSignup =  () => {

  const [action,setAction] = useState("REGISTER");
  const initialValues = { firstname: "", lastname: "", email: "", password: ""};
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
        const response = await axios.post('YOUR_BACKEND_REGISTER_ENDPOINT', formValues);
        const token = response.data.token;
        
        localStorage.setItem('token', token);
  
        navigate('/MyAccount');
      } catch (error) {
        console.error('Registration error:', error);
        setFormErrors({ ...formErrors, auth: 'Registration failed. Please try again.' });
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
    if (!values.firstname) {
      errors.firstname = "First name is required!";
    }
    if (!values.lastname) {
      errors.lastname = "Last name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  return (
    
    <div >
      <div className="title">
        <div className="title-text">The Auction Room</div>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
                <input type="text" placeholder='First Name' name="firstname" value={formValues.firstname} onChange={handleChange} autoComplete="off" />
                <p>{formErrors.firstname}</p>
            </div>
            <div className="input">
                <input type="text" placeholder='Last Name' name="lastname" value={formValues.lastname} onChange={handleChange} autoComplete="off"/>
                <p>{formErrors.lastname}</p>
            </div>
            <div className="input">
                <input type="email" placeholder='Email' name="email" value={formValues.email} onChange={handleChange} autoComplete="off" />
                <p>{formErrors.email}</p>
            </div>
            <div className="input">
                <input type="password" placeholder='Password' name="password" value={formValues.password} onChange={handleChange} autoComplete="off"/>
                <p>{formErrors.password}</p>
            </div>
          </div>
          <div className="submit-container">
            <button type="submit" className="submit">Register</button>
          </div>
          {formErrors.auth && <p className="auth-error">{formErrors.auth}</p>}
          <div className="forgot-password">Already registered? <span><Link to="/login" className="btn">Log in</Link></span></div>
        </form>
      </div>

    </div>
  )
}

export default LoginSignup
