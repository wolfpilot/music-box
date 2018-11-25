// Utils
import * as actionTypes from './actionTypes';

const initialState = {
  isLoggedIn: false,
  accessToken: null
};

const setSession = (state, action) => {
  return {
    ...state,
    isLoggedIn: true,
    accessToken: action.accessToken
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SESSION_SET:
      return setSession(state, action);
    case actionTypes.SESSION_RESET:
      return initialState;
    default:
      return state;
  }
}
