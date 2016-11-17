export default (cb) => {
  require.ensure([], (require) => {
    cb(require('./Consumptions').default, require('./store').default);
  }, 'consumptions');
};
