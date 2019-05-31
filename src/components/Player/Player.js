// Libs
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Utils
import {
  playTrack,
  pauseTrack,
  playNextTrack,
  playPreviousTrack
} from '../../actions';
import {
  formatMilliseconds,
  numToDecimals
} from '../../static/js/utils/mathHelpers';

// Components
import ProgressBar from './ProgressBar/ProgressBar';

const defaults = {
  previewDuration: 30
};

const mapStateToProps = state => {
  return {
    player: state.player,
    trackEntities: state.entities.tracks
  };
};

const mapDispatchToProps = dispatch => ({
  playTrack: track => dispatch(playTrack(track)),
  pauseTrack: () => dispatch(pauseTrack()),
  playNextTrack: () => dispatch(playNextTrack()),
  playPreviousTrack: () => dispatch(playPreviousTrack())
});

class Player extends Component {
  constructor() {
    super();

    this._onTimeUpdate = this._onTimeUpdate.bind(this);
  }

  state = {
    currentTime: 0,
    trackLoadPercentage: 0,
    activeTrack: null
  };

  _getArtists(track) {
    return track.artists.map(artist => artist.name).join(', ');
  }

  _updateProgress() {
    const { activeTrack } = this.state;

    const percentage =
      (this.audio.currentTime * 100) / (activeTrack.duration_ms / 1000);
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
      <div className="player__controls player__controls--options">
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
    const { activeTrack, currentTime, trackLoadPercentage } = this.state;

    return (
      <div className="player__timeline">
        <div className="player__elapsed-time">
          {formatMilliseconds(currentTime * 1000)}
        </div>

        <ProgressBar percentage={trackLoadPercentage} />

        <div className="player__total-time">
          {formatMilliseconds(activeTrack.duration_ms)}
        </div>
      </div>
    );
  }

  _renderPlaybackControls() {
    const {
      player,
      playTrack,
      pauseTrack,
      playNextTrack,
      playPreviousTrack
    } = this.props;
    const { activeTrack } = this.state;

    // TODO: Prev & next buttons should be disabled at the start/end of playlist

    return (
      <div className="player__controls player__controls--playback">
        <button
          type="button"
          className="player__btn player__btn-prev"
          onClick={playPreviousTrack}
        >
          &#124;&#60;<span className="sr-only">Go to previous track</span>
        </button>
        {player.isPlaying ? (
          <button
            type="button"
            className="player__btn player__btn-pause"
            onClick={pauseTrack}
          >
            &#9647;&#9647;<span className="sr-only">Pause</span>
          </button>
        ) : (
          <button
            type="button"
            className="player__btn player__btn-play"
            onClick={() => playTrack(activeTrack.id)}
          >
            &#9655;<span className="sr-only">Play</span>
          </button>
        )}
        <button
          type="button"
          className="player__btn player__btn-next"
          onClick={playNextTrack}
        >
          &#62;&#124;<span className="sr-only">Go to next track</span>
        </button>
      </div>
    );
  }

  _renderTrackDetails() {
    const { activeTrack } = this.state;

    return (
      <div className="player__active-track">
        <div className="player__artwork">
          {activeTrack.artwork && (
            <img
              className="player__artwork-image"
              src={activeTrack.artwork.url}
              alt=""
            />
          )}
        </div>

        <div className="player__track-meta">
          <div className="player__track-name">
            {activeTrack.name ? activeTrack.name : ''}
          </div>
          <div className="player__artist-name">
            {this._getArtists(activeTrack)}
          </div>
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
    const { trackEntities } = this.props;
    const { isPlaying, activeTrackId } = this.props.player;

    if (prevProps.player.activeTrackId !== activeTrackId) {
      const activeTrack = trackEntities[activeTrackId];

      // Use Redux to manage the global store, however locally
      // it's easier to reference the track from the state.
      this.setState({ activeTrack });

      this.audio.src = activeTrack.preview_url;
      this.audio.load();
    }

    isPlaying ? this.audio.play() : this.audio.pause();
  }

  componentWillUnmount() {
    this.audio.removeEventListener('timeupdate', this._onTimeUpdate);
  }

  render() {
    const { activeTrack } = this.state;

    return (
      <div className="player">
        {activeTrack && (
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
  activeTrack: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
