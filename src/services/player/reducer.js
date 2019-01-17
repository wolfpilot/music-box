import * as actionTypes from './actionTypes';

const initialState = {
  activeTrackID: null,
  isPlaying: false
};

const setActiveTrack = (state, activeTrackID) => {
  return { ...state, activeTrackID };
};

const setIsPlaying = (state, isPlaying) => {
  return { ...state, isPlaying };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_TRACK:
      return setActiveTrack(state, action.activeTrackID);
    case actionTypes.SET_IS_PLAYING:
      return setIsPlaying(state, action.isPlaying);
    default:
      return state;
  }
}
