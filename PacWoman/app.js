document.addEventListener("DOMContentLoaded", () => {
  const scoreDisplay = document.getElementById("score");
  const width = 28;
  let score = 0;
  let highScore = localStorage.getItem("highScore") || 0;
  let lives = 3; // Initialize Pac-Man's lives
  document.getElementById("high-score").innerHTML = highScore;
  document.getElementById("start-high-score").innerHTML = highScore;
  const grid = document.querySelector(".grid");
  const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];


  const squares = [];
   const specialDots = [
    { class: "special-dot-1", text: "You found a red special dot!" },
    { class: "special-dot-2", text: "You found a blue special dot!" },
    { class: "special-dot-3", text: "You found a green special dot!" },
    { class: "special-dot-4", text: "You found a yellow special dot!" },
    { class: "special-dot-5", text: "You found a purple special dot!" },
    { class: "special-dot-6", text: "You found an orange special dot!" },
    { class: "special-dot-7", text: "You found a pink special dot!" },
    { class: "special-dot-8", text: "You found a cyan special dot!" },
  ];

  let activeSpecialDots = [];

  // Track total dots (pac-dots, power pellets, and special dots)
  let totalDots = 0;
  layout.forEach((cell) => {
    if (cell === 0 || cell === 3) totalDots++; // Count pac-dots and power pellets
  });
  totalDots += specialDots.length; // Add special dots

  // 8 Funny MCQ Questions
const mcqQuestions = [
    {
      question: "Who said this? 'The official documentation is the official place to look for official documentation'?",
      options: ["Aruvi", "Asokan", "Anshul", "Sphoorthy"],
      correctAnswer: 0, // Index of the correct answer
      reward: 50, // Bonus points for correct answer
      penalty: -10, // Penalty for incorrect answer
    },
    {
      question: " Who said 'CALM YOUR CALAMITIES'?",
      options: ["Anshul", "Kunisha", "Asokan", "Sphoorthy"],
      correctAnswer: 1,
      reward: 70,
      penalty: -20,
    },
    {
      question: "Who used Baburao and Raju from Hera Pheri to explain a DSA problem?",
      options: ["Anshul", "Asokan", "Kunisha", "Sphoorthy"],
      correctAnswer: 0,
      reward: 75,
      penalty: -15,
    },
    {
      question: "Whose words were these: 'One flying chappal I will give you'?",
      options: ["Anshul", "Asokan", "Kunisha", "Sphoorthy"],
      correctAnswer: 2,
      reward: 50,
      penalty: -10,
    },
    {
      question: " During the bootcamp, who humorously channeled King Julien from Madagascar with the phrase,'move it move it people'",
      options: ["Sphoorthy", "Anshul", "Asokan", "Kunisha"],
      correctAnswer: 3,
      reward: 80,
      penalty: -20,
    },
    {
      question: "Why don’t ghosts like rain?",
      options: ["It dampens their spirits", "They melt", "They hate umbrellas", "It’s too noisy"],
      correctAnswer: 0,
      reward: 90,
      penalty: -15,
    },
    {
      question: "Who made this wise observation?  'Please remember that at one point constantly hitting your head to the wall becomes injurious'",
      options: ["Kunisha", "Anshul", "Asokan", "Anasuya"],
      correctAnswer: 2,
      reward: 70,
      penalty: -10,
    },
    {
      question: "Who is known for the cheerful greeting “Good evening ladies! how are you today?”",
      options: ["Sphoorthy", "Anshul", "Kunisha", "Anasuya"],
      correctAnswer: 2,
      reward: 85,
      penalty: -25,
    },
  ];
  // Variables to control game pause state
  let isGamePaused = false;
  let pacmanInterval;
  let ghostIntervals = [];

  // Function to pause the game
  function pauseGame() {
    isGamePaused = true;
    clearInterval(pacmanInterval); // Stop Pac-Man movement
    ghosts.forEach((ghost) => clearInterval(ghost.timerId)); // Stop ghost movements
  }

  // Function to resume the game
  function resumeGame() {
    isGamePaused = false;
    movePacman(); // Restart Pac-Man movement
    ghosts.forEach((ghost) => moveGhost(ghost)); // Restart ghost movements
  }

function displayMCQ(questionObj) {
  pauseGame(); // Pause the game when the pop-up appears

  const popup = document.createElement("div");
  popup.classList.add("popup");

  let selectedOption = null; // Track the selected option

  // Function to handle option selection
  const handleOptionClick = (option, button) => {
    if (selectedOption === option) {
      // Deselect if the same option is clicked again
      selectedOption = null;
      button.style.backgroundColor = "transparent";
      button.style.color = "#FFD700";
    } else {
      // Deselect the previously selected option
      if (selectedOption !== null) {
        const prevButton = popup.querySelector(`[data-option="${selectedOption}"]`);
        prevButton.style.backgroundColor = "transparent";
        prevButton.style.color = "#FFD700";
      }
      // Select the new option
      selectedOption = option;
      button.style.backgroundColor = "#FFD700";
      button.style.color = "black";
    }
  };

  // Function to handle submit
  const handleSubmit = () => {
    if (selectedOption === null) {
      showMessage("Please select an option before submitting!");
      return;
    }
  
    const correctAnswer = questionObj.correctAnswer;
    const reward = questionObj.reward;
    const penalty = questionObj.penalty;
  
    if (selectedOption === questionObj.options[correctAnswer]) {
      score += reward;
      showMessage(`Correct! You earned ${reward} points!`);
    } else {
      score += penalty;
      showMessage(`Wrong answer! You lost ${Math.abs(penalty)} points.`);
    }
  
    scoreDisplay.innerHTML = score;
  
    popup.remove();
    resumeGame();
  };
  
  // Function to show messages on the screen
  function showMessage(message) {
    const messageDisplay = document.getElementById("message-display");
    messageDisplay.innerHTML = message;
    messageDisplay.style.display = "block"; 
    messageDisplay.style.opacity = "1"; 

    // Hide the message after 3 seconds
    setTimeout(() => {
      messageDisplay.style.opacity = "0"; 
      setTimeout(() => {
        messageDisplay.style.display = "none"; 
      }, 500);
    }, 3000); 
  }

  // Function to handle back (close the popup without submitting)
  const handleBack = () => {
    popup.remove();
    resumeGame();
  };

  // Add question and options
  popup.innerHTML = `
    <button class="close-button" onclick="handleBack()">×</button>
    <p>${questionObj.question}</p>
    <ul>
      ${questionObj.options
        .map(
          (option, index) => `
            <li>
              <button
                data-option="${option}"
                style="
                  width: 100%;
                  padding: 12px;
                  margin: 5px 0;
                  font-size: 1rem;
                  background-color: transparent;
                  border: 2px solid #FFD700;
                  border-radius: 5px;
                  cursor: pointer;
                  text-align: center;
                  color: #FFD700;
                  font-weight: bold;
                  transition: background-color 0.3s, color 0.3s;
                "
              >
                ${option}
              </button>
            </li>
          `
        )
        .join("")}
    </ul>
    <div style="display: flex; justify-content: space-between; gap: 15px; margin-top: 20px;">
      <button
        style="
          background-color: #FFD700;
          color: black;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          font-size: 1.1rem;
          cursor: pointer;
          flex: 1;
        "
      >
        Submit
      </button>
      <button
        style="
          background-color: #8B0000;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          flex: 1;
        "
      >
        Back
      </button>
    </div>
  `;

  document.body.appendChild(popup);

  // Add event listeners for option buttons
  const optionButtons = popup.querySelectorAll("button[data-option]");
  optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleOptionClick(button.getAttribute("data-option"), button);
    });

    button.addEventListener("mouseenter", () => {
      if (selectedOption !== button.getAttribute("data-option")) {
        button.style.backgroundColor = "#FFD700";
        button.style.color = "black";
      }
    });

    button.addEventListener("mouseleave", () => {
      if (selectedOption !== button.getAttribute("data-option")) {
        button.style.backgroundColor = "transparent";
        button.style.color = "#FFD700";
      }
    });
  });

  // Add event listeners for submit and back buttons
  const submitButton = popup.querySelector("button[style*='background-color: #FFD700']");
  const backButton = popup.querySelector("button[style*='background-color: #8B0000']");

  submitButton.addEventListener("click", handleSubmit);
  backButton.addEventListener("click", handleBack);
}// Create your board
  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement("div");
      grid.appendChild(square);
      squares.push(square);

      // Add layout to the board
      if (layout[i] === 0) {
        squares[i].classList.add("pac-dot");
      } else if (layout[i] === 1) {
        squares[i].classList.add("wall");
      } else if (layout[i] === 2) {
        squares[i].classList.add("ghost-lair");
      } else if (layout[i] === 3) {
        squares[i].classList.add("power-pellet");
      }
    }
  }
  createBoard();

  // Generate special dots randomly
  // function generateSpecialDots() {
  //   for (let i = 0; i < specialDots.length; i++) {
  //     let randomIndex;
  //     do {
  //       randomIndex = Math.floor(Math.random() * squares.length);
  //     } while (!squares[randomIndex].classList.contains("pac-dot"));

  //     squares[randomIndex].classList.add(specialDots[i].class);
  //     activeSpecialDots.push({ index: randomIndex, type: specialDots[i] });
  //   }
  // }
  // Generate special dots randomly
