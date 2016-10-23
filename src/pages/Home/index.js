export default (cb) => {
  require.ensure([], (require) => {
    cb(require('./Home').default, require('./store').default);
  }, 'home');
};
