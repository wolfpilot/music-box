// Utils
import * as actionTypes from './actionTypes';

const initialState = {
  playlists: {},
  tracks: []
};

const mergePlaylists = (state, payload) => {
  return {
    ...state,
    playlists: {
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
    case actionTypes.PLAYLISTS_MERGE:
      return mergePlaylists(state, action.playlists);
    case actionTypes.TRACKS_SET:
      return setTracks(state, action);
    case actionTypes.CURRENT_PLAYLIST_SET:
      return setCurrentPlaylist(state, action);
    default:
      return state;
  }
}
