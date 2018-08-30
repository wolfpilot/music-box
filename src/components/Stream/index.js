// Modules
import React, { Component } from 'react';

// Components
import Track from '../Track';

class Stream extends Component {
  render() {
    const { tracks = [] } = this.props;

    return (
      <div className="stream">
        {tracks.map((track, key) => {
          return <Track track={track} key={key} />;
        })}
      </div>
    );
  }
}

export default Stream;
