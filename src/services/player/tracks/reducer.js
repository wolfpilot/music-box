// Utils
import * as actionTypes from './actionTypes';

const setTracks = (state, action) => {
  const { tracks } = action;

  return [...state, ...tracks];
};

export default function(state = [], action) {
  switch (action.type) {
    case actionTypes.TRACKS_SET:
      return setTracks(state, action);
    default:
      return state;
  }
}
