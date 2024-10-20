import './App.css';
import LoginSignup from './Components/LoginSignUp/LoginSignup';
import Login from './Components/LoginSignUp/Login';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import MyAccount from './Components/Profile/MyAccount';
import MyBids from './Components/Profile/MyBids';
import Payments from './Components/Profile/Payments'; 
import Winnings from './Components/Profile/Winnings';
import ErrorBoundary from './Components/ErrorBoundary';
import NotFound from './Components/NotFound';
//import ProtectedRoute from './Components/LoginSignUp/ProtectedRoute';




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
      path: "*", // This will catch all undefined routes
      element: <NotFound />, // Render NotFound component for unknown routes
    }
  ]);

  return (
    <ErrorBoundary>
      <div>
        <RouterProvider router={route}></RouterProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
