const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  unlockedLevels: { type: [Number], default: [1] }, // Default to level 1
  powerUps: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", UserSchema);
