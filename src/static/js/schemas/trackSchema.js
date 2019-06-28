// Libs
import { schema } from 'normalizr';

// Utils
import { pick } from '../utils/objectHelpers';

let index = 1;

const track = new schema.Entity(
  'tracks',
  {},
  {
    idAttribute: value => value.track.id,
    processStrategy: (entity, parent) => {
      const { track } = entity;

      const keys = [
        'id',
        'name',
        'album',
        'artists',
        'duration_ms',
        'preview_url'
      ];
      const filteredTrack = pick(track, keys);

      // Manually assign an index to each track
      filteredTrack.index = index;

      // Offset index based on the playlist's pagination (100, 200, 300...)
      index = parent.offset + index + 1;

      // Extract album artork
      filteredTrack.artwork = track.album.images[track.album.images.length - 1];

      return filteredTrack;
    }
  }
);

const trackSchema = {
  tracks: {
    items: [track]
  }
};

export default trackSchema;
