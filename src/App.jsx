import React, { Component, PropTypes } from 'react';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import './assets/style/base.scss';

export default class App extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { routes, store } = this.props;

    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          {routes}
        </Router>
      </Provider>
    );
  }
}
