// Utils
import * as actionTypes from './actionTypes';

export const mergeFeaturedPlaylists = featuredPlaylists => {
  return {
    type: actionTypes.FEATURED_PLAYLISTS_MERGE,
    featuredPlaylists
  };
};

export const mergePlaylist = playlist => {
  return {
    type: actionTypes.PLAYLIST_MERGE,
    playlist
  };
};

export const setTracks = tracks => {
  return {
    type: actionTypes.TRACKS_SET,
    tracks
  };
};
