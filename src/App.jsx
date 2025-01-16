import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Dashboard from "./component/Dashboard";
import Transaction from "./component/Transaction";
import Report from "./component/Report";
import LoginPage from "./component/Login";
import PrivateRoute from "./component/PrivateRoute"; // Import PrivateRoute component

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem("authToken", userInfo.token); // Store the token in localStorage
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("authToken"); // Clear the token on logout
  };

  return (
    <Router>
      {user && <Navbar user={user} onLogout={handleLogout} />}
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
