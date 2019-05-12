// Utils
import * as actionTypes from './actionTypes';
import * as userAPI from '../api/user/user';
import { spotifyAPI } from '../api/player/player';
import {
  resetSession,
  setSession,
  setPlaylists,
  setCurrentPlaylist
} from '../../actions';

export const fetchMe = () => dispatch => {
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

export const fetchFeaturedPlaylists = () => dispatch => {
  spotifyAPI
    .getFeaturedPlaylists({ limit: 12 })
    .then(data => {
      dispatch(setPlaylists(data.playlists.items));
    })
    .catch(err => {
      console.error(err);
    });
};

export const fetchPlaylist = id => dispatch => {
  const fields = [
    'description',
    'followers.total',
    'id',
    'images',
    'name',
    'owner',
    'tracks'
  ].join(',');

  spotifyAPI
    .getPlaylist(id, { fields })
    .then(data => {
      dispatch(setCurrentPlaylist(data));
    })
    .catch(err => {
      console.error(err);
    });
};

export const loginUser = () => dispatch => {
  userAPI
    .authorize()
    .then(accessToken => {
      dispatch(setSession(accessToken));
      dispatch(fetchMe());
    })
    .catch(error => {
      console.error(`Error authenticating user. Reason: ${error}`);
    });
};

export const logoutUser = () => dispatch => {
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
