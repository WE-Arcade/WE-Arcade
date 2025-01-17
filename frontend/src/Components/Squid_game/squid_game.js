import React, { Component } from 'react';

import Doll from "./doll.js";
import Guard from "./guard.js";
import Player from "./player.js";

function PlayGroundTopSection(){
    return (
        <div style={{backgroundColor: '#FFFFFF',
                    height: '20vh',
                    width: '80%',
                    position: 'relative',
                    marginTop: '50px',
                    display: 'flex',
                    justifyContent: 'center'}}>
            <Guard />
            <Doll />
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




function SquidGame() {
    return (
        <>
            <div style={{
                backgroundColor: '#E8D897D1',
                height: '100vh',  // 100% height of the viewport
                width: '30%',      // 30% width
                position: 'absolute', // Ensures it's positioned on the left
                left: 0,            // Aligns it to the left side
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                
                <PlayGroundTopSection/>
                <BoundaryLine Customstyle={{marginTop: "35px"}}/>
                <BoundaryLine Customstyle={{marginTop: "auto", marginBottom: "35px"}}/>
            </div>
        </>
    );
}

export default SquidGame;
