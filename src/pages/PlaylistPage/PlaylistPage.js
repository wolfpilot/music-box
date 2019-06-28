// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Utils
import { fetchPlaylist, mergePlaylist } from '../../actions';

// Components
import Playlist from '../../components/Stream/Playlist/Playlist';

const mapStateToProps = state => {
  return {
    playlist: state.stream.playlist
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPlaylist: id => dispatch(fetchPlaylist(id)),
  mergePlaylist: playlist => dispatch(mergePlaylist(playlist))
});

class PlaylistPage extends Component {
  componentDidMount() {
    const albumID = this.props.match.params.id;

    this.props.fetchPlaylist(albumID);
  }

  componentWillUnmount() {
    // Reset playlist
    this.props.mergePlaylist({});
  }

  render() {
    // TODO: This works for now, but do it the Redux way instead.
    // TODO: Check request isLoading state instead. (SUCCESS, LOADING, FAILURE/ERROR)
    const { playlist } = this.props;

    return <main role="main">{playlist && <Playlist />}</main>;
  }
}

PlaylistPage.propTypes = {
  id: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistPage);
