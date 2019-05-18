// Libs
import { connect } from 'react-redux';

// Components
import Stream from './presenter';

const mapStateToProps = state => {
  return {
    featuredPlaylists: state.stream.featuredPlaylists,
    featuredPlaylistEntities: state.entities.featuredPlaylists
  };
};

export default connect(mapStateToProps)(Stream);
