const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Question = require("./models/Question");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/Coding_Platform", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Sample questions with more test cases
const sampleQuestions = [
  {
    title: "Palindrome Checker",
    description:
      "Write a program to check if a given string is a palindrome. A palindrome is a word, phrase, number, or other sequence of characters that reads the same backward as forward.",
    testCases: [
      { input: '"racecar"', output: "true" },
      { input: '"hello"', output: "false" },
      { input: '"madam"', output: "true" },
      { input: '"world"', output: "false" },
      { input: '"level"', output: "true" },
      { input: '"python"', output: "false" },
      { input: '"noon"', output: "true" },
      { input: '"data"', output: "false" },
      { input: '"civic"', output: "true" },
      { input: '"code"', output: "false" },
      { input: '"mom"', output: "true" },
      { input: '"dad"', output: "true" },
      { input: '"madamimadam"', output: "true" },
      { input: '"race"', output: "false" },
      { input: '"notapalindrome"', output: "false" },
    ],
    totalTestCases: 15,
  },
  {
    title: "Factorial Calculator",
    description: "Write a program to calculate the factorial of a given number.",
    testCases: [
      { input: "5", output: "120" },
      { input: "0", output: "1" },
      { input: "3", output: "6" },
      { input: "7", output: "5040" },
      { input: "10", output: "3628800" },
      { input: "2", output: "2" },
      { input: "4", output: "24" },
      { input: "1", output: "1" },
      { input: "6", output: "720" },
      { input: "9", output: "362880" },
      { input: "11", output: "39916800" },
      { input: "12", output: "479001600" },
      { input: "13", output: "6227020800" },
      { input: "14", output: "87178291200" },
      { input: "15", output: "1307674368000" },
      { input: "16", output: "20922789888000" },
      { input: "17", output: "355687428096000" },
    ],
    totalTestCases: 17,
  },
];

// Populate the database with sample data (if not already populated)
const populateQuestions = async () => {
  try {
    const existingQuestions = await Question.countDocuments();
    if (existingQuestions === 0) {
      await Question.insertMany(sampleQuestions);
      console.log("Sample questions added to database.");
    }
  } catch (error) {
    console.error("Error populating questions:", error);
  }
};

populateQuestions();

// Get random question from database
app.get("/api/questions/random", async (req, res) => {
  try {
    const question = await Question.aggregate([{ $sample: { size: 1 } }]); // Random question
    if (question.length > 0) {
      res.json(question[0]);
    } else {
      res.status(404).json({ message: "No question found" });
    }
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ message: "Error fetching question" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
