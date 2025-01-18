import React, { Component } from "react";

import DollPlayerFacingImage from "../../Assets/doll_player_facing.png";
import DollWallFacingImage from "../../Assets/doll_wall_facing.png";

class Doll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player_facing: false,
    };

    this.turnInterval = null;
  }

  turn = () => {
    this.setState((prevState) => ({
      player_facing: !prevState.player_facing,
    }));
  };

  turnRegularly = (interval) => {
    if (this.turnInterval) {
      clearInterval(this.turnInterval);
    }
    
    this.turnInterval = setInterval(() => {
      this.turn();
    }, interval);
  };

  render() {
    return (
      <>
        <img
          src={
            this.state.player_facing
              ? DollPlayerFacingImage
              : DollWallFacingImage
          }
          height="100%"
          alt="Doll"
        />
      </>
    );
  }
}

export default Doll;
