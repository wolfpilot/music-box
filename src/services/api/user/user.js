// Config
import * as USER from './constants'
import * as API from '../constants'

/**
 * @returns {String} - The modal params
 */
const _getModalFeatures = () => {
  const posTop = window.screen.height / 2 - USER.MODAL_HEIGHT / 2
  const posLeft = window.screen.width / 2 - USER.MODAL_WIDTH / 2

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
  )
}

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const MESSAGE_TYPE = 'spotify-auth'

/**
 * @param {Uint8Array} bytes
 * @returns {string} - URL-safe base64 without padding
 */
const _base64UrlEncode = (bytes) => {
  return window
    .btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

/**
 * @param {number} length
 * @returns {string} - A random URL-safe string
 */
const _getRandomString = (length) => {
  const bytes = window.crypto.getRandomValues(new Uint8Array(length))

  return _base64UrlEncode(bytes).slice(0, length)
}

/**
 * @param {string} verifier
 * @returns {Promise<string>} - The PKCE code challenge (S256)
 */
const _getCodeChallenge = (verifier) => {
  return window.crypto.subtle
    .digest('SHA-256', new TextEncoder().encode(verifier))
    .then((digest) => _base64UrlEncode(new Uint8Array(digest)))
}

/**
 * @param {string} state
 * @param {string} codeChallenge
 * @returns {string} - The audio service login URL
 */
const _getLoginURL = (state, codeChallenge) => {
  return (
    `https://accounts.spotify.com/authorize?client_id=${API.CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(API.REDIRECT_URI)}` +
    `&scope=${encodeURIComponent(API.SCOPES.join(' '))}` +
    `&show_dialog=true` +
    `&response_type=code` +
    `&state=${state}` +
    `&code_challenge_method=S256` +
    `&code_challenge=${codeChallenge}`
  )
}

/**
 * @param {string} code - The authorization code returned by Spotify
 * @param {string} verifier - The PKCE code verifier
 * @returns {Promise<string>} - The access token
 */
const _exchangeCode = (code, verifier) => {
  const body = new URLSearchParams({
    client_id: API.CLIENT_ID,
    grant_type: 'authorization_code',
    code,
    redirect_uri: API.REDIRECT_URI,
    code_verifier: verifier,
  })

  return fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((data) => data.access_token)
}

/**
 * Open Spotify authorization modal (Authorization Code flow with PKCE)
 * @public
 */
export const authorize = () => {
  // Open synchronously so the browser doesn't block it as a popup,
  // then point it to Spotify once the code challenge is ready
  const modal = window.open('', USER.MODAL_NAME, _getModalFeatures())

  if (!modal) {
    return Promise.reject(USER.MSG_ACCESS_DENIED)
  }

  const state = _getRandomString(32)
  const verifier = _getRandomString(64)

  return _getCodeChallenge(verifier).then((challenge) => {
    modal.location.href = _getLoginURL(state, challenge)

    return new Promise((resolve, reject) => {
      const onMessage = (e) => {
        if (
          e.origin !== API.ALLOWED_ORIGIN_URI ||
          !e.data ||
          e.data.type !== MESSAGE_TYPE
        ) {
          return
        }

        window.removeEventListener('message', onMessage, false)

        const { code, error, state: returnedState } = e.data

        if (error || !code || returnedState !== state) {
          reject(USER.MSG_ACCESS_DENIED)

          return
        }

        _exchangeCode(code, verifier)
          .then(resolve)
          .catch(() => reject(USER.MSG_ACCESS_DENIED))
      }

      window.addEventListener('message', onMessage, false)
    })
  })
}
