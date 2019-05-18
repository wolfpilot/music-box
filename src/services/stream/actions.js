// Utils
import * as actionTypes from './actionTypes';

export function mergeFeaturedPlaylists(featuredPlaylists) {
  return {
    type: actionTypes.FEATURED_PLAYLISTS_MERGE,
    featuredPlaylists
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
