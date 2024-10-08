import React, { useState, useEffect, useRef, useMemo, useCallback, useContext} from 'react';
import './Payments.css'
import './Navbar.css'
import { FaBars } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import {Link} from "react-router-dom";

const Payments = () => {

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
                        <li><b>Payments</b></li>
                        <li><Link to="/Winnings" className="active">Winnings</Link></li>
                        <li><Link to="/login" className="active">Log out</Link></li>
                    </ul>
                </div>
            </div>

            {/*Payments Table*/}
            <div className="payments">
                <table className="Payments_table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Total Paid</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Paid via Paypal - Gold Ring Auction #12<br /><span>Credited: Wed Sep 25 2024 03:30:35 GMT+05:30</span></td>
                            <td>Sold</td>
                            <td>US $500</td>
                            <td><button class="paid">Paid</button></td>
                        </tr>
                        <tr>
                            <td>Paid via Credit Card - Diamond Necklace Auction #8<br /><span>Credited: Mon Sep 20 2024 02:10:00 GMT+05:30</span></td>
                            <td>Sold</td>
                            <td>US $1200</td>
                            <td><button class="paid">Paid</button></td>
                        </tr>
                        <tr>
                            <td>Due via Bank Transfer - Silver Bracelet Auction #15<br /><span>Due: Sat Oct 5 2024 11:00:00 GMT+05:30</span></td>
                            <td>Sold</td>
                            <td>US $300</td>
                            <td><button class="due">Due</button></td>
                        </tr>
                        <tr>
                            <td>Due via Paypal - Platinum Ring Auction #22<br /><span>Due: Sun Oct 10 2024 15:45:20 GMT+05:30</span></td>
                            <td>Sold</td>
                            <td>US $2500</td>
                            <td><button class="due">Due</button></td>
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

export default Payments

