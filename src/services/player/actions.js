import * as actionTypes from './actionTypes';

// Helpers
const isPlayable = track => {
  return !!track.preview_url;
};

const getTrackIndex = (items, trackId) => {
  return items.findIndex(item => item === trackId);
};

const getIteratedTrack = (items, trackId, trackEntities, offset) => {
  const trackIndex = getTrackIndex(items, trackId);

  // If first or last item in playlist, exit early
  if (trackIndex === 0 || trackIndex === items.length - 1) {
    return;
  }

  const iteratedTrackId = items[trackIndex + offset];
  const iteratedTrack = trackEntities[iteratedTrackId];

  if (!isPlayable(iteratedTrack)) {
    return getIteratedTrack(items, iteratedTrackId, trackEntities, offset);
  }

  return iteratedTrackId;
};

// Actions
export function setActiveTrack(activeTrackId) {
  return {
    type: actionTypes.SET_ACTIVE_TRACK,
    activeTrackId
  };
}

export function setIsPlaying(isPlaying) {
  return {
    type: actionTypes.SET_IS_PLAYING,
    isPlaying
  };
}

export const playTrack = trackId => dispatch => {
  dispatch(setActiveTrack(trackId));
  dispatch(setIsPlaying(true));
};

export const pauseTrack = () => dispatch => {
  dispatch(setIsPlaying(false));
};

export const playIteratedTrack = offset => (dispatch, getState) => {
  const playlist = getState().stream.playlist;
  const activeTrackId = getState().player.activeTrackId;
  const trackEntities = getState().entities.tracks;

  const { items } = playlist.tracks;

  const offsetTrackId = getIteratedTrack(
    items,
    activeTrackId,
    trackEntities,
    offset
  );

  if (!offsetTrackId) {
    // ?: Reached start/end of playlist. Stop?
    dispatch(pauseTrack());

    return;
  }

  dispatch(playTrack(offsetTrackId));
};

export const playNextTrack = () => dispatch => {
  dispatch(playIteratedTrack(1));
};

export const playPreviousTrack = () => dispatch => {
  dispatch(playIteratedTrack(-1));
};
