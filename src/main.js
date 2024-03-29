/* eslint no-underscore-dangle: ["error", { "allow": ["___INITIAL_STATE__", "__DEV__"] }] */
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import App from './App';

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  /* eslint-disable */
  const routes = require('./pages/index').default(store);
  /* eslint-enable */

  ReactDOM.render(
    <App
      store={store}
      routes={routes}
    />,
    MOUNT_NODE
  );
};

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open();
  }
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      /* eslint-disable */
      const RedBox = require('redbox-react').default;
      /* eslint-enable */

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./pages/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      })
    );
  }
}

// ========================================================
// Go!
// ========================================================
render();
