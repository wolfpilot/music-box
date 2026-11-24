// Libs
import React from "react"

// Assets
import { ReactComponent as BellIcon } from "@tabler/icons/icons/outline/bell.svg"

const className = "site-header-notification-button"

const NotificationButton = () => (
  <button type="button" className={className}>
    <BellIcon className={`${className}__icon`} />

    <span className="sr-only">Notifications</span>
    <span className={`${className}__badge`} />
  </button>
)

export default NotificationButton
