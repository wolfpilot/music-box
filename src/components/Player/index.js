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

  // @TODO: onPlay, onPause? Prevent play if already playing, same for pause.
  // @TODO: Otherwise, creates too many unnecessary Redux store updates

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
    const { isPlaying, track } = this.props.player;

    return (
      <div className="player">
        {track && (
          <>
            <div className="player__active-track">
              <div className="player__artwork-wrapper">
                <img
                  className="player__artwork-image"
                  src={track.artwork.url}
                  alt=""
                />
              </div>

              <div className="player__track-meta">
                <div className="player__track-name">
                  {track.name ? track.name : ''}
                </div>
                <div className="player__artist-name">
                  {this.getArtists(track)}
                </div>
              </div>
            </div>

            <div className="player__controls">
              <button type="button" className="player__btn player__btn-prev">
                &#124;&#60;<span className="sr-only">Go to previous track</span>
              </button>
              {isPlaying ? (
                <button
                  type="button"
                  className="player__btn player__btn-pause"
                  onClick={this.props.pauseTrack}
                >
                  &#9647;&#9647;<span className="sr-only">Pause</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="player__btn player__btn-play"
                  onClick={() => this.props.playTrack(track)}
                >
                  &#9655;<span className="sr-only">Play</span>
                </button>
              )}
              <button type="button" className="player__btn player__btn-next">
                &#62;&#124;<span className="sr-only">Go to next track</span>
              </button>
            </div>

            <div className="player__timeline">
              <div className="player__elapsed-time">02:15</div>

              <div className="player__progress">
                <div className="player__progress-track" role="presentation" />
                <div className="player__progress-bar" role="presentation" />
                <div className="player__progress-thumb" role="presentation" />
              </div>

              <div className="player__total-time">04:45</div>
            </div>

            <div className="player__controls">
              <div className="player__volume">
                <button
                  type="button"
                  className="player__btn player__volume-toggle-btn"
                >
                  V<span className="sr-only">Volume</span>
                </button>

                <div className="player__volume-controls">
                  <div className="player__volume-track" role="presentation" />
                  <div className="player__volume-bar" role="presentation" />
                  <div className="player__volume-thumb" role="presentation" />
                </div>
              </div>
              <button type="button" className="player__btn player__btn-shuffle">
                S<span className="sr-only">Shuffle</span>
              </button>
              <button type="button" className="player__btn player__btn-repeat">
                R<span className="sr-only">Repeat</span>
              </button>
            </div>
          </>
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
