import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeSidebarList, auth, logout, startWarmup, doneWarmup } from './store';
import Layout from '../../components/Layout';
import Frame from './Frame';

@connect((state, props) => ({
  pathname: props.location.pathname,
  ...state.root,
}), {
  changeSidebarList,
  auth,
  logout,
  startWarmup,
  doneWarmup
})
export default class Root extends Component {
  static propTypes = {
    children: PropTypes.any,
    pathname: PropTypes.string,
    sidebarList: PropTypes.array,
    changeSidebarList: PropTypes.func,
    warmingUp: PropTypes.bool,
    userInfo: PropTypes.any,
    auth: PropTypes.any,
    logout: PropTypes.any,
    authError: PropTypes.any,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.pathname !== '/login') {
      this.props.auth();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.pathname !== this.props.pathname &&
      this.props.pathname !== '/login' &&
      !this.props.userInfo
    ) {
      this.props.auth();
    }

    if (!prevProps.authError && this.props.authError) {
      this.logout();
    }
  }

  logout() {
    this.props.logout();
    this.frame.context.router.replace('/login');
  }

  render() {
    const { children, pathname, sidebarList, warmingUp, userInfo } = this.props;

    const withoutFrame = (pathname === '/login' || pathname === 'login') ||
                         (pathname === '/404' || pathname === '404');
    return (
      <Frame {...this.props} ref={(frame) => { this.frame = frame; }}>
        {withoutFrame ? children :
          <Layout
            sidebarList={sidebarList}
            warmingUp={warmingUp}
            logout={::this.logout}
            userInfo={userInfo}
          >
            {children && React.cloneElement(children, {
              changeSidebarList: this.props.changeSidebarList,
            })}
          </Layout>}
      </Frame>
    );
  }
}
