import * as actionTypes from "./actionTypes"

const initialState = {
  activeTrackId: null,
  isPlaying: false,
  queue: [],
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

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_TRACK:
      return setActiveTrack(state, action.activeTrackId)
    case actionTypes.SET_IS_PLAYING:
      return setIsPlaying(state, action.isPlaying)
    case actionTypes.SET_QUEUE:
      return setQueue(state, action.queue)
    default:
      return state
  }
}
