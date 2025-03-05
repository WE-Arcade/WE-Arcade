import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GameContext } from "../../context/GameContext";

const questions = [
  {
    title: "Hidden Number in Bitwise Operation",
    question: "What is the value of x?",
    code: "x = (1 << 5) | (1 << 3) | (1 << 1)\nprint(x)",
    hint: "Convert it to binary and decode!",
    options: ["32", "42", "56", "24"],
    answer: "42",
  },
  {
    title: "Swap Numbers without Temporary Variable",
    question: "Which operation performs the swap?",
    code: "a = 5\nb = 9\n# Swap a and b using one of the following options:",
    hint: "Think about using XOR to swap two numbers.",
    options: [
      "A) a, b = b, a",
      "B) a = a ^ b; b = a ^ b; a = a ^ b",
      "C) a = a & b; b = a | b; a = a ^ b",
      "D) a = a << b; b = a >> b; a = a ^ b",
    ],
    answer: "B) a = a ^ b; b = a ^ b; a = a ^ b",
  },
  {
    title: "Counting Set Bits in an Integer (Fun with Population Count)",
    question: "What is the number of 1s in the binary representation of 37?",
    code: "x = 37  # Binary: ????\nprint(bin(x).count('1'))",
    hint: "Use bin(x).count('1') to count the 1s in the binary representation.",
    options: ["1", "2", "3", "4"],
    answer: "3",
  },
  {
    title: "The Mysterious Power of Two",
    question:
      "Which bitwise operation can efficiently check if a number is a power of two?",
    code: "n = someNumber\nif ((n & (n - 1)) === 0) {\n  console.log('Power of Two');\n}",
    hint: "A number is a power of two if it has only one 1 in its binary representation.",
    options: [
      "A) n & (n - 1) == 0",
      "B) n | (n - 1) == 0",
      "C) n ^ (n - 1) == 0",
      "D) n << 1 == 0",
    ],
    answer: "A) n & (n - 1) == 0",
  },
  {
    title: "Reverse the Bits!",
    question: "What does this function do?",
    code: "def mystery(n):\nreturn int(bin(n)[:1:-1], 2)\nprint(mystery(13))",
    hint: "Binary of 13: 1101 It's flipping out! 😆",
    options: ["A) 13", "B) 11", "C) 7", "D) 14"],
    answer: "B) 11",
  },
];

const BitwiseGame = () => {
  const { powerUps, setPowerUps, answeredQuestions, setAnsweredQuestions} =
    useContext(GameContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [feedback, setFeedback] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
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

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setFeedback(""); // Clear previous feedback when a new option is selected
  };

  const handleBack = () => {
    const params = new URLSearchParams(location.search);
    const returnToLevel = params.get("returnTo") || "1"; // Keep correct level
    navigate(`/mini-games-menu?returnTo=${returnToLevel}`); // Go back correctly
  };
  
  const handleSubmit = () => {
    if (selectedOption === null) return;
    if (selectedOption === questions[currentQuestionIndex].answer) {
      if (setAnsweredQuestions)
        setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
      if (setPowerUps) setPowerUps((prevPowerUps) => prevPowerUps + 1); // Increment power-up count
  
      setFeedback("Correct! You earned a power-up!");
      setShowSuccess(true);
  
      // Get the correct return level
      const params = new URLSearchParams(location.search);
      const returnToLevel = params.get("returnTo") || "1";
  
      setTimeout(() => {
        navigate(`/riddle/${returnToLevel}?powerUpEarned=true`); // Ensure correct return level
      }, 2000);
    } else {
      setFeedback("Incorrect. Try again!");
    }
  };
  
  
  
  
  const toggleHint = () => setShowHint(!showHint);

  if (currentQuestionIndex === null)
    return <div style={styles.container}>Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="game-container" style={styles.container}>
      <div className="game-box" style={styles.gameBox}>
        {/* Question Title */}
        <h3 style={styles.title}>{currentQuestion.title}</h3>
        {/* Question Text */}
        <p style={styles.question}>{currentQuestion.question}</p>
        {/* Code Snippet Box */}
        <div style={styles.codeBox}>
          <pre style={styles.code}>{currentQuestion.code}</pre>
        </div>
        {/* Hint Box */}
        <div style={styles.hintContainer}>
          <button onClick={toggleHint} style={styles.hintButton}>
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
          {showHint && <p style={styles.hintText}>{currentQuestion.hint}</p>}
        </div>
        {/* Options */}
        {currentQuestion.options.map((option, index) => (
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
              You've earned a power-up! Redirecting...
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
    fontFamily: "'MedievalSharp', cursive",
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

export default BitwiseGame;
