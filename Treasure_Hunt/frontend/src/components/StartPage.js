import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';  // Importing the CSS file

function StartPage() {
  const navigate = useNavigate();

  const goToStoryPage = () => {
    navigate('/story-page');
  };

  return (
    <div className="start-page-container">
    <div className="overlay"></div>  {/* Dark overlay on the background */}
    <div className="hero-container">
      {/* Map Image at Top Left */}
      <img src="/images/map.png" alt="Map" className="map-image" />


      <h1 className='welcome-message pt-serif-bold'>Treasure Hunt</h1>
    
      <button className="go-button pt-serif-regular-italic" onClick={goToStoryPage}>
        Start!
      </button>

      {/* Treasure Box at Bottom Right */}
      <img src="/images/treasure.png" alt="Treasure Box" className="treasure-box" />
    </div>
  </div>
);
}

export default StartPage;