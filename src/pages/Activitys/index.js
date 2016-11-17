export default (cb) => {
  require.ensure([], (require) => {
    cb(require('./Activitys').default, require('./store').default);
  }, 'activitys');
};
