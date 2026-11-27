// Libs
import { normalize } from "normalizr"

// Utils
import * as actionTypes from "./actionTypes"
import * as userAPI from "../api/user/user"
import { spotifyAPI } from "../api/player/player"
import {
  mergeEntities,
  mergeFeaturedPlaylists,
  resetSession,
  resetPlayer,
  setSession,
  mergePlaylist,
} from "../../actions"
import { featuredPlaylistSchema, trackSchema } from "../../schemas"
import { history } from "../../history"
import { isUnauthorizedError } from "../../static/js/utils/apiHelpers"

// Log the user out and send them to the homepage, where they can log in again
export const expireSession = () => (dispatch, getState) => {
  // Several requests can fail at once, only the first one has to log out
  if (getState().session.isLoggedIn) {
    dispatch(logoutUser())
  }

  // Also redirect when the session was already gone, like when a page is
  // opened directly without being logged in
  if (history.location.pathname !== "/") {
    history.push("/")
  }
}

const handleRequestError = (dispatch, error) => {
  if (isUnauthorizedError(error)) {
    dispatch(expireSession())
  }
}

export const fetchMe = () => (dispatch) => {
  spotifyAPI.getMe().then(
    (data) => {
      const { display_name, images } = data

      dispatch(setUser(display_name, images))
    },
    (error) => {
      handleRequestError(dispatch, error)

      console.error(`Error retrieving user data. Reason: ${error}`)
    }
  )
}

export const fetchFeaturedPlaylists = () => (dispatch) => {
  // Spotify removed the featured playlists endpoint, so show the user's own
  // playlists and saved albums instead. A failing request shouldn't hide the other.
  const emptyList = { items: [] }

  Promise.all([
    spotifyAPI.getUserPlaylists({ limit: 12 }).catch((err) => {
      handleRequestError(dispatch, err)

      console.error(err)

      return emptyList
    }),
    spotifyAPI.getMySavedAlbums({ limit: 50 }).catch((err) => {
      handleRequestError(dispatch, err)

      console.error(err)

      return emptyList
    }),
  ]).then(([playlists, savedAlbums]) => {
    const items = [
      ...playlists.items,
      ...savedAlbums.items.map(({ album }) => album),
    ]
    const normalized = normalize(
      { playlists: { items } },
      featuredPlaylistSchema
    )

    dispatch(mergeEntities(normalized.entities))
    dispatch(mergeFeaturedPlaylists(normalized.result))
  })
}

// Spotify doesn't treat Liked Songs as a playlist, they're the saved tracks.
// Shape them like a playlist, so the playlist page can render them.
export const fetchLikedSongs = () => (dispatch) => {
  spotifyAPI
    .getMySavedTracks({ limit: 25 })
    .then(({ items, total }) => {
      // Skip tracks Spotify can't give us details for, like removed local files
      const validItems = items.filter(
        ({ track }) => track && track.album && track.album.images.length
      )
      const data = {
        id: "liked-songs",
        name: "Liked Songs",
        description: `Your ${validItems.length} latest of ${total} liked songs`,
        tracks: { offset: 0, items: validItems },
      }
      const normalized = normalize(data, trackSchema)

      dispatch(mergeEntities(normalized.entities))
      dispatch(mergePlaylist(normalized.result))
    })
    .catch((err) => {
      handleRequestError(dispatch, err)

      console.error(err)
    })
}

export const fetchPlaylist = (id) => (dispatch) => {
  const fields = [
    "description",
    "followers.total",
    "id",
    "images",
    "name",
    "owner",
    "tracks",
  ].join(",")

  spotifyAPI
    .getPlaylist(id, { fields })
    .then((data) => {
      const normalized = normalize(data, trackSchema)

      dispatch(mergeEntities(normalized.entities))
      dispatch(mergePlaylist(normalized.result))
    })
    .catch((err) => {
      handleRequestError(dispatch, err)

      console.error(err)
    })
}

export const fetchAlbum = (id) => (dispatch) => {
  spotifyAPI
    .getAlbum(id)
    .then((album) => {
      const artists = album.artists.map((artist) => artist.name).join(", ")
      const year = (album.release_date || "").slice(0, 4)

      // Shape the album like a playlist, so the playlist page can render it
      const data = {
        id: album.id,
        name: album.name,
        images: album.images,
        description: [artists, year].filter(Boolean).join(" · "),
        tracks: {
          offset: 0,
          items: album.tracks.items.map((track) => ({
            track: { ...track, album: { images: album.images } },
          })),
        },
      }
      const normalized = normalize(data, trackSchema)

      dispatch(mergeEntities(normalized.entities))
      dispatch(mergePlaylist(normalized.result))
    })
    .catch((err) => {
      handleRequestError(dispatch, err)

      console.error(err)
    })
}

export const loginUser = () => (dispatch) => {
  userAPI
    .authorize()
    .then((accessToken) => {
      dispatch(setSession(accessToken))
      dispatch(fetchMe())
    })
    .catch((error) => {
      console.error(`Error authenticating user. Reason: ${error}`)
    })
}

export const logoutUser = () => (dispatch) => {
  dispatch(resetSession())
  dispatch(resetUser())
  dispatch(resetPlayer())
}

export const setUser = (display_name, images) => {
  return {
    type: actionTypes.USER_SET,
    display_name,
    images,
  }
}

export const resetUser = () => {
  return {
    type: actionTypes.USER_RESET,
  }
}
