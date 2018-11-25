// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

Track.propTypes = {
  track: PropTypes.shape({
    title: PropTypes.string.isRequired,
    length: PropTypes.string.isRequired
  })
};

export default Track;
