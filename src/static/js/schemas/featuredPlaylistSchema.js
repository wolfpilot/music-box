// Libs
import { schema } from 'normalizr';

// Utils
import { pick } from '../utils/objectHelpers';

const playlist = new schema.Entity(
  'featuredPlaylists',
  {},
  {
    processStrategy: entity => {
      const keys = ['id', 'images', 'name'];
      const filteredPlaylist = pick(entity, keys);

      return {
        id: filteredPlaylist.id,
        image: filteredPlaylist.images[0],
        name: filteredPlaylist.name
      };
    }
  }
);

const featuredPlaylistSchema = {
  playlists: {
    items: [playlist]
  }
};

export default featuredPlaylistSchema;
