import { createReducer } from '../../store/reducers';
import { multiDispatch, multiReducer } from '../../store/multi';
import { post } from '../../utils/api';

const namespace = 'login';
const LOGIN = `${namespace}/LOGIN`;

const apiLogin = '/login';

const initialState = {
  loginStarting: false,
  loginDone: false,
  loginError: null,
};

export const login = (options) => {
  const url = apiLogin;
  return multiDispatch({
    api: post(url, options),
    type: LOGIN,
    options
  });
};

export default createReducer(initialState, {
  [LOGIN]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      loginStarting: true,
      loginError: null,
    }),
    () => ({
      ...state,
      loginStarting: false,
      loginDone: true
    }),
    () => ({
      ...state,
      loginStarting: false,
      loginError: action.error,
    })
  ),
});
