import { combineReducers } from 'redux';
import locationReducer from './location';

/* eslint-disable */
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    ...asyncReducers
  });
};
/* eslint-enable */

export const injectReducer = (store, { key, reducer }) => {
  /* eslint no-param-reassign: ["error", { "props": false }]*/
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

/* eslint-disable */
export const createReducer = (initialState, ACTION_HANDLERS) => {
  return (state = initialState, action) => {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
  };
};
/* eslint-enable */
