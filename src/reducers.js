// Libs
import { combineReducers } from 'redux';

// Data
import session from './services/session/reducer';
import user from './services/user/reducer';
import tracks from './services/player/tracks/reducer';

export default combineReducers({
  session,
  user,
  tracks
});
