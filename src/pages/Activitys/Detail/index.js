export default (cb) => {
  require.ensure([], (require) => {
    cb(require('./Detail').default, require('../store').default);
  }, 'activitys');
};
