// Utils
import * as actionTypes from './actionTypes';

import * as userAPI from '../api/user/';

export const loginUser = () => {
  return dispatch => {
    userAPI
      .authorize()
      .then(accessToken => {
        dispatch({
          type: actionTypes.USER_LOGIN,
          accessToken
        });
      })
      .catch(error => {
        console.error(`Error authenticating user. Reason: ${error}`);
      });
  };
};

export const logoutUser = () => {
  return {
    type: actionTypes.USER_LOGOUT
  };
};
