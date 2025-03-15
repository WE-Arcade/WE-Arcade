import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sound from "react-sound";
import bgMusic from "../assets/sound-effects/game-complete.wav"; // Import background music
import buttonClickSound from "../assets/sound-effects/button-click.mp3"; // Import button click sound

const FinalLevelCompletePage = () => {
  const navigate = useNavigate();
  const [playBackgroundMusic, setPlayBackgroundMusic] = useState(false);
  const [playButtonSound, setPlayButtonSound] = useState(false);

  useEffect(() => {
    // Function to start the background music
    const startBackgroundMusic = () => {
      setPlayBackgroundMusic(true);
      document.removeEventListener("click", startBackgroundMusic);
    };

    // Add event listener for user interaction
    document.addEventListener("click", startBackgroundMusic);

    return () => {
      document.removeEventListener("click", startBackgroundMusic);
    };
  }, []);

  const handleReturnHome = () => {
    // Play the button click sound
    setPlayButtonSound(true);

    // Navigate to the levels page after a short delay
    setTimeout(() => {
      navigate("/levels-page");
    }, 500); // Adjust the delay to match the sound duration
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.modal}>
        <div style={styles.titleContainer}>
          <span style={styles.emoji}>🎉</span>
          <h1 style={styles.title}>Congratulations!</h1>
          <span style={styles.emoji}>🎊</span>
        </div>
        <div style={styles.messageContainer}>
          <p style={styles.message}>
            You started as a seeker, driven by curiosity.
            <br />
            With every puzzle solved and every challenge conquered, you have proven that treasure isn’t found, it’s earned.
          </p>
          <p style={styles.message}>
            At WE, success isn’t just about reaching the goal—it’s about the resilience, confidence, and knowledge you build along the way. Every challenge has prepared you for something greater.
          </p>
          <p style={styles.message}>
            But remember—this is not the end. WE is not just a program. WE is a mindset. WE is YOU.
          </p>
          <p style={styles.message}>
            And now, the final key is yours. A key that unlocks not just doors, but every opportunity, every success, and every dream you dare to chase.
          </p>
          <p style={styles.message}>
            Go forth, Trailblazer. The world is waiting, and WE is always with you.
          </p>
          <p style={styles.glowText}>
            🔑✨ Because when one woman rises, WE all rise. ✨🔑
          </p>
        </div>
        <button onClick={handleReturnHome} style={styles.proceedButton}>
          <span style={styles.buttonText}>Return to Levels</span>
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
  messageContainer: {
    color: "rgb(255, 215, 0)",
    fontSize: "18px",
    margin: "20px 0 30px 0",
    fontFamily: "'MedievalSharp', cursive",
    textAlign: "left",
    lineHeight: "1.6",
  },
  message: {
    marginBottom: "20px",
  },
  glowText: {
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
    color: "rgb(255, 215, 0)",
    textShadow: "0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6)",
  },
  proceedButton: {
    backgroundColor: "rgb(255, 215, 0)",
    border: "none",
    padding: "10px 30px",
    borderRadius: "4px",
    cursor: "pointer",
    boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#634402", // Slightly darker yellow on hover
      transform: "scale(1.05)", // Slightly enlarge the button
      color: "#ffd324",
      border: "1px solid white",
    },
  },
  buttonText: {
    color: "black",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default FinalLevelCompletePage;