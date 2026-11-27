// Libs
import React, { PureComponent } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

// Utils
import { playTrack, pauseTrack } from "../../../actions"
import { formatMilliseconds } from "../../../static/js/utils/mathHelpers"

const mapStateToProps = (state) => {
  return {
    player: state.player,
  }
}

const mapDispatchToProps = (dispatch) => ({
  playTrack: (activeTrackId) => dispatch(playTrack(activeTrackId)),
  pauseTrack: () => dispatch(pauseTrack()),
})

class Track extends PureComponent {
  togglePlayPause = () => {
    const { track, player } = this.props

    if (!track.uri) {
      return
    }

    // Clicking the track that's playing pauses it. Clicking it again, or any
    // other track, starts (or resumes) playing.
    if (player.isPlaying && player.activeTrackId === track.id) {
      this.props.pauseTrack()

      return
    }

    this.props.playTrack(track.id)
  }

  getArtists() {
    return this.props.track.artists.map((artist) => artist.name).join(", ")
  }

  render() {
    const { player, track, index } = this.props

    const { id, name, artists, artwork, duration_ms, uri } = track

    const isActive = player.isPlaying && player.activeTrackId === id

    return (
      <div
        className="track"
        role="button"
        onClick={this.togglePlayPause}
        disabled={!uri}
        data-is-active={isActive}
      >
        {index && <div className="track__index">{index}</div>}

        <div className="track__artwork">
          <img className="track__artwork-image" src={artwork.url} alt="" />
        </div>

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
    )
  }
}

const { string, number, array, shape, object } = PropTypes

Track.propTypes = {
  // The track's position in the current album or playlist
  index: number,
  track: shape({
    id: string.isRequired,
    name: string.isRequired,
    artists: array.isRequired,
    artwork: object.isRequired,
    duration_ms: number.isRequired,
    uri: string,
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(Track)
