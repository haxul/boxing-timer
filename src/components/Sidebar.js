import React from 'react';

class Sidebar extends React.Component {
  render () {

    return (
      <div className='container' id = 'sidebar'>
        <div className = 'blocks'>Rounds <input type="text" id = 'input1' defaultValue = '3'/></div>
        <div className = 'blocks'>Round Time <input type="text" id = 'input4' defaultValue = '03:00'/></div>
        <div className = 'blocks'>Rest Time <input type="text" id = 'input5'defaultValue = '01:00'/></div>
        <div className = 'blocks'>Breaking <input type="text" id = 'input2' defaultValue = '00:30'/></div>
        <div className = 'blocks'>Prepare <input type="text" id = 'input3'defaultValue = '00:25'/></div>
      </div>
    )
  }
}

export default Sidebar
