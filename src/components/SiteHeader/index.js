// Libs
import React, { Component } from 'react';

// Components
import Logo from '../Logo';
import Notification from '../Notification';

class SiteHeader extends Component {
  render() {
    return (
      <header className="site-header">
        <div className="site-header__logo">
          <Logo />
        </div>

        <div className="site-header__actions">
          <Notification />
        </div>
      </header>
    );
  }
}

export default SiteHeader;
