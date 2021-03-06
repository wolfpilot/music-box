// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Utils
import { fetchPlaylist } from '../../actions';

// Components
import Playlist from '../../components/Stream/Playlist';

const mapStateToProps = state => ({
  playlist: state.stream.playlist
});

const mapDispatchToProps = dispatch => ({
  fetchPlaylist: id => dispatch(fetchPlaylist(id))
});

class PlaylistPage extends Component {
  componentDidMount() {
    const albumID = this.props.match.params.id;

    this.props.fetchPlaylist(albumID);
  }

  render() {
    const { playlist } = this.props;

    return (
      <main role="main">{playlist && <Playlist playlist={playlist} />}</main>
    );
  }
}

PlaylistPage.propTypes = {
  id: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistPage);
