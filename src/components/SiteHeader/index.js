// Libs
import React, { Component } from 'react';

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

  onAuth = () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
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
