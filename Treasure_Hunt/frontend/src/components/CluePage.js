import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import { useContext } from "react";

const CluePage = () => {
  const { powerUps, setPowerUps } = useContext(GameContext);
  const { level, clueNumber } = useParams();
  const navigate = useNavigate();

  const riddles = {
    1: { 
      question: "I am the intersection of what you love, what you are good at, what the world needs, and what you can be paid for. What am I?", 
      answers: ["ikigai"], 
      clues: [
        "I'm a Japanese concept that guides people to find their life's purpose.", 
        "Sphoorthy often talks about me as the sweet spot of passion, mission, and profession."
      ] 
    },
    2: { 
      question: "I'm Asokan's guiding principle, urging you to take control of your future. What am I?", 
      answers: ["destiny"], 
      clues: [
        "Think about how a captain controls the ship, even when the sea is rough.", 
        "I'm all about taking control and being responsible. Asokan says, 'Take charge of your ___'."
      ] 
    },
    3: { 
      question: "I'm what helps you debug that tricky segmentation fault or optimize your code when it runs too slow. What am I?", 
      answers: ["persistence"], 
      clues: [
        "You rely on me when you don't get the right answer the first time but keep testing different possibilities.", 
        "Anshul always reminds us in every DSA session that I am the key to mastering problem-solving, even when we struggle with tough problems."
      ] 
    },
    4: { 
      question: "What must you accept to achieve greatness?", 
      answers: ["failure"], 
      clues: [
        "I start with 'F' and often feel like a setback.", 
        "But, without me, success wouldn't be possible."
      ] 
    },
    5: { 
      question: "In which company did Sphoorthy begin her career, stepping into the world of technology and innovation?", 
      answers: ["ibm"], 
      clues: [
        "It is an American multinational technology company known for its iconic 'Think' slogan.", 
        "It starts with 'I' and has a legacy of over a century of transforming the tech landscape."
      ] 
    },
    6: { 
      question: "Whose presence in life can guide you, inspire you, and create wonders?", 
      answers: ["mentor"], 
      clues: [
        "This person shares wisdom and helps you grow.", 
        "Sphoorthy emphasizes the importance of this person in life, showing how they shape our journey."
      ] 
    },
    7: { 
      question: "What is a word that can mend situations and bring a sense of remorse when things don't go as planned?", 
      answers: ["sorry"], 
      clues: [
        "It's often used to show empathy or regret after a mistake or misunderstanding.", 
        "When you say this, Asokan remarks, 'My girlfriend doesn't wear a saree.'"
      ] 
    },
    8: { 
      question: "What approach, often used to solve complex problems, involves breaking down tasks into smaller, manageable steps and applying algorithms?", 
      answers: ["computational thinking"], 
      clues: [
        "This concept is key in programming, problem-solving, and creating efficient solutions.", 
        "There's a whole session on this, taught by Anshul, that focuses on how to approach problems systematically."
      ] 
    },
    9: { 
      question: "What is the practice that ensures your work is clear, understandable, and accessible for both current and future developers?", 
      answers: ["documentation"], 
      clues: [
        "You need this always, whether you're developing a project or learning a new framework or language.", 
        "Aruvi and Asokan be like, 'Read the _________.'"] 
    },
    10: { 
      question: "It's a flavorful and aromatic dish often made with rice, spices, and meat or vegetables.", 
      answers: ["biryani"], 
      clues: [
        "A well-known Hyderabadi dish, often enjoyed with raita or mirchi ka salan.", 
        "Kunisha's favorite dish."
      ] 
    }
  };

  const riddle = riddles[level];
  const clueIdx = parseInt(clueNumber) - 1;
  const hasNextClue = clueIdx < 1; // We only have 2 clues per riddle

  const handleUnlockNextClue = () => {
    if (powerUps > 0) {
      setPowerUps(powerUps - 1);
      navigate(`/clue/${level}/2`);
    } else {
      navigate("/mini-games-menu");
    }
  };

  const handleBack = () => {
    // Navigate back to riddle page with clue index as a query parameter
    navigate(`/riddle/${level}?clueIndex=${clueNumber}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.clueCard}>
        <h1 style={styles.title}>Clue {clueNumber}</h1>
        <p style={styles.clueContent}>{riddle.clues[clueIdx]}</p>
        
        <div style={styles.buttonContainer}>
          {hasNextClue && (
            <button 
              onClick={handleUnlockNextClue} 
              style={styles.unlockButton}
              disabled={powerUps <= 0 && clueIdx === 0}
            >
              {powerUps > 0 ? "Unlock Next Clue" : "Get More Powerups"}
            </button>
          )}
          
          <button 
            onClick={handleBack} 
            style={styles.backButton}
          >
            Back to Riddle
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundImage: "url('/images/wallpaper1.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  clueCard: {
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
  clueContent: {
    color: "#FFD700",
    fontSize: "1.2rem",
    marginBottom: "30px",
    lineHeight: "1.6",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  unlockButton: {
    backgroundColor: "#FF8C00",
    color: "black",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
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
};

export default CluePage;