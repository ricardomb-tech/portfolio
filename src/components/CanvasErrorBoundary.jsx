import { Component } from 'react'

export default class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[DinoCanvas error]', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <span style={{ color: 'red', fontSize: 12, fontFamily: 'monospace', opacity: 0.7 }}>
            3D error: {this.state.error.message}
          </span>
        </div>
      )
    }
    return this.props.children
  }
}
