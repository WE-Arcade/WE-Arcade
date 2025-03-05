const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// MongoDB User Model
const User = require("./models/User");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function addUser() {
  const username = "testuser1";
  const password = "testpassword1";

  // ✅ Default game progress
  const unlockedLevels = [1]; // Start with Level 1 unlocked
  const powerUps = 0; // Start with no power-ups

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create and save user
  try {
    const newUser = new User({ username, password: hashedPassword, unlockedLevels, powerUps });
    await newUser.save();
    console.log("User added successfully with levels and power-ups");
  } catch (error) {
    console.error("Error adding user:", error);
  } finally {
    mongoose.disconnect();
  }
}

// Run function
addUser();
