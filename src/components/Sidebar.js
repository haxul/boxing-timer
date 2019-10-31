import React from "react";

class Sidebar extends React.Component {
 
  state = {
    round: 3,
    roundTime: "03:00",
    restTime: "01:00",
    prepareTime: "00:30",
    alerter: "00:30"
  };

  handleRound = e => {
    let { round } = this.state;
    round = Number(round);
    if (e.key === "ArrowUp") {
      if (round > 14) round = 14;
      round++;
    } else if (e.key === "ArrowDown") {
      if (round < 2) round = 2;
      round--;
    }
    this.setState({ round: round });
    this.props.updateRound(round);
  };

  setTime = (e, item, maxMin, minMin, maxSec, minSec, flag) => {
    const addZero = n => {
      if (+n > 9) return n;
      return "0" + n;
    };
    let minutes = parseInt(item.slice(0, 2)),
      secundes = parseInt(item.slice(-2));
    if (e.key === "ArrowUp") {
      if (secundes > 40) {
        secundes = 0;
        minutes++;
      } else if (minutes >= maxMin && secundes >= maxSec) {
        // define the maximum
        minutes = maxMin;
        secundes = maxSec;
      } else secundes += 10;
    } else if (e.key === "ArrowDown") {
      if (minutes === minMin && secundes === minSec) {
        //define the minimum
        minutes = minMin;
        secundes = minSec;
      } else if (secundes <= 0) {
        secundes = 50;
        minutes--;
      } else secundes -= 10;
    }
    item = addZero(minutes) + ":" + addZero(secundes);
    switch (flag) {
      case "roundTime":
        this.props.updateRoundTime(item);
        break;
      case "roundTime":
        this.props.updateRoundTime(item);
        break;
      case "alerter":
        this.props.updateAlerter(item);
        break;
      case "restTime":
        this.props.updateRestTime(item);
        break;
      case "prepareTime":
        this.props.updatePrapereTime(item);
        break;
    }
    return item;
  };

  handleInputs = e => {
    this.setState({ round: this.state.round });
    this.setState({ roundTime: this.state.roundTime });
    this.setState({ restTime: this.state.restTime });
    this.setState({ prepareTime: this.state.prepareTime });
    this.setState({ alerter: this.state.alerter });
  };

  render() {
    const { round, roundTime, restTime, prepareTime, alerter } = this.state;
    return (
      <div className="container" id="sidebar">
        <div className="blocks">
          Rounds{" "}
          <input
            type="text"
            id="input1"
            value={round}
            onKeyDown={this.handleRound}
            onChange={this.handleInputs}
          />
        </div>
        <div className="blocks">
          Round Time{" "}
          <input
            type="text"
            id="input4"
            value={roundTime}
            onChange={this.handleInputs}
            onKeyDown={e => {
              let value = this.setTime(e, roundTime, 10, 0, 0, 10, "roundTime");
              this.setState({ roundTime: value });
            }}
          />
        </div>
        <div className="blocks">
          Rest Time{" "}
          <input
            type="text"
            id="input5"
            value={restTime}
            onChange={this.handleInputs}
            onKeyDown={e => {
              let value = this.setTime(e, restTime, 10, 0, 0, 10, "restTime");
              this.setState({ restTime: value });
            }}
          />
        </div>
        <div className="blocks">
          Alerter{" "}
          <input
            type="text"
            id="input2"
            value={alerter}
            onChange={this.handleInputs}
            onKeyDown={e => {
              let value = this.setTime(e, alerter, 1, 0, 0, 0, "alerter");
              this.setState({ alerter: value });
            }}
          />
        </div>
        <div className="blocks">
          Prepare{" "}
          <input
            type="text"
            id="input3"
            value={prepareTime}
            onChange={this.handleInputs}
            onKeyDown={e => {
              let value = this.setTime(
                e,
                prepareTime,
                1,
                0,
                0,
                10,
                "prepareTime"
              );
              this.setState({ prepareTime: value });
            }}
          />
        </div>
      </div>
    );
  }
}

export default Sidebar;
