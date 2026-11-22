// Libs
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

// Utils
import {
  setActiveTrack,
  playTrack,
  pauseTrack,
  playNextTrack,
  playPreviousTrack,
} from "../../actions"
import {
  onPlayerStateChange,
  playUri,
  pausePlayback,
  resumePlayback,
} from "../../services/api/player/webPlayback"
import {
  formatMilliseconds,
  numToDecimals,
} from "../../static/js/utils/mathHelpers"

// Components
import ProgressBar from "./ProgressBar/ProgressBar"

// Assets
import { ReactComponent as VolumeSVG } from "./resources/volume.svg"
import { ReactComponent as RepeatSVG } from "./resources/repeat.svg"
import { ReactComponent as ShuffleSVG } from "./resources/shuffle.svg"

const mapStateToProps = (state) => {
  return {
    player: state.player,
    playlist: state.stream.playlist,
    trackEntities: state.entities.tracks,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setActiveTrack: (trackId) => dispatch(setActiveTrack(trackId)),
  playTrack: (track) => dispatch(playTrack(track)),
  pauseTrack: () => dispatch(pauseTrack()),
  playNextTrack: () => dispatch(playNextTrack()),
  playPreviousTrack: () => dispatch(playPreviousTrack()),
})

class Player extends Component {
  state = {
    currentTime: 0,
    trackLoadPercentage: 0,
    activeTrack: null,
  }

  // Last known playback position reported by the Spotify SDK
  _position = 0
  _positionAt = 0
  _paused = true
  _loadedUri = null

  _getArtists(track) {
    return track.artists.map((artist) => artist.name).join(", ")
  }

  // The SDK only reports changes, so work out the current position locally
  _updateProgress = () => {
    const { activeTrack } = this.state

    if (!activeTrack) {
      return
    }

    const elapsed = this._paused
      ? this._position
      : this._position + (Date.now() - this._positionAt)
    const ms = Math.min(elapsed, activeTrack.duration_ms)

    this.setState({
      currentTime: ms / 1000,
      trackLoadPercentage: numToDecimals(
        (ms * 100) / activeTrack.duration_ms,
        2
      ),
    })
  }

  _onPlayerStateChange = (sdkState) => {
    if (!sdkState) {
      return
    }

    const { position, paused, track_window } = sdkState
    const { current_track, previous_tracks } = track_window

    this._position = position
    this._positionAt = Date.now()
    this._paused = paused

    // When a track ends, the SDK pauses it at 0 and lists it as already played
    const hasEnded =
      paused &&
      position === 0 &&
      previous_tracks.some((track) => track.id === current_track.id)

    if (hasEnded && this.props.player.isPlaying) {
      this.props.playNextTrack()

      return
    }

    this._updateProgress()
  }

  // Show the first playable track's info, without playing it,
  // so the player isn't empty until the user picks a track
  _showFirstTrack() {
    const { player, playlist, trackEntities, setActiveTrack } = this.props
    const items = playlist && playlist.tracks && playlist.tracks.items

    if (player.activeTrackId || !items) {
      return
    }

    const firstTrackId = items.find(
      (id) => trackEntities[id] && trackEntities[id].uri
    )

    if (firstTrackId) {
      setActiveTrack(firstTrackId)
    }
  }

  _startPlayback(track) {
    if (this._loadedUri === track.uri) {
      resumePlayback()

      return
    }

    this._loadedUri = track.uri
    this._position = 0
    this._paused = false
    this._positionAt = Date.now()

    playUri(track.uri).catch((error) => {
      this._loadedUri = null

      console.error(`Error starting playback. Reason: ${error}`)
    })
  }

  _renderPlaybackOptions() {
    return (
      <div className="player__controls player__controls--options">
        <div className="player__volume">
          <button
            type="button"
            className="player__btn player__volume-toggle-btn"
          >
            <VolumeSVG />
            <span className="sr-only">Volume</span>
          </button>

          <div className="player__volume-controls">
            <div className="player__volume-track" role="presentation" />
            <div className="player__volume-bar" role="presentation" />
            <div className="player__volume-thumb" role="presentation" />
          </div>
        </div>
      </div>
    )
  }

  _renderTimeline() {
    const { activeTrack, currentTime, trackLoadPercentage } = this.state

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
    )
  }

  _renderPlaybackControls() {
    const { player, playTrack, pauseTrack, playNextTrack, playPreviousTrack } =
      this.props
    const { activeTrack } = this.state

    // TODO: Prev & next buttons should be disabled at the start/end of playlist

    return (
      <div className="player__controls player__controls--playback">
        <button type="button" className="player__btn player__btn-shuffle">
          <ShuffleSVG />
          <span className="sr-only">Shuffle</span>
        </button>

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

        <button type="button" className="player__btn player__btn-repeat">
          <RepeatSVG />
          <span className="sr-only">Repeat</span>
        </button>
      </div>
    )
  }

  _renderTrackDetails() {
    const { activeTrack } = this.state

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
            {activeTrack.name ? activeTrack.name : ""}
          </div>
          <div className="player__artist-name">
            {this._getArtists(activeTrack)}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._unsubscribe = onPlayerStateChange(this._onPlayerStateChange)
    this._timer = window.setInterval(this._updateProgress, 500)

    this._showFirstTrack()
  }

  componentDidUpdate(prevProps) {
    const { trackEntities } = this.props
    const { isPlaying, activeTrackId } = this.props.player

    if (!activeTrackId && prevProps.playlist !== this.props.playlist) {
      this._showFirstTrack()
    }

    if (prevProps.player.activeTrackId !== activeTrackId) {
      const activeTrack = trackEntities[activeTrackId]

      // Use Redux to manage the global store, however locally
      // it's easier to reference the track from the state.
      this.setState({ activeTrack, currentTime: 0, trackLoadPercentage: 0 })

      if (isPlaying) {
        this._startPlayback(activeTrack)
      }

      return
    }

    if (prevProps.player.isPlaying !== isPlaying) {
      if (isPlaying) {
        this._startPlayback(this.state.activeTrack)
      } else {
        pausePlayback()
      }
    }
  }

  componentWillUnmount() {
    this._unsubscribe()
    window.clearInterval(this._timer)
  }

  render() {
    const { activeTrack } = this.state

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
    )
  }
}

Player.propTypes = {
  activeTrack: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