function generateSpecialDots() {
  for (let i = 0; i < specialDots.length; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * squares.length);
    } while (!squares[randomIndex].classList.contains("pac-dot"));

    // Instead of adding the specific class, add the new special-dot class
    squares[randomIndex].classList.add("special-dot");
    activeSpecialDots.push({ index: randomIndex, type: specialDots[i] });
  }
}

  // Create Characters
  let pacmanCurrentIndex = 490;
  let pacmanVelocity = {
    x: 0,
    y: 0,
  };
  const pacmanSpeed = 200;
  squares[pacmanCurrentIndex].classList.add("pac-man");

  // Set pacman velocity
  function setPacmanVelocity(e) {
    if (isGamePaused) return; // Disable Pac-Man movement if the game is paused

    switch (e.keyCode) {
      case 37:
        if (
          pacmanCurrentIndex % width !== 0 &&
          !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
          !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
        ) {
          pacmanVelocity.y = 0;
          pacmanVelocity.x = -1;
        }
        break;
      case 38:
        if (
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
          !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")
        ) {
          pacmanVelocity.y = -1;
          pacmanVelocity.x = 0;
        }
        break;
      case 39:
        if (
          pacmanCurrentIndex % width < width - 1 &&
          !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
          !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
        ) {
          pacmanVelocity.y = 0;
          pacmanVelocity.x = 1;
        }
        break;
      case 40:
        if (
          pacmanCurrentIndex + width < width * width &&
          !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
          !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
        ) {
          pacmanVelocity.y = 1;
          pacmanVelocity.x = 0;
        }
        break;
    }
    checkForGameOver();
    console.log(pacmanVelocity, e.keyCode);
  }

  // Move pacman
  function movePacman() {
    pacmanInterval = setInterval(() => {
      if (isGamePaused) return; // Stop Pac-Man movement if the game is paused

      if (pacmanVelocity.x === -1 && pacmanVelocity.y == 0) {
        if (
          pacmanCurrentIndex % width !== 0 &&
          !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
          !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
        ) {
          squares[pacmanCurrentIndex].classList.remove("pac-man");

          pacmanCurrentIndex -= 1;
        }
        if (squares[pacmanCurrentIndex - 1] === squares[363]) {
          pacmanCurrentIndex = 391;
        }
      }
      if (pacmanVelocity.x === 0 && pacmanVelocity.y == -1) {
        if (
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
          !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")
        ) {
          squares[pacmanCurrentIndex].classList.remove("pac-man");

          pacmanCurrentIndex -= width;
        }
      }
      if (pacmanVelocity.x === 1 && pacmanVelocity.y == 0) {
        if (
          pacmanCurrentIndex % width < width - 1 &&
          !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
          !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
        ) {
          squares[pacmanCurrentIndex].classList.remove("pac-man");

          pacmanCurrentIndex += 1;
        }
        if (squares[pacmanCurrentIndex + 1] === squares[392]) {
          pacmanCurrentIndex = 364;
        }
      }
      if (pacmanVelocity.x === 0 && pacmanVelocity.y == 1) {
        if (
          pacmanCurrentIndex + width < width * width &&
          !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
          !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
        ) {
          squares[pacmanCurrentIndex].classList.remove("pac-man");
          pacmanCurrentIndex += width;
        }
      }

      squares[pacmanCurrentIndex].classList.add("pac-man");
      pacDotEaten();
      powerPelletEaten();
      specialDotEaten();
    }, pacmanSpeed);
  }

  // What happens when you eat a pac-dot
  function pacDotEaten() {
     if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
    score++;
    document.getElementById("eat-dot-sound").play(); 
      if (score < 50) {
        document.getElementById("score").classList.add("low-score");
      } else if (score > 100) {
        document.getElementById("score").classList.add("mid-score");
      } else if (score > 200) {
        document.getElementById("score").classList.add("high-score");
      }
      scoreDisplay.innerHTML = score;
      squares[pacmanCurrentIndex].classList.remove("pac-dot");
      totalDots--; // Decrease total dots count
      checkForWin();
    }
  }

  // What happens when you eat a power-pellet
  function powerPelletEaten() {
   if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
    score += 10;
    document.getElementById("eat-power-pellet-sound").play(); 
      ghosts.forEach((ghost) => (ghost.isScared = true));
      setTimeout(unScareGhosts, 10000);
      squares[pacmanCurrentIndex].classList.remove("power-pellet");
      totalDots--; // Decrease total dots count
      checkForWin();
    }
  }

  // What happens when you eat a special dot
  function specialDotEaten() {
    const specialDot = activeSpecialDots.find((dot) => dot.index === pacmanCurrentIndex);
  if (specialDot) {
    document.getElementById("eat-special-dot-sound").play();
      squares[pacmanCurrentIndex].classList.remove(specialDot.type.class);
      activeSpecialDots = activeSpecialDots.filter((dot) => dot.index !== pacmanCurrentIndex);

      // Get the corresponding MCQ question
      const questionIndex = specialDots.findIndex((dot) => dot.class === specialDot.type.class);
      const randomQuestion = mcqQuestions[questionIndex];
      displayMCQ(randomQuestion);

      totalDots--; // Decrease total dots count
      checkForWin();
    }
  }

  // Make the ghosts stop flashing
  function unScareGhosts() {
    ghosts.forEach((ghost) => (ghost.isScared = false));
  }

  // Create ghosts using Constructors
  class Ghost {
    constructor(className, startIndex, speed, behavior) {
      this.className = className;
      this.startIndex = startIndex;
      this.speed = speed;
      this.currentIndex = startIndex;
      this.isScared = false;
      this.timerId = NaN;
      this.behavior = behavior; // Add behavior property
    }
  }

  // All my ghosts
  ghosts = [
    new Ghost("blinky", 62, 100, "blankScreen"), // 1st ghost: blank screen for 5 sec
    new Ghost("stinky", 68, 400, "loseLifeAndPoints"), // 2nd ghost: lose life and -100 points
    new Ghost("inky", 71, 300, "loseLife"), // 3rd ghost: lose life
    new Ghost("clyde", 77, 200, "loseLifeAndRandomEffect"), // 4th ghost: lose life and random effect
  ];

  // Draw my ghosts onto the grid
  ghosts.forEach((ghost) => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add("ghost");
  });

  // Function to blank out the screen
  // function blankScreen() {
  //   const overlay = document.createElement("div");
  //   overlay.style.position = "fixed";
  //   overlay.style.top = "0";
  //   overlay.style.left = "0";
  //   overlay.style.width = "100%";
  //   overlay.style.height = "100%";
  //   overlay.style.backgroundColor = "black";
  //   overlay.style.zIndex = "1000";
  //   document.body.appendChild(overlay);

  //   setTimeout(() => {
  //     document.body.removeChild(overlay);
  //   }, 5000); // Blank screen for 5 seconds
  // }

  // Function to blank out the screen with a message and timer
