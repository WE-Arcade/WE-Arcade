import React, { Component, useRef } from "react";

import Doll from "./doll.js";
import Guard from "./guard.js";

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

export default PlayGroundTopSection;