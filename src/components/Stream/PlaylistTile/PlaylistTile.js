// Libs
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PlaylistTile = ({ playlist }) => {
  const { id, image, name } = playlist;

  return (
    <div className="playlist-tile">
      <div className="playlist-tile__content">
        <Link to={`/playlist/${id}`} className="playlist-tile__image-link">
          <img className="playlist-tile__image" src={image.url} alt="" />
        </Link>

        <p className="playlist-tile__name">
          <Link to={`/playlist/${id}`} className="playlist-tile__name-link">
            {name}
          </Link>
        </p>
      </div>
    </div>
  );
};

PlaylistTile.propTypes = {
  id: PropTypes.string,
  image: PropTypes.object,
  name: PropTypes.string
};

export default PlaylistTile;
