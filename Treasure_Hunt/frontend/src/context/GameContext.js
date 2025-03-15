import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [unlockedLevels, setUnlockedLevels] = useState([1]); // Default Level 1 unlocked
  const [solvedLevels, setSolvedLevels] = useState([]);
  const [powerUps, setPowerUps] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // Fetch user progress when username changes
  useEffect(() => {
    if (!username) return;

    const fetchUserProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/progress/${username}`);
        setUnlockedLevels(response.data.unlockedLevels || [1]);
        setPowerUps(response.data.powerUps || 0);
        setSolvedLevels(response.data.solvedLevels || []);
      } catch (error) {
        console.error("Error fetching user progress:", error);
      }
    };

    fetchUserProgress();
  }, [username]); // Runs every time username changes

  // Set username when user logs in
  const loginUser = (newUsername) => {
    localStorage.setItem("username", newUsername);
    setUsername(newUsername); // Triggers useEffect
  };

  // Update power ups and save to database
  const updatePowerUps = async (newValue) => {
    setPowerUps(newValue);
    
    if (username) {
      try {
        await axios.post("http://localhost:5000/api/users/update-powerups", {
          username,
          powerUps: newValue
        });
      } catch (error) {
        console.error("Error updating powerups:", error);
      }
    }
  };

  // Unlock next level and update DB
  const unlockNextLevel = async (nextLevel) => {
    setUnlockedLevels((prevLevels) => {
      if (!Array.isArray(prevLevels)) prevLevels = [];
      if (!prevLevels.includes(nextLevel)) {
        const updatedLevels = [...prevLevels, nextLevel];
        localStorage.setItem("unlockedLevels", JSON.stringify(updatedLevels));
        return updatedLevels;
      }
      return prevLevels;
    });

    setSolvedLevels((prev) => (Array.isArray(prev) ? [...prev, nextLevel - 1] : [nextLevel - 1]));

    try {
      await axios.post("http://localhost:5000/api/users/update-progress", {
        username,
        nextLevel,
      });
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <GameContext.Provider 
      value={{ 
        username, 
        unlockedLevels, 
        solvedLevels, 
        powerUps, 
        setPowerUps: updatePowerUps, 
        unlockNextLevel, 
        loginUser,
        answeredQuestions,
        setAnsweredQuestions
      }}
    >
      {children}
    </GameContext.Provider>
  );
};