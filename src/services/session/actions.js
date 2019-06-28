// Utils
import * as actionTypes from './actionTypes';
import { spotifyAPI } from '../api/player/player';

export const setSession = accessToken => {
  spotifyAPI.setAccessToken(accessToken);

  return {
    type: actionTypes.SESSION_SET,
    accessToken
  };
};

export const resetSession = () => {
  spotifyAPI.setAccessToken(null);

  return {
    type: actionTypes.SESSION_RESET
  };
};
