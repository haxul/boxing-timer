import React, { Component } from "react";
import "./app.scss";
import Clock from "./components/Clock";
import Sidebar from "./components/Sidebar";

class App extends Component {
  state = {
    round: 3,
    roundTime: "03:00",
    restTime: "01:00",
    prepareTime: "00:30",
    alerter: "00:30"
  };
  updateRound = value => {
    this.setState({ round: value });
  };
  updateRoundTime = value => {
    this.setState({ roundTime: value });
  };
  updateRestTime = value => {
    this.setState({ restTime: value });
  };
  updatePrepareTime = value => {
    this.setState({ prepareTime: value });
  };
  updateAlerter = value => {
    this.setState({ alerter: value });
  };
  render() {
    const { round, roundTime, restTime, prepareTime, alerter } = this.state;
    return (
      <div className="container">
        <Clock
          round={round}
          roundTime={roundTime}
          restTime={restTime}
          prepareTime={prepareTime}
          alerter={alerter}
        />
        <Sidebar
          updateRound={this.updateRound}
          updateRoundTime={this.updateRoundTime}
          updateRestTime={this.updateRestTime}
          updatePrapereTime={this.updatePrepareTime}
          updateAlerter={this.updateAlerter}
        />
      </div>
    );
  }
}

export default App;
