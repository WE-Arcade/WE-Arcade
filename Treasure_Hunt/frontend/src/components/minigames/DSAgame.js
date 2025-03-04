import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GameContext } from "../../context/GameContext";

const questions = [
  {
    story:
      "Jake is waiting in line at a ticket counter. As more people arrive, they stand at the end of the line. The cashier serves the person who has been waiting the longest before moving on to the next.",
    question: "Which data structure follows this principle?",
    answer: "Queue",
    options: ["Stack", "Queue", "Tree", "Graph"],
  },
  {
    story:
      "Emma is looking for a book in a massive library. Instead of searching randomly, she starts in the middle of a sorted catalog and decides whether to search the left or right half, repeating this process until she finds the book.",
    question: "Which algorithm is she using?",
    answer: "Binary Search",
    options: ["Linear Search", "Binary Search", "Bubble Sort", "Quick Sort"],
  },
  {
    story:
      "Ethan is storing guest information at a hotel. Each guest has a unique reservation number, and Ethan needs to quickly look up details based on this number.",
    question: "Which data structure is ideal for Ethan's task?",
    answer: "Hash Table",
    options: ["Array", "Linked List", "Hash Table", "Queue"],
  },
  {
    story:
      "Olivia is organizing a scavenger hunt. She starts from one spot, visits all the nearby locations first, then gradually moves outward to distant places, ensuring she doesn't miss any location.",
    question: "Which traversal algorithm does Olivia's hunt resemble?",
    answer: "Breadth-First Search",
    options: [
      "Depth-First Search",
      "Breadth-First Search",
      "Inorder Traversal",
      "Postorder Traversal",
    ],
  },
];

const DSAGame = () => {
  const { powerUps, setPowerUps, answeredQuestions, setAnsweredQuestions } =
    useContext(GameContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Choose a question that hasn't been answered yet
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);

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
  }, [answeredQuestions, setAnsweredQuestions, location.search]);

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
  

  const handleBack = () => {
    const params = new URLSearchParams(location.search);
    const returnToLevel = params.get("returnTo") || "1"; // Default to level 1 if missing
    navigate(`/mini-games-menu?returnTo=${returnToLevel}`); // Go back with correct level
  };
  

  if (currentQuestionIndex === null) {
    return <div style={styles.container}>Loading...</div>;
  }

  return (
    <div className="dsa-game-container" style={styles.container}>
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
  story: {
    color: "#FFD700",
    fontSize: "1.1rem",
    marginBottom: "20px",
  }
};

export default DSAGame;

