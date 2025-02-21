const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected!"))
.catch(err => console.log("MongoDB Connection Error:", err));
const QuestionSchema = new mongoose.Schema({
  level: Number,
  question: String,
  options: [String],
  answer: String,
});

const Question = mongoose.model("Question", QuestionSchema);

// Route to fetch questions by level
app.get("/questions/:level", async (req, res) => {
  const questions = await Question.find({ level: req.params.level });
  res.json(questions);
});

app.listen(3000, () => console.log("Server running on port 3000"));
