import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GameContext } from "../../context/GameContext";

const questions = [
  {
    title: "Simple Shift Cipher",
    encrypted: "BQQMF",
    decrypted: "APPLE",
    prompt: "What is the encryption of MANGO?",
    answer: "NBPHQ",
  },
  {
    title: "Reverse Alphabet Cipher",
    encrypted: "GSRH",
    decrypted: "THIS",
    prompt: "What is the encryption of HIVVZI?",
    answer: "SECRET",
  },
];

const CryptogramGame = () => {
  const { setPowerUps, answeredQuestions, setAnsweredQuestions } =
    useContext(GameContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [feedback, setFeedback] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");

  useEffect(() => {
    const safeAnsweredQuestions = Array.isArray(answeredQuestions)
      ? answeredQuestions
      : [];
    const availableQuestions = questions.filter(
      (_, index) => !safeAnsweredQuestions.includes(index)
    );

    if (availableQuestions.length === 0) {
      if (setAnsweredQuestions) setAnsweredQuestions([]);
      setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
    } else {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const originalIndex = questions.indexOf(availableQuestions[randomIndex]);
      setCurrentQuestionIndex(originalIndex);
    }
  }, [answeredQuestions, setAnsweredQuestions, location.search]);

  const handleSubmit = () => {
    if (!userAnswer) return;
    if (userAnswer.toUpperCase() === questions[currentQuestionIndex].answer) {
      if (setAnsweredQuestions)
        setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
      if (setPowerUps) setPowerUps((prevPowerUps) => prevPowerUps + 1); // Increment power-up count
      setFeedback("Correct! You earned a power-up!");
      setShowSuccess(true);
      // Get correct return level
      const params = new URLSearchParams(location.search);
      const returnToLevel = params.get("returnTo") || "1"; // Default to level 1 only if no level is provided
      setTimeout(() => {
        navigate(`/riddle/${returnToLevel}?powerUpEarned=true`); // Ensure correct return level
      }, 2000);
    } else {
      setFeedback("Incorrect. Try again!");
    }
  };

  const handleBack = () => {
    const params = new URLSearchParams(location.search);
    const returnToLevel = params.get("returnTo") || "1"; // Default to level 1 if missing
    navigate(`/mini-games-menu?returnTo=${returnToLevel}`); // Go back with correct level
  };

  if (currentQuestionIndex === null) return <div>Loading...</div>;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="cryptogram-game-container" style={styles.container}>
      <div className="game-box" style={styles.gameBox}>
        <h3 style={styles.title}>{currentQuestion.title}</h3>
        <p style={styles.question}><b>Encrypted:</b> {currentQuestion.encrypted}</p>
        <p style={styles.question}><b>Decrypted:</b> {currentQuestion.decrypted}</p>
        <p style={styles.question}>{currentQuestion.prompt}</p>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter your answer"
          style={styles.input}
        />
        <div style={styles.buttonContainer}>
          <button onClick={handleSubmit} style={styles.submitButton}>
            Submit
          </button>
          <button onClick={handleBack} style={styles.backButton}>
            Back
          </button>
        </div>
        {feedback && <p style={styles.feedback}>{feedback}</p>}
      </div>
      {showSuccess && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h3 style={styles.popupTitle}>Success!</h3>
            <p style={styles.popupContent}>
              You've earned a power-up!
              <br />
              Redirecting...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: "relative", // Required for pseudo-element positioning
    minHeight: "100vh",
    backgroundColor: "#003F66",
    backgroundImage: "url('/images/wallpaper1.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    overflow: "hidden", // Prevent overflow
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(101, 67, 33, 0.7)", // Translucent brown overlay
      zIndex: 1, // Ensure it's above the background image but below the content
    },
  },
  gameBox: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "40px",
    borderRadius: "15px",
    maxWidth: "600px",
    width: "100%",
    border: "2px solid #FFD700",
    position: "relative", // Ensure it's above the overlay
    zIndex: 2, // Ensure it's above the overlay
  },
  title: {
    color: "#FFD700",
    fontSize: "2rem",
    marginBottom: "20px",
    textAlign: "center",
    fontFamily: "'Press Start 2P', cursive",
  },
  question: {
    color: "#FFFF00", // Yellow for questions
    fontSize: "1.2rem",
    marginBottom: "20px",
    textAlign: "center", // Center-align text
    fontFamily: "'MedievalSharp', cursive", // Use MedievalSharp font
  },
  input: {
    width: "100%",
    padding: "10px 0px",
    fontSize: "1rem",
    backgroundColor: "transparent",
    border: "2px solid #FFD700",
    borderRadius: "5px",
    color: "#FFD700",
    marginBottom: "20px",
    textAlign: "center", // Center-align text
    fontFamily: "'MedievalSharp', cursive", // Use MedievalSharp font
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
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
    fontFamily: "'MedievalSharp', cursive", // Use MedievalSharp font
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
  },
};

export default CryptogramGame;