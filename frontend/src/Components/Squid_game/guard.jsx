import React from 'react';
import GuardImage from "../../Assets/guard_image.png";

function Guard(){
    return(
        <div style={{height: "100%",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
            <img src={GuardImage} height="50%" style={{display: 'block'}} alt="Guard"/>
        </div>
    )
}

export default Guard;
