// Libs
import { connect } from 'react-redux';

// Components
import Stream from './presenter';

const mapStateToProps = state => {
  return {
    tracks: state.tracks
  };
};

export default connect(mapStateToProps)(Stream);
