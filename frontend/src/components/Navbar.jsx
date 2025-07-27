// src/components/Navbar.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ toggleForm, showForm, toggleTheme, theme }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        🛍️ Skipcart
      </div>

      <div className="nav-actions">
        <button
          className={`nav-btn ${isActive("/") ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          🏠 Home
        </button>
        <button className="nav-btn" onClick={toggleForm}>
          {showForm ? "✖ Close Add Product" : "➕ Add Product"}
        </button>
        <button
          className={`nav-btn ${isActive("/moderator") ? "active" : ""}`}
          onClick={() => navigate("/moderator")}
        >
          🛡️ Moderator
        </button>
        <button className="nav-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
