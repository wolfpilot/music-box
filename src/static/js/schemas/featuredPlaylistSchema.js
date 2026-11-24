// Libs
import { schema } from "normalizr"

// Utils
import { pick } from "../utils/objectHelpers"

const playlist = new schema.Entity(
  "featuredPlaylists",
  {},
  {
    processStrategy: (entity) => {
      const keys = ["id", "images", "name", "type"]
      const filteredPlaylist = pick(entity, keys)

      return {
        id: filteredPlaylist.id,
        image: (filteredPlaylist.images && filteredPlaylist.images[0]) || null,
        name: filteredPlaylist.name,
        type: filteredPlaylist.type,
      }
    },
  }
)

const featuredPlaylistSchema = {
  playlists: {
    items: [playlist],
  },
}

export default featuredPlaylistSchema
