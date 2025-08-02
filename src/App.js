import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TravelForm from "./components/TravelForm";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import Register from "./components/register";
import './App.css';

// Main App component - handles routing and layout
function App() {
  return (
    <Router>
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1 className="center-heading">🌍 Travel Dashboard</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/travel-form" element={<TravelForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
