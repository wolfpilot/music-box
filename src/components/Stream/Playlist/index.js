// Libs
import React from 'react';

// Components
import Track from '../Track';

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

      <ul className="playlist__track-list">
        {tracks.items.map((item, index) => {
          const { track } = item;

          if (!track) {
            return null;
          }

          return (
            <li key={track.id} className="playlist__track-list-item">
              <Track
                id={track.id}
                index={tracks.offset + index + 1}
                name={track.name}
                artists={track.artists}
                artwork={track.album.images[track.album.images.length - 1]}
                duration_ms={track.duration_ms}
                preview_url={track.preview_url}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Playlist;
