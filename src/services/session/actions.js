// Utils
import * as actionTypes from './actionTypes';

export const setSession = accessToken => {
  return {
    type: actionTypes.SESSION_SET,
    accessToken
  };
};

export const resetSession = () => {
  return {
    type: actionTypes.SESSION_RESET
  };
};
