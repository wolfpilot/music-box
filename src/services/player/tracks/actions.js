// Utils
import * as actionTypes from './actionTypes';

export const setTracks = tracks => {
  return {
    type: actionTypes.TRACKS_SET,
    tracks
  };
};
