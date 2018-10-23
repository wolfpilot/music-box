// Libs
import SpotifyWebApi from 'spotify-web-api-js';

// Config
import * as USER from './constants';
import * as API from '../constants';

class UserAPI {
  constructor() {
    this.state = {
      accessGranted: false,
      accessToken: null
    };
  }

  /**
   * @returns {String} - The modal params
   */
  static getModalFeatures() {
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
  }

  /**
   * @returns {string} - The audio service login URL
   */
  static getLoginURL() {
    return (
      `https://accounts.spotify.com/authorize?client_id=${API.CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(API.REDIRECT_URI)}` +
      `&scope=${encodeURIComponent(API.SCOPES.join(' '))}` +
      `&show_dialog=true` +
      `&response_type=token`
    );
  }

  /**
   * @private
   */
  _onLogin() {
    this.spotifyAPI = new SpotifyWebApi();

    this.spotifyAPI.setAccessToken(this.state.accessToken);
  }

  /**
   * Open Spotify authorization modal
   * @public
   */
  authorize() {
    const url = UserAPI.getLoginURL();
    const name = 'Authorize - Spotify';
    const features = UserAPI.getModalFeatures();

    window.open(url, name, features);

    return new Promise((resolve, reject) => {
      window.addEventListener(
        'message',
        e => {
          if (e.origin !== API.ALLOWED_ORIGIN_URI) {
            return;
          }

          const token = e.data.accessToken;

          if (token) {
            this.state.accessGranted = true;
            this.state.accessToken = token;

            this._onLogin();

            resolve(USER.MSG_ACCESS_GRANTED);
          } else {
            this.state.accessGranted = false;
            this.state.accessToken = null;

            reject(USER.MSG_ACCESS_DENIED);
          }
        },
        false
      );
    });
  }

  /**
   * Reset user credentials
   * @public
   */
  logout() {
    this.state.accessGranted = false;
    this.state.accessToken = null;
  }
}

export default new UserAPI();
