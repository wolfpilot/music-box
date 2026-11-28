// Libs
import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

// Utils
import {
  setActiveTrack,
  setQueue,
  toggleRepeat,
  toggleShuffle,
  playTrack,
  pauseTrack,
  playNextTrack,
  playPreviousTrack,
  expireSession,
} from "../../actions"
import {
  onPlayerStateChange,
  playUri,
  pausePlayback,
  resumePlayback,
  setPlaybackVolume,
  seekPlayback,
} from "../../services/api/player/webPlayback"
import {
  formatMilliseconds,
  numToDecimals,
} from "../../static/js/utils/mathHelpers"

import { isUnauthorizedError } from "../../static/js/utils/apiHelpers"

// Components
import ProgressBar from "./ProgressBar/ProgressBar"

// Assets
import { ReactComponent as VolumeIcon } from "@tabler/icons/icons/outline/volume.svg"
import { ReactComponent as VolumeOffIcon } from "@tabler/icons/icons/outline/volume-off.svg"
import { ReactComponent as RepeatIcon } from "@tabler/icons/icons/outline/repeat.svg"
import { ReactComponent as ShuffleIcon } from "@tabler/icons/icons/outline/arrows-shuffle.svg"
import { ReactComponent as PreviousIcon } from "@tabler/icons/icons/outline/player-skip-back.svg"
import { ReactComponent as NextIcon } from "@tabler/icons/icons/outline/player-skip-forward.svg"
import { ReactComponent as PlayIcon } from "@tabler/icons/icons/filled/player-play.svg"
import { ReactComponent as PauseIcon } from "@tabler/icons/icons/filled/player-pause.svg"

const mapStateToProps = (state) => {
  return {
    player: state.player,
    playlist: state.stream.playlist,
    trackEntities: state.entities.tracks,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setActiveTrack: (trackId) => dispatch(setActiveTrack(trackId)),
  setQueue: (queue, firstTrackId) => dispatch(setQueue(queue, firstTrackId)),
  toggleRepeat: () => dispatch(toggleRepeat()),
  toggleShuffle: () => dispatch(toggleShuffle()),
  expireSession: () => dispatch(expireSession()),
  playTrack: (track) => dispatch(playTrack(track)),
  pauseTrack: () => dispatch(pauseTrack()),
  playNextTrack: (wrap) => dispatch(playNextTrack(wrap)),
  playPreviousTrack: () => dispatch(playPreviousTrack()),
})

class Player extends Component {
  state = {
    currentTime: 0,
    trackLoadPercentage: 0,
    activeTrack: null,
    isMuted: false,
  }

  // Last known playback position reported by the Spotify SDK
  _position = 0
  _positionAt = 0
  _paused = true
  _loadedUri = null
  _pendingPosition = 0
  // The track whose ending was already handled, see _onPlayerStateChange
  _endedUri = null

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

    // The SDK reports the same ending several times in a row. Handling each
    // one would skip ahead, so only act on the first and wait until the
    // track plays again (or another one loads) before listening for the next.
    if (!hasEnded && (!paused || current_track.uri !== this._endedUri)) {
      this._endedUri = null
    }

    if (hasEnded && this._endedUri === current_track.uri) {
      return
    }

    if (hasEnded && this.props.player.isPlaying) {
      this._endedUri = current_track.uri

      // Repeat the active track instead of moving on to the next one
      if (this.props.player.isRepeating && this.state.activeTrack) {
        this._loadedUri = null
        this._startPlayback(this.state.activeTrack)

        return
      }

      this.props.playNextTrack()

      return
    }

