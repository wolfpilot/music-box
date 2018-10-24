// Libs
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  login: () => dispatch(loginUser()),
  logout: () => dispatch(logoutUser())
});

class SiteHeader extends Component {
  /**
   * @public
   */
  onAuth = () => {
    this.props.user.isLoggedIn ? this.props.logout() : this.props.login();
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
