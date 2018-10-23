// Libs
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <main>
    <h1 className="title">Oops, page not found!</h1>
    <Link to="/" className="link">
      Go back home?
    </Link>
  </main>
);

export default NotFound;
