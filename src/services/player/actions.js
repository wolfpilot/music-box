import * as actionTypes from './actionTypes';

// Helpers
const isPlayable = track => {
  return !!track.preview_url;
};

const getNextTrack = (playlist, trackIndex) => {
  return playlist.tracks.items[trackIndex + 1].track;
};

const getNextPlayableTrack = (playlist, track) => {
  const trackIndex = playlist.tracks.items.findIndex(
    item => item.track.id === track.id
  );

  // If last item in playlist, exit early
  // TODO: Check if there are other tracks in the next playlist paging object
  if (trackIndex === playlist.tracks.items.length - 1) {
    return;
  }

  const nextTrack = getNextTrack(playlist, trackIndex);

  if (!isPlayable(nextTrack)) {
    return getNextPlayableTrack(playlist, nextTrack);
  }

  return nextTrack;
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
    dispatch(pauseTrack());

    return;
  }

  const { id, name, artists, artwork, duration_ms, preview_url } = nextTrack;
  const track = { id, name, artists, artwork, duration_ms, preview_url };

  dispatch(playTrack(track));
};
