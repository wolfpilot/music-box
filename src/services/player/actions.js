import * as actionTypes from './actionTypes';

// Helpers
const isPlayable = track => {
  return !!track.preview_url;
};

const getNextTrack = (playlist, trackIndex) => {
  return playlist.tracks.items[trackIndex + 1].track;
};

const getPreviousTrack = (playlist, trackIndex) => {
  return playlist.tracks.items[trackIndex - 1].track;
};

const getTrackIndex = (playlist, track) => {
  return playlist.tracks.items.findIndex(item => item.track.id === track.id);
};

const getNextPlayableTrack = (playlist, track) => {
  const trackIndex = getTrackIndex(playlist, track);

  // If last item in playlist, exit early
  if (trackIndex === playlist.tracks.items.length - 1) {
    return;
  }

  const nextTrack = getNextTrack(playlist, trackIndex);

  if (!isPlayable(nextTrack)) {
    return getNextPlayableTrack(playlist, nextTrack);
  }

  return nextTrack;
};

const getPreviousPlayableTrack = (playlist, track) => {
  const trackIndex = getTrackIndex(playlist, track);

  // If first item in playlist, exit early
  if (trackIndex === 0) {
    return;
  }

  const previousTrack = getPreviousTrack(playlist, trackIndex);

  if (!isPlayable(previousTrack)) {
    return getPreviousPlayableTrack(playlist, previousTrack);
  }

  return previousTrack;
};

// Actions
export function setActiveTrack(track) {
  return {
    type: actionTypes.SET_ACTIVE_TRACK,
    track
  };
}

export function setIsPlaying(isPlaying) {
  return {
    type: actionTypes.SET_IS_PLAYING,
    isPlaying
  };
}

export const playTrack = track => dispatch => {
  dispatch(setActiveTrack(track));
  dispatch(setIsPlaying(true));
};

export const pauseTrack = () => dispatch => {
  dispatch(setIsPlaying(false));
};

export const playNextTrack = () => (dispatch, getState) => {
  const playlist = getState().stream.playlist;
  const activeTrack = getState().player.track;

  const nextTrack = getNextPlayableTrack(playlist, activeTrack);

  if (!nextTrack) {
    // ?: Reached end of playlist. Stop?
    dispatch(pauseTrack());

    return;
  }

  const { id, name, artists, artwork, duration_ms, preview_url } = nextTrack;
  const track = { id, name, artists, artwork, duration_ms, preview_url };

  dispatch(playTrack(track));
};

export const playPreviousTrack = () => (dispatch, getState) => {
  const playlist = getState().stream.playlist;
  const activeTrack = getState().player.track;

  const previousTrack = getPreviousPlayableTrack(playlist, activeTrack);

  if (!previousTrack) {
    // ?: Reached end of playlist. Stop?
    dispatch(pauseTrack());

    return;
  }

  const {
    id,
    name,
    artists,
    artwork,
    duration_ms,
    preview_url
  } = previousTrack;
  const track = { id, name, artists, artwork, duration_ms, preview_url };

  dispatch(playTrack(track));
};
