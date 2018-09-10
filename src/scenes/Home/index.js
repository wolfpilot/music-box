// Libs
import React, { Component } from 'react';

// Components
import Stream from '../../components/Stream';

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

class Home extends Component {
  render() {
    return (
      <main role="main">
        <Stream tracks={tracks} />
      </main>
    );
  }
}

export default Home;
