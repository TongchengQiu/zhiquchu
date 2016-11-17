import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  ...state.members
}))
export default class Members extends Component {
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
        path: '/members',
        label: '成员列表'
      },
      {
        path: '/members/new',
        label: '添加成员'
      }
    ]);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
