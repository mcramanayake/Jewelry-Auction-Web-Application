import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Import the CSS file

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true); 

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://localhost:7137/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://localhost:7137/api/auction');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`https://localhost:7137/api/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const makeAdmin = async (id) => {
        try {
            await axios.patch(`https://localhost:7137/api/users/${id}/makeAdmin`);
            setUsers(users.map(user => {
                if (user.id === id) {
                    return { ...user, role: 'Admin' };
                }
                return user;
            }));
        } catch (error) {
            console.error('Error making user admin:', error);
        }
    };

    const deleteItem = async (itemId) => {
        await axios.delete(`https://localhost:7137/api/auction/${itemId}`);
        fetchItems();
    };

    useEffect(() => {
        fetchUsers();
        fetchItems();
    }, []);

    return (
        <div className="container">
            <h1>Admin Dashboard</h1>

            {loading ? <p className="loading">Loading...</p> : (
                <>
                    {/* Manage Users Section */}
                    <div className="manage-section">
                        <h2>Manage Users</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <div className="button-container"><button className="delete" onClick={() => deleteUser(user.id)}>Delete</button>
                                            {user.role !== 'Admin' && (
                                            <button onClick={() => makeAdmin(user.id)}>Make Admin</button>
                                            )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Manage Items Section */}
                    <div className="manage-section">
                        <h2>Manage Items</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Starting Price</th>
                                    <th>Auction Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.startingPrice}</td>
                                        <td>{new Date(item.auctionDate).toLocaleDateString()}</td>
                                        <td>
                                            <button className="delete" onClick={() => deleteItem(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
