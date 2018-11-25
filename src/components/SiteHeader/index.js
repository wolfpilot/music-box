// Libs
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import Logo from '../Logo';
import NotificationButton from './NotificationButton';
import ProfileButton from './ProfileButton';
import AuthButton from './AuthButton';
import { loginUser, logoutUser } from '../../services/user/actions';

const mapStateToProps = state => {
  return {
    session: state.session
  };
};

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(loginUser()),
  logout: () => dispatch(logoutUser())
});

class SiteHeader extends Component {
  /**
   * @public
   */
  onAuth = () => {
    this.props.session.isLoggedIn ? this.props.logout() : this.props.login();
  };

  render() {
    return (
      <header className="site-header">
        <div className="site-header__logo">
          <Logo />
        </div>

        <div className="site-header__actions">
          {this.props.session.isLoggedIn && (
            <Fragment>
              <NotificationButton />
              <ProfileButton />
            </Fragment>
          )}
          <AuthButton onAuth={this.onAuth} />
        </div>
      </header>
    );
  }
}

SiteHeader.propTypes = {
  session: PropTypes.shape({
    isLoggedIn: PropTypes.bool
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteHeader);
