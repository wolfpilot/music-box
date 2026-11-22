// Libs
import React, { Component } from 'react'

// Config
import { ALLOWED_ORIGIN_URI } from '../../services/api/constants'

class AuthorizePage extends Component {
  componentDidMount() {
    window.setTimeout(this._handleAuthCallback, 1)
  }

  /**
   * @private
   */
  _handleAuthCallback = () => {
    const params = new URLSearchParams(window.location.search)

    window.opener.postMessage(
      {
        type: 'spotify-auth',
        code: params.get('code'),
        error: params.get('error'),
        state: params.get('state'),
      },
      ALLOWED_ORIGIN_URI
    )

    window.close()
  }

  render() {
    return (
      <main role="main">
        <p>This page should close soon.</p>
      </main>
    )
  }
}

export default AuthorizePage
