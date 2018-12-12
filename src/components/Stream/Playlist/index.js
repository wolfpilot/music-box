// Libs
import React from 'react';

// Components
import Track from '../../Track';

const Playlist = ({ playlist }) => {
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

      <ul className="playlist__track-list" />
    </div>
  );
};

export default Playlist;
