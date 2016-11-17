import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeSidebarList, startWarmup, doneWarmup } from './store';
import Layout from '../../components/Layout';
import Frame from './Frame';

@connect((state, props) => ({
  pathname: props.location.pathname,
  sidebarList: state.root.sidebarList,
  warmingUp: state.root.warmingUp
}), {
  changeSidebarList,
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
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, pathname, sidebarList, warmingUp } = this.props;

    const withoutFrame = (pathname === '/login' || pathname === 'login') ||
                         (pathname === '/404' || pathname === '404');
    return (
      <Frame {...this.props}>
        {withoutFrame ? children :
          <Layout
            sidebarList={sidebarList}
            warmingUp={warmingUp}
          >
            {children && React.cloneElement(this.props.children, {
              changeSidebarList: this.props.changeSidebarList,
            })}
          </Layout>}
      </Frame>
    );
  }
}
