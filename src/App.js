import React, { Component } from 'react';
import './app.scss';
import Clock from './components/Clock';
import Sidebar from './components/Sidebar';

class App extends Component {
  render() {
    return (
      <div className = 'container'>
      <Clock/>
      <Sidebar/>
      </div>
    );
  }
}

export default App;
