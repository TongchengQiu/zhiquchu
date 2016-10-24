import React, { Component, PropTypes } from 'react';

export default class Frame extends Component {
  static propTypes = {
    children: PropTypes.any,
    location: PropTypes.object.isRequired,
    startWarmup: PropTypes.func,
    doneWarmup: PropTypes.func,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.unlistenBefore = this.context.router.listenBefore((...args) => {
      this.props.startWarmup();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location !== this.props.location) {
      setTimeout(() => {
        this.props.doneWarmup();
      }, 0);
    }
  }

  componentWillUnMount() {
    if (this.unlistenBefore) {
      this.unlistenBefore();
      this.unlistenBefore = null;
    }
  }

  render() {
    return this.props.children;
  }
}
