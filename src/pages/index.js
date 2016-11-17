// We only need to import the modules necessary for initial render
import { injectReducer } from '../store/reducers';
import rootRoute from './route';

const buildGetComponent = (store, key, getFile) => (nextState, cb) => {
  getFile((Container, reducer, deps) => {
    injectReducer(store, { key, reducer });

    if (deps && deps instanceof Array) {
      deps.forEach(dep => injectReducer(store, dep));
    }

    cb(null, Container);
  });
};

const buildRoutes = (routeNode, store) => {
  let childRoutes = routeNode.childRoutes;
  if (childRoutes) {
    childRoutes = childRoutes.map(route => buildRoutes(route, store));
  }

  const path = routeNode.path;
  const key = routeNode.key || path;
  const module = routeNode.module;
  let getComponent = routeNode.getComponent;
  if (typeof module === 'function') {
    getComponent = buildGetComponent(store, key, module);
  }

  const onEnter = routeNode.onEnter;
  // if (routeNode.authRequire) {
  //   onEnter = buildOnEnter(store)
  // }

  return {
    path,
    onEnter,
    getComponent,
    childRoutes,
    indexRoute: (typeof routeNode.indexRoute === 'function') ? {
      getComponent: buildGetComponent(store, key, routeNode.indexRoute)
    } : routeNode.indexRoute
  };
};

export default (store) => {
  const routes = buildRoutes(rootRoute, store);
  return routes;
};
