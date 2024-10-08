import React, { useState, useRef, useMemo, useCallback, useContext} from 'react';
import './MyAccount.css'
import './Navbar.css'
import { FaBars } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import {Link} from "react-router-dom";


const MyAccount = () => {

    const navRef = useRef();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const [fileUrl, setFileUrl] = useState(null);

  return (
    <div>
        {/*Navbar*/}
        <div className='navbar'>
            <div className="nav-logo">
                <p>The Auction Room</p>
            </div>
            <ul className={`nav-menu ${isOpen ? 'nav-menu-active' : ''}`}>
                <li>Auctions</li>
                <li>Sell with us</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="nav-login-user">
                <FaCircleUser size={25} />
                
                <div className="nav-icon" onClick={toggleMenu}>
                    <FaBars size={25} />
                </div>
            </div>
            
        </div>

        {/*Content*/}
        <div className="profile-hero">
                <h1>Profile</h1>
        </div>
        <div className="profile-container">
            {/*Profile Nav bar*/}
            <div className="profile-navbar">
                <ul className="profile-menu">
                    <li><b>My Account</b></li>
                    <li><Link to="/MyBids" className="active"> My Bids</Link></li>
                    <li><Link to="/Payments" className="active">Payments</Link></li>
                    <li><Link to="/Winnings" className="active">Winnings</Link></li>
                    <li><Link to="/login" className="active">Log out</Link></li>
                </ul>
            </div>
            {/*Form*/}
            <div className="form">
                <form action="">
                    <div className="pp">
                        <p>Profile Picture</p>
                        <FaCircleUser size={80} color={222222}/>
                        <button className="update_pp">Update Picture</button>
                    </div>
                    <div className="account_details">
                        <input type="text" name="name" placeholder="John Smith"/> <br />
                        <input type="email" name="email"  placeholder='example@gmail.com'/> <br />
                        <input type="text" name="phone" placeholder='+94 711234567' /> <br />
                        <input type="text" name="country" placeholder='Sri Lanka'/> <br />
                        <input type="text" name="city" placeholder="city"/> <br />
                        <input type="text" name="address" placeholder='Address'/> <br />
                        <input type="text" name="zipCode" placeholder='Zip code'/>
                    </div>
                    <button type="submit" className="update_btn">Update Details</button>
                </form>
            </div>
        </div>


        {/*Footer*/}
        <div className="footer">
             <div className="first">
                <h1>The Auction Room</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
             </div>
             <div className="second">
                <ul>
                    <li>Auctions</li>
                    <li>Past Auctions</li>
                    <li>Profile</li>
                    <li>Sell with us</li>
                </ul>
             </div>
             <div className="third">
                <ul>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Terms & Conditions</li>
                    <li>Privacy Policy</li>
                </ul>
             </div>
        </div>
    </div>
  )
}

export default MyAccount
