// Libs
import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    player: state.player
  };
};

class Player extends Component {
  componentDidMount() {
    this.audio = new Audio();

    this.audio.loop = false;
  }

  componentDidUpdate(prevProps) {
    const { isPlaying, track } = this.props.player;

    if (isPlaying) {
      if (prevProps.player.track !== track) {
        this.audio.src = track.preview_url;
        this.audio.load();
      }

      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  render() {
    return <div className="player" />;
  }
}

export default connect(mapStateToProps)(Player);
