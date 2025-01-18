import React, { Component, useRef } from "react";

import Doll from "./doll.js";
import Guard from "./guard.js";
import PlayerRow from "./player_row.js";


function PlayGroundTopSection({dollRef}){
    return (
        <div style={{backgroundColor: '#FFFFFF',
                    height: '20vh',
                    width: '80%',
                    position: 'relative',
                    marginTop: '30px',
                    display: 'flex',
                    justifyContent: 'center'}}>
            <Guard />
            <Doll ref={dollRef} />
            <Guard />
            
        </div>
    )
}


function BoundaryLine({ Customstyle }) {
    const defaultStyle = {
        width: "95%",
        height: "5px",
        backgroundColor: "#2E8F46"
    };

    const combinedStyle = { ...defaultStyle, ...Customstyle };

    return <div style={combinedStyle}></div>;
}




const toBeKilledArray = [true, false, true, false, true];

function SquidGame() {
    const playerRowRef = useRef(null);
    const dollRef = useRef(null);

    const startGame = () => {
        if (playerRowRef.current) {
            playerRowRef.current.startFallingAllPlayers();
        }
        if (dollRef.current) {
            dollRef.current.turnRegularly(5000);
        }
    };


    return (
        <>
            <div style={{
                backgroundColor: '#E8D897D1',
                height: '100vh',
                width: '30%',
                position: 'absolute',
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                
                <PlayGroundTopSection dollRef={dollRef}/>
                <BoundaryLine Customstyle={{marginTop: "35px"}}/>
                <PlayerRow ref={playerRowRef} toBeKilledArray={toBeKilledArray} />
                <button onClick={startGame}>Start Game</button>
                <BoundaryLine Customstyle={{marginTop: "auto", marginBottom: "35px"}}/>
            </div>
        </>
    );
}

export default SquidGame;
