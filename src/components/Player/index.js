// Libs
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Utils
import { playTrack, pauseTrack, playNextTrack } from '../../actions';
import {
  formatMilliseconds,
  numToDecimals
} from '../../static/js/utils/mathHelpers';

// Components
import ProgressBar from './ProgressBar';

const defaults = {
  previewDuration: 30
};

const mapStateToProps = state => {
  return {
    player: state.player
  };
};

const mapDispatchToProps = dispatch => ({
  playTrack: track => dispatch(playTrack(track)),
  pauseTrack: () => dispatch(pauseTrack()),
  playNextTrack: () => dispatch(playNextTrack())
});

class Player extends Component {
  constructor() {
    super();

    this._onTimeUpdate = this._onTimeUpdate.bind(this);
  }

  state = {
    currentTime: 0,
    trackLoadPercentage: 0
  };

  getArtists(track) {
    return track.artists.map(artist => artist.name).join(', ');
  }

  _updateProgress() {
    const { track } = this.props.player;

    const percentage =
      (this.audio.currentTime * 100) / (track.duration_ms / 1000);
    const formattedPercentage = numToDecimals(percentage, 2);

    this.setState({ trackLoadPercentage: formattedPercentage });
  }

  _onTimeUpdate() {
    const { playNextTrack } = this.props;

    // Normally, the current play time should be compared to the total track duration
    // however that's not possible due to Spotify only providing 30s previews.
    if (this.audio.currentTime >= defaults.previewDuration) {
      playNextTrack();

      return;
    }

    this._updateProgress();

    this.setState({ currentTime: this.audio.currentTime });
  }

  _renderPlaybackOptions() {
    return (
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
    );
  }

  _renderTimeline() {
    const { track } = this.props.player;

    return (
      <div className="player__timeline">
        <div className="player__elapsed-time">
          {formatMilliseconds(this.state.currentTime * 1000)}
        </div>

        <ProgressBar percentage={this.state.trackLoadPercentage} />

        <div className="player__total-time">
          {formatMilliseconds(track.duration_ms)}
        </div>
      </div>
    );
  }

  _renderPlaybackControls() {
    const { isPlaying, track } = this.props.player;

    return (
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
    );
  }

  _renderTrackDetails() {
    const { track } = this.props.player;

    return (
      <div className="player__active-track">
        <div className="player__artwork-wrapper">
          {track.artwork && (
            <img
              className="player__artwork-image"
              src={track.artwork.url}
              alt=""
            />
          )}
        </div>

        <div className="player__track-meta">
          <div className="player__track-name">
            {track.name ? track.name : ''}
          </div>
          <div className="player__artist-name">{this.getArtists(track)}</div>
        </div>
      </div>
    );
  }

  _setupAudio() {
    this.audio = new Audio();

    this.audio.loop = false;

    this.audio.addEventListener('timeupdate', this._onTimeUpdate);
  }

  componentDidMount() {
    this._setupAudio();
  }

  componentDidUpdate(prevProps) {
    const { isPlaying, track } = this.props.player;

    if (prevProps.player.track !== track) {
      this.audio.src = track.preview_url;
      this.audio.load();
    }

    isPlaying ? this.audio.play() : this.audio.pause();
  }

  componentWillUnmount() {
    this.audio.removeEventListener('timeupdate', this._onTimeUpdate);
  }

  render() {
    const { track } = this.props.player;

    return (
      <div className="player">
        {track && (
          <>
            {this._renderTrackDetails()}
            {this._renderPlaybackControls()}
            {this._renderTimeline()}
            {this._renderPlaybackOptions()}
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
