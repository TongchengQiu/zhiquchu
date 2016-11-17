export default (cb) => {
  require.ensure([], (require) => {
    cb(require('./NotFound').default, require('./store').default);
  }, 'notFound');
};
