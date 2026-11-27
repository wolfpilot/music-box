// Libs
import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

// Icons
import { ReactComponent as HeartIcon } from "@tabler/icons/icons/outline/heart.svg"

const PlaylistTile = ({ playlist }) => {
  const { id, image, name, type } = playlist
  const isCollection = type === "collection"
  const url = isCollection
    ? "/collection/tracks"
    : `/${type === "album" ? "album" : "playlist"}/${id}`

  return (
    <div className="playlist-tile">
      <div className="playlist-tile__content">
        <Link to={url} className="playlist-tile__image-link">
          {image && (
            <img className="playlist-tile__image" src={image.url} alt="" />
          )}
          {isCollection && (
            <span className="playlist-tile__placeholder">
              <HeartIcon className="playlist-tile__placeholder-icon" />
            </span>
          )}
        </Link>

        <p className="playlist-tile__name">
          <Link to={url} className="playlist-tile__name-link">
            {name}
          </Link>
        </p>
      </div>
    </div>
  )
}

PlaylistTile.propTypes = {
  id: PropTypes.string,
  image: PropTypes.object,
  name: PropTypes.string,
}

export default PlaylistTile
