// Utils
import * as actionTypes from './actionTypes';

const initialState = [
  {
    title: 'First track',
    length: '03:48'
  },
  {
    title: 'Second track',
    length: '05:21'
  }
];

const setTracks = (state, action) => {
  const { tracks } = action;

  return [...state, ...tracks];
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TRACKS_SET:
      return setTracks(state, action);
    default:
      return state;
  }
}
