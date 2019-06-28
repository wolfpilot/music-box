// Utils
import * as actionTypes from './actionTypes';

const initialState = {
  featuredPlaylists: {}
};

const mergeFeaturedPlaylists = (state, payload) => {
  return {
    ...state,
    featuredPlaylists: {
      ...payload.playlists
    }
  };
};

const mergePlaylist = (state, payload) => {
  return {
    ...state,
    playlist: { ...payload }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FEATURED_PLAYLISTS_MERGE:
      return mergeFeaturedPlaylists(state, action.featuredPlaylists);
    case actionTypes.PLAYLIST_MERGE:
      return mergePlaylist(state, action.playlist);
    default:
      return state;
  }
}
