const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import User model

// Get user progress (unlocked levels & power-ups)
router.get("/progress/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      unlockedLevels: user.unlockedLevels,
      powerUps: user.powerUps,
      solvedLevels: user.unlockedLevels.length - 1, // All unlocked levels except level 1 are solved
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/update-progress", async (req, res) => {
  const { username, nextLevel } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.unlockedLevels.includes(nextLevel)) {
      user.unlockedLevels.push(nextLevel);
      await user.save();
    }

    res.json({ message: "Progress updated successfully", unlockedLevels: user.unlockedLevels });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
