// Modules
import React, { Component } from 'react';

// Components
import Stream from './Stream';

const tracks = [
  {
    title: 'First track',
    length: '03:48'
  },
  {
    title: 'Second track',
    length: '05:21'
  }
];

class App extends Component {
  render() {
    return <Stream tracks={tracks} />;
  }
}

export default App;
