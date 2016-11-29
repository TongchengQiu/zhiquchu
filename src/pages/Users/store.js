import { createReducer } from '../../store/reducers';
import { multiDispatch, multiReducer } from '../../store/multi';
import { get } from '../../utils/api';

const namespace = 'users';
const GET_STAT = `${namespace}/GET_STAT`;
const GET_STAT_LIST = `${namespace}/GET_STAT_LIST`;
const GET_USER_LIST = `${namespace}/GET_USER_LIST`;

const getStatApi = '/wechat/stat';
const getStatListApi = '/wechat/daystat';
const getUserListApi = '/wechat/qrys';

export const getAllStat = () => {
  const url = getStatApi;
  return multiDispatch({
    api: get(url),
    type: GET_STAT,
  });
};

export const getStatList = (options) => {
  const url = getStatListApi;
  return multiDispatch({
    api: get(url, options),
    type: GET_STAT_LIST,
    options
  });
};

export const getUserList = (options) => {
  const url = getUserListApi;
  return multiDispatch({
    api: get(url, options),
    type: GET_USER_LIST,
    options
  });
};

const initialState = {
  stat: {},

  getStatListStarting: false,
  getStatListDone: false,
  getStatListError: null,
  statList: [],
  statPage: {},

  getUserListStarting: false,
  getUserListDone: false,
  getUserListError: null,
  userList: [],
  userPage: {},
};

export default createReducer(initialState, {
  [GET_STAT]: (state, action) => multiReducer(action,
    () => ({
      ...state,
    }),
    () => ({
      ...state,
      stat: action.result.data
    }),
    () => ({
      ...state,
    })
  ),
  [GET_STAT_LIST]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      getStatListStarting: true,
      getStatListError: null,
    }),
    () => ({
      ...state,
      getStatListStarting: false,
      getStatListDone: true,
      statList: action.result.data,
      statPage: action.result.page
    }),
    () => ({
      ...state,
      getStatListError: action.error,
      getStatListStarting: false,
    })
  ),

  [GET_USER_LIST]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      getUserListStarting: true,
      getUserListError: null,
    }),
    () => ({
      ...state,
      getUserListStarting: false,
      getUserListDone: true,
      userList: action.result.data,
      userPage: action.result.page
    }),
    () => ({
      ...state,
      getUserListError: action.error,
      getUserListStarting: false,
    })
  ),
});
