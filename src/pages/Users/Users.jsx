import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  ...state.users
}))
export default class Users extends Component {
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
        path: '/users',
        label: '总体概览'
      },
      {
        path: '/users/list',
        label: '用户列表'
      }
    ]);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
