import React, { Component } from 'react';
import './app.scss';
import Clock from './components/Clock';

class App extends Component {
  render() {
    return (
      <div className = 'container'>
      <Clock/>
      </div>
    );
  }
}

export default App;
