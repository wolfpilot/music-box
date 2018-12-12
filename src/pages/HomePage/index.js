// Libs
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Stream from '../../components/Stream';
import Welcome from '../../components/Welcome';

const mapStateToProps = state => {
  return {
    session: state.session
  };
};

const HomePage = ({ session }) => (
  <main role="main">{session.isLoggedIn ? <Stream /> : <Welcome />}</main>
);

HomePage.propTypes = {
  session: PropTypes.shape({
    isLoggedIn: PropTypes.bool
  })
};

export default connect(mapStateToProps)(HomePage);
