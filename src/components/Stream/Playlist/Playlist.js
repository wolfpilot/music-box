// Libs
import React from 'react';
import { connect } from 'react-redux';

// Components
import Track from '../Track/Track';

const mapStateToProps = state => {
  return {
    playlist: state.stream.playlist,
    trackEntities: state.entities.tracks
  };
};

const Playlist = ({ playlist, trackEntities }) => {
  const { images, name, description, tracks } = playlist;

  return (
    <div className="playlist">
      <div className="playlist__header">
        <div className="playlist__header-image-wrapper">
          {images.length && (
            <img
              src={images[0].url}
              alt=""
              className="playlist__header-image"
            />
          )}
        </div>

        <div className="playlist__header-content-wrapper">
          <h1 className="title">{name}</h1>
          <p className="copy">{description}</p>
        </div>
      </div>

      <ul className="playlist__track-list">
        {tracks.items.map(id => (
          <li key={id} className="playlist__track-list-item">
            <Track track={trackEntities[id]} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps)(Playlist);
