import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  ...state.consumptions
}))
export default class Consumptions extends Component {
  static propTypes = {
    changeSidebarList: PropTypes.func,
    children: PropTypes.any
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.changeSidebarList([
      {
        path: '/consumptions/list',
        label: '总体概览',
        notOnlyIndex: true,
      },
      {
        path: '/consumptions/refund',
        label: '退票管理'
      }
    ]);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
