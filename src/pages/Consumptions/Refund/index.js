export default (cb) => {
  require.ensure([], (require) => {
    cb(require('./Refund').default, require('../store').default);
  }, 'consumptions');
};
