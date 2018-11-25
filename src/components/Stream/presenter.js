// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Components
import Track from '../Track';

const Stream = ({ tracks = [] }) => (
  <div className="stream">
    {tracks.map((track, key) => {
      return <Track track={track} key={key} />;
    })}
  </div>
);

Stream.propTypes = {
  tracks: PropTypes.array
};

export default Stream;
