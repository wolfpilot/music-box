// Utils
import * as actionTypes from './actionTypes';

import * as userAPI from '../api/user';
import { spotifyAPI } from '../api/player';

export const loginUser = () => {
  return dispatch => {
    userAPI
      .authorize()
      .then(accessToken => {
        dispatch({
          type: actionTypes.USER_LOGIN,
          accessToken
        });

        spotifyAPI.setAccessToken(accessToken);
      })
      .catch(error => {
        console.error(`Error authenticating user. Reason: ${error}`);
      });
  };
};

export const logoutUser = () => {
  spotifyAPI.setAccessToken(null);

  return {
    type: actionTypes.USER_LOGOUT
  };
};
