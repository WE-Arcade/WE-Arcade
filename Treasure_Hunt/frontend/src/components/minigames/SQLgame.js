import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GameContext } from "../../context/GameContext";
import Sound from "react-sound";
import bgMusic from "../../assets/sound-effects/ind-minigame-bg-music.mp3";
import submitSound from "../../assets/sound-effects/minigame-button-click.wav";
import backSound from "../../assets/sound-effects/button-click.mp3";

const questions = [
  {
    story: "FROM users SELECT name, email WHERE active = 1;\n ",
    question: "Players must fix the query to retrieve the correct user data.",
    answer: "SELECT name, email FROM users WHERE active = 1;",
    options: [
      "SELECT name, email FROM users WHERE active = 1;",
      "SELECT * FROM users WHERE active = 1;",
      "SELECT name, email FROM users;",
      "SELECT name, email WHERE active = 1;",
    ],
  },
  {
    story:
      "A database administrator needs to uniquely identify each record in a table to ensure data integrity.",
    question: "What is the primary key?",
    answer: "Unique identifier",
    options: ["Unique identifier", "Foreign key", "Data type", "Index"],
  },
  {
    story:
      "A data analyst is retrieving records from a large database and needs to filter results based on a specific condition.",
    question: "Which SQL clause is used to filter results?",
    answer: "WHERE",
    options: ["WHERE", "ORDER BY", "GROUP BY", "HAVING"],
  },
];

