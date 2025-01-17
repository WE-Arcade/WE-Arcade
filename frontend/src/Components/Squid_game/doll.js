import React, { Component } from 'react';

import DollPlayerFacingImage from "../../Assets/doll_player_facing.png";
import DollWallFacingImage from "../../Assets/doll_wall_facing.png";

class Doll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            player_facing: false,
        };
    }

    turn = () => {
        this.setState(prevState => ({
            player_facing: !prevState.player_facing
        }));
    };

    render() {
        console.log(this.state.player_facing);
        return (
            <>
                {/* Render the image based on the value of facing_players */}
                <img 
                    src={this.state.player_facing ? DollPlayerFacingImage : DollWallFacingImage} 
                    height="100%" 
                    alt="Doll"
                />
                {/* Button to toggle the state */}
                {/* <button onClick={this.turn}>Turn</button> */}
            </>
        );
    }
}

export default Doll;