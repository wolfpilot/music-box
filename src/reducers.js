// Libs
import { combineReducers } from 'redux';

// Data
import user from './services/user/reducer';
import tracks from './services/player/tracks/reducer';

export default combineReducers({
  user,
  tracks
});
