// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import PlaylistTile from './PlaylistTile/PlaylistTile';

const mapStateToProps = state => {
  return {
    featuredPlaylists: state.stream.featuredPlaylists,
    featuredPlaylistEntities: state.entities.featuredPlaylists
  };
};

const Stream = ({ featuredPlaylists, featuredPlaylistEntities }) => (
  <div className="stream">
    <h1 className="stream__heading">Stream</h1>
    {featuredPlaylists && (
      <ul className="stream__featured-playlists">
        {featuredPlaylists.items &&
          featuredPlaylists.items.length > 0 &&
          featuredPlaylists.items.map(id => {
            return (
              <li className="stream__playlist-item" key={id}>
                <PlaylistTile playlist={featuredPlaylistEntities[id]} />
              </li>
            );
          })}
      </ul>
    )}
  </div>
);

Stream.propTypes = {
  featuredPlaylists: PropTypes.object
};

export default connect(mapStateToProps)(Stream);
