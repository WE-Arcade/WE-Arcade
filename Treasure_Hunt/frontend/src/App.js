import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext"; // Import Game Context
import StoryPage from "./components/StoryPage";
import LoginPage from "./components/Login";
import LevelsPage from "./components/LevelsPage";
import LevelCompletePage from "./components/LevelCompletePage";
import RiddlePage from "./components/RiddlePage";
import MiniGamesMenuPage from "./components/MiniGamesMenuPage";
import DSAgame from "./components/minigames/DSAgame";
import Bitwisegame from "./components/minigames/Bitwisegame";
import LoopRunner from "./components/minigames/LoopRunner";
import SQLgame from "./components/minigames/SQLgame"
import CryptogramGame from "./components/minigames/Cryptogram";
import FinalLevelCompletePage from "./components/FinalLevelCompletePage";



function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/story-page" element={<StoryPage />} />
          <Route path="/levels-page" element={<LevelsPage />} />
          <Route path="/riddle/:level" element={<RiddlePage />} />
          <Route path="/level-complete/:level" element={<LevelCompletePage />} />
          <Route path="/mini-games-menu" element={<MiniGamesMenuPage />} />
          <Route path="/mini-game/dsa-game" element={<DSAgame />} />
          <Route path="/mini-game/bitwise-game" element={<Bitwisegame />} />
          <Route path="/mini-game/loop-runner" element={<LoopRunner />} />
          <Route path="/mini-game/sql-query" element={<SQLgame />} />
          <Route path="/mini-game/crypto" element={<CryptogramGame/>} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/final-level-complete" element={<FinalLevelCompletePage />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
