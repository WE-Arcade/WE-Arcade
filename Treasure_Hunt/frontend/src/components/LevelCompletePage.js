import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GameContext } from "../context/GameContext";
import Sound from "react-sound";
import bgMusic from "../assets/sound-effects/level-complete.wav"; // Import background music
import buttonClickSound from "../assets/sound-effects/levels-button-click.mp3"; // Import button click sound

const LevelCompletePage = () => {
  const { unlockNextLevel, unlockedLevels } = useContext(GameContext);
  const { level } = useParams();
  const navigate = useNavigate();
  const nextLevel = parseInt(level) + 1;
  const [playBackgroundMusic, setPlayBackgroundMusic] = useState(false);
  const [playButtonSound, setPlayButtonSound] = useState(false);

  useEffect(() => {
    // Start the background music when the component mounts
    setPlayBackgroundMusic(true);

    if (!unlockedLevels.includes(nextLevel)) {
      unlockNextLevel(nextLevel);
      updateProgress(nextLevel);
    }
  }, [nextLevel, unlockedLevels, unlockNextLevel]);

  const updateProgress = async (nextLevel) => {
    try {
      const username = localStorage.getItem("username");
      await axios.post("http://localhost:5000/api/users/update-progress", {
        username,
        nextLevel,
      });
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const handleProceed = () => {
    // Play the button click sound
    setPlayButtonSound(true);

    // Navigate to the next level after a short delay
    setTimeout(() => {
      navigate(`/riddle/${nextLevel}`);
    }, 500); // Adjust the delay to match the sound duration
  };

  return (
    <div style={styles.container}>
      {/* Translucent Brown Overlay */}
      <div style={styles.overlay}></div>

      <div style={styles.modal}>
        <div style={styles.titleContainer}>
          <span style={styles.emoji}>🎉</span>
          <h1 style={styles.title}>Congratulations!</h1>
          <span style={styles.emoji}>🎊</span>
        </div>
        <p style={styles.message}>
          <span style={styles.trophy}>🏆</span> You have successfully moved to the next level! <span style={styles.trophy}>🏆</span>
        </p>
        <button onClick={handleProceed} style={styles.proceedButton}>
          <span style={styles.buttonText}>Proceed</span>
        </button>
      </div>

      {/* Background Music */}
      <Sound
        url={bgMusic}
        playStatus={playBackgroundMusic ? Sound.status.PLAYING : Sound.status.STOPPED}
        loop={true} // Loop the background music
        volume={50} // Adjust the volume (0 to 100)
      />

      {/* Button Click Sound */}
      <Sound
        url={buttonClickSound}
        playStatus={playButtonSound ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={() => setPlayButtonSound(false)} // Reset the state after the sound finishes
        volume={100} // Adjust the volume (0 to 100)
      />
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    backgroundImage: "url('/images/wallpaper1.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Times New Roman', serif",
    position: "relative", // Required for the overlay
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(101, 67, 33, 0.7)", // Translucent brown
    zIndex: 1, // Ensure it's above the background image but below the modal
  },
  modal: {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    padding: "30px 40px",
    borderRadius: "8px",
    textAlign: "center",
    maxWidth: "600px",
    width: "100%",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
    border: "1px solid rgba(255, 215, 0, 0.3)",
    position: "relative", // Ensure it's above the overlay
    zIndex: 2, // Ensure it's above the overlay
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  emoji: {
    fontSize: "24px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  title: {
    color: "rgb(255, 215, 0)",
    fontSize: "32px",
    margin: 0,
    fontWeight: "bold",
    fontFamily: "'Pirata One', cursive",
  },
  message: {
    color: "rgb(255, 215, 0)",
    fontSize: "18px",
    margin: "20px 0 30px 0",
    fontFamily: "'MedievalSharp', cursive",
  },
  trophy: {
    fontSize: "18px",
  },
  proceedButton: {
    backgroundColor: "rgb(255, 215, 0)",
    border: "none",
    padding: "10px 30px",
    borderRadius: "4px",
    cursor: "pointer",
    boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
    transition: "all 0.3s ease",
  },
  buttonText: {
    color: "black",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default LevelCompletePage;