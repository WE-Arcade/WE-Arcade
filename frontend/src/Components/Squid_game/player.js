import React, { Component } from "react";

import PlayerAliveImage from "../../Assets/alive_player_one.png";
import PlayerDeadImage from "../../Assets/dead_player_one.png";

import gameConfig from "../../Configs/game_config.json";

class Player extends Component {
  constructor(props) {
    super(props);
    const bottomPercentage = this.props.bottomPercentage || 10;
    this.state = {
      top: window.innerHeight * (1 - bottomPercentage / 100) - 130,
      is_running: false,
      imageSrc: this.props.aliveImage || PlayerAliveImage,
    };
    this.intervalId = null;
    this.timeoutId = null;
    this.stopTimeoutId = null;
    this.animationEndTimeoutId = null;

    this.animationDuration = gameConfig.player.animationDuration;
    this.toBeKilledTimeout = gameConfig.player.toBeKilledTimeout;

  }

  static defaultProps = {
    left: "50%",
    aliveImage: PlayerAliveImage,
    deadImage: PlayerDeadImage,
    bottomPercentage: 32,
  };

  startFalling = () => {
    if (!this.state.is_running) {
      const bottomPercentage = this.props.bottomPercentage || 10;
      this.setState(
        {
          is_running: true,
          top: window.innerHeight * (1 - bottomPercentage / 100) - 119,
          imageSrc: this.props.aliveImage,
        },
        () => {
          this.intervalId = setInterval(this.updatePosition, 50);

          if (this.props.to_be_killed) {
            this.timeoutId = setTimeout(() => {
              this.stopFalling();
              this.setState({ imageSrc: this.props.deadImage });
            }, this.toBeKilledTimeout);
          } else {
            this.stopTimeoutId = setTimeout(() => {
              this.setState({ imageSrc: this.props.aliveImage });
              this.startFalling();
            }, 2000);
          }

          this.animationEndTimeoutId = setTimeout(() => {
            this.stopFalling();
          }, this.animationDuration);
        }
      );
    }
  };

  stopFalling = () => {
    if (this.state.is_running) {
      this.setState({ is_running: false }, () => {
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutId);
        clearTimeout(this.stopTimeoutId);
        clearTimeout(this.animationEndTimeoutId);
      });
    }
  };

  updatePosition = () => {
    this.setState((prevState) => ({
      top: prevState.top - 5,
    }));
  };

  componentWillUnmount() {
    clearInterval(this.intervalId);
    clearTimeout(this.timeoutId);
    clearTimeout(this.stopTimeoutId);
    clearTimeout(this.animationEndTimeoutId);
  }

  render() {
    const { left } = this.props;
    const imageStyle = {
      position: "relative",
      top: `${this.state.top}px`,
      left: left,
      transform: "translateX(-50%)",
      width: "56px",
      height: "119px",
    };

    return (
      <div>
        <img
          src={this.state.imageSrc}
          alt="falling object"
          style={imageStyle}
        />
      </div>
    );
  }
}

export default Player;