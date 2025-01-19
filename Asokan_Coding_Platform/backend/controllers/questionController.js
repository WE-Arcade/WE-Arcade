const Question = require("../models/Question");

// Get all questions
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new question
const createQuestion = async (req, res) => {
  const { title, description, testCases } = req.body;
  try {
    const question = new Question({ title, description, testCases });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getQuestions, createQuestion };
