// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Utils
import { formatMilliseconds } from '../../../static/js/utils/mathHelpers';

class Track extends Component {
  // @TODO: Move state to store, dispatch play/pause action
  state = {
    isPlaying: false
  };

  togglePlayPause = () => {
    this.audio.loop = false;

    if (this.state.isPlaying) {
      this.setState({ isPlaying: false });

      this.audio.pause();
    } else {
      this.setState({ isPlaying: true });

      this.audio.play();
    }
  };

  getArtists() {
    return this.props.artists.map(artist => artist.name).join(', ');
  }

  componentDidMount() {
    this.audio = new Audio(this.props.preview_url);
  }

  render() {
    const {
      name,
      artists,
      index,
      artwork,
      duration_ms,
      preview_url
    } = this.props;

    return (
      <div className="track" data-is-playing={this.state.isPlaying}>
        {index && <div className="track__index">{index}</div>}

        <div className="track__artwork">
          <img className="track__artwork-image" src={artwork.url} alt="" />
        </div>

        <button
          className="track__play-btn btn"
          type="button"
          disabled={!preview_url}
          onClick={this.togglePlayPause}
        >
          &#9658;
        </button>

        <div className="track__details">
          {name && <div className="track__name">{name}</div>}
          {artists.length && (
            <div className="track__artists">{this.getArtists()}</div>
          )}
        </div>

        {duration_ms && (
          <div className="track__length">{formatMilliseconds(duration_ms)}</div>
        )}
      </div>
    );
  }
}

Track.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  artists: PropTypes.array.isRequired,
  duration_ms: PropTypes.number.isRequired
};

export default Track;
