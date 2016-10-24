import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  ...state.home
}))
export default class Home extends Component {
  static propTypes = {
    changeSidebarList: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.changeSidebarList([
      {
        path: '/home',
        label: '哈哈哈'
      },
      {
        path: '/home/222',
        label: '哈哈222哈'
      }
    ]);
  }

  render() {
    return <div>123</div>;
  }
}
