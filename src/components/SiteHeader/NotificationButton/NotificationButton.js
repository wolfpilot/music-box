// Libs
import React from 'react';

const className = 'site-header-notification-button';

const NotificationButton = () => (
  <button type="button" className={className}>
    <span className={`${className}__icon`} />
    <span className={`${className}__badge`} />
  </button>
);

export default NotificationButton;
