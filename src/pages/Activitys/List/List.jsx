import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  ...state.activitys
}))
export default class List extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>List</div>;
  }
}