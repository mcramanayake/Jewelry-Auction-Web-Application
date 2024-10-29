// src/components/Navbar.js
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaCircleUser } from 'react-icons/fa6';
// import './Navbar.css'; // Add separate styles if necessary

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')); // Fetch user data from localStorage
    const navRef = useRef();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear user data from local storage
        navigate('/'); // Redirect to homepage
    };

    return (
        <div className="navbar">
            <div className="nav-logo">
                <p>
                    <Link to="/HomePage" className="logo-home">
                        The Auction Room
                    </Link>
                </p>
            </div>
            <ul className={`nav-menu ${isOpen ? 'nav-menu-active' : ''}`}>
                <li>Auctions</li>
                <li>
                    <Link to="/sell-with-us" className="user-nav">
                        Sell with us
                    </Link>
                </li>
                <li>
                    <Link to="/aboutus" className="user-nav">
                        About
                    </Link>
                </li>
                <li>
                    <Link to="/contact-us" className="user-nav">
                        Contact
                    </Link>
                </li>
            </ul>
            <div className="nav-login-user">
                <Link to="/MyAccount" className="user-nav">
                    <FaCircleUser size={25} />
                </Link>

                <div className="nav-icon" onClick={toggleMenu}>
                    <FaBars size={25} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
