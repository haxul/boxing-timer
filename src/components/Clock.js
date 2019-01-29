import React from "react";

class Clock extends React.Component {
  constructor() {
    super();
    this.startRoundTime = undefined;
    this.startPrepareTime = undefined;
    this.startRestTime = undefined;
  }
  state = {
    minutes: "00",
    secundes: "00",
    buttonStart: false,
    buttonReset: true,
    minutesPrepare: "00",
    secundesPrepare: "30",
    minRest: '01',
    secRest: '00',
    flag: "prepare",
    round: 1
  };

  addZero = n => {
    if (+n > 9) return n;
    return "0" + n;
  };

  start = () => {
    this.setState({
      minutesPrepare: this.props.prepareTime.slice(0, 2),
      secundesPrepare: this.props.prepareTime.slice(-2)
    });
    this.startPrepareTime = setInterval(this.startPrepareTimeBackCounter, 500);
  };

  startPrepareTimeBackCounter = () => {
    let secundes = parseInt(this.state.secundesPrepare);
    let minutes = parseInt(this.state.minutesPrepare);
    if (secundes <= 0) {
      secundes = 59;
      minutes--;
    } else if (minutes <= 0 && secundes <= 1) {
      secundes = 0;
      clearInterval(this.startPrepareTime);
      this.setState({
        flag: "roundTime",
        minutes: this.props.roundTime.slice(0, 2),
        secundes: this.props.roundTime.slice(-2)
      });
      this.startRoundTime = setInterval(this.backCounter, 500);
    } else {
      secundes--;
    }
    secundes = this.addZero(secundes);
    minutes = this.addZero(minutes);
    this.setState({
      secundesPrepare: secundes,
      buttonStart: true,
      minutesPrepare: minutes
    });
  };

  //start back count of the rounde
  backCounter = () => {
    let secundes = parseInt(this.state.secundes);
    let minutes = parseInt(this.state.minutes);
    if (secundes <= 0) {
      secundes = 59;
      minutes--;
    } else if (minutes <= 0 && secundes <= 1) {
      if (this.state.round >= this.props.round) {
        this.setState({
          flag: 'stop',
        });
        return;
      }
      secundes = 0;
      clearInterval(this.startRoundTime);
      this.setState({
        flag: 'restTime',
        minRest: this.props.restTime.slice(0, 2),
        secRest: this.props.restTime.slice(-2),
        round: this.state.round+1
      })
      this.startRestTime = setInterval(this.startRestTimeBackCounter, 500);
    } else {
      secundes--;
    }
    secundes = this.addZero(secundes);
    minutes = this.addZero(minutes);
    this.setState({ secundes: secundes, minutes: minutes });
  };

  startRestTimeBackCounter = () => {
    let secundes = parseInt(this.state.secRest);
    let minutes = parseInt(this.state.minRest);
    if (secundes <= 0) {
      secundes = 59;
      minutes--;
    } else if (minutes <= 0 && secundes <= 1) {
      secundes = 0;
      clearInterval(this.startRestTime);
      this.setState({
        flag: 'roundTime',
        minutes: this.props.roundTime.slice(0, 2),
        secundes: this.props.roundTime.slice(-2)
      })
      this.startRoundTime = setInterval(this.backCounter, 500);
    } else {
      secundes--;
    }
    secundes = this.addZero(secundes);
    minutes = this.addZero(minutes);
    this.setState({ secRest: secundes, minRest: minutes });
  }

  render() {
    const {
      minutes,
      secundes,
      buttonReset,
      buttonStart,
      minutesPrepare,
      secundesPrepare,
      flag,
      round,
      minRest,
      secRest
    } = this.state;
    return (
      <div id="clock" className="container">
        <span id="time">
          {flag === "prepare" ? minutesPrepare : flag === 'roundTime'? minutes : flag === 'restTime'? minRest :'00'}:
          {flag === "prepare" ? secundesPrepare : flag === 'roundTime'? secundes : flag === 'restTime'? secRest : '00'}
        </span>
        <span id="round">Round {round}\{this.props.round}</span>
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
