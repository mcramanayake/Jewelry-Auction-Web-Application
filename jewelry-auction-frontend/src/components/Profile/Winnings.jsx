import React, { useState, useRef,} from 'react';
import './Winnings.css'
import './Navbar.css'
import { FaBars } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { Link} from "react-router-dom";

const Winnings = () => {

    const navRef = useRef();
    const [isOpen, setIsOpen] = useState(false);


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
                    <li>Auctions</li>
                    <li>Sell with us</li>
                    <li>About</li>
                    <li>Contact</li>
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
                            <td><button className="paid">Paid</button></td>
                        </tr>
                        <tr>
                            <td>Diamond Ring Auction #32</td>
                            <td>Fri Sep 20 2024</td>
                            <td>US $1200</td>
                            <td><button className="due" onClick={handleDueClick}>Due</button></td>
                        </tr>
                        <tr>
                            <td>Silver Bracelet Auction #29</td>
                            <td>Sun Sep 22 2024</td>
                            <td>US $350</td>
                            <td><button className="paid">Paid</button></td>
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
