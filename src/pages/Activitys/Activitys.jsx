import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  ...state.activitys
}))
export default class Activitys extends Component {
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
        path: '/activitys',
        label: '总体概览'
      },
      {
        path: '/activitys/list',
        label: '活动列表'
      }
    ]);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
