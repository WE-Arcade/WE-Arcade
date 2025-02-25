import React, { useRef } from "react";

import PlayGroundTopSection from "./playground_top_section.jsx";
import PlayerRow from "./player_row.jsx";
import BoundaryLine from "./boundary_line.jsx";

import dollAudioFile from "../../Assets/squid_game_doll_audio.mp3";

const toBeKilledArray = [true, false, true, false, true];

function SquidGame() {
  const playerRowRef = useRef(null);
  const dollRef = useRef(null); // Ref for the Doll component

  const playAudio = (audioFileUrl) => {
    const audio = new Audio(audioFileUrl);

    // Play the audio
    audio.play().catch((error) => {
      console.error("Failed to play the audio:", error);
    });

    // When the first audio finishes, play it again
    audio.onended = () => {
      const audio2 = new Audio(audioFileUrl);
      audio2.play().catch((error) => {
        console.error("Failed to play the second audio:", error);
      });
    };
  };

  const startGame = () => {
    playAudio(dollAudioFile); // Play audio twice in sequence

    if (playerRowRef.current) {
      playerRowRef.current.startFallingAllPlayers();
    }
    if (dollRef.current) {
      console.log("Triggering doll turn...");
      dollRef.current.turnAfterDelay();
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#E8D897D1",
        height: "100vh",
        width: "50%",
        position: "absolute",
        left: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PlayGroundTopSection dollRef={dollRef} /> {/* Pass dollRef to PlayGroundTopSection */}
      <BoundaryLine Customstyle={{ marginTop: "35px" }} />
      <PlayerRow ref={playerRowRef} toBeKilledArray={toBeKilledArray} />
      <button onClick={startGame}>Start Game</button>
      <BoundaryLine Customstyle={{ marginTop: "auto", marginBottom: "35px" }} />
    </div>
  );
}

export default SquidGame;
