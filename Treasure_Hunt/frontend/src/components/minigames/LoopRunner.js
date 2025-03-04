import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GameContext } from "../../context/GameContext";

const questions = [
  {
    code:
      "count = 0\nfor i in range(1, 10, 2):\n    count += 1\nprint(count)",
    question: "How many times will the following loop execute?",
    answer: "5",
  },
  {
    code:
      "sum_value = 0\nfor i in range(1, 6):\n    sum_value += i\nprint(sum_value)",
    question: "What will be the final value of sum_value?",
    answer: "15",
  },
  {
    code: `for (int i = 0; i < 5; i++) {\n    cout << i << " ";\n}`,
    question: "How many times will this loop execute?",
    answer: "5",
  },
  {
    code: `int x = 2;\nint i = 0;\n\nwhile (i < 3) {\n    x += 2;\n    i++;\n}\n\ncout << x;`,
    question: "What will be the final value of x after this loop runs?",
    answer: "8",
  },
  
];

const LoopRunner = () => {
  const { powerUps, setPowerUps, answeredQuestions, setAnsweredQuestions } = useContext(GameContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Choose a question that hasn't been answered yet
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  
  useEffect(() => {
    // Get return level from query params if available
    const params = new URLSearchParams(location.search);
    
    // Ensure answeredQuestions is an array
    const safeAnsweredQuestions = Array.isArray(answeredQuestions) ? answeredQuestions : [];
    
    // Filter out questions that have already been answered
    const availableQuestions = questions.filter((_, index) => 
      !safeAnsweredQuestions.includes(index)
    );
    
    if (availableQuestions.length === 0) {
      // If all questions have been answered, reset the answered questions
      if (setAnsweredQuestions) {
        setAnsweredQuestions([]);
      }
      setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
    } else {
      // Choose a random question from the available ones
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const originalIndex = questions.indexOf(availableQuestions[randomIndex]);
      setCurrentQuestionIndex(originalIndex);
    }
  }, [answeredQuestions, setAnsweredQuestions, location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentQuestionIndex === null) return;
    
    if (
      userAnswer.trim().toLowerCase() ===
      questions[currentQuestionIndex].answer.toLowerCase()
    ) {
      // Ensure answeredQuestions is an array before updating
      const safeAnsweredQuestions = Array.isArray(answeredQuestions) ? answeredQuestions : [];
      
      // Add the current question to answered questions
      if (setAnsweredQuestions) {
        setAnsweredQuestions([...safeAnsweredQuestions, currentQuestionIndex]);
      }
      
      // Increment powerups
      const newPowerUps = (powerUps || 0) + 1;
      if (setPowerUps) {
        setPowerUps(newPowerUps);
      }
      
      setFeedback("Correct! You earned a power-up!");
      setShowSuccess(true);
      
      // Get return level from URL params
      const params = new URLSearchParams(location.search);
      const returnToLevel = params.get("returnTo") || "1";
      
      setTimeout(() => {
        // Navigate back to the specific riddle level
        navigate(`/riddle/${returnToLevel}`);
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


  if (currentQuestionIndex === null) {
    return <div style={styles.container}>Loading...</div>;
  }

  return (
    <div className="game-container" style={styles.container}>
      <div className="game-box" style={styles.gameBox}>
        <h2 style={styles.title}>Loop Ruunner</h2>
        <strong style={styles.question}>
          Question: {questions[currentQuestionIndex].question}
        </strong>
        <div style={styles.codeBox}>
          <pre style={styles.code}>{questions[currentQuestionIndex].code}</pre>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Enter your answer here..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            required
            style={styles.input}
          />
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.submitButton}>
              Submit
            </button>
            <button type="button" onClick={handleBack} style={styles.backButton}>
              Back
            </button>
          </div>
        </form>
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
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "40px",
    borderRadius: "15px",
    maxWidth: "600px",
    width: "100%",
    border: "2px solid #FFD700",
  },
  title: {
    color: "#FFD700",
    fontSize: "2rem",
    marginBottom: "20px",
    textAlign: "center",
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
  question: {
    color: "#FFD700",
    fontSize: "1.2rem",
    marginBottom: "20px",
    display: "block",
  },
  form: {
    marginTop: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "1rem",
    backgroundColor: "transparent",
    border: "2px solid #FFD700",
    borderRadius: "5px",
    color: "#FFD700",
    marginBottom: "20px",
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

export default LoopRunner;