// Libs
import { schema } from "normalizr"

// Utils
import { pick } from "../utils/objectHelpers"

const track = new schema.Entity(
  "tracks",
  {},
  {
    idAttribute: (value) => value.track.id,
    processStrategy: (entity) => {
      const { track } = entity

      const keys = ["id", "name", "album", "artists", "duration_ms", "uri"]
      const filteredTrack = pick(track, keys)

      // Extract album artork
      filteredTrack.artwork = track.album.images[track.album.images.length - 1]

      return filteredTrack
    },
  }
)

const trackSchema = {
  tracks: {
    items: [track],
  },
}

export default trackSchema
