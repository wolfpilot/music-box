import * as actionTypes from './actionTypes';

export function setActiveTrack(track) {
  return {
    type: actionTypes.SET_ACTIVE_TRACK,
    track
  };
}

export function setIsPlaying(isPlaying) {
  return {
    type: actionTypes.SET_IS_PLAYING,
    isPlaying
  };
}

export const playTrack = track => dispatch => {
  dispatch(setActiveTrack(track));
  dispatch(setIsPlaying(true));
};

export const pauseTrack = () => dispatch => {
  dispatch(setIsPlaying(false));
};
