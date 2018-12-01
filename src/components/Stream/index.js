// Libs
import { connect } from 'react-redux';

// Components
import Stream from './presenter';

const mapStateToProps = state => {
  return {
    playlists: state.stream.playlists,
    tracks: state.stream.tracks
  };
};

export default connect(mapStateToProps)(Stream);
