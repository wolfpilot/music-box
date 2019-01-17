import * as actionTypes from './actionTypes';

export function setActiveTrack(activeTrackID) {
  return {
    type: actionTypes.SET_ACTIVE_TRACK,
    activeTrackID
  };
}

export function setIsPlaying(isPlaying) {
  return {
    type: actionTypes.SET_IS_PLAYING,
    isPlaying
  };
}

export const playTrack = trackID => dispatch => {
  dispatch(setActiveTrack(trackID));
  dispatch(setIsPlaying(true));
};

export const pauseTrack = () => dispatch => {
  dispatch(setIsPlaying(false));
};
