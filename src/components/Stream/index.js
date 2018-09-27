// Libs
import React from 'react';
import { connect } from 'react-redux';

// Components
import Track from '../Track';

const mapStateToProps = state => {
  return {
    tracks: state.tracks
  };
};

const Stream = ({ tracks = [] }) => {
  return (
    <div className="stream">
      {tracks.map((track, key) => {
        return <Track track={track} key={key} />;
      })}
    </div>
  );
};

export default connect(mapStateToProps)(Stream);
