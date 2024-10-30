import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Import the CSS file

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                'https://localhost:7137/api/users'
            );
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchItems = async () => {
        setLoading(true);
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

    const deleteUser = async (userId) => {
        await axios.delete(`https://localhost:7137/api/users/${userId}`);
        fetchUsers();
    };

    const makeAdmin = async (userId) => {
        await axios.patch(
            `https://localhost:7137/api/users/${userId}/makeAdmin`
        );
        fetchUsers();
    };

    const deleteItem = async (itemId) => {
        await axios.delete(`https://localhost:7137/api/sellwithus/${itemId}`);
        fetchItems();
    };

    useEffect(() => {
        fetchUsers();
        fetchItems();
    }, []);

    return (
        <div className="admin-dashboard">
            <h1 className="adminH1">Admin Dashboard</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h2 className="adminH22">Manage Users</h2>
                    <table className="user-table">
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
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button
                                            className="user1Btn"
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            Delete User
                                        </button>
                                        {user.role !== 'Admin' && (
                                            <button
                                                className="user2Btn"
                                                onClick={() =>
                                                    makeAdmin(user.id)
                                                }
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2 className="adminH2">Manage Items</h2>
                    <table className="item-table">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.itemName}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        <button
                                            className="itemBtn"
                                            onClick={() => deleteItem(item.id)}
                                        >
                                            Delete Item
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
