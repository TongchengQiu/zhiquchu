export default (cb) => {
  require.ensure([], (require) => {
    cb(require('./New').default, require('../store').default);
  }, 'members');
};
