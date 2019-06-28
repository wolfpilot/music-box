// Libs
import React, { Component } from 'react';

// Utils
import { getUrlParamByKey } from '../../static/js/utils/urlHelpers';

// Config
import { ALLOWED_ORIGIN_URI } from '../../services/api/constants';

class AuthorizePage extends Component {
  componentDidMount() {
    window.setTimeout(this._handleAuthCallback, 1);
  }

  static getAccessToken() {
    const url = window.location.hash.substr(1);

    return url ? getUrlParamByKey(url, 'access_token') : null;
  }

  /**
   * @private
   */
  _handleAuthCallback = () => {
    const accessToken = AuthorizePage.getAccessToken();

    window.opener.postMessage({ accessToken }, ALLOWED_ORIGIN_URI);

    window.close();
  };

  render() {
    return (
      <main role="main">
        <p>This page should close soon.</p>
      </main>
    );
  }
}

export default AuthorizePage;
