export default (cb) => {
  require.ensure([], (require) => {
    cb(require('./List').default, require('../store').default);
  }, 'members');
};
