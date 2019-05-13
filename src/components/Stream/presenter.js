// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Components
import PlaylistTile from './PlaylistTile/PlaylistTile';

const Stream = ({ playlists, playlistEntities }) => (
  <div className="stream">
    <h1 className="stream__heading">Stream</h1>
    {playlists && (
      <ul className="stream__featured-playlists">
        {playlists.items &&
          playlists.items.length > 0 &&
          playlists.items.map(id => {
            return (
              <li className="stream__playlist-item" key={id}>
                <PlaylistTile playlist={playlistEntities[id]} />
              </li>
            );
          })}
      </ul>
    )}
  </div>
);

Stream.propTypes = {
  playlists: PropTypes.object
};

export default Stream;
