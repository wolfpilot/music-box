// Modules
import React, { Component } from 'react';

class Track extends Component {
  render() {
    const { track = {} } = this.props;

    return (
      <div className="track">
        <div className="track__title">{track.title}</div>
        <div className="track__length">{track.length}</div>
      </div>
    );
  }
}

export default Track;
