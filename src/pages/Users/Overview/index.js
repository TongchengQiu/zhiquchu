export default (cb) => {
  require.ensure([], (require) => {
    cb(require('./Overview').default, require('../store').default);
  }, 'users');
};
