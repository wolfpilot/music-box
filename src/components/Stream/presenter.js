// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Components
import PlaylistTile from './PlaylistTile';

const Stream = ({ playlists, tracks }) => (
  <div className="stream">
    <h1 className="stream__heading">Stream</h1>
    <ul className="stream__featured-playlists">
      {playlists.map((playlist, key) => {
        return (
          <li className="stream__playlist-item" key={key}>
            <PlaylistTile playlist={playlist} />
          </li>
        );
      })}
    </ul>
  </div>
);

Stream.propTypes = {
  playlists: PropTypes.array,
  tracks: PropTypes.array
};

export default Stream;
