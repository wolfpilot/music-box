// Utils
import * as actionTypes from './actionTypes';

export const loginUser = () => {
  return {
    type: actionTypes.USER_LOGIN
  };
};

export const logoutUser = () => {
  return {
    type: actionTypes.USER_LOGOUT
  };
};
