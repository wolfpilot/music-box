import * as actionTypes from "./actionTypes"
import { seekPlayback } from "../api/player/webPlayback"

// Helpers
const isPlayable = (track) => {
  return !!track && !!track.uri
}

// Find the closest playable track in the given direction (1 = next, -1 = previous)
const getIteratedTrack = (queue, trackId, trackEntities, offset) => {
  let index = queue.indexOf(trackId)

  if (index === -1) {
    return
  }

  index += offset

  while (index >= 0 && index < queue.length) {
    if (isPlayable(trackEntities[queue[index]])) {
      return queue[index]
    }

    index += offset
  }
}

// Actions
export function setActiveTrack(activeTrackId) {
  return {
    type: actionTypes.SET_ACTIVE_TRACK,
    activeTrackId,
  }
}

export function setQueue(queue) {
  return {
    type: actionTypes.SET_QUEUE,
    queue,
  }
}

export function toggleRepeat() {
  return {
    type: actionTypes.TOGGLE_REPEAT,
  }
}

export function setIsPlaying(isPlaying) {
  return {
    type: actionTypes.SET_IS_PLAYING,
    isPlaying,
  }
}

export const playTrack = (trackId) => (dispatch, getState) => {
  const { activeTrackId, isPlaying } = getState().player
  const { playlist } = getState().stream
  const items = playlist && playlist.tracks && playlist.tracks.items

  if (isPlaying && activeTrackId === trackId) {
    console.log("REPLAY!")
  }

  // Remember the list the track is played from, so the next and previous
  // buttons keep working after leaving the album or playlist page
  if (items && items.includes(trackId)) {
    dispatch(setQueue(items))
  }

  dispatch(setActiveTrack(trackId))
  dispatch(setIsPlaying(true))
}

export const pauseTrack = () => (dispatch) => {
  dispatch(setIsPlaying(false))
}

export const playIteratedTrack =
  (offset, wrap = false) =>
  (dispatch, getState) => {
    const { activeTrackId, queue } = getState().player
    const trackEntities = getState().entities.tracks

    const offsetTrackId = getIteratedTrack(
      queue,
      activeTrackId,
      trackEntities,
      offset
    )

    if (offsetTrackId) {
      dispatch(playTrack(offsetTrackId))

      return
    }

    if (wrap && offset > 0) {
      // At the last track, "next" goes back to the first playable one
      const firstTrackId = queue.find((id) => isPlayable(trackEntities[id]))

      if (firstTrackId === activeTrackId) {
        seekPlayback(0)
      }

      if (firstTrackId) {
        dispatch(playTrack(firstTrackId))

        return
      }
    }

    if (offset < 0) {
      // At the first track, "previous" restarts it
      seekPlayback(0)

      return
    }

    // Reached the end of the list
    dispatch(pauseTrack())
  }

// Pass `wrap` to loop back to the first track after the last one. Without it
// (e.g. when a track ends by itself) the player stops at the end of the list.
export const playNextTrack = (wrap) => (dispatch) => {
  dispatch(playIteratedTrack(1, wrap === true))
}

export const playPreviousTrack = () => (dispatch) => {
  dispatch(playIteratedTrack(-1))
}
