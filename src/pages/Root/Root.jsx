import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';

@connect(state => ({
  ...state.location
}))
export default class Root extends Component {
  static propTypes = {
    children: PropTypes.any,
    pathname: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, pathname } = this.props;
    return (pathname === '/login' || pathname === 'login') ? children :
      <Layout style={{ height: '100%' }} >
        {children}
      </Layout>;
  }
}
