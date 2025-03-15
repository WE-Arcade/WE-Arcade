import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sound from "react-sound";
import bgMusic from "../assets/sound-effects/minigame-bg-music.mp3"; // Import background music
import buttonClickSound from "../assets/sound-effects/riddle-button-click.mp3"; // Import button click sound
import backButtonSound from "../assets/sound-effects/button-click.mp3"; // Import back button sound
import backgroundImg from "../assets/images/bg99.jpg";

const MiniGamesMenuPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [returnLevel, setReturnLevel] = useState("1");
  const [playBackgroundMusic, setPlayBackgroundMusic] = useState(false);
  const [playButtonClickSound, setPlayButtonClickSound] = useState(false);
  const [playBackButtonSound, setPlayBackButtonSound] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const level = params.get("returnTo");

    if (level) {
      setReturnLevel(level);
    }

    // Start the background music when the component mounts
    setPlayBackgroundMusic(true);
  }, [location]);

  const handleGameButtonClick = (path) => {
    // Play the button click sound
    setPlayButtonClickSound(true);

    // Navigate to the selected mini-game after a short delay
    setTimeout(() => {
      navigate(path);
    }, 500); // Adjust the delay to match the sound duration
  };

  const handleBackButtonClick = () => {
    // Play the back button sound
    setPlayBackButtonSound(true);

    // Navigate back to the riddle page after a short delay
    setTimeout(() => {
      navigate(`/riddle/${returnLevel}`);
    }, 500); // Adjust the delay to match the sound duration
  };

  return (
    <div style={styles.container}>
      <div style={styles.menuCard}>
        <h1 style={styles.title}>Mini-Games</h1>
        <p style={styles.subtitle}>Play games to earn powerups!</p>

        <div style={styles.buttonsContainer}>
          <button
            onClick={() =>
              handleGameButtonClick(`/mini-game/crypto?returnTo=${returnLevel}`)
            }
            style={styles.gameButton}
          >
            Cryptogram Game
          </button>

          <button
            onClick={() =>
              handleGameButtonClick(`/mini-game/dsa-game?returnTo=${returnLevel}`)
            }
            style={styles.gameButton}
          >
            DSA Challenge
          </button>

          <button
            onClick={() =>
              handleGameButtonClick(
                `/mini-game/bitwise-game?returnTo=${returnLevel}`
              )
            }
            style={styles.gameButton}
          >
            Treasure of Bitwise Logic Challenge
          </button>

          <button
            onClick={() =>
              handleGameButtonClick(`/mini-game/loop-runner?returnTo=${returnLevel}`)
            }
            style={styles.gameButton}
          >
            Loop Runner
          </button>

          <button
            onClick={() =>
              handleGameButtonClick(`/mini-game/sql-query?returnTo=${returnLevel}`)
            }
            style={styles.gameButton}
          >
            Debugging an SQL query
          </button>
        </div>

        {/* Ensure correct level is passed back to Riddle */}
        <button onClick={handleBackButtonClick} style={styles.backButton}>
          Back to Riddle
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
        playStatus={playButtonClickSound ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={() => setPlayButtonClickSound(false)} // Reset the state after the sound finishes
        volume={100} // Adjust the volume (0 to 100)
      />

      {/* Back Button Sound */}
      <Sound
        url={backButtonSound}
        playStatus={playBackButtonSound ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={() => setPlayBackButtonSound(false)} // Reset the state after the sound finishes
        volume={100} // Adjust the volume (0 to 100)
      />
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    opacity: 0.9,
    backgroundColor: "rgba(139, 69, 19, 0.3)", // Brown tint overlay
    backgroundImage: `url(${backgroundImg})`,
    backgroundBlendMode: "overlay", // Blends background color with image
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
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