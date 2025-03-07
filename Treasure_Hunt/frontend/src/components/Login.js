import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/story-page"); // Navigate to the start page
  };

  return (
    <div className="landing-page">
      <div className="overlay"></div> {/* Dark overlay for better text visibility */}
      <div className="content">
        <h1 className="welcome-message">Welcome to Treasure Hunt!</h1>
        <p className="description">
          Embark on an exciting adventure to uncover hidden treasures and solve challenging puzzles. Are you ready to prove your skills and claim the ultimate prize?
        </p>
        <button className="start-button" onClick={handleStart}>
        Claim the Treasure!
        </button>
      </div>
    </div>
  );
};

export default LandingPage;