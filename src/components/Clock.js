import React from 'react';

class Clock extends React.Component{
  render() {
    return (
      <div id = 'clock' className = 'container'>
        <span id = 'time'>00:00</span>
        <span id = 'round'>Round 1\3</span>
        <button id = 'start' type="button" className = "btn btn-outline-info" >START</button>
        <button id = 'reset' className = "btn btn-outline-info" >RESET</button>
      </div>
    )
  }
}

export default Clock
