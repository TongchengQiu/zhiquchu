import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  ...state.home
}))
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>123</div>;
  }
}
