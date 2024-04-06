// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./home.css"; // Import file CSS vào đây

const Home = () => {
  return (
    <div className="container"> {/* Thêm className để sử dụng CSS */}
      <h1 className="welcome-text">WELCOME TO THE GAME</h1>
      <div className="button-wrapper"> {/* Thêm className để sử dụng CSS */}
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Home;
