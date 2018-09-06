// Modules
import React, { Component, Fragment } from 'react';

// Components
import SiteHeader from './SiteHeader';
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
    return (
      <Fragment>
        <SiteHeader />
        <main role="main">
          <Stream tracks={tracks} />
        </main>
      </Fragment>
    );
  }
}

export default App;
