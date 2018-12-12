// Utils
import * as actionTypes from './actionTypes';

export const setTracks = tracks => {
  return {
    type: actionTypes.TRACKS_SET,
    tracks
  };
};

export const setPlaylists = playlists => {
  return {
    type: actionTypes.PLAYLISTS_SET,
    playlists
  };
};

export const setCurrentPlaylist = playlist => {
  return {
    type: actionTypes.CURRENT_PLAYLIST_SET,
    playlist
  };
};
