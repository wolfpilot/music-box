// Utils
import * as actionTypes from './actionTypes';
import { pick } from '../../static/js/utils/objectHelpers';

const initialState = {
  playlists: [],
  tracks: [
    {
      title: 'First track',
      length: '03:48'
    },
    {
      title: 'Second track',
      length: '05:21'
    }
  ]
};

const setPlaylists = (state, action) => {
  const playlists = action.playlists.map(playlist => {
    const keys = ['id', 'images', 'name'];
    const filteredPlaylist = pick(playlist, keys);

    return {
      id: filteredPlaylist.id,
      image: filteredPlaylist.images[0],
      name: filteredPlaylist.name
    };
  });

  return { ...state, playlists };
};

const setTracks = (state, action) => {
  const { tracks } = action;

  return { ...state, tracks };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PLAYLISTS_SET:
      return setPlaylists(state, action);
    case actionTypes.TRACKS_SET:
      return setTracks(state, action);
    default:
      return state;
  }
}
