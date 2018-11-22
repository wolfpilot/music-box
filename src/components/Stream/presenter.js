// Libs
import React from 'react';

// Components
import Track from '../Track';

const Stream = ({ tracks = [] }) => (
  <div className="stream">
    {tracks.map((track, key) => {
      return <Track track={track} key={key} />;
    })}
  </div>
);

export default Stream;
