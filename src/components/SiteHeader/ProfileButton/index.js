// Libs
import React from 'react';
import { connect } from 'react-redux';

// Resources
import * as icons from './resources/icons';

const className = 'site-header-profile-button';

const ProfileButton = props => {
  const { image } = props.user;

  const userImage = () => (
    <span
      className={`${className}__image`}
      style={{ backgroundImage: `url(${image.url})` }}
    />
  );

  const placeholder = () => (
    <span className={`${className}__placeholder`}>
      <span className="svg-container">{icons.user()}</span>
    </span>
  );

  return (
    <button className={`${className} btn`}>
      {image ? userImage() : placeholder()}
    </button>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(ProfileButton);
