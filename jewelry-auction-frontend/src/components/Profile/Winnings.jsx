import React, { useState, useEffect, useRef, useMemo, useCallback, useContext} from 'react';
import './Winnings.css'
import './Navbar.css'
import { FaBars } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import {Link} from "react-router-dom";

const Winnings = () => {

    const navRef = useRef();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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

            {/*hero image*/}
            <div className="profile-hero">
                <h1>Profile</h1>
            </div>


            <div className="profile-container">
                {/*Profile Nav bar*/}
                <div className="profile-navbar">
                    <ul className="profile-menu">
                        <li><Link to="/MyAccount" className="active">My Account</Link></li>
                        <li><Link to="/MyBids" className="active">My Bids</Link></li>
                        <li><Link to="/Payments" className="active">Payments</Link></li>
                        <li><b>Winnings</b></li>
                        <li><Link to="/login" className="active">Log out</Link></li>
                    </ul>
                </div>
            </div>

            <div className="Winnings">
                <table className="winnings-table">
                    <thead>
                        <tr>
                            <th>Auction Title</th>
                            <th>Date Won</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Gold Necklace Auction #45</td>
                            <td>Wed Sep 18 2024</td>
                            <td>US $750</td>
                            <td><button className="paid-button">Paid</button></td>
                        </tr>
                        <tr>
                            <td>Diamond Ring Auction #32</td>
                            <td>Fri Sep 20 2024</td>
                            <td>US $1200</td>
                            <td><button className="due-button">Due</button></td>
                        </tr>
                        <tr>
                            <td>Silver Bracelet Auction #29</td>
                            <td>Sun Sep 22 2024</td>
                            <td>US $350</td>
                            <td><button className="paid-button">Paid</button></td>
                        </tr>
                    </tbody>
                </table>
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

export default Winnings
