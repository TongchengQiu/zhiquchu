import { createReducer } from '../../store/reducers';
import { multiDispatch, multiReducer } from '../../store/multi';
import { get } from '../../utils/api';

const namespace = 'root';
const WARMING_UP_STARTING = `${namespace}/WARMING_UP_STARTING`;
const WARMING_UP_DONE = `${namespace}/WARMING_UP_DONE`;
const CHANGE_SIDEBAR = `${namespace}/CHANGE_SIDEBAR`;
const GLOBAL_ERROR = `${namespace}/GLOBAL_ERROR`;
const LOGOUT = `${namespace}/LOGOUT`;
const AUTH = `${namespace}/AUTH`;

const apiAuth = '/userinfo';

export const auth = (options) => {
  const url = apiAuth;
  return multiDispatch({
    api: get(url, options),
    type: AUTH,
    options
  });
};

export function startWarmup() {
  return {
    type: WARMING_UP_STARTING
  };
}

export function doneWarmup() {
  return {
    type: WARMING_UP_DONE
  };
}

export const changeSidebarList = list => (dispatch) => {
  dispatch({
    type: CHANGE_SIDEBAR,
    list
  });
};

export const errorFunc = error => (dispatch) => {
  dispatch({
    type: GLOBAL_ERROR,
    error
  });
};

export function logout() {
  return {
    type: LOGOUT
  };
}

const initialState = {
  warmingUp: false,
  sidebarList: [],
  globalError: null,
  userInfo: null,
  authStarting: false,
  authDone: false,
  authError: null,
};

export default createReducer(initialState, {
  [WARMING_UP_STARTING]: (state, action) => ({ ...state, warmingUp: true }),
  [WARMING_UP_DONE]: (state, action) => ({ ...state, warmingUp: false }),
  [CHANGE_SIDEBAR]: (state, action) => ({
    ...state,
    sidebarList: action.list
  }),
  [GLOBAL_ERROR]: (state, action) => ({
    ...state,
    globalError: action.error
  }),
  [LOGOUT]: (state, action) => ({
    ...state,
    userInfo: null
  }),
  [AUTH]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      authStarting: true,
      authError: null,
    }),
    () => ({
      ...state,
      authStarting: false,
      authDone: true,
      userInfo: action.result.data
    }),
    () => ({
      ...state,
      authStarting: false,
      authError: action.error,
    })
  ),
});
