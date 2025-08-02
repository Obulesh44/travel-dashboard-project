
// src/components/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

// Component to handle user registration
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        // Success: show alert and redirect to login
        alert("✅ Registration successful. Please login.");
        navigate("/login");
      } else {
        alert("❌ Registration failed: " + (result.detail || "Try again"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Network error. Try again.");
    }
  };

  // Render the registration form
  return (
    <div className="form-container">
      <h2>📝 Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
