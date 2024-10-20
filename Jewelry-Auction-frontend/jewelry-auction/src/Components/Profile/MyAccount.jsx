import React, { useState, useEffect, useRef } from 'react';
import './MyAccount.css';
import './Navbar.css';
import { FaBars, FaCircleUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const API_URL = 'https://localhost:7256/api/profiledetails'; // Updated API URL

const MyAccount = () => {
    const navRef = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        PhoneNumber: '',
        Address: '',
        City: '',
        PostalCode: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const sessionId = localStorage.getItem('sessionId'); // Get sessionId from localStorage
                const response = await fetch(`${API_URL}/${sessionId}`); // Include sessionId in the URL
                
                if (!response.ok) {
                    const errorDetails = await response.text();
                    console.error('Error response:', errorDetails);
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                console.log(data);
                setUserData(data);
                // Update formData with user data
                setFormData({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    PhoneNumber: data.PhoneNumber || '',
                    Address: data.Address || '',
                    City: data.City || '',
                    PostalCode: data.PostalCode || '',
                });
            } catch (err) {
                console.error('Fetch error:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData }),
            });

            if (!response.ok) {
                throw new Error('Failed to update details');
            }

            alert('Details updated successfully!');
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Navbar */}
            <div className='navbar'>
                <div className='nav-logo'>
                    <p>The Auction Room</p>
                </div>
                <ul className={`nav-menu ${isOpen ? 'nav-menu-active' : ''}`}>
                    <li>Auctions</li>
                    <li>Sell with us</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
                <div className='nav-login-user'>
                    <FaCircleUser size={25} />
                    <div className='nav-icon' onClick={toggleMenu}>
                        <FaBars size={25} />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className='profile-hero'>
                <h1>Profile</h1>
            </div>
            <div className='profile-container'>
                <div className='profile-navbar'>
                    <ul className='profile-menu'>
                        <li><b>My Account</b></li>
                        <li><Link to='/MyBids' className='active'>My Bids</Link></li>
                        <li><Link to='/Payments' className='active'>Payments</Link></li>
                        <li><Link to='/Winnings' className='active'>Winnings</Link></li>
                        <li><Link to='/login' className='active'>Log out</Link></li>
                    </ul>
                </div>
                {/* Form */}
                <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <div className='pp'>
                            <p>Profile Picture</p>
                            <FaCircleUser size={80} color={'#222222'} />
                            <button className='update_pp' type='button'>Update Picture</button>
                        </div>
                        <div className='account_details'>
                            <input type='text' name='firstName' value={formData.firstName} onChange={handleInputChange} placeholder='First Name' /><br />
                            <input type='text' name='lastName' value={formData.lastName} onChange={handleInputChange} placeholder='Last Name' /><br />
                            <input type='email' name='email' value={formData.email} onChange={handleInputChange} placeholder='Email' /><br />
                            <input type='text' name='PhoneNumber' value={formData.PhoneNumber} onChange={handleInputChange} placeholder='+94 711234567' /><br />
                            <input type='text' name='Address' value={formData.Address} onChange={handleInputChange} placeholder='Address' /><br />
                            <input type='text' name='City' value={formData.City} onChange={handleInputChange} placeholder='City' /><br />
                            <input type='text' name='PostalCode' value={formData.PostalCode} onChange={handleInputChange} placeholder='Postal Code' /><br />
                        </div>
                        <button type='submit' className='update_btn' disabled={loading}>
                            {loading ? 'Updating...' : 'Update Details'}
                        </button>
                    </form>
                    {error && <p className='error'>{error}</p>} {/* Display error message */}
                </div>
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

export default MyAccount;
