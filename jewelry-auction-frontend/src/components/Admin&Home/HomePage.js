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
  const user = JSON.parse(localStorage.getItem('user')); // Fetch user data from localStorage

  useEffect(() => {
    // Fetch auction items from the backend
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://localhost:7137/api/auction');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching auction items:', error);
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
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'price') {
        return a.startingPrice - b.startingPrice;
      }
      return 0;
    });

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from local storage
    navigate('/'); // Redirect to homepage
  };

  //responsive nav bar
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

   <div className="homepage">
      <h1 className="homeH1">Jewelry Auction</h1>

      {/* Navigation buttons */}
      {!user ? (
        <div>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      ) : (
        <div>
          {user.role === 'admin' && (
            <button onClick={() => navigate('/admin')}>Admin Panel</button>
          )}
          <button onClick={() => navigate('/add-item')}>Add New Item</button>
          <button onClick={handleLogout}>Logout</button> {/* Logout button */}
        </div>
      )}

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
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="items-container">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div key={item.id} className="auction-item">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>Starting Price: ${item.startingPrice}</p>
                <button className="bid-button">Place Bid</button>
              </div>
            ))
          ) : (
            <p>No items available for auction.</p>
          )}
        </div>
      )}
    </div>
  </div>
  );
};

export default HomePage;
