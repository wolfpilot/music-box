import * as actionTypes from './actionTypes';

// Helpers
const isPlayable = track => {
  return !!track.preview_url;
};

const getTrackIndex = (items, trackId) => {
  return items.findIndex(item => item === trackId);
};

const getNextPlayableTrackId = (items, activeTrackId, trackEntities) => {
  const activeTrackIndex = getTrackIndex(items, activeTrackId);

  // If last item in playlist, exit early
  // TODO: Check if there are other tracks in the next playlist paging object
  if (activeTrackIndex === items.length - 1) {
    return;
  }

  const nextTrackId = items[activeTrackIndex + 1];
  const nextTrack = trackEntities[nextTrackId];

  if (!isPlayable(nextTrack)) {
    return getNextPlayableTrackId(items, nextTrackId, trackEntities);
  }

  return nextTrackId;
};

const getPreviousPlayableTrackId = (items, activeTrackId, trackEntities) => {
  const activeTrackIndex = getTrackIndex(items, activeTrackId);

  // If first item in playlist, exit early
  if (activeTrackIndex === 0) {
    return;
  }

  const previousTrackId = items[activeTrackIndex - 1];
  const previousTrack = trackEntities[previousTrackId];

  if (!isPlayable(previousTrack)) {
    return getPreviousPlayableTrackId(items, previousTrackId, trackEntities);
  }

  return previousTrackId;
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

export const playNextTrack = () => (dispatch, getState) => {
  const playlist = getState().stream.playlist;
  const activeTrackId = getState().player.activeTrackId;
  const trackEntities = getState().entities.tracks;

  const { items } = playlist.tracks;

  const nextTrackId = getNextPlayableTrackId(
    items,
    activeTrackId,
    trackEntities
  );

  if (!nextTrackId) {
    // ?: Reached end of playlist. Stop?
    dispatch(pauseTrack());

    return;
  }

  dispatch(playTrack(nextTrackId));
};

export const playPreviousTrack = () => (dispatch, getState) => {
  const playlist = getState().stream.playlist;
  const activeTrackId = getState().player.activeTrackId;
  const trackEntities = getState().entities.tracks;

  const { items } = playlist.tracks;

  const previousTrackId = getPreviousPlayableTrackId(
    items,
    activeTrackId,
    trackEntities
  );

  if (!previousTrackId) {
    // ?: Reached end of playlist. Stop?
    dispatch(pauseTrack());

    return;
  }

  dispatch(playTrack(previousTrackId));
};
