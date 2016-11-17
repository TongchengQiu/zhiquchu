import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  ...state.users
}))
export default class Overview extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>Overview</div>;
  }
}
