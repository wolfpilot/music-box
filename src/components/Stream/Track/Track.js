// Libs
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Utils
import { playTrack } from '../../../actions';
import { formatMilliseconds } from '../../../static/js/utils/mathHelpers';

const mapStateToProps = state => {
  return {
    player: state.player
  };
};

const mapDispatchToProps = dispatch => ({
  playTrack: activeTrackId => dispatch(playTrack(activeTrackId))
});

class Track extends PureComponent {
  togglePlayPause = () => {
    const { track } = this.props;

    if (!track.preview_url) {
      return;
    }

    this.props.playTrack(track.id);
  };

  getArtists() {
    return this.props.track.artists.map(artist => artist.name).join(', ');
  }

  render() {
    const { player, track } = this.props;

    const {
      id,
      index,
      name,
      artists,
      artwork,
      duration_ms,
      preview_url
    } = track;

    const isActive = player.isPlaying && player.activeTrackId === id;

    return (
      <div
        className="track"
        role="button"
        onClick={this.togglePlayPause}
        disabled={!preview_url}
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
    );
  }
}

const { string, number, array, shape, object } = PropTypes;

Track.propTypes = {
  track: shape({
    id: string.isRequired,
    index: number.isRequired,
    name: string.isRequired,
    artists: array.isRequired,
    artwork: object.isRequired,
    duration_ms: number.isRequired,
    preview_url: string
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Track);
