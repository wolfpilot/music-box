// Libs
import { normalize } from 'normalizr';

// Utils
import * as actionTypes from './actionTypes';
import * as userAPI from '../api/user/user';
import { spotifyAPI } from '../api/player/player';
import {
  mergeEntities,
  mergePlaylists,
  resetSession,
  setSession,
  setCurrentPlaylist
} from '../../actions';
import { playlistSchema } from '../../schemas';

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
      const normalized = normalize(data, playlistSchema);

      dispatch(mergeEntities(normalized.entities));
      dispatch(mergePlaylists(normalized.result));
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
