import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sound from 'react-sound';
import './StartPage.css';
import bgMusic from "../assets/sound-effects/main-bg-music.mp3";
import buttonClickSound from "../assets/sound-effects/button-click.mp3";

function StoryPage() {
  const navigate = useNavigate();
  const [playBackgroundMusic, setPlayBackgroundMusic] = useState(false);
  const [playButtonSound, setPlayButtonSound] = useState(false);

  useEffect(() => {
    setPlayBackgroundMusic(true);
  }, []);

  const goToLevelsPage = () => {
    setPlayButtonSound(true);
    setTimeout(() => {
      navigate('/levels-page');
    }, 500);
  };

  return (
    <div className="start-page-container">
      <div className="overlay"></div> 
      <div className="hero-container">
        <img src="/images/map.png" alt="Map" className="map-image" />

        <h1 className='welcome-message pt-serif-bold'>Journey to Sphoorthy's Vault!</h1>
        <p className="story-text">
          Long ago, a wise mentor named Sphoorthy foresaw a time when true wisdom would be needed to guide the world. 
          To protect her greatest knowledge, she locked it away in a magical treasure vault in the legendary Land of Enlightenment.
        </p>
        <p className="story-text">
          She filled the land with puzzles and challenges to ensure only the most determined and clever seekers could unlock the vault. 
          Now, as a treasure hunter, your mission is to explore the land, solve puzzles, and complete tasks to prove your worth.
        </p>
        <p className="story-text">
          Unlocking the vault will grant you Sphoorthy's ultimate treasure: her timeless wisdom, which holds the power to enlighten and guide those who seek it.
        </p>
        <p className="glowing-text">
          Sphoorthy's spirit watches over you, offering cryptic hints and special tasks when needed.
        </p>
        <button className="go-button" onClick={goToLevelsPage}>
          Begin Your Quest
        </button>
        <img src="/images/treasure.png" alt="Treasure Box" className="treasure-box" />
      </div>
      <Sound
        url={bgMusic}
        playStatus={playBackgroundMusic ? Sound.status.PLAYING : Sound.status.STOPPED}
        loop={true}
        volume={50}
      />
      <Sound
        url={buttonClickSound}
        playStatus={playButtonSound ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={() => setPlayButtonSound(false)}
        volume={100}
      />
    </div>
  );
}

export default StoryPage;