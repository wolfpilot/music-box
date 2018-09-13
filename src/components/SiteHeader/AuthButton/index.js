// Libs
import React from 'react';

const className = 'site-header-auth-button';

const AuthButton = props => {
  return (
    <button type="button" className={`${className} btn`} onClick={props.onAuth}>
      {props.isLoggedIn ? 'Logout' : 'Login'}
    </button>
  );
};

export default AuthButton;
