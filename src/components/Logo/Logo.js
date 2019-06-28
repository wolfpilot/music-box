// Libs
import React from 'react';
import { Link } from 'react-router-dom';

const logo = () => {
  return (
    <Link to="/" className="logo" aria-label="Home">
      <span className="logo__part logo__part--first">music</span>
      <span className="logo__part logo__part--last">B[]X</span>
    </Link>
  );
};

export default logo;
