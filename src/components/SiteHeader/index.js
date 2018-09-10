// Libs
import React, { Component } from 'react';

// Components
import Logo from '../Logo';
import NotificationButton from './NotificationButton';
import AuthButton from './AuthButton';

class SiteHeader extends Component {
  render() {
    return (
      <header className="site-header">
        <div className="site-header__logo">
          <Logo />
        </div>

        <div className="site-header__actions">
          <NotificationButton />
          <AuthButton />
        </div>
      </header>
    );
  }
}

export default SiteHeader;
