// Libs
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Utils
import UserAPI from '../../services/api/user/index';

// Components
import Logo from '../Logo';
import NotificationButton from './NotificationButton';
import AuthButton from './AuthButton';
import { loginUser, logoutUser } from '../../services/user/actions';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  onLogin: () => dispatch(loginUser()),
  onLogout: () => dispatch(logoutUser())
});

class SiteHeader extends Component {
  /**
   * @private
   */
  _logout() {
    UserAPI.logout();

    this.props.onLogout();
  }

  /**
   * @private
   */
  _login() {
    UserAPI.authorize()
      .then(() => {
        this.props.onLogin();
      })
      .catch(error => {
        console.error(`Error authenticating user. Reason: ${error}`);
      });
  }

  /**
   * @public
   */
  onAuth = () => {
    this.props.user.isLoggedIn ? this._logout() : this._login();
  };

  render() {
    return (
      <header className="site-header">
        <div className="site-header__logo">
          <Logo />
        </div>

        <div className="site-header__actions">
          {this.props.user.isLoggedIn && <NotificationButton />}
          <AuthButton
            isLoggedIn={this.props.user.isLoggedIn}
            onAuth={this.onAuth}
          />
        </div>
      </header>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteHeader);
