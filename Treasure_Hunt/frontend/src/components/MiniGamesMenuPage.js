import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MiniGamesMenuPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [returnLevel, setReturnLevel] = useState("1");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const level = params.get("returnTo");

    if (level) {
      setReturnLevel(level); // Keep the correct level from URL
    }
  }, [location]);

  return (
    <div style={styles.container}>
      <div style={styles.menuCard}>
        <h1 style={styles.title}>Mini-Games</h1>
        <p style={styles.subtitle}>Play games to earn powerups!</p>

        <div style={styles.buttonsContainer}>
          <button 
            onClick={() => navigate(`/mini-game/crypto?returnTo=${returnLevel}`)} 
            style={styles.gameButton}
          >
            Cryptogram Game
          </button>

          <button 
            onClick={() => navigate(`/mini-game/dsa-game?returnTo=${returnLevel}`)} 
            style={styles.gameButton}
          >
            DSA Challenge
          </button>

          <button 
            onClick={() => navigate(`/mini-game/bitwise-game?returnTo=${returnLevel}`)} 
            style={styles.gameButton}
          >
            Treasure of Bitwise Logic Challenge
          </button>

          <button 
            onClick={() => navigate(`/mini-game/loop-runner?returnTo=${returnLevel}`)} 
            style={styles.gameButton}
          >
            Loop Runner
          </button>

          <button 
            onClick={() => navigate(`/mini-game/sql-query?returnTo=${returnLevel}`)} 
            style={styles.gameButton}
          >
            Debugging an SQL query
          </button>
        </div>

        {/* Ensure correct level is passed back to Riddle */}
        <button 
          onClick={() => navigate(`/riddle/${returnLevel}`)} 
          style={styles.backButton}
        >
          Back to Riddle
        </button>
      </div>
    </div>
  );
};


const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#003F66",
    backgroundImage: "url('/images/wallpaper1.jpg')",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  menuCard: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "40px",
    borderRadius: "15px",
    maxWidth: "600px",
    width: "100%",
    border: "2px solid #FFD700",
  },
  title: {
    color: "#FFD700",
    fontSize: "2.5rem",
    marginBottom: "10px",
    textAlign: "center",
  },
  subtitle: {
    color: "#FFD700",
    fontSize: "1.2rem",
    marginBottom: "30px",
    textAlign: "center",
    fontFamily: "'MedievalSharp', cursive",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "30px",
  },
  gameButton: {
    backgroundColor: "#8B4513",
    color: "white",
    padding: "15px 20px",
    border: "2px solid #FFD700",
    borderRadius: "5px",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  backButton: {
    backgroundColor: "#8B0000",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
};

export default MiniGamesMenuPage;
