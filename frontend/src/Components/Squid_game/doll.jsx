import React, { Component } from "react";

import DollPlayerFacingImage from "../../Assets/doll_player_facing.png";
import DollWallFacingImage from "../../Assets/doll_wall_facing.png";

import gameConfig from "../../Configs/game_config.json";

class Doll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player_facing: false,
    };

    this.turnTimeout = null;
    this.moveInterval = gameConfig.doll.moveInterval;
    this.freezeInterval = gameConfig.doll.freezeInterval;
  }

  turn = () => {
    this.setState((prevState) => ({
      player_facing: !prevState.player_facing,
    }));
  };

  turnAfterDelay = () => {
    if (this.turnTimeout) {
      clearTimeout(this.turnTimeout);
    }

    this.turnTimeout = setTimeout(() => {
      this.turn();
      this.turnTimeout = null;
    }, this.moveInterval);

    this.turnTimeout = setTimeout(() => {
      this.turn();
      this.turnTimeout = null;
    }, this.moveInterval + this.freezeInterval);

    this.turnTimeout = setTimeout(() => {
      this.turn();
      this.turnTimeout = null;
    }, 2 * this.moveInterval + this.freezeInterval);
  };

  // componentDidMount() {
  //   this.turnAfterDelay();
  // }

  componentWillUnmount() {
    if (this.turnTimeout) {
      clearTimeout(this.turnTimeout);
    }
  }

  render() {
    return (
      <img
        src={
          this.state.player_facing ? DollPlayerFacingImage : DollWallFacingImage
        }
        height="100%"
        alt="Doll"
      />
    );
  }
}

export default Doll;