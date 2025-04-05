import React, { Component } from "react";
import PropTypes from "prop-types";

import PlayerAliveImage from "../../Assets/alive_player_one.png";
import PlayerDeadImage from "../../Assets/dead_player_one.png";

import gameConfig from "../../Configs/game_config.json";

class Player extends Component {
  constructor(props) {
    super(props);

    const bottomPercentage = props.bottomPercentage || Player.defaultProps.bottomPercentage;

    this.state = {
      top: window.innerHeight * (1 - bottomPercentage / 100) - 130, // Adjust based on player dimensions
      is_running: false,
      imageSrc: props.aliveImage,
    };

    this.timers = []; // Array to track all timeouts/intervals
    this.isPaused = false; // Flag to track if player is paused
    this.animationDuration = gameConfig.player.animationDuration;
    this.toBeKilledTimeout = gameConfig.player.toBeKilledTimeout;
    this.pauseDuration = gameConfig.player.pauseDuration;
    this.continueFallingDuration = gameConfig.player.continueFallingDuration; // New duration after unpause
    this.updatePosVal = gameConfig.player.updatePosVal;
  }

  static defaultProps = {
    left: "50%",
    aliveImage: PlayerAliveImage,
    deadImage: PlayerDeadImage,
    bottomPercentage: 0,
    to_be_killed: false,
  };

  clearAllTimersAndIntervals = () => {
    this.timers.forEach(clearTimeout);
    this.timers.forEach(clearInterval);
    this.timers = [];
  };

  startFalling = () => {
    if (!this.state.is_running) {
      const bottomPercentage = this.props.bottomPercentage || Player.defaultProps.bottomPercentage;

      this.setState(
        {
          is_running: true,
          top: window.innerHeight * (1 - bottomPercentage / 100) - 119,
          imageSrc: this.props.aliveImage,
        },
        () => {
          if (this.props.to_be_killed) {
            // Player is marked to be killed
            this.startFallingInterval();
            this.timers.push(
              setTimeout(() => {
                this.stopFalling();
                this.setState({ imageSrc: this.props.deadImage });
              }, this.toBeKilledTimeout)
            );
          } else {
            // Player is alive
            this.startFallingInterval();

            // Pause falling after toBeKilledTimeout
            this.timers.push(
              setTimeout(() => {
                this.stopFallingInterval();
                this.isPaused = true;

                // Ensure no further movement happens during pause
                this.setState({ imageSrc: this.props.aliveImage });

                // Resume falling after pauseDuration
                this.timers.push(
                  setTimeout(() => {
                    if (this.state.is_running) {
                      this.isPaused = false;
                      this.startFallingInterval();

                      // Stop falling after a certain time (continueFallingDuration)
                      this.timers.push(
                        setTimeout(() => {
                          this.stopFalling(); // Stop falling after continueFallingDuration
                        }, this.continueFallingDuration)
                      );
                    }
                  }, this.pauseDuration)
                );
              }, this.toBeKilledTimeout)
            );
          }

          // Stop all movement after animationDuration
          this.timers.push(
            setTimeout(() => {
              this.stopFalling(); // Ensures everything is stopped
            }, this.animationDuration)
          );
        }
      );
    }
  };

  startFallingInterval = () => {
    // Check if the player is not paused and still running
    if (!this.isPaused && this.state.is_running) {
      this.timers.push(setInterval(this.updatePosition, this.updatePosVal - 50));
    }
  };

  stopFallingInterval = () => {
    // Clear intervals to stop the falling movement
    this.timers = this.timers.filter((timer) => {
      clearInterval(timer);
      return false;
    });
  };

  stopFalling = () => {
    if (this.state.is_running) {
      this.setState({ is_running: false }, () => {
        this.clearAllTimersAndIntervals();
      });
    }
  };

  updatePosition = () => {
    this.setState((prevState) => ({
      top: prevState.top - 5, // Adjust falling speed here
    }));
  };

  componentWillUnmount() {
    this.clearAllTimersAndIntervals();
  }

  render() {
    const { left } = this.props;
    const { top, imageSrc } = this.state;

    const imageStyle = {
      position: "absolute",
      top: `${top}px`,
      left: left,
      transform: "translateX(-50%)",
      width: "56px",
      height: "119px",
    };

    return (
      <div>
        <img
          src={imageSrc}
          alt="falling player"
          style={imageStyle}
        />
      </div>
    );
  }
}

Player.propTypes = {
  left: PropTypes.string,
  aliveImage: PropTypes.string,
  deadImage: PropTypes.string,
  bottomPercentage: PropTypes.number,
  to_be_killed: PropTypes.bool,
};

export default Player;
