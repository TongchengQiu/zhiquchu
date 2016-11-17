import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class NotFound extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>404</div>;
  }
}
