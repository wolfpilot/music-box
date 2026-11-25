import { mergeEntities } from "./services/entities/actions"
import { setSession, resetSession } from "./services/session/actions"
import {
  loginUser,
  logoutUser,
  setUser,
  resetUser,
  fetchMe,
  fetchFeaturedPlaylists,
  fetchPlaylist,
  fetchAlbum,
} from "./services/user/actions"
import {
  mergeFeaturedPlaylists,
  mergePlaylist,
} from "./services/stream/actions"
import {
  setActiveTrack,
  setQueue,
  toggleRepeat,
  toggleShuffle,
  resetPlayer,
  setIsPlaying,
  playTrack,
  pauseTrack,
  playNextTrack,
  playPreviousTrack,
} from "./services/player/actions"

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
  fetchAlbum,
  mergeFeaturedPlaylists,
  mergePlaylist,
  setActiveTrack,
  setQueue,
  toggleRepeat,
  toggleShuffle,
  resetPlayer,
  setIsPlaying,
  playTrack,
  pauseTrack,
  playNextTrack,
  playPreviousTrack,
}
