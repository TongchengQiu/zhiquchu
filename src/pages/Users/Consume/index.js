export default (cb) => {
  require.ensure([], (require) => {
    cb(require('./Consume').default, require('../store').default);
  }, 'users');
};
