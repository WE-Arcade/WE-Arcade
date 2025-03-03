const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected!"))
.catch(err => console.log("MongoDB Connection Error:", err));

// Question schema and model
const QuestionSchema = new mongoose.Schema({
  level: Number,
  question: String,
  options: [String],
  answer: String,
});

const Question = mongoose.model("Question", QuestionSchema);


app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/assets", express.static(path.join(__dirname, "assets")));

// API route to fetch questions by level
app.get("/questions/:level", async (req, res) => {
  try {
    const questions = await Question.find({ level: req.params.level });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));