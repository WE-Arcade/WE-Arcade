import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sound from "react-sound";
import "./Login.css";
import buttonClickSound from "../assets/sound-effects/button-click.mp3";

const LandingPage = () => {
  const navigate = useNavigate();
  const [playButtonSound, setPlayButtonSound] = useState(false);

  const handleStart = () => {
    setPlayButtonSound(true);
    setTimeout(() => {
      navigate("/story-page");
    }, 500);
  };

  return (
    <div className="landing-page">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="welcome-message">Welcome to Treasure Hunt!</h1>
        <p className="description">
          Embark on an exciting adventure to uncover hidden treasures and solve challenging puzzles. Are you ready to prove your skills and claim the ultimate prize?
        </p>
        <button className="start-button" onClick={handleStart}>
          Claim the Treasure!
        </button>
      </div>
      <Sound
        url={buttonClickSound}
        playStatus={playButtonSound ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={() => setPlayButtonSound(false)}
        volume={100}
      />
    </div>
  );
};

export default LandingPage;