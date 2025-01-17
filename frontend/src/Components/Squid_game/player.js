import React, { Component } from "react";
import PlayerAliveImage from "../../Assets/alive_player_one.png";
import PlayerDeadImage from "../../Assets/dead_player_one.png";

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
    this.animationEndTimeoutId = null; // Added to handle the animation duration timeout
  }

  static defaultProps = {
    left: "50%",
    animationDuration: 5000, // total duration of the animation
    toBeKilledTimeout: 2000,
    aliveImage: PlayerAliveImage,
    deadImage: PlayerDeadImage,
    bottomPercentage: 10,
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

          // Check if the player is to be killed
          if (this.props.to_be_killed) {
            this.timeoutId = setTimeout(() => {
              this.stopFalling();
              this.setState({ imageSrc: this.props.deadImage });
            }, this.props.toBeKilledTimeout);
          } else {
            // If not to be killed, stop for a certain time and then continue falling
            this.stopTimeoutId = setTimeout(() => {
              this.setState({ imageSrc: this.props.aliveImage });
              this.startFalling();  // Restart the falling process
            }, 2000); // Stop for 2 seconds before moving again (you can adjust this value)
          }

          // Handle animation duration stop
          this.animationEndTimeoutId = setTimeout(() => {
            this.stopFalling();  // Stop falling after the animation duration
          }, this.props.animationDuration); // Stop after the specified animation duration
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
        clearTimeout(this.animationEndTimeoutId); // Clear the animation end timeout
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
    clearTimeout(this.animationEndTimeoutId); // Clean up the timeout on unmount
  }

  render() {
    const { left } = this.props;
    const imageStyle = {
      position: "relative",
      top: `${this.state.top}px`,
      left: left, // Using dynamic left value from props
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
