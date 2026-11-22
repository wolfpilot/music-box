// Utils
import * as actionTypes from './actionTypes'
import { spotifyAPI } from '../api/player/player'
import { initWebPlayback } from '../api/player/webPlayback'

export const setSession = (accessToken) => {
  spotifyAPI.setAccessToken(accessToken)
  initWebPlayback(accessToken)

  return {
    type: actionTypes.SESSION_SET,
    accessToken,
  }
}

export const resetSession = () => {
  spotifyAPI.setAccessToken(null)

  return {
    type: actionTypes.SESSION_RESET,
  }
}
