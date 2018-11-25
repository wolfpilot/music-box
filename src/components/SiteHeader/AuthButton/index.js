// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const className = 'site-header-auth-button';

const mapStateToProps = state => {
  return {
    session: state.session
  };
};

const AuthButton = props => (
  <button type="button" className={`${className} btn`} onClick={props.onAuth}>
    {props.session.isLoggedIn ? 'Logout' : 'Login'}
  </button>
);

AuthButton.propTypes = {
  session: PropTypes.shape({
    isLoggedIn: PropTypes.bool
  })
};

export default connect(mapStateToProps)(AuthButton);
