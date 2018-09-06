// Libs
import React, { Component } from 'react';

// Components
import Logo from '../Logo';

class SiteHeader extends Component {
  render() {
    return (
      <header className="site-header">
        <div className="site-header__logo">
          <Logo />
        </div>
      </header>
    );
  }
}

export default SiteHeader;
