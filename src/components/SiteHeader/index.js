// Libs
import React, { Component } from 'react';

// Services
import UserAPI from '../../services/api/user/index';

// Components
import Logo from '../Logo';
import NotificationButton from './NotificationButton';
import AuthButton from './AuthButton';

class SiteHeader extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false
    };
  }

  /**
   * @private
   */
  _logout() {
    UserAPI.logout();

    this.setState({ isLoggedIn: false });
  }

  /**
   * @private
   */
  _login() {
    UserAPI.authorize()
      .then(() => {
        this.setState({ isLoggedIn: true });
      })
      .catch(error => {
        console.error(`Error authenticating user. Reason: ${error}`);
      });
  }

  /**
   * @public
   */
  onAuth = () => {
    this.state.isLoggedIn ? this._logout() : this._login();
  };

  render() {
    return (
      <header className="site-header">
        <div className="site-header__logo">
          <Logo />
        </div>

        <div className="site-header__actions">
          {this.state.isLoggedIn && <NotificationButton />}
          <AuthButton isLoggedIn={this.state.isLoggedIn} onAuth={this.onAuth} />
        </div>
      </header>
    );
  }
}

export default SiteHeader;
