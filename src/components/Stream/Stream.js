// Libs
import { connect } from 'react-redux';

// Components
import Stream from './presenter';

const mapStateToProps = state => {
  return {
    playlists: state.stream.playlists,
    playlistEntities: state.entities.playlists
  };
};

export default connect(mapStateToProps)(Stream);
