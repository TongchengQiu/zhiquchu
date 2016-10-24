import Root from './Root';
import Login from './Login';
import Home from './Home';

const redirectToHome = (nextState, replace) => {
  replace('/home');
};

export default {
  path: '/',
  key: 'root',
  module: Root,
  indexRoute: {
    onEnter: redirectToHome
  },
  childRoutes: [
    {
      path: 'home',
      module: Home,
      authRequire: true
    },
    {
      path: 'login',
      module: Login,
    },
  ]
};
