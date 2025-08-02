import React, { useState } from "react";
import "../App.css"; 
import Header from "./Header";

// TravelForm allows a logged-in user to submit travel data
const TravelForm = () => {
  const [formData, setFormData] = useState({
    start_location: "",
    end_location: "",
    distance: "",
    petrol_consumed: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 // Submit form data to backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    // Check if user is logged in
    if (!token) {
      alert("🔒 Not logged in. Please login first.");
      return;
    }

    try {
      // Submit travel data to Django backend
      const res = await fetch("http://127.0.0.1:8000/api/submit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      // On success, show message and reset form
      if (res.ok) {
        alert("✅ Travel entry submitted successfully!");
        setFormData({
          start_location: "",
          end_location: "",
          distance: "",
          petrol_consumed: "",
        });
      } else {
        alert("❌ Submission failed: " + (result.detail || "Unknown error"));
      }
    } catch (err) {
      alert("⚠️ Something went wrong while submitting.");
    }
  };

// UI for travel form
  return (
    <>
    <Header />
    <div className="form-container">
      <h2 className="form-title">🛣️ Submit Travel Entry</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="start_location"
          placeholder="Start Location"
          value={formData.start_location}
          onChange={handleChange}
          required
        />
        <input
          name="end_location"
          placeholder="End Location"
          value={formData.end_location}
          onChange={handleChange}
          required
        />
        <input
          name="distance"
          type="number"
          step="0.1"
          placeholder="Distance (km)"
          value={formData.distance}
          onChange={handleChange}
          required
        />
        <input
          name="petrol_consumed"
          type="number"
          step="0.1"
          placeholder="Petrol Consumed (liters)"
          value={formData.petrol_consumed}
          onChange={handleChange}
          required
        />
        <button type="submit"> Submit</button>
      </form>
    </div>
  </>
  );
};

export default TravelForm;
