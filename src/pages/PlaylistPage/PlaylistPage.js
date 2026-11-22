// Libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Utils
import { fetchPlaylist, fetchAlbum, mergePlaylist } from '../../actions'

// Components
import Playlist from '../../components/Stream/Playlist/Playlist'

const mapStateToProps = (state) => {
  return {
    playlist: state.stream.playlist,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchPlaylist: (id) => dispatch(fetchPlaylist(id)),
  fetchAlbum: (id) => dispatch(fetchAlbum(id)),
  mergePlaylist: (playlist) => dispatch(mergePlaylist(playlist)),
})

class PlaylistPage extends Component {
  componentDidMount() {
    const { id } = this.props.match.params

    // Albums reuse this page, they're rendered like a playlist
    if (this.props.isAlbum) {
      this.props.fetchAlbum(id)
    } else {
      this.props.fetchPlaylist(id)
    }
  }

  componentWillUnmount() {
    // Reset playlist
    this.props.mergePlaylist({})
  }

  render() {
    const { playlist } = this.props

    return <main role="main">{playlist && <Playlist />}</main>
  }
}

PlaylistPage.propTypes = {
  id: PropTypes.string,
  isAlbum: PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage)
