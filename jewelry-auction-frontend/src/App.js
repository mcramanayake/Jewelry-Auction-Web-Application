import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddItemPage from './components/AddItemPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AdminDashboard from './components/AdminDashboard';
import LoginSignup from './components/LoginSignUp/LoginSignup';
import Login from './components/LoginSignUp/LoginSignup';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import MyAccount from './components/Profile/MyAccount';
import MyBids from './components/Profile/MyBids';
import Payments from './components/Profile/Payments'; 
import Winnings from './components/Profile/Winnings';

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

  const route = createBrowserRouter ([
    {
      path:"/",
      element:<LoginSignup />,
    },
    {
      path:"/login",
      element:<Login />,
    },
    {
      path: "/MyAccount",
      element: <MyAccount />,
    },
    {
      path: "/MyBids",
      element:<MyBids />
    },
    {
      path: "/Payments",
      element: <Payments />
    },
    {
      path: "/Winnings",
      element:<Winnings />
    }
  ]);

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
