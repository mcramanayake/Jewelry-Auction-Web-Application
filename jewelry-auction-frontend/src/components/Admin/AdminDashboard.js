// src/components/AdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin! Here you can manage items and users.</p>
      {/* Add more admin actions here */}
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default AdminDashboard;
