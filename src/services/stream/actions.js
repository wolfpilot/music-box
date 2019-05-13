// Utils
import * as actionTypes from './actionTypes';

export function mergePlaylists(playlists) {
  return {
    type: actionTypes.PLAYLISTS_MERGE,
    playlists
  };
}

export const setTracks = tracks => {
  return {
    type: actionTypes.TRACKS_SET,
    tracks
  };
};

export const setCurrentPlaylist = playlist => {
  return {
    type: actionTypes.CURRENT_PLAYLIST_SET,
    playlist
  };
};
