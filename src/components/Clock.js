import React from "react";

class Clock extends React.Component {
  constructor() {
    super();
    this.startRoundTime = undefined;
  }
  state = {
    minutes: "00",
    secundes: "00",
    buttonStart: false,
    buttonReset: true
  };

  addZero = n => {
    if (+n > 9) return n;
    return "0" + n;
  };

  backCounter = () => {
    let secundes = parseInt(this.state.secundes);
    let minutes = parseInt(this.state.minutes);
    if (secundes <= 0) {
      secundes = 59;
      minutes--;
    } else if (minutes <= 0 && secundes <= 1) {
      secundes = 0;
      clearInterval(this.startRoundTime);
    } else {
      secundes--;
    }
    secundes = this.addZero(secundes);
    minutes = this.addZero(minutes);
    this.setState({ secundes: secundes, buttonStart: true, minutes: minutes });
  };

  start = () => {
    this.setState({
      minutes: this.props.roundTime.slice(0, 2),
      secundes: this.props.roundTime.slice(-2)
    });
    this.startRoundTime = setInterval(this.backCounter, 500);
  };

  render() {
    const { minutes, secundes, buttonReset, buttonStart } = this.state;
    return (
      <div id="clock" className="container">
        <span id="time">
          {minutes}:{secundes}
        </span>
        <span id="round">Round 1\{this.props.round}</span>
        <button
          id="start"
          type="button"
          className="btn btn-outline-info"
          disabled={buttonStart}
          onClick={this.start}
        >
          START
        </button>
        <button
          id="reset"
          className="btn btn-outline-info"
          disabled={buttonReset}
        >
          RESET
        </button>
      </div>
    );
  }
}

export default Clock;
