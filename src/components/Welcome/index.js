// Libs
import React from 'react';

const Welcome = () => (
  <div className="welcome">
    <h1 className="welcome__heading">Connect to Spotify</h1>

    <h2 className="welcome__subheading">
      Listen to your favourite tracks, find new artists and make your own
      playlists.
    </h2>

    <p className="welcome__copy">
      Don't have an account yet?{' '}
      <a
        href="https://www.spotify.com/signup"
        target="_blank"
        rel="noopener noreferrer"
        className="hyperlink"
      >
        Sign up
      </a>{' '}
      at Spotify.
    </p>
  </div>
);

export default Welcome;
