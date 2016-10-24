import { createReducer } from '../../store/reducers';
import { multiDispatch } from '../../store/multi';
import { post } from '../../utils/api';

const namespace = 'login';
const LOGIN_STARTING = `${namespace}/LOGIN_STARTING`;
const LOGIN_DONE = `${namespace}/LOGIN_DONE`;
const LOGIN_FAILED = `${namespace}/LOGIN_FAILED`;

const initialState = {
  loginStarting: false,
  loginDone: false,
  loginError: null,
};

export const login = (options) => {
  const url = '/login';
  return multiDispatch({
    api: post(url, options),
    types: [LOGIN_STARTING, LOGIN_DONE, LOGIN_FAILED],
    options
  });
};

export default createReducer(initialState, {
  [LOGIN_STARTING]: (state, action) => ({
    ...state,
    loginError: null,
    loginStarting: true,
  }),
  [LOGIN_DONE]: (state, action) => ({
    ...state,
    loginStarting: false,
    loginDone: true
  }),
  [LOGIN_FAILED]: (state, action) => ({
    ...state,
    loginStarting: false,
    loginError: action.error,
  }),
});
