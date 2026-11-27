// Libs
import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

// Components
import PlaylistTile from "./PlaylistTile/PlaylistTile"

const mapStateToProps = (state) => {
  return {
    featuredPlaylists: state.stream.featuredPlaylists,
    featuredPlaylistEntities: state.entities.featuredPlaylists,
  }
}

const Section = ({ title, ids, entities }) => (
  <section className="stream__section">
    <h2 className="stream__heading">{title}</h2>
    <ul className="stream__featured-playlists">
      {ids.map((id) => (
        <li className="stream__playlist-item" key={id}>
          <PlaylistTile playlist={entities[id]} />
        </li>
      ))}
    </ul>
  </section>
)

const Stream = ({ featuredPlaylists, featuredPlaylistEntities }) => {
  const ids = (featuredPlaylists && featuredPlaylists.items) || []

  const isAlbum = (id) =>
    featuredPlaylistEntities[id] &&
    featuredPlaylistEntities[id].type === "album"

  const playlistIds = ids.filter((id) => !isAlbum(id))
  const albumIds = ids.filter(isAlbum)

  return (
    <div className="stream">
      {playlistIds.length > 0 && (
        <Section
          title="Playlists"
          ids={playlistIds}
          entities={featuredPlaylistEntities}
        />
      )}
      {albumIds.length > 0 && (
        <Section
          title="Albums"
          ids={albumIds}
          entities={featuredPlaylistEntities}
        />
      )}
    </div>
  )
}

Stream.propTypes = {
  featuredPlaylists: PropTypes.object,
}

export default connect(mapStateToProps)(Stream)
