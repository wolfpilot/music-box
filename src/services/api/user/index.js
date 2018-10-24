// Config
import * as USER from './constants';
import * as API from '../constants';

/**
 * @returns {String} - The modal params
 */
const _getModalFeatures = () => {
  const posTop = window.screen.height / 2 - USER.MODAL_HEIGHT / 2;
  const posLeft = window.screen.width / 2 - USER.MODAL_WIDTH / 2;

  return (
    'menubar=no' +
    'location=no,' +
    'resizable=no,' +
    'scrollbars=no,' +
    'status=no,' +
    `width=${USER.MODAL_WIDTH},` +
    `height=${USER.MODAL_HEIGHT},` +
    `top=${posTop},` +
    `left=${posLeft}`
  );
};

/**
 * @returns {string} - The audio service login URL
 */
const _getLoginURL = () => {
  return (
    `https://accounts.spotify.com/authorize?client_id=${API.CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(API.REDIRECT_URI)}` +
    `&scope=${encodeURIComponent(API.SCOPES.join(' '))}` +
    `&show_dialog=true` +
    `&response_type=token`
  );
};

/**
 * Open Spotify authorization modal
 * @public
 */
export const authorize = () => {
  const url = _getLoginURL();
  const name = USER.MODAL_NAME;
  const features = _getModalFeatures();

  window.open(url, name, features);

  return new Promise((resolve, reject) => {
    window.addEventListener(
      'message',
      e => {
        if (e.origin !== API.ALLOWED_ORIGIN_URI) {
          return;
        }

        const token = e.data.accessToken;

        token ? resolve(token) : reject(USER.MSG_ACCESS_DENIED);
      },
      false
    );
  });
};
