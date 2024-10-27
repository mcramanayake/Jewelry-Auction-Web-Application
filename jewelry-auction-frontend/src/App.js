// src/App.js
//import React, { useEffect, useState } from 'react';
//import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginSignup from './components/LoginSignUp/LoginSignup';
import Login from './components/LoginSignUp/Login';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import MyAccount from './components/Profile/MyAccount';
import MyBids from './components/Profile/MyBids';
import Payments from './components/Profile/Payments'; 
import Winnings from './components/Profile/Winnings';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';
import HomePage from './components/Admin&Home/HomePage';
import AddItemPage from './components/Admin&Home/AddItemPage';
import AdminDashboard from './components/Admin&Home/AdminDashboard';
import SellWithUs from "./components/SellWithUs&ContactUs&AboutUs/SellWithUs";
import Contact from "./components/SellWithUs&ContactUs&AboutUs/Contact";
import AboutUs from "./components/SellWithUs&ContactUs&AboutUs/AboutUs";

function App() {

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
    },
    {
      path: "/HomePage",
      element:<HomePage />
    },
    {
      path: "/AddItemPage",
      element:<AddItemPage />
    },
    {
      path: "/AdminDashboard",
      element:<AdminDashboard />
    },
    {
      path:"/sell-with-us", 
      element:<SellWithUs />
    },
    {
      path:"/contact-us", 
      element:<Contact />
    },
    {
      path:"/aboutus", 
      element:<AboutUs />
    },
    {
      path: "*", // This will catch all undefined routes
      element: <NotFound />, // Render NotFound component for unknown routes
    }
  ]);


 /* const [user, setUser] = useState(null);
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

  if (loading) return <div>Loading...</div>; */

  const isAdmin = user?.role === 'admin';
  
  return (

    <ErrorBoundary>
      <div>
        <RouterProvider router={route}></RouterProvider>
      </div>
    </ErrorBoundary>

   /* <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/add-item" element={user ? <AddItemPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/" : "/signup"} />} />

      </Routes>
    </Router> */
  );
}

export default App;
