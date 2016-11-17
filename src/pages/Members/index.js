export default (cb) => {
  require.ensure([], (require) => {
    cb(require('./Members').default, require('./store').default);
  }, 'members');
};
