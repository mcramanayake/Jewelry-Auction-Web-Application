import React, { useState, useEffect, useRef } from 'react';
import './MyBids.css';
import './Navbar.css';
import { FaBars } from 'react-icons/fa6';
import { FaCircleUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const MyBids = () => {
    const navRef = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const [bids, setBids] = useState([]);
    const sessionId = localStorage.getItem('sessionId');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        // Fetch bids for the user
        const fetchBids = async () => {
            try {
                const response = await fetch(
                    `https://localhost:7137/api/bids/user/${sessionId}`
                );
                const userBids = await response.json();
                console.log(userBids);

                // Fetch additional item details from SellWithUs endpoint
                const itemsResponse = await fetch(
                    'https://localhost:7137/api/SellWithUs'
                );
                const sellWithUsItems = await itemsResponse.json();
                console.log(sellWithUsItems);

                // Combine bids with SellWithUs item details
                const bidsWithDetails = userBids.map((bid) => {
                    // Find corresponding item in SellWithUs data
                    const itemDetails = sellWithUsItems.find(
                        (item) => item.id === bid.itemId
                    );
                    if (itemDetails) {
                        // Calculate auction end date (7 days from auction start)
                        const auctionEnd = new Date(itemDetails.auctionDate);
                        auctionEnd.setDate(auctionEnd.getDate() + 7); // Add 7 days

                        return {
                            ...bid,
                            itemName: itemDetails.itemName,
                            auctionStart: itemDetails.auctionDate,
                            auctionEnd: auctionEnd.toISOString(), // Store as ISO string
                            bidAmount: bid.bidAmount, // Use price from SellWithUs
                        };
                    }
                    return bid; // Return original bid if no corresponding item found
                });

                setBids(bidsWithDetails);
            } catch (error) {
                console.error('Error fetching bids:', error);
            }
        };

        fetchBids();
    }, [sessionId]);

    return (
        <div>
            {/* Navbar */}
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

            {/* Hero Image */}
            <div className="profile-hero">
                <h1>Profile</h1>
            </div>

            {/* Profile Container */}
            <div className="profile-container">
                <div className="profile-navbar">
                    <ul className="profile-menu">
                        <li>
                            <Link to="/MyAccount" className="active">
                                My Account
                            </Link>
                        </li>
                        <li>
                            <b>My Bids</b>
                        </li>
                        <li>
                            <Link to="/Payments" className="active">
                                Payments
                            </Link>
                        </li>
                        <li>
                            <Link to="/Winnings" className="active">
                                Winnings
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="active">
                                Log out
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bids Table */}
            <div className="MyBids">
                <table className="Bid_table">
                    <thead>
                        <tr>
                            <th>Bid Item</th>
                            <th>Auction Start</th>
                            <th>Bid Date</th>
                            <th>Auction End</th>
                            <th>Bid Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bids.map((bid) => (
                            <tr key={bid.id}>
                                <td>{bid.itemName}</td>
                                <td>
                                    {new Date(
                                        bid.auctionStart
                                    ).toLocaleDateString()}
                                </td>
                                <td>
                                    {new Date(
                                        bid.bidDateTime
                                    ).toLocaleDateString()}
                                </td>
                                <td>
                                    {new Date(
                                        bid.auctionEnd
                                    ).toLocaleDateString()}
                                </td>
                                <td> Rs. {bid.bidAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="footer">
                <div className="first">
                    <h1>The Auction Room</h1>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry...
                    </p>
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

export default MyBids;
