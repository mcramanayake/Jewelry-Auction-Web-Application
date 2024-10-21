import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [items, setItems] = useState([]);
    const [isShuttingDown, setIsShuttingDown] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://localhost:7137/api/user');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            // Optionally set error state here
        } finally {
            setLoading(false);
        }
    };

    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://localhost:7137/api/auction');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
            // Optionally set error state here
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId) => {
        await axios.delete(`https://localhost:7137/api/user/${userId}`);
        fetchUsers();
    };

    const makeAdmin = async (userId) => {
        await axios.patch(`https://localhost:7137/api/user/${userId}/makeAdmin`);
        fetchUsers();
    };

    const deleteItem = async (itemId) => {
        await axios.delete(`https://localhost:7137/api/auction/${itemId}`);
        fetchItems();
    };

    const changeItemDetails = async (itemId, updatedDetails) => {
        await axios.put(`https://localhost:7137/api/auction/${itemId}`, updatedDetails);
        fetchItems();
    };

    const toggleWebsiteStatus = async () => {
        await axios.patch('http://localhost:7173/api/settings/toggleMaintenance');
        setIsShuttingDown(prevState => !prevState);
    };

    const fetchMaintenanceStatus = async () => {
        try {
            const response = await axios.get('http://localhost:7173/api/settings/status');
            setIsShuttingDown(response.data.IsMaintenanceMode);
        } catch (error) {
            console.error('Error fetching maintenance status:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchItems();
        fetchMaintenanceStatus();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>

            {loading ? <p>Loading...</p> : (
                <>
                    <h2>Manage Users</h2>
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                {user.username} {/* Ensure this matches your User model */}
                                <button onClick={() => makeAdmin(user.id)}>Make Admin</button>
                                <button onClick={() => deleteUser(user.id)}>Delete User</button>
                            </li>
                        ))}
                    </ul>

                    <h2>Manage Items</h2>
                    <ul>
                        {items.map(item => (
                            <li key={item.id}>
                                {item.name}
                                <button onClick={() => changeItemDetails(item.id, { /* new details */ })}>Change Details</button>
                                <button onClick={() => deleteItem(item.id)}>Delete Item</button>
                            </li>
                        ))}
                    </ul>

                    <button onClick={toggleWebsiteStatus}>
                        {isShuttingDown ? 'Shutdown Website' : 'Reopen Website'}
                    </button>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