// Function to blank out the screen with a message and timer
function blankScreen() {
  const overlay = document.createElement("div");
  overlay.classList.add("blackout-overlay"); // Add the new class
  overlay.innerHTML = `<div>Blackout</div><div id="blackout-timer">5</div>`;
  document.body.appendChild(overlay);

  let timeLeft = 5; // Duration of blackout in seconds
  const timerElement = document.getElementById("blackout-timer");

  const countdown = setInterval(() => {
    timeLeft--;
    timerElement.innerHTML = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdown);
      document.body.removeChild(overlay); // Remove overlay after blackout
    }
  }, 1000); // Update every second
}
  // Function to handle ghost collisions
  function handleGhostCollision(ghost) {
    if (ghost.isScared) {
      // If ghost is scared, Pac-Man can eat it
document.getElementById("eat-ghost-sound").play(); 
      squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
      ghost.currentIndex = ghost.startIndex;
      score += 100;
      squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
    } else {
document.getElementById("ghost-collision-sound").play();
      // If ghost is not scared, handle collision based on behavior
      lives--; // Lose a life
      if (lives <= 0) {
        gameOver(); // Game over if no lives left
      } else {
        switch (ghost.behavior) {
          case "blankScreen":
            blankScreen(); // Blank screen for 5 seconds
            break;
          case "loseLifeAndPoints":
            score -= 100; // Deduct 100 points
            break;
          case "loseLife":
            // Just lose a life, no additional effect
            break;
          case "loseLifeAndRandomEffect":
            // Lose a life and apply a random effect (e.g., reverse controls for 5 seconds)
            reverseControls();
            break;
        }
      }
    }
  }

  // Function to reverse Pac-Man's controls for 5 seconds
  function reverseControls() {
    const originalSetPacmanVelocity = setPacmanVelocity;
    setPacmanVelocity = function (e) {
      switch (e.keyCode) {
        case 37:
          e.keyCode = 39; // Left arrow becomes right arrow
          break;
        case 38:
          e.keyCode = 40; // Up arrow becomes down arrow
          break;
        case 39:
          e.keyCode = 37; // Right arrow becomes left arrow
          break;
        case 40:
          e.keyCode = 38; // Down arrow becomes up arrow
          break;
      }
      originalSetPacmanVelocity(e);
    };

    setTimeout(() => {
      setPacmanVelocity = originalSetPacmanVelocity; // Restore original controls after 5 seconds
    }, 5000);
  }

  // Move ghosts
  function moveGhost(ghost) {
    const directions = [-1, +1, width, -width];
    let direction = directions[Math.floor(Math.random() * directions.length)];

    ghost.timerId = setInterval(function () {
      if (isGamePaused) return; // Stop ghost movement if the game is paused

      if (
        !squares[ghost.currentIndex + direction].classList.contains("ghost") &&
        !squares[ghost.currentIndex + direction].classList.contains("wall")
      ) {
        squares[ghost.currentIndex].classList.remove(ghost.className);
        squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");
        ghost.currentIndex += direction;
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      } else {
        direction = directions[Math.floor(Math.random() * directions.length)];
      }

      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add("scared-ghost");
      }

      if (
        ghost.isScared &&
        squares[ghost.currentIndex].classList.contains("pac-man")
      ) {
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          "ghost",
          "scared-ghost"
        );
        ghost.currentIndex = ghost.startIndex;
        score += 100;
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      }

      // Check for collision with Pac-Man
      if (
        squares[ghost.currentIndex].classList.contains("pac-man") &&
        !ghost.isScared
      ) {
        handleGhostCollision(ghost);
      }

      checkForGameOver();
    }, ghost.speed);
  }

  // Check for a game over
  function checkForGameOver() {
    if (lives <= 0) {
      gameOver();
    }
  }

  // Function to handle game over
  function gameOver() {
 document.getElementById("lose-sound").play(); 
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    clearInterval(pacmanInterval);
    document.removeEventListener("keyup", setPacmanVelocity);
    pacmanVelocity.x = 0;
    pacmanVelocity.y = 0;

    // Update high score
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      document.getElementById("high-score").innerHTML = highScore;
    }

    document.getElementById("game-over-screen").style.display = "flex";
    setTimeout(function () {
      window.location.reload();
    }, 3000);
  }

  // Check for a win
  function checkForWin() {
     if (totalDots === 0) {
    document.getElementById("win-sound").play(); 
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      document.removeEventListener("keyup", setPacmanVelocity);
      pacmanVelocity.x = 0;
      pacmanVelocity.y = 0;

      // Update high score
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        document.getElementById("high-score").innerHTML = highScore;
      }

      document.getElementById("you-won-screen").style.display = "flex";
      setTimeout(function () {
        window.location.reload();
      }, 3000);
    }
  }

  // Start the game when enter is pressed
  function startGame(event) {
    if (event.keyCode === 13) {
      document.removeEventListener("keydown", startGame);
      // Remove start screen
      document.getElementById("start-screen").style.display = "none";
      generateSpecialDots();
      // Set pacman velocity and enable movement
      document.addEventListener("keyup", setPacmanVelocity);
      movePacman();
      // Move the Ghosts randomly
      ghosts.forEach((ghost) => moveGhost(ghost));
    }
  }

  document.addEventListener("keydown", startGame);
});