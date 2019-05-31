// Libs
import { combineReducers } from 'redux';

// Data
import entities from './services/entities/reducer';
import session from './services/session/reducer';
import user from './services/user/reducer';
import stream from './services/stream/reducer';
import player from './services/player/reducer';

export default combineReducers({
  entities,
  session,
  user,
  stream,
  player
});
