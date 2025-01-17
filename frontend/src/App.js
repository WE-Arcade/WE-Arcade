// App.js
import React, { useRef } from "react";
import Squid_game from './Components/Squid_game/squid_game.js'; // Adjust path if needed


const App = () => {
    const playerRef = useRef();
  
    const handleStartFalling = () => {
      if (playerRef.current) {
        playerRef.current.startFalling();
      }
    };
  
    return (
      <div>
        <Squid_game/>
      </div>
    );
  };
  
  export default App;