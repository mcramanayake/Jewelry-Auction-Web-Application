// src/components/HomePage.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './HomePage.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaCircleUser } from 'react-icons/fa6';

const HomePage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('name'); // Default sort by name
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch items from the SellWithUs table
        const fetchItems = async () => {
            try {
                const response = await axios.get(
                    'https://localhost:7137/api/sellwithus'
                );
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handle sort option change
    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    // Filter and sort items based on search query and sort option
    const filteredItems = items
        .filter((item) =>
            item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOption === 'name') {
                return a.itemName.localeCompare(b.itemName);
            } else if (sortOption === 'price') {
                return a.price - b.price;
            }
            return 0;
        });

    // Responsive nav bar
    const navRef = useRef();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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

            {/* Hero Section */}
            <div className="hero">
                <div className="hero-text">
                    <h1 className="heroH1">
                        THE BIGGEST <br /> MARKETPLACE
                    </h1>
                    <p className="heroP">
                        Explore our exclusive auctions and discover unique items{' '}
                        <br />
                        at unbeatable prices. Join the community today <br />
                        and start bidding on your next treasure!
                    </p>
                </div>
            </div>

            <div className="homepage">
                <h1 className="homeh1">Sell With Us Items</h1>

                {/* Search and Sort Options Container */}
                <div className="search-sort-container">
                    {/* Search Bar */}
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search for items..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {/* Sort Options */}
                    <div className="sort-options">
                        <label htmlFor="sort">Sort by:</label>
                        <select
                            id="sort"
                            value={sortOption}
                            onChange={handleSortChange}
                        >
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                        </select>
                    </div>
                </div>

                {/* Loading and Item Container */}
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="items-container">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <div key={item.id} className="auction-item">
                                    <h2 className="cardH2">{item.itemName}</h2>
                                    <p className="cardP1">{item.message}</p>
                                    <p>Price: ${item.price}</p>
                                    {item.filePath && (
                                        <img
                                            src={item.filePath}
                                            alt={item.itemName}
                                        />
                                    )}
                                    <button className="bid-button">
                                        Place Bid
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No items available for sale.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
