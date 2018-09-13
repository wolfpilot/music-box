// Libs
import SpotifyWebApi from 'spotify-web-api-js';

// Config
import {
  MODAL_WIDTH,
  MODAL_HEIGHT,
  MSG_ACCESS_GRANTED,
  MSG_ACCESS_DENIED
} from './constants';
import {
  CLIENT_ID,
  ALLOWED_ORIGIN_URI,
  REDIRECT_URI,
  SCOPES
} from '../constants';

class UserAPI {
  constructor() {
    this.state = {
      accessGranted: false,
      accessToken: null
    };
  }

  /**
   * @returns {string} - The audio service login URL
   */
  static getLoginURL() {
    return (
      `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&scope=${encodeURIComponent(SCOPES.join(' '))}` +
      `&show_dialog=true` +
      `&response_type=token`
    );
  }

  /**
   * @returns {Object} - The modal params
   */
  static getModalOptions() {
    const posTop = window.screen.height / 2 - MODAL_HEIGHT / 2;
    const posLeft = window.screen.width / 2 - MODAL_WIDTH / 2;

    const url = UserAPI.getLoginURL();
    const name = 'Authorize - Spotify';
    const features = `menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=${MODAL_WIDTH},height=${MODAL_HEIGHT},top=${posTop},left=${posLeft}`;

    return {
      url,
      name,
      features
    };
  }

  /**
   * @private
   */
  _onLogin() {
    this.spotifyAPI = new SpotifyWebApi();

    this.spotifyAPI.setAccessToken(this.state.accessToken);
  }

  /**
   * @public
   */
  authorize() {
    const options = UserAPI.getModalOptions();

    window.open(options.url, options.name, options.features);

    return new Promise((resolve, reject) => {
      window.addEventListener(
        'message',
        e => {
          if (e.origin !== ALLOWED_ORIGIN_URI) {
            return;
          }

          const token = e.data.accessToken;

          if (token) {
            this.state.accessGranted = true;
            this.state.accessToken = token;

            this._onLogin();

            resolve(MSG_ACCESS_GRANTED);
          } else {
            this.state.accessGranted = false;
            this.state.accessToken = null;

            reject(MSG_ACCESS_DENIED);
          }
        },
        false
      );
    });
  }
}

export default new UserAPI();
