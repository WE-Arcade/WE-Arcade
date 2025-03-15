import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import Sound from "react-sound";
import bgMusic from "../assets/sound-effects/riddle-bg-music.mp3";
import submitSound from "../assets/sound-effects/riddle-button-click.mp3";
import cluePowerUpSound from "../assets/sound-effects/riddle-cluepowerup-button.mp3";
import backSound from "../assets/sound-effects/button-click.mp3";
import backgroundImg from "../assets/images/bg11.b.jpg";
import neutralImg from "../assets/images/neutral.png";
import sadImg from "../assets/images/sad.png";
import happyImg from "../assets/images/happy.png";

const RiddlePage = () => {
  const { powerUps, setPowerUps, unlockedLevels } = useContext(GameContext);
  const { level } = useParams();
  const navigate = useNavigate();
  const [userAnswer, setUserAnswer] = useState("");
  const [showCluePopup, setShowCluePopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showPowerUpNotification, setShowPowerUpNotification] = useState(false);
  const [showNoClues, setShowNoClues] = useState(false);
  const [clueIndex, setClueIndex] = useState(0);
  const [currentClue, setCurrentClue] = useState("");
  const [playBackgroundMusic, setPlayBackgroundMusic] = useState(false);
  const [playSubmitSound, setPlaySubmitSound] = useState(false);
  const [playCluePowerUpSound, setPlayCluePowerUpSound] = useState(false);
  const [playBackSound, setPlayBackSound] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [imageSrc, setImageSrc] = useState(neutralImg); // Default to neutral image

  const riddles = {
    1: {
      question:
        "I am the intersection of what you love, what you are good at, what the world needs, and what you can be paid for. What am I?",
      answers: ["ikigai"],
      clues: [
        "I'm a Japanese concept that guides people to find their life's purpose.",
        "Sphoorthy often talks about me as the sweet spot of passion, mission, and profession.",
      ],
    },
    2: {
      question:
        "I'm Asokan's guiding principle, urging you to take control of your future. What am I?",
      answers: ["destiny"],
      clues: [
        "Think about how a captain controls the ship, even when the sea is rough.",
        "I'm all about taking control and being responsible. Asokan says, 'Take charge of your ___'.",
      ],
    },
    3: {
      question:
        "Whose presence in life can guide you, inspire you, and create wonders?",
      answers: ["mentor", "mentors"],
      clues: [
        "This person shares wisdom and helps you grow.",
        "Sphoorthy emphasizes the importance of this person in life, showing how they shape our journey.",
      ],
    },
    4: {
      question:
        "What approach, often used to solve complex problems, involves breaking down tasks into smaller, manageable steps and applying algorithms?",
      answers: ["computational thinking"],
      clues: [
        "This concept is key in programming, problem-solving, and creating efficient solutions.",
        "There's a whole session on this, taught by Anshul and Asokan in the bootcamp, that focuses on how to approach problems systematically.",
      ],
    },
    5: {
      question:
        "What is the practice that ensures your work is clear, understandable, and accessible for both current and future developers?",
      answers: ["documentation"],
      clues: [
        "You need this always, whether you're developing a project or learning a new framework or language.",
        "Aruvi and Asokan be like, 'Read the _________'.",
      ],
    },
    6: {
      question:
        "It's a flavorful and aromatic dish often made with rice, spices, and meat or vegetables.",
      answers: ["biryani", "briyani", "biriyani"],
      clues: [
        "A well-known Hyderabadi dish, often enjoyed with raita or mirchi ka salan.",
        "Kunisha's favorite dish.",
      ],
    },
    7: {
      question:
        "What is a word that can mend situations and bring a sense of remorse when things don’t go as planned?",
      answers: ["sorry"],
      clues: [
        "It's often used to show empathy or regret after a mistake or misunderstanding.",
        "When you say this, Asokan remarks, 'My girlfriend doesn’t wear a saree.'",
      ],
    },
    8: {
      question:
        "What simple habit can save you from unnecessary doubts and mistakes in class?",
      answers: ["read the screen", "read screen"],
      clues: [
        "Asokan and Aruvi always remind you to do this when you see a big red ERROR on your monitor!",
        "I show you words, I show you clues—everything you need is right in view! Just read the ______.",
      ],
    },
    9: {
      question:
        "I stand at the helm, guiding through night, a vision ahead, I ignite the light. Who am I?",
      answers: ["leader", "lead", "team leader", "group leader", "group lead", "team lead"],
      clues: [
        "People often look to me for guidance, direction, and support, especially in times of uncertainty.",
        "I am skilled at making decisions, motivating teams, and setting a clear path.",
      ],
    },
    10: {
      question:
        "What tool helps developers track changes, collaborate efficiently, and manage code versions?",
      answers: ["git", "github", "gitlab"],
      clues: [
        "This was the first-ever class taken for us by Aruvi.",
        "It ensures your code history is safe, letting you commit, push, and pull with ease.",
      ],
    },
    11: {
      question: "What must you accept to achieve greatness?",
      answers: ["failure", "loss"],
      clues: [
        "I start with 'F' and often feel like a setback.",
        "But, without me, success wouldn’t be possible.",
      ],
    },
    12: {
      question:
        "In which company did Sphoorthy begin her career, stepping into the world of technology and innovation?",
      answers: ["ibm"],
      clues: [
        "It is an American multinational technology company known for its iconic 'Think' slogan.",
        "It starts with 'I' and has a legacy of over a century of transforming the tech landscape.",
      ],
    },
    13: {
      question:
        "I'm what helps you debug that tricky segmentation fault or optimize your code when it runs too slow. What am I?",
      answers: ["persistence"],
      clues: [
        "You rely on me when you don’t get the right answer the first time but keep testing different possibilities.",
        "Anshul always reminds you in every DSA session that I am the key to mastering problem-solving, even when we struggle with tough problems.",
      ],
    },
    14: {
      question:
        "What is a word that signifies recognizing and appreciating someone's efforts or presence?",
      answers: ["acknowledgement", "acknowledge"],
      clues: [
        "It’s a signal that confirms the successful receipt of data, crucial for efficient and reliable networking.",
        "If you don’t show this in class, mentors are not going to entertain you.",
      ],
    },
    15: {
      question:
        "What principle encourages you to leverage existing solutions rather than start from scratch?",
      answers: ["don't reinvent the wheel", "dont reinvent the wheel", "don't reinvent wheel", "dont reinvent wheel"],
      clues: [
        "This concept emphasizes efficiency and reusability, often applied in software development to save time and effort.",
        "Aruvi often mentions it in web development classes to remind us to use what's already available.",
      ],
    },
    16: {
      question:
        "I’m named for humor, not for fear. In coding realms, I’m held most dear. I speak in simplicity, yet my reach is vast. From scripts to AI, I’m built to last.",
      answers: ["python"],
      clues: [
        "I thrive in data and guide machine minds, In the world of programming, I break confines.",
        "Though named for a serpent, I do no harm, A language of choice with immense charm.",
      ],
    },
    17: {
      question:
        "I’m the trait that makes a leader great, Owning mistakes, I never hesitate. Without me, trust would surely fade, I’m key in the promises you’ve made.",
      answers: ["accountability", "accountable"],
      clues: [
        "I’m all about responsibility and taking charge of your actions.",
        "Aruvi and Asokan always stress the importance of this to deliver reliable software.Kunisha made us make memes on this.",
      ],
    },
    18: {
      question:
        "Who is the first woman to earn a Ph.D. in computer science in the United States and is known for her groundbreaking work in artificial intelligence?",
      answers: ["grace hopper", "Grace Hopper", "Grace hopper"],
      clues: [
        "She is a pioneer in AI and her work has influenced modern computing.",
        "There is a major tech conference dedicated to women in computing, named after her, called the ___ ______ Conference.",
      ],
    },
    19: {
      question:
        "I’m the fire within that drives you to climb, The spark that fuels dreams over time. With clear goals, I pave the way, Helping you achieve more every day.",
      answers: ["ambition"],
      clues: [
        "People say I light the path to success.",
        "Asokan often talks about me when setting goals.",
      ],
    },
    20: {
      question:
        "I’m the reason you keep pushing through, Even when life feels harsh and blue. I’m the voice that says, “Don’t quit now,” Stay strong—I’ll show you how.",
      answers: ["hope"],
      clues: [
        "I’m the key to resilience and staying positive.",
        "They say I’m the belief that the future holds something good.",
      ],
    },
  };

  const riddle = riddles[level];

  useEffect(() => {
    setPlayBackgroundMusic(true);
    // Check if the level is unlocked
    if (!unlockedLevels.includes(parseInt(level))) {
      alert("You haven't unlocked this level yet!");
      navigate("/levels-page"); // Redirect to levels page
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const powerUpEarned = urlParams.get("powerUpEarned");
    const returnToLevel = urlParams.get("returnTo") || level;

    // Retrieve stored clueIndex (if exists)
    const storedClueIndex = localStorage.getItem(`clueIndex-${level}`);
    if (storedClueIndex !== null) {
      setClueIndex(parseInt(storedClueIndex, 10)); // Persist clue usage
    }

    if (powerUpEarned === "true") {
      setShowPowerUpNotification(true);

      setTimeout(() => {
        setShowPowerUpNotification(false);
        navigate(`/riddle/${returnToLevel}`);
      }, 3000);
    }

    window.history.replaceState({}, document.title, window.location.pathname);
  }, [level, navigate, unlockedLevels]);

  const checkAnswer = () => {
    // Play the submit button sound
    setPlaySubmitSound(true);
    // Delay the answer check until the sound finishes playing
    setTimeout(() => {
      if (riddle.answers.includes(userAnswer.toLowerCase())) {
        setImageSrc(happyImg); // Change image to happy.png on correct answer
        setFeedback("Correct! You solved the riddle!");
        // Navigate to next level or completion page
        if (parseInt(level) === 20) {
          navigate("/final-level-complete");
        } else {
          navigate(`/level-complete/${level}`);
        }
      } else {
        setImageSrc(sadImg); // Change image to sad.png on wrong answer
        setFeedback("Oops! Wrong answer. Try again.");
      }
    }, 500); // Adjust the delay to match the sound duration
  };

  const useClue = () => {
    setPlayCluePowerUpSound(true);
    if (powerUps > 0 && clueIndex < 2) {
      const newIndex = clueIndex + 1;
      setClueIndex(newIndex);
      setCurrentClue(riddle.clues[newIndex - 1]);

      // Store updated clueIndex in localStorage
      localStorage.setItem(`clueIndex-${level}`, newIndex);

      navigate(`/riddle/${level}?clueIndex=${newIndex}`, { replace: true });

      setPowerUps((prev) => prev - 1);
      setShowCluePopup(true);
    } else if (clueIndex >= 2) {
      setShowNoClues(true);
    } else if (powerUps <= 0 && clueIndex < 2) {
      setShowErrorPopup(true);
    }
  };

  const getPowerUp = () => {
    setPlayCluePowerUpSound(true);
    setTimeout(() => {
      navigate(`/mini-games-menu?returnTo=${level}&clueIndex=${clueIndex}`);
    }, 500);
  };

  const goBack = () => {
    setPlayBackSound(true);
    setTimeout(() => {
      navigate("/levels-page");
    }, 500);
  };

  return (
    <div style={styles.container}>
      {/* Image positioned at the bottom left */}
      <div style={styles.imageContainer}>
        <img src={imageSrc} alt="Feedback" style={styles.feedbackImage} />
      </div>

      {/* Overlay and Riddle Card */}
      <div style={styles.overlay}>
        <div style={styles.riddleCard}>
          <h1 style={styles.title}>Level - {level}</h1>
          <p style={styles.question}>{riddle.question}</p>

          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer here..."
            style={styles.input}
          />

          <button onClick={checkAnswer} style={styles.submitButton}>
            Submit
          </button>

          {feedback && <p style={styles.feedbackText}>{feedback}</p>}

          <p style={styles.clueText}>
            Powerups available: {powerUps} | Clues used: {clueIndex}/2
          </p>

          <div style={styles.buttonContainer}>
            <button onClick={useClue} style={styles.clueButton}>
              See Clues
            </button>
            <button onClick={getPowerUp} style={styles.powerupButton}>
              Get Powerup
            </button>
          </div>

          <button onClick={goBack} style={styles.backButton}>
            Back
          </button>

          {showCluePopup && (
  <div style={styles.popupOverlay}>
    <div style={styles.popup}>
      <h3 style={styles.clueTitle}>Clue #{clueIndex}</h3>
      <p style={styles.clueContent}>{currentClue}</p>
      <button
        onClick={() => {
          setPlayCluePowerUpSound(true); // Play the cluePowerUpSound
          setShowCluePopup(false); // Close the popup
        }}
        style={styles.closeButton}
      >
        Got it!
      </button>
    </div>
  </div>
)}

{showErrorPopup && (
  <div style={styles.popupOverlay}>
    <div style={styles.popup}>
      <h3 style={styles.clueTitle}>No Powerups Available</h3>
      <p style={styles.clueContent}>
        You need to earn powerups to see clues. Play mini-games to earn
        powerups!
      </p>
      <div style={styles.popupButtonContainer}>
        <button
          onClick={() =>
            navigate(
              `/mini-games-menu?returnTo=${level}&clueIndex=${clueIndex}`
            )
          }
          style={styles.clueButton}
        >
          Play Mini-games
        </button>
        <button
          onClick={() => setShowErrorPopup(false)}
          style={styles.closeButton}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

{showNoClues && (
  <div style={styles.popupOverlay}>
    <div style={styles.popup}>
      <h3 style={styles.clueTitle}>No Clues Left</h3>
      <p style={styles.clueContent}>
        You've already used all available clues for this riddle.
      </p>
      <button
        onClick={() => setShowNoClues(false)}
        style={styles.closeButton}
      >
        Close
      </button>
    </div>
  </div>
)}

          {showPowerUpNotification && (
            <div style={styles.notificationOverlay}>
              <div style={styles.notificationPopup}>
                <h3 style={styles.powerupTitle}>Power-Up Earned!</h3>
                <p style={styles.powerupContent}>
                  Congratulations! You have earned a new power-up.
                  <br />
                  Total power-ups: {powerUps}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Sound
        url={bgMusic}
        playStatus={playBackgroundMusic ? Sound.status.PLAYING : Sound.status.STOPPED}
        loop={true} // Loop the background music
        volume={50} // Adjust the volume (0 to 100)
      />

      {/* Submit Button Sound */}
      <Sound
        url={submitSound}
        playStatus={playSubmitSound ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={() => setPlaySubmitSound(false)} // Reset the state after the sound finishes
        volume={100} // Adjust the volume (0 to 100)
      />

      {/* Clue/Powerup Button Sound */}
      <Sound
        url={cluePowerUpSound}
        playStatus={playCluePowerUpSound ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={() => setPlayCluePowerUpSound(false)} // Reset the state after the sound finishes
        volume={100} // Adjust the volume (0 to 100)
      />

      {/* Back Button Sound */}
      <Sound
        url={backSound}
        playStatus={playBackSound ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={() => setPlayBackSound(false)} // Reset the state after the sound finishes
        volume={100} // Adjust the volume (0 to 100)
      />
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#003F66",
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    overflow: "hidden",
  },
  imageContainer: {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    zIndex: 2, // Ensure the image is above the overlay
  },
  feedbackImage: {
    width: "280px", // Adjust as needed
    height: "280px", // Adjust as needed
  },
  overlay: {
    opacity: 0.9,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(139, 69, 19, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  riddleCard: {
    backgroundColor: "#1C1C1C",
    padding: "40px",
    borderRadius: "15px",
    maxWidth: "600px",
    width: "100%",
    border: "2px solid #FFC72C",
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: "#FFC72C",
    fontSize: "2rem",
    marginBottom: "20px",
    textAlign: "center",
  },
  question: {
    color: "#FFC72C",
    fontSize: "1.2rem",
    marginBottom: "30px",
    lineHeight: "1.6",
    textAlign: "center",
    fontFamily: "'MedievalSharp', cursive",
  },
  input: {
    width: "100%",
    padding: "10px 1px",
    fontSize: "1rem",
    backgroundColor: "transparent",
    border: "2px solid #FFC72C",
    borderRadius: "5px",
    color: "#FFC72C",
    marginBottom: "20px",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#FFC72C",
    color: "black",
    padding: "10px 30px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.1rem",
    cursor: "pointer",
    marginBottom: "20px",
    width: "100%",
    textAlign: "center",
  },
  feedbackText: {
    color: "#FFC72C",
    fontSize: "1.2rem",
    textAlign: "center",
    fontFamily: "'MedievalSharp', cursive",
  },
  clueText: {
    color: "#FFC72C",
    marginBottom: "10px",
    textAlign: "center",
    fontFamily: "'MedievalSharp', cursive",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
    width: "100%",
  },
  clueButton: {
    backgroundColor: "#004F6D",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    flex: 1,
    width: "100%",
  },
  powerupButton: {
    backgroundColor: "#001EFF",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    flex: 1,
    width: "100%",
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
  popup: {
    backgroundColor: "#1C1C1C",
    padding: "20px",
    borderRadius: "10px",
    border: "2px solid #FFC72C",
    color: "#FFC72C",
  clueText: {
    color: "#FFC72C", // Yellow
    marginBottom: "10px",
    textAlign: "center",
    fontFamily: "'MedievalSharp', cursive", // MedievalSharp font
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(139, 69, 19, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#1C1C1C", // Black
    padding: "20px",
    borderRadius: "10px",
    border: "2px solid #FFC72C", // Yellow
    color: "#FFC72C", // Yellow
    maxWidth: "400px",
    width: "90%",
    textAlign: "center",
  },
  clueTitle: {
    color: "#FFC72C",
    marginBottom: "15px",
  },
  clueContent: {
    color: "#FFC72C",
    marginBottom: "20px",
    fontFamily: "'MedievalSharp', cursive",
  },
  closeButton: {
    backgroundColor: "#8B0000",
    color: "white",
    padding: "8px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  popupButtonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  notificationOverlay: {
    position: "fixed",
    top: 20,
    right: 20,
    zIndex: 1000,
  },
  notificationPopup: {
    backgroundColor: "#004F6D",
    padding: "15px",
    borderRadius: "10px",
    border: "2px solid #FFC72C",
    color: "#FFC72C",
    maxWidth: "300px",
    textAlign: "center",
    animation: "fadeInOut 3s forwards",
  },
  powerupTitle: {
    color: "#FFC72C",
    marginBottom: "10px",
    fontSize: "1.2rem",
  },
  powerupContent: {
    color: "#FFC72C",
    fontSize: "1rem",
    lineHeight: "1.4",
    fontFamily: "'MedievalSharp', cursive",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Ensure it's above other elements
  },
};

export default RiddlePage;
