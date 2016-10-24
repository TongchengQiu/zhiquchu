export default (cb) => {
  require.ensure([], (require) => {
    cb(require('./Root').default, require('./store').default);
  }, 'root');
};
