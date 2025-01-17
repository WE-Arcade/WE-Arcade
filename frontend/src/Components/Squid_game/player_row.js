import React, { useRef } from "react";
import Player from "./player.js";

const PlayerRow = ({ toBeKilledArray }) => {
  const playerRefs = useRef([]); // Array of refs for multiple Player instances

  const handleStartFalling = () => {
    // Trigger the startFalling method for each Player instance
    playerRefs.current.forEach((ref) => {
      if (ref) {
        ref.startFalling();
      }
    });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {toBeKilledArray.map((toBeKilled, index) => (
          <Player
            key={index}
            left={`${10 + index * 15}%`} // Adjust positions dynamically
            animationDuration={5000}
            toBeKilledTimeout={2000}
            bottomPercentage={32}
            to_be_killed={toBeKilled} // Pass value from the toBeKilledArray
            ref={(el) => (playerRefs.current[index] = el)} // Assign ref to each Player
          />
        ))}
      </div>
      <button onClick={handleStartFalling}>Start Game</button>
    </>
  );
};

export default PlayerRow;
