import React, { Component } from "react";
import PlayerAliveImage from '../../Assets/alive_player_one.png';
import PlayerDeadImage from '../../Assets/dead_player_one.png';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: window.innerHeight - 130,
      is_running: false,
      imageSrc: this.props.aliveImage || PlayerAliveImage,
    };
    this.intervalId = null;
    this.timeoutId = null;
    this.stopTimeoutId = null;
  }

  static defaultProps = {
    left: "50%", // Default left position of the image (can be overridden)
    animationDuration: 5000, // Default animation duration in milliseconds (can be overridden)
    toBeKilledTimeout: 2000, // Default timeout for changing the image (can be overridden)
    aliveImage: PlayerAliveImage, // Default alive player image
    deadImage: PlayerDeadImage, // Default dead player image
  };

  startFalling = () => {
    if (!this.state.is_running) {
      this.setState({ is_running: true, top: window.innerHeight - 119, imageSrc: this.props.aliveImage }, () => {
        this.intervalId = setInterval(this.updatePosition, 50);

        if (this.props.to_be_killed) {
          this.timeoutId = setTimeout(() => {
            this.stopFalling();
            this.setState({ imageSrc: this.props.deadImage });
          }, this.props.toBeKilledTimeout);
        }

        this.stopTimeoutId = setTimeout(() => {
          this.stopFalling();
        }, this.props.animationDuration);
      });
    }
  };

  stopFalling = () => {
    if (this.state.is_running) {
      this.setState({ is_running: false }, () => {
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutId);
        clearTimeout(this.stopTimeoutId);
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
        <img src={this.state.imageSrc} alt="falling object" style={imageStyle} />
        {/* <button onClick={this.startFalling}>Start</button> */}
      </div>
    );
  }
}

export default Player;
