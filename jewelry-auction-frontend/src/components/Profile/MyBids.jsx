import React, { useState, useEffect, useRef, useMemo, useCallback, useContext} from 'react';
import './MyBids.css'
import './Navbar.css'
import { FaBars } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import {Link} from "react-router-dom";

const MyBids = () => {


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
                    <p><Link to='/HomePage' className="logo-home">The Auction Room</Link></p>
                </div>
                <ul className={`nav-menu ${isOpen ? 'nav-menu-active' : ''}`}>
                    <li><Link to='/auctions' className="user-nav">Auctions</Link></li>
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

            {/*hero image*/}
            <div className="profile-hero">
                <h1>Profile</h1>
            </div>


            <div className="profile-container">
                {/*Profile Nav bar*/}
                <div className="profile-navbar">
                    <ul className="profile-menu">
                        <li><Link to="/MyAccount" className="active">My Account</Link></li>
                        <li><b>My Bids</b> </li>
                        <li><Link to="/Payments" className="active">Payments</Link></li>
                        <li><Link to="/Winnings" className="active">Winnings</Link></li>
                        <li><Link to="/login" className="active">Log out</Link></li>
                    </ul>
                </div>
            </div>

            {/*Bids Table*/}
            <div className="MyBids">
                <table className="Bid_table">
                    <thead>
                        <tr>
                            <th>Auction Title</th>
                            <th>Auctioneer</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Bid Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Gold Necklace Auction #1</td>
                            <td>user1</td>
                            <td>01/09/2024</td>
                            <td>30/09/2024</td>
                            <td>2500.00 USD</td>
                        </tr>
                        <tr>
                            <td>Diamond Earrings Auction #3</td>
                            <td>user2</td>
                            <td>05/09/2024</td>
                            <td>05/10/2024</td>
                            <td>3000.00 USD</td>
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

export default MyBids
