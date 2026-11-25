import * as actionTypes from "./actionTypes"

const initialState = {
  activeTrackId: null,
  isPlaying: false,
  queue: [],
  isRepeating: false,
  isShuffling: false,
  shuffledQueue: [],
}

const setActiveTrack = (state, activeTrackId) => {
  return { ...state, activeTrackId }
}

const setIsPlaying = (state, isPlaying) => {
  return { ...state, isPlaying }
}

const setQueue = (state, queue) => {
  return { ...state, queue }
}

const toggleRepeat = (state) => {
  return { ...state, isRepeating: !state.isRepeating }
}

const setShuffle = (state, isShuffling, shuffledQueue) => {
  return { ...state, isShuffling, shuffledQueue }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_TRACK:
      return setActiveTrack(state, action.activeTrackId)
    case actionTypes.SET_IS_PLAYING:
      return setIsPlaying(state, action.isPlaying)
    case actionTypes.SET_QUEUE:
      return setQueue(state, action.queue)
    case actionTypes.TOGGLE_REPEAT:
      return toggleRepeat(state)
    case actionTypes.SET_SHUFFLE:
      return setShuffle(state, action.isShuffling, action.shuffledQueue)
    case actionTypes.RESET_PLAYER:
      return initialState
    default:
      return state
  }
}
