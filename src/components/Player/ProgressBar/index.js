// Libs
import React, { PureComponent } from 'react';

class ProgressBar extends PureComponent {
  state = {
    styles: {}
  };

  _updateStyles(percentage) {
    this.setState({
      styles: {
        load: {
          maxWidth: `${percentage}%`
        }
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { percentage } = this.props;

    if (percentage !== prevProps.percentage) {
      this._updateStyles(percentage);
    }
  }

  render() {
    const { styles } = this.state;

    return (
      <div className="progress-bar">
        <div className="progress-bar__track" role="presentation" />
        <div
          className="progress-bar__load"
          role="presentation"
          style={styles.load}
        />
        <div className="progress-bar__thumb" role="presentation" />
      </div>
    );
  }
}

export default ProgressBar;
