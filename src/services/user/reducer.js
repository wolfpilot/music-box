// Utils
import * as actionTypes from './actionTypes';

const initialState = {
  isLoggedIn: false,
  accessToken: null
};

const logoutUser = state => {
  return {
    ...state,
    isLoggedIn: false,
    accessToken: null
  };
};

const loginUser = (state, action) => {
  return {
    ...state,
    isLoggedIn: true,
    accessToken: action.accessToken
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return loginUser(state, action);
    case actionTypes.USER_LOGOUT:
      return logoutUser(state);
    default:
      return state;
  }
}
