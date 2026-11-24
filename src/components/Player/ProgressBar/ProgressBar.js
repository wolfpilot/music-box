// Libs
import React, { PureComponent } from "react"
import PropTypes from "prop-types"

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

class ProgressBar extends PureComponent {
  state = {
    // Set while dragging, so the thumb follows the mouse instead of the playback
    dragPercentage: null,
  }

  barRef = React.createRef()

  // Convert the mouse position to a percentage (0-100) of the bar's width
  _getPercentage(event) {
    const { left, width } = this.barRef.current.getBoundingClientRect()

    if (!width) {
      return 0
    }

    return clamp(((event.clientX - left) * 100) / width, 0, 100)
  }

  _onMouseDown = (event) => {
    // Only react to the main mouse button
    if (event.button !== 0) {
      return
    }

    // Prevent text selection while dragging
    event.preventDefault()

    this.setState({ dragPercentage: this._getPercentage(event) })

    window.addEventListener("mousemove", this._onMouseMove)
    window.addEventListener("mouseup", this._onMouseUp)
  }

  _onMouseMove = (event) => {
    this.setState({ dragPercentage: this._getPercentage(event) })
  }

  _onMouseUp = (event) => {
    const { onSeek } = this.props

    this._removeListeners()

    this.setState({ dragPercentage: null })

    // Only seek once the mouse is released, to avoid flooding the player
    if (onSeek) {
      onSeek(this._getPercentage(event) / 100)
    }
  }

  _removeListeners() {
    window.removeEventListener("mousemove", this._onMouseMove)
    window.removeEventListener("mouseup", this._onMouseUp)
  }

  componentWillUnmount() {
    this._removeListeners()
  }

  render() {
    const { percentage } = this.props
    const { dragPercentage } = this.state

    const displayedPercentage =
      dragPercentage !== null ? dragPercentage : Number(percentage) || 0

    return (
      <div
        className="progress-bar"
        ref={this.barRef}
        onMouseDown={this._onMouseDown}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(displayedPercentage)}
      >
        <div className="progress-bar__track" role="presentation" />
        <div
          className="progress-bar__load"
          role="presentation"
          style={{ maxWidth: `${displayedPercentage}%` }}
        >
          <div className="progress-bar__thumb" role="presentation" />
        </div>
      </div>
    )
  }
}

ProgressBar.propTypes = {
  // The playback progress, from 0 to 100
  percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // Called with the position to seek to, from 0 to 1
  onSeek: PropTypes.func,
}

export default ProgressBar
