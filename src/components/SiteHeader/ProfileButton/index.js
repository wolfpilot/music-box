// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Resources
import * as icons from './resources/icons';

const className = 'site-header-profile-button';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

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
      {image && image.url ? userImage() : placeholder()}
    </button>
  );
};

ProfileButton.propTypes = {
  user: PropTypes.shape({
    image: PropTypes.shape({
      url: PropTypes.string
    })
  })
};

export default connect(mapStateToProps)(ProfileButton);
