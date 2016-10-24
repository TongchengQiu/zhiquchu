export default (cb) => {
  require.ensure([], (require) => {
    cb(require('./Login').default, require('./store').default);
  }, 'login');
};
