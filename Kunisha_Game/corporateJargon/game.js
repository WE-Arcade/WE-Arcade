class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
    }

    create() {
        this.add.text(400, 100, "Select Level", { fontSize: "40px", fill: "#ffffff", fontFamily: "Arial" }).setOrigin(0.5);

        for (let i = 1; i <= 4; i++) {
            let levelBox = this.add.rectangle(400, 200 + i * 80, 250, 70, 0x2196F3).setOrigin(0.5).setInteractive();
            let levelText = this.add.text(400, 200 + i * 80, `LEVEL ${i}`, { fontSize: "28px", fill: "#ffffff" }).setOrigin(0.5);
            levelBox.on("pointerdown", () => this.scene.start("QuizScene", { level: i }));
        }
    }
}

class QuizScene extends Phaser.Scene {
    constructor() {
        super("QuizScene");
    }

    init(data) {
        this.level = data.level;
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0; // Track correct answers
        this.questions = [];
    }

    async create() {
        this.add.text(300, 50, `Level ${this.level} Quiz`, { fontSize: "24px", fill: "#fff" });

        try {
            const response = await fetch(`http://localhost:3000/questions/${this.level}`);
            this.questions = await response.json();

            if (this.questions.length > 0) {
                this.showQuestion();
            } else {
                this.add.text(300, 200, "No questions found!", { fontSize: "24px", fill: "#f00" });
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
            this.add.text(300, 200, "Failed to load questions!", { fontSize: "24px", fill: "#f00" });
        }
        
        this.createExitButton();  // Ensure the exit button is always present
    }

    showQuestion() {
        this.clearScene();

        if (this.currentQuestionIndex >= this.questions.length) {
            this.scene.start("QuizCompletedScene", {
                score: this.correctAnswers,
                total: this.questions.length
            });
            return;
        }

        const questionData = this.questions[this.currentQuestionIndex];

        // Question Box
        let questionBox = this.add.rectangle(400, 100, 700, 100, 0xFFD700).setOrigin(0.5);
        
        this.add.text(150, 70, `QUESTION:\n${questionData.question}`, { 
            fontSize: "18px", 
            fill: "#000", 
            fontStyle: "bold", 
            wordWrap: { width: 600 }  
        });

        this.answerBoxes = [];
        this.correctAnswerIndex = questionData.options.findIndex(option => option.trim() === questionData.answer.trim());

        questionData.options.forEach((option, index) => {
            let yPos = 200 + index * 80;
            let optionBox = this.add.rectangle(400, yPos, 600, 60, 0xAABEFF).setOrigin(0.5);
            let optionText = this.add.text(250, yPos - 10, `⚫ ${option}`, { fontSize: "16px", fill: "#000", fontStyle: "bold" })
                .setInteractive()
                .on("pointerdown", () => this.checkAnswer(index, optionBox));
            
            this.answerBoxes.push(optionBox);
        });

        this.createExitButton();
        this.createNavigationButtons();
    }

    checkAnswer(selectedIndex, selectedBox) {
        if (selectedIndex === this.correctAnswerIndex) {
            selectedBox.setFillStyle(0xA0E5A0);
            this.correctAnswers++;  // Increase correct answer count
            setTimeout(() => this.nextQuestion(), 1000);
        } else {
            selectedBox.setFillStyle(0xE5A0A0);
            this.answerBoxes[this.correctAnswerIndex].setFillStyle(0xA0E5A0);
            this.nextButton.setVisible(true);
            this.nextButtonText.setVisible(true);
        }
    }

    createNavigationButtons() {
        if (this.currentQuestionIndex > 0) {
            let backButton = this.add.rectangle(200, 500, 120, 50, 0x6A5ACD).setOrigin(0.5);
            this.add.text(170, 490, "⬅ Back", { fontSize: "18px", fill: "#fff" })
                .setInteractive()
                .on("pointerdown", () => {
                    this.currentQuestionIndex--;
                    this.showQuestion();
                });
        }

        this.nextButton = this.add.rectangle(600, 500, 120, 50, 0x6A5ACD).setOrigin(0.5);
        this.nextButtonText = this.add.text(570, 490, "Next ➡", { fontSize: "18px", fill: "#fff" })
            .setInteractive()
            .on("pointerdown", () => this.nextQuestion());

        this.nextButton.setVisible(false);
        this.nextButtonText.setVisible(false);
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.showQuestion();
        } else {
            this.scene.start("QuizCompletedScene", {
                score: this.correctAnswers,
                total: this.questions.length
            });
        }
    }

    clearScene() {
        this.children.removeAll();
    }

    createExitButton() {
        this.add.text(25,25, "Exit Quiz", { fontSize: "18px", fill: "#fff" })
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("MainMenu");
            });
    }
}

// NEW SCENE FOR QUIZ COMPLETION
class QuizCompletedScene extends Phaser.Scene {
    constructor() {
        super("QuizCompletedScene");
    }

    init(data) {
        this.score = data.score || 0;
        this.total = data.total || 0;
    }

    create() {
        this.add.text(400, 100, "QUIZ COMPLETED!", { fontSize: "40px", fill: "#ffffff" }).setOrigin(0.5);
        this.add.text(400, 200, `Your Score: ${this.score} / ${this.total}`, { fontSize: "28px", fill: "#00ff00" }).setOrigin(0.5);

        let exitButton = this.add.rectangle(400, 400, 200, 60, 0xFF4500).setOrigin(0.5).setInteractive();
        let exitText = this.add.text(exitButton.x - 80, exitButton.y - 10, "Exit to Menu", { fontSize: "20px", fill: "#ffffff" });
        
        exitButton.on("pointerdown", () => {
            this.scene.start("MainMenu");
        });
    }
}

// Phaser Config
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#000000",
    scene: [MainMenu, QuizScene, QuizCompletedScene] // Added QuizCompletedScene
};

const game = new Phaser.Game(config);
