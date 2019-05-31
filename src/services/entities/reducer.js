import * as actionTypes from './actionTypes';

const initialState = {
  featuredPlaylists: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MERGE_ENTITIES:
      return { ...state, ...action.entities };
    default:
      return state;
  }
}
