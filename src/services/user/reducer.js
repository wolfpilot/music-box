// Utils
import * as actionTypes from './actionTypes';

const initialState = {
  isLoggedIn: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return { isLoggedIn: true };
    case actionTypes.USER_LOGOUT:
      return { isLoggedIn: false };
    default:
      return state;
  }
}
