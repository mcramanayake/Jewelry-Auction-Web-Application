import React from 'react'
import './Login.css';

const ForgotPassword = () => {
  return (
    <div>
      <div className="title">
        <div className="title-text">The Auction Room</div>
      </div>
      <div className='container'>
        <form action="">
            <div className="header">
                <div className="text">Reset Password</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <h2 className="ForgotPasswordH1">Forgot Password</h2>
                <p className="ForgotPasswordP">Enter Your Registerd Email To Reset Your Password.</p>
                <div className="input">
                <input
                    type="email"
                    placeholder='Email'
                    name="Email"
                    autoComplete="off"
                    required
                />
                </div>
            </div>
            <div className="submit-container">
            <button type="submit" className="submit">Reset Password</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
