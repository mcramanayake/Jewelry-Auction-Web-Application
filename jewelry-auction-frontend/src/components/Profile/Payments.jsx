import React, { useState, useRef } from 'react';
import './Payments.css';
import './Navbar.css';
import { FaBars } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Payments = () => {
    const navRef = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleDueClick = async (event) => {
        event.preventDefault(); // Prevent default form submission
        try {
            const response = await fetch('https://localhost:7137/api/Payment', { // Adjust the URL if necessary
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}), // Add any required payload
            });
            const session = await response.json();
            if (session.url) {
                // Redirect to the Stripe Checkout page
                window.location.href = session.url;
            }
        } catch (error) {
            console.error("Error creating checkout session:", error);
        }
    };

    return (
        <div>
            {/*Navbar*/}
            <div className='navbar'>
                <div className="nav-logo">
                    <p><Link to='/HomePage' className="logo-home">The Auction Room</Link></p>
                </div>
                <ul className={`nav-menu ${isOpen ? 'nav-menu-active' : ''}`}>
<<<<<<< Updated upstream
                    <li>Auctions</li>
=======
                    <li><Link to='/auctions' className="user-nav">Auctions</Link></li>
>>>>>>> Stashed changes
                    <li><Link to='/sell-with-us' className="user-nav">Sell with us</Link></li>
                    <li><Link to='/aboutus' className="user-nav">About</Link></li>
                    <li><Link to='/contact-us' className="user-nav">Contact</Link></li>
                </ul>
                <div className="nav-login-user">
                    <Link to='/MyAccount' className="user-nav"><FaCircleUser size={25} /></Link>  
                    
                    <div className="nav-icon" onClick={toggleMenu}>
                        <FaBars size={25} />
                    </div>
                </div> 
            </div>

            {/* Hero image */}
            <div className="profile-hero">
                <h1>Profile</h1>
            </div>

            <div className="profile-container">
                {/* Profile Nav bar */}
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

            {/* Payments Table */}
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
                            <td><button className="paid">Paid</button></td>
                        </tr>
                        <tr>
                            <td>Paid via Credit Card - Diamond Necklace Auction #8<br /><span>Credited: Mon Sep 20 2024 02:10:00 GMT+05:30</span></td>
                            <td>Sold</td>
                            <td>US $1200</td>
                            <td><button className="paid">Paid</button></td>
                        </tr>
                        <tr>
                            <td>Due via Bank Transfer - Silver Bracelet Auction #15<br /><span>Due: Sat Oct 5 2024 11:00:00 GMT+05:30</span></td>
                            <td>Sold</td>
                            <td>US $300</td>
                            <td>
                                <button className="due" onClick={handleDueClick}>Due</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Due via Paypal - Platinum Ring Auction #22<br /><span>Due: Sun Oct 10 2024 15:45:20 GMT+05:30</span></td>
                            <td>Sold</td>
                            <td>US $2500</td>
                            <td>
                                <button className="due" onClick={handleDueClick}>Due</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Footer */}
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
    );
};

export default Payments;
