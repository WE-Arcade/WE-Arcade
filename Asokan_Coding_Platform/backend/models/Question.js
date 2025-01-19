const mongoose = require("mongoose");

const TestCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
});

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  testCases: [TestCaseSchema],  // Array of test cases
  totalTestCases: { type: Number, required: true },
});

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
