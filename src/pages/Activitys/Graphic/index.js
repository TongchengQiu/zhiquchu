export default (cb) => {
  require.ensure([], (require) => {
    cb(require('./Graphic').default, require('../store').default);
  }, 'activitys');
};
