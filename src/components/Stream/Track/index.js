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
  playTrack: trackID => dispatch(playTrack(trackID))
});

class Track extends PureComponent {
  togglePlayPause = () => {
    if (!this.props.preview_url) {
      return;
    }

    this.props.playTrack(this.props.preview_url);
  };

  getArtists() {
    return this.props.artists.map(artist => artist.name).join(', ');
  }

  render() {
    const {
      player,
      name,
      artists,
      index,
      artwork,
      duration_ms,
      preview_url
    } = this.props;

    const isActive = player.isPlaying && player.activeTrackID === preview_url;

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

Track.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  artists: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  duration_ms: PropTypes.number.isRequired,
  preview_url: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Track);