const SQLGame = () => {
  const { powerUps, setPowerUps, answeredQuestions, setAnsweredQuestions } =
    useContext(GameContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);

  // Sound states
  const [bgMusicStatus, setBgMusicStatus] = useState(Sound.status.STOPPED); // Background music
  const [submitSoundStatus, setSubmitSoundStatus] = useState(Sound.status.STOPPED); // Submit sound
  const [backSoundStatus, setBackSoundStatus] = useState(Sound.status.STOPPED); // Back sound

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const returnToLevel = params.get("returnTo") || "1";

    const safeAnsweredQuestions = Array.isArray(answeredQuestions)
      ? answeredQuestions
      : [];

    const availableQuestions = questions.filter(
      (_, index) => !safeAnsweredQuestions.includes(index)
    );

    if (availableQuestions.length === 0) {
      if (setAnsweredQuestions) {
        setAnsweredQuestions([]);
      }
      setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
    } else {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const originalIndex = questions.indexOf(availableQuestions[randomIndex]);
      setCurrentQuestionIndex(originalIndex);
    }

    // Start background music after user interaction
    const handleUserInteraction = () => {
      setBgMusicStatus(Sound.status.PLAYING);
      window.removeEventListener("click", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
    };
  }, [answeredQuestions, setAnsweredQuestions, location.search]);

  const handleSubmit = () => {
    if (selectedOption === null) return;

    // Play submit sound
    setSubmitSoundStatus(Sound.status.PLAYING);

    if (selectedOption === questions[currentQuestionIndex].answer) {
      if (setAnsweredQuestions)
        setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
      if (setPowerUps) setPowerUps((prevPowerUps) => prevPowerUps + 1);

      setFeedback("Correct! You earned a power-up!");
      setShowSuccess(true);

      const params = new URLSearchParams(location.search);
      const returnToLevel = params.get("returnTo") || "1";

      setTimeout(() => {
        navigate(`/riddle/${returnToLevel}?powerUpEarned=true`);
      }, 2000);
    } else {
      setFeedback("Incorrect. Try again!");
    }
  };

  const handleBack = () => {
    // Play back sound
    setBackSoundStatus(Sound.status.PLAYING);

    // Delay navigation until the sound has finished playing
    setTimeout(() => {
      const params = new URLSearchParams(location.search);
      const returnToLevel = params.get("returnTo") || "1";
      navigate(`/mini-games-menu?returnTo=${returnToLevel}`);
    }, 500); // Adjust the delay to match the sound duration
  };

  if (currentQuestionIndex === null) {
    return <div style={styles.container}>Loading...</div>;
  }

  return (
    <div className="dsa-game-container" style={styles.container}>
      {/* Background Music */}
      <Sound
        url={bgMusic}
        playStatus={bgMusicStatus}
        onFinishedPlaying={() => setBgMusicStatus(Sound.status.PLAYING)} // Loop the music
        volume={50} // Set volume to 50%
      />

      {/* Submit Sound */}
      <Sound
        url={submitSound}
        playStatus={submitSoundStatus}
        onFinishedPlaying={() => setSubmitSoundStatus(Sound.status.STOPPED)} // Stop after playing
        volume={100}
      />

      {/* Back Sound */}
      <Sound
        url={backSound}
        playStatus={backSoundStatus}
        onFinishedPlaying={() => setBackSoundStatus(Sound.status.STOPPED)} // Stop after playing
        volume={100}
      />

      <div className="game-box" style={styles.gameBox}>
        <h2 style={styles.title}>Data Structure Challenge</h2>
        <p style={styles.story}>{questions[currentQuestionIndex].story}</p>
        <strong style={styles.question}>
          Question: {questions[currentQuestionIndex].question}
        </strong>

        {/* Options */}
        {questions[currentQuestionIndex].options.map((option, index) => (
          <button
            key={index}
            style={{
              backgroundColor:
                selectedOption === option ? "#FFD700" : "transparent",
              color: selectedOption === option ? "black" : "#FFD700",
              width: "100%",
              padding: "12px",
              margin: "5px 0",
              fontSize: "1rem",
              border: "2px solid #FFD700",
              borderRadius: "5px",
              cursor: "pointer",
              textAlign: "center",
              fontWeight: "bold",
              transition: "background-color 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => {
              if (selectedOption !== option) {
                e.target.style.backgroundColor = "#FFD700";
                e.target.style.color = "black";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedOption !== option) {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#FFD700";
              }
            }}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </button>
        ))}

        <div style={styles.buttonContainer}>
          <button type="submit" onClick={handleSubmit} style={styles.submitButton}>
            Submit
          </button>
          <button type="button" onClick={handleBack} style={styles.backButton}>
            Back
          </button>
        </div>

        {feedback && <p style={styles.feedback}>{feedback}</p>}
      </div>

      {/* Success popup */}
      {showSuccess && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h3 style={styles.popupTitle}>Success!</h3>
            <p style={styles.popupContent}>
            You've earned a power-up!
              <br />
              Redirecting to the riddle page...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundImage: "url('/images/wallpaper1.jpg')",
    backgroundColor: "#003F66",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  gameBox: {
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    padding: "40px",
    borderRadius: "15px",
    maxWidth: "600px",
    width: "100%",
    border: "2px solid #FFD700",
  },
  header: {
    color: "#FFD700",
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    color: "#FFD700",
    fontSize: "1.8rem",
    marginBottom: "10px",
    textAlign: "center",
  },
  question: {
    color: "#FFD700",
    fontSize: "1.2rem",
    marginBottom: "20px",
    textAlign: "center",
    fontFamily: "'MedievalSharp', cursive",
  },
  codeBox: {
    backgroundColor: "#333",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    overflowX: "auto",
  },
  code: {
    color: "#FFD700",
    fontFamily: "monospace",
    fontSize: "1rem",
    whiteSpace: "pre-wrap",
    margin: 0,
  },
  hintContainer: {
    marginBottom: "20px",
    textAlign: "center",
  },
  hintButton: {
    backgroundColor: "#8B0000",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "8px 16px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  hintText: {
    color: "#FFD700",
    fontSize: "1.1rem",
    marginTop: "10px",
  },
  optionButton: {
    width: "100%",
    padding: "12px",
    margin: "5px 0",
    fontSize: "1rem",
    backgroundColor: "transparent",
    border: "2px solid #FFD700",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
    color: "#FFD700",
    fontWeight: "bold",
    transition: "background-color 0.3s, color 0.3s",
  },

  optionButtonHover: {
    backgroundColor: "#FFD700",
    color: "black", // Ensure text remains visible
  },

  optionButtonSelected: {
    backgroundColor: "#FFD700",
    color: "black", // Ensure text remains visible
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    marginTop: "20px",
  },
  submitButton: {
    backgroundColor: "#FFD700",
    color: "black",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.1rem",
    cursor: "pointer",
    flex: 1,
  },
  backButton: {
    backgroundColor: "#8B0000",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    flex: 1,
  },
  feedback: {
    color: "#FFD700",
    marginTop: "20px",
    fontSize: "1.2rem",
    textAlign: "center",
    fontFamily: "'MedievalSharp', cursive",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#2F4F4F",
    padding: "20px",
    borderRadius: "10px",
    border: "2px solid #FFD700",
    color: "#FFD700",
    maxWidth: "400px",
    width: "90%",
    textAlign: "center",
  },
  popupTitle: {
    color: "#FFD700",
    marginBottom: "15px",
  },
  popupContent: {
    color: "#FFD700",
    marginBottom: "20px",
    lineHeight: "1.6",
    fontFamily: "'MedievalSharp', cursive",
  },
  story: {
    color: "#FFD700",
    fontSize: "1.1rem",
    marginBottom: "20px",
    fontFamily: "'MedievalSharp', cursive",
  }
};

export default SQLGame;