const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config(); // Load .env file

const User = require("./models/User");

// Make sure MONGO_URI is defined
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("MONGO_URI is not set in .env file");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
