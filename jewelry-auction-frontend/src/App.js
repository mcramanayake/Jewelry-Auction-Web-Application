// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/Admin&Home/HomePage';
import AddItemPage from './components/Admin&Home/AddItemPage';
import LoginPage from './components/LoginSignUp/Login';
import SignupPage from './components/LoginSignUp/LoginSignup';
import AdminDashboard from './components/Admin&Home/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const isAdmin = user?.role === 'admin';

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/add-item" element={user ? <AddItemPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/" : "/signup"} />} />
      </Routes>
    </Router>
  );
}

export default App;
