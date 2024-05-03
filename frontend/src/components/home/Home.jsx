import React, { useState } from "react";
import { Link } from "react-router-dom";
import scriptAPI from "../../api/script";
import "./home.css";

const Home = () => {
  const [showCheckButton, setShowCheckButton] = useState(false);

  const handleRunButtonClick = async () => {
    try {
      const response = await scriptAPI.run(); 
      if (response === "Players have already been recommended") {
        setShowCheckButton(true); 
      }
    } catch (error) {
      console.error("Error executing the script:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="welcome-text">DEMO</h1>
      <div className="button-wrapper">
        <button onClick={handleRunButtonClick}>Run</button>
        {showCheckButton && (
          <Link to="/check" className="check-result-button">
            Check Result
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
