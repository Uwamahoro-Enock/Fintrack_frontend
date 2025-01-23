import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Dashboard from "./component/Dashboard";
import Transaction from "./component/Transaction";
import Report from "./component/Report";
import LoginPage from "./component/Login";
import PrivateRoute from "./component/PrivateRoute";
import BudgetManagement from "./component/BudgetManagement";

function App() {
const [isAuthenticated, setIsAUthenicated] = useState(false);
  // Check for token on initial load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // You can fetch user info from the token if needed, e.g., decode JWT or call an API
      verifyToken(token)
      .then((isValid) => {
        setIsAUthenicated(isValid);
      })
      .catch(()=> {
        localStorage.removeItem("authToken");
        setIsAUthenicated(false);
      })
    }
  }, []);

  const handleLoginSuccess = (userInfo) => {
    setIsAUthenicated(true);
    localStorage.setItem("authToken", userInfo.token); // Store the token in localStorage
  };

  const handleLogout = () => {
    setIsAUthenicated(false);
    localStorage.removeItem("authToken"); // Clear the token on logout
  };

  const verifyToken = async (token) => {
    try {
      const response = await fetch('/api/verify-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };


  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />

        {/* Protected Routes */}
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/Transaction"
          element={
            <PrivateRoute>
              <Transaction />
            </PrivateRoute>
          }
        />
        <Route
          path="/BudgetManagement"
          element={
            <PrivateRoute>
              <BudgetManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/Report"
          element={
            <PrivateRoute>
              <Report />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
