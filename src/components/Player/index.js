// Libs
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Utils
import { playTrack, pauseTrack } from '../../actions';

const mapStateToProps = state => {
  return {
    player: state.player
  };
};

const mapDispatchToProps = dispatch => ({
  playTrack: track => dispatch(playTrack(track)),
  pauseTrack: () => dispatch(pauseTrack())
});

class Player extends Component {
  componentDidMount() {
    this.audio = new Audio();

    this.audio.loop = false;
  }

  componentDidUpdate(prevProps) {
    const { isPlaying, track } = this.props.player;

    if (prevProps.player.track !== track) {
      this.audio.src = track.preview_url;
      this.audio.load();
    }

    isPlaying ? this.audio.play() : this.audio.pause();
  }

  getArtists(track) {
    return track.artists.map(artist => artist.name).join(', ');
  }

  render() {
    const { track } = this.props.player;

    return (
      <div className="player">
        {track && (
          <div className="player__active-track">
            <div className="player__artwork-wrapper">
              <img
                className="player__artwork-image"
                src={track.artwork.url}
                alt=""
              />
            </div>

            <div className="player__track-details">
              <div className="player__track-name">
                {track.name ? track.name : ''}
              </div>
              <div className="player__artist-name">
                {this.getArtists(track)}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Player.propTypes = {
  track: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
