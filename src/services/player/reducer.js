import * as actionTypes from './actionTypes';

const initialState = {
  activeTrackId: null,
  isPlaying: false
};

const setActiveTrack = (state, activeTrackId) => {
  return { ...state, activeTrackId };
};

const setIsPlaying = (state, isPlaying) => {
  return { ...state, isPlaying };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_TRACK:
      return setActiveTrack(state, action.activeTrackId);
    case actionTypes.SET_IS_PLAYING:
      return setIsPlaying(state, action.isPlaying);
    default:
      return state;
  }
}
