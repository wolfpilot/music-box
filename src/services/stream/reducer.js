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

const mergePlaylist = (state, payload) => {
  return {
    ...state,
    playlist: { ...payload }
  };
};

const setTracks = (state, action) => {
  const { tracks } = action;

  return { ...state, tracks };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FEATURED_PLAYLISTS_MERGE:
      return mergeFeaturedPlaylists(state, action.featuredPlaylists);
    case actionTypes.PLAYLIST_MERGE:
      return mergePlaylist(state, action.playlist);
    case actionTypes.TRACKS_SET:
      return setTracks(state, action);
    default:
      return state;
  }
}
