// Libs
import React from 'react';
import PropTypes from 'prop-types';

const className = 'site-header-auth-button';

const AuthButton = props => (
  <button type="button" className={`${className} btn`} onClick={props.onAuth}>
    {props.isLoggedIn ? 'Logout' : 'Login'}
  </button>
);

AuthButton.propTypes = {
  session: PropTypes.shape({
    isLoggedIn: PropTypes.bool
  })
};

export default AuthButton;