    this._updateProgress()
  }

  // Show the first playable track's info, without playing it,
  // so the player isn't empty until the user picks a track
  _showFirstTrack() {
    const { player, playlist, trackEntities, setActiveTrack, setQueue } =
      this.props
    const items = playlist && playlist.tracks && playlist.tracks.items

    if (player.activeTrackId || !items) {
      return
    }

    const firstTrackId = items.find(
      (id) => trackEntities[id] && trackEntities[id].uri
    )

    if (firstTrackId) {
      setQueue(items, firstTrackId)
      setActiveTrack(firstTrackId)
    }
  }

  _startPlayback(track) {
    if (this._loadedUri === track.uri) {
      resumePlayback()

      return
    }

    // Set starting position to the user's selected progress
    const startPosition = this._pendingPosition
    this._pendingPosition = 0

    this._loadedUri = track.uri
    this._position = startPosition
    this._paused = false
    this._positionAt = Date.now()

    playUri(track.uri, startPosition).catch((error) => {
      this._loadedUri = null

      if (isUnauthorizedError(error)) {
        this.props.expireSession()
      }

      console.error(`Error starting playback. Reason: ${error}`)
    })
  }

  // Keep it simple: the volume is either full or muted
  _toggleMute = () => {
    const isMuted = !this.state.isMuted

    setPlaybackVolume(isMuted ? 0 : 1)

    this.setState({ isMuted })
  }

  _renderPlaybackOptions() {
    const { isMuted } = this.state

    return (
      <div className="player__controls player__controls--options">
        <div className="player__volume">
          <button
            type="button"
            className="player__btn player__btn-volume-toggle"
            onClick={this._toggleMute}
            aria-pressed={isMuted}
          >
            {isMuted ? <VolumeOffIcon /> : <VolumeIcon />}
            <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
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

  // `fraction` is the position to seek to, from 0 (start) to 1 (end)
  _onSeek = (fraction) => {
    const { activeTrack } = this.state

    if (!activeTrack) {
      return
    }

    const position = Math.round(fraction * activeTrack.duration_ms)

    // Load track without playing
    if (this._loadedUri !== activeTrack.uri) {
      this._pendingPosition = position
      this._paused = true
    } else {
      seekPlayback(position)
    }

    // Update right away, the SDK only reports the new position a moment later
    this._position = position
    this._positionAt = Date.now()

    this._updateProgress()
  }

  _renderTimeline() {
    const { activeTrack, currentTime, trackLoadPercentage } = this.state

    return (
      <div className="player__timeline">
        <div className="player__elapsed-time">
          {formatMilliseconds(currentTime * 1000)}
        </div>

        <ProgressBar percentage={trackLoadPercentage} onSeek={this._onSeek} />

        <div className="player__total-time">
          {formatMilliseconds(activeTrack.duration_ms)}
        </div>
      </div>
    )
  }

  _renderPlaybackControls() {
    const {
      player,
      playTrack,
      pauseTrack,
      playNextTrack,
      playPreviousTrack,
      toggleRepeat,
      toggleShuffle,
    } = this.props
    const { activeTrack } = this.state

    // TODO: Prev & next buttons should be disabled at the start/end of playlist

    return (
      <div className="player__controls player__controls--playback">
        <button
          type="button"
          className="player__btn player__btn-shuffle"
          onClick={toggleShuffle}
          aria-pressed={player.isShuffling}
          data-is-active={player.isShuffling}
        >
          <ShuffleIcon />
          <span className="sr-only">Shuffle</span>
        </button>

        <button
          type="button"
          className="player__btn player__btn-prev"
          onClick={playPreviousTrack}
        >
          <PreviousIcon />
          <span className="sr-only">Go to previous track</span>
        </button>

        {player.isPlaying ? (
          <button
            type="button"
            className="player__btn player__btn-pause"
            onClick={pauseTrack}
          >
            <PauseIcon />
            <span className="sr-only">Pause</span>
          </button>
        ) : (
          <button
            type="button"
            className="player__btn player__btn-play"
            onClick={() => playTrack(activeTrack.id)}
          >
            <PlayIcon />
            <span className="sr-only">Play</span>
          </button>
        )}

        <button
          type="button"
          className="player__btn player__btn-next"
          onClick={() => playNextTrack(true)}
        >
          <NextIcon />
          <span className="sr-only">Go to next track</span>
        </button>

        <button
          type="button"
          className="player__btn player__btn-repeat"
          onClick={toggleRepeat}
          aria-pressed={player.isRepeating}
          data-is-active={player.isRepeating}
        >
          <RepeatIcon />
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

      // The player was reset (e.g. on logout), so nothing is loaded anymore
      if (!activeTrackId) {
        this._loadedUri = null
      }

      // A different track always starts from the beginning
      this._pendingPosition = 0
      this._position = 0
      this._paused = true

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
      <aside className="player">
        {activeTrack && (
          <>
            {this._renderTrackDetails()}
            {this._renderPlaybackControls()}
            {this._renderTimeline()}
            {this._renderPlaybackOptions()}
          </>
        )}
      </aside>
    )
  }
}

Player.propTypes = {
  activeTrack: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
