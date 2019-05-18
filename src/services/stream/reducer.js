// Utils
import * as actionTypes from './actionTypes';

const initialState = {
  featuredPlaylists: {},
  tracks: []
};

const mergeFeaturedPlaylists = (state, payload) => {
  return {
    ...state,
    featuredPlaylists: {
      ...payload.playlists
    }
  };
};

const setTracks = (state, action) => {
  const { tracks } = action;

  return { ...state, tracks };
};

const setCurrentPlaylist = (state, action) => {
  const { playlist } = action;

  return { ...state, playlist };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FEATURED_PLAYLISTS_MERGE:
      return mergeFeaturedPlaylists(state, action.featuredPlaylists);
    case actionTypes.TRACKS_SET:
      return setTracks(state, action);
    case actionTypes.CURRENT_PLAYLIST_SET:
      return setCurrentPlaylist(state, action);
    default:
      return state;
  }
}
