// Libs
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Utils
import { playTrack, pauseTrack } from '../../../actions';
import { formatMilliseconds } from '../../../static/js/utils/mathHelpers';

const mapStateToProps = state => {
  return {
    player: state.player
  };
};

const mapDispatchToProps = dispatch => ({
  playTrack: trackID => dispatch(playTrack(trackID)),
  pauseTrack: () => dispatch(pauseTrack())
});

class Track extends PureComponent {
  state = {
    isActive: false
  };

  togglePlayPause = () => {
    if (!this.props.preview_url) {
      return;
    }

    this.state.isActive
      ? this.props.pauseTrack()
      : this.props.playTrack(this.props.preview_url);
  };

  getArtists() {
    return this.props.artists.map(artist => artist.name).join(', ');
  }

  componentDidUpdate() {
    const { player } = this.props;

    // @TODO: Optimise. Are previous props and state even relevant here?
    if (player.isPlaying) {
      if (player.activeTrackID === this.props.preview_url) {
        this.setState({ isActive: true });
      } else {
        this.setState({ isActive: false });
      }
    } else {
      this.setState({ isActive: false });
    }
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
      <div
        className="track"
        role="button"
        onClick={this.togglePlayPause}
        disabled={!preview_url}
        data-is-active={this.state.isActive}
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
