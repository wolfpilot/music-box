import { mergeEntities } from './services/entities/actions';
import { setSession, resetSession } from './services/session/actions';
import {
  loginUser,
  logoutUser,
  setUser,
  resetUser,
  fetchMe,
  fetchFeaturedPlaylists,
  fetchPlaylist
} from './services/user/actions';
import {
  mergePlaylists,
  setTracks,
  setCurrentPlaylist
} from './services/stream/actions';
import {
  setActiveTrack,
  setIsPlaying,
  playTrack,
  pauseTrack,
  playNextTrack,
  playPreviousTrack
} from './services/player/actions';

export {
  mergeEntities,
  setSession,
  resetSession,
  loginUser,
  logoutUser,
  setUser,
  resetUser,
  fetchMe,
  fetchFeaturedPlaylists,
  fetchPlaylist,
  mergePlaylists,
  setTracks,
  setCurrentPlaylist,
  setActiveTrack,
  setIsPlaying,
  playTrack,
  pauseTrack,
  playNextTrack,
  playPreviousTrack
};
