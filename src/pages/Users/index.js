export default (cb) => {
  require.ensure([], (require) => {
    cb(require('./Users').default, require('./store').default);
  }, 'users');
};
