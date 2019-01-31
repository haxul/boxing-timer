import React from "react";

class Clock extends React.Component {
  constructor() {
    super();
    this.startRoundTime = undefined;
    this.startPrepareTime = undefined;
    this.startRestTime = undefined;
    this.alerter = 0;
  }
  state = {
    minutes: "00",
    secundes: "00",
    buttonStart: false,
    minutesPrepare: "00",
    secundesPrepare: "30",
    minRest: "01",
    secRest: "00",
    flag: "prepare",
    round: 1
  };

  addZero = n => {
    if (+n > 9) return n;
    return "0" + n;
  };

  start = () => {
    this.setDisabledInputs(true);
    this.setState({
      flag: 'prepare',
      minutesPrepare: this.props.prepareTime.slice(0, 2),
      secundesPrepare: this.props.prepareTime.slice(-2)
    });
    this.startPrepareTime = setInterval(this.startPrepareTimeBackCounter, 1000);
  };

  startPrepareTimeBackCounter = () => {
    let secundes = parseInt(this.state.secundesPrepare);
    let minutes = parseInt(this.state.minutesPrepare);
    if (secundes <= 0) {
      secundes = 59;
      minutes--;
    } else if (minutes <= 0 && secundes <= 1) {
      secundes = 0;
      this.alerter = 0;
      clearInterval(this.startPrepareTime);
      this.giveGong();
      this.setState({
        flag: "roundTime",
        minutes: this.props.roundTime.slice(0, 2),
        secundes: this.props.roundTime.slice(-2)
      });
      this.startRoundTime = setInterval(this.backCounter, 1000);
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
    if (this.state.flag !== 'stop') {
      let secundes = parseInt(this.state.secundes);
      let minutes = parseInt(this.state.minutes);
      if (secundes <= 0) {
        secundes = 59;
        minutes--;
      } else if (minutes <= 0 && secundes <= 1 && this.state.flag !== "stop") {
        if (this.state.round >= this.props.round) {
          this.setState({
            flag: "stop"
          });
          this.giveGong();
          return;
        }
        this.alerter = 0;
        secundes = 0;
        clearInterval(this.startRoundTime);
        this.giveGong();
        this.setState({
          flag: "restTime",
          minRest: this.props.restTime.slice(0, 2),
          secRest: this.props.restTime.slice(-2),
          round: this.state.round + 1
        });
        this.startRestTime = setInterval(this.startRestTimeBackCounter, 1000);
      } else {
        secundes--;
        this.alerter++;
        if (
          this.alerter === +this.props.alerter.slice(-2) &&
          +this.props.alerter.slice(0, 2) === 0 &&
          this.props.alerter !== "00:00"
        ) {
          this.giveWhistle();
          this.alerter = 0;
        } else if (+this.props.alerter.slice(0, 2) === 1 && this.alerter === 59) {
          this.giveWhistle();
          this.alerter = 0;
        } else if (this.props.alerter === "00:00") {
          this.alerter = -2;
        }
      }
      secundes = this.addZero(secundes);
      minutes = this.addZero(minutes);
      this.setState({ secundes: secundes, minutes: minutes });
    }
  };

  startRestTimeBackCounter = () => {
    if (this.state.flag !== 'stop') {
      let secundes = parseInt(this.state.secRest);
      let minutes = parseInt(this.state.minRest);
      if (secundes <= 0) {
        secundes = 59;
        minutes--;
      } else if (minutes <= 0 && secundes <= 1) {
        secundes = 0;
        this.giveGong();
        clearInterval(this.startRestTime);
        this.setState({
          flag: "roundTime",
          minutes: this.props.roundTime.slice(0, 2),
          secundes: this.props.roundTime.slice(-2)
        });
        this.startRoundTime = setInterval(this.backCounter, 1000);
      } else {
        secundes--;
      }
      secundes = this.addZero(secundes);
      minutes = this.addZero(minutes);
      this.setState({ secRest: secundes, minRest: minutes });
    }
  };

  giveWhistle = () => {
    let audio = new Audio("alert.mp3");
    audio.play();
  };
  giveGong = () => {
    let audio = new Audio("gong.mp3");
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 15000);
  };

  setDisabledInputs = boolean => {
    for (var i = 0; i < document.querySelectorAll("input").length; i++) {
      document.querySelectorAll("input")[i].disabled = boolean;
    }
  };
  handleReset = () => {
    this.setState({
      minutes: "00",
      secundes: "00",
      buttonStart: false,
      minutesPrepare: "00",
      secundesPrepare: "30",
      minRest: "01",
      secRest: "00",
      flag: "stop",
      round: 1
    });
    this.alerter = 0;
    clearInterval(this.startRoundTime);
    clearInterval(this.startRestTime);
    clearInterval(this.startPrepareTime);
    this.setDisabledInputs(false);
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
          {flag === "prepare"
            ? minutesPrepare
            : flag === "roundTime"
            ? minutes
            : flag === "restTime"
            ? minRest
            : "00"}
          :
          {flag === "prepare"
            ? secundesPrepare
            : flag === "roundTime"
            ? secundes
            : flag === "restTime"
            ? secRest
            : "00"}
        </span>
        <span id="round">
          Round {round}\{this.props.round}
        </span>
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
          onClick = {this.handleReset}
        >
          RESET
        </button>
      </div>
    );
  }
}

export default Clock;
