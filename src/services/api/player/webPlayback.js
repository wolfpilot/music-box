import { spotifyAPI } from "./player"

const SDK_URL = "https://sdk.scdn.co/spotify-player.js"
const PLAYER_NAME = "Music Box"

let accessToken = null
let player = null
let deviceId = null

const stateListeners = new Set()

/**
 * @param {Function} callback - Called with the SDK playback state on every change
 * @returns {Function} - Unsubscribe function
 */
export const onPlayerStateChange = (callback) => {
  stateListeners.add(callback)

  return () => stateListeners.delete(callback)
}

/**
 * Start playing a track on this browser's device
 * @param {String} uri - The Spotify track URI
 * @returns {Promise}
 */
export const playUri = (uri, positionMs = 0) => {
  if (!deviceId) {
    return Promise.reject(new Error("Web Playback device is not ready yet"))
  }

  return spotifyAPI.play({
    device_id: deviceId,
    uris: [uri],
    position_ms: positionMs,
  })
}

export const pausePlayback = () => player && player.pause()

export const resumePlayback = () => player && player.resume()

export const seekPlayback = (positionMs) => player && player.seek(positionMs)

// Volume goes from 0 (muted) to 1 (full)
export const setPlaybackVolume = (volume) => player && player.setVolume(volume)

const createPlayer = () => {
  // The user may have logged out while the SDK was still loading
  if (!accessToken || player) {
    return
  }

  player = new window.Spotify.Player({
    name: PLAYER_NAME,
    getOAuthToken: (callback) => callback(accessToken),
    volume: 1,
  })

  player.addListener("ready", ({ device_id }) => {
    deviceId = device_id

    console.log("[Web Playback] Ready, device id:", device_id)
  })

  player.addListener("not_ready", ({ device_id }) => {
    deviceId = null

    console.warn("[Web Playback] Device went offline:", device_id)
  })

  player.addListener("player_state_changed", (state) => {
    stateListeners.forEach((callback) => callback(state))
  })

  ;[
    "initialization_error",
    "authentication_error",
    "account_error",
    "playback_error",
  ].forEach((type) => {
    player.addListener(type, ({ message }) => {
      console.error(`[Web Playback] ${type}:`, message)
    })
  })

  player.connect().then((success) => {
    console.log("[Web Playback] Connected:", success)
  })
}

/**
 * Load the Spotify Web Playback SDK and connect a player, so the browser
 * becomes a Spotify Connect device. Needs a Premium account and the
 * `streaming` scope.
 * @param {String} token - The user's access token
 */
export const initWebPlayback = (token) => {
  // Always keep the latest token, the SDK asks for it whenever it needs one
  accessToken = token

  if (!token || player) {
    return
  }

  // The SDK script is only loaded once, so it's already there after a re-login
  if (window.Spotify) {
    createPlayer()

    return
  }

  window.onSpotifyWebPlaybackSDKReady = createPlayer

  if (document.getElementById("spotify-sdk")) {
    return
  }

  const script = document.createElement("script")

  script.id = "spotify-sdk"
  script.src = SDK_URL
  script.async = true

  document.body.appendChild(script)
}

/**
 * Disconnect the player, so it stops asking Spotify for access
 */
export const disconnectWebPlayback = () => {
  accessToken = null
  deviceId = null

  if (player) {
    player.disconnect()

    player = null
  }
}
