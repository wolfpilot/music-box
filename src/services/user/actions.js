// Utils
import * as actionTypes from './actionTypes';
import * as userAPI from '../api/user';
import { spotifyAPI } from '../api/player';
import { resetSession, setSession } from '../session/actions';

const fetchMe = () => dispatch => {
  spotifyAPI.getMe().then(
    data => {
      const { display_name, images } = data;

      dispatch(setUser(display_name, images));
    },
    error => {
      console.error(`Error retrieving user data. Reason: ${error}`);
    }
  );
};

export const loginUser = () => dispatch => {
  userAPI
    .authorize()
    .then(accessToken => {
      spotifyAPI.setAccessToken(accessToken);

      dispatch(setSession(accessToken));
      dispatch(fetchMe());
    })
    .catch(error => {
      console.error(`Error authenticating user. Reason: ${error}`);
    });
};

export const logoutUser = () => dispatch => {
  spotifyAPI.setAccessToken(null);

  dispatch(resetSession());
  dispatch(resetUser());
};

export const setUser = (display_name, images) => {
  return {
    type: actionTypes.USER_SET,
    display_name,
    images
  };
};

export const resetUser = () => {
  return {
    type: actionTypes.USER_RESET
  };
};
