import Home from './Home';

const redirectToHome = (nextState, replace) => {
  replace('/home');
};

export default {
  path: '/',
  key: 'root',
  indexRoute: {
    onEnter: redirectToHome
  },
  childRoutes: [
    {
      path: 'home',
      module: Home,
      authRequire: true
    },
  ]
};
