import { createReducer } from '../../store/reducers';
import { multiDispatch, multiReducer } from '../../store/multi';
import { get } from '../../utils/api';

const namespace = 'users';
const GET_STAT = `${namespace}/GET_STAT`;
const GET_STAT_LIST = `${namespace}/GET_STAT_LIST`;
const GET_USER_LIST = `${namespace}/GET_USER_LIST`;

const GET_USER_DETAIL = `${namespace}GET_USER_DETAIL`;
const GET_USER_PUBLISH_LIST = `${namespace}GET_USER_PUBLISH_LIST`;
const GET_USER_PART_LIST = `${namespace}GET_USER_PART_LIST`;
const GET_USER_FAVO_LIST = `${namespace}GET_USER_FAVO_LIST`;

const getStatApi = '/wechat/stat';
const getStatListApi = '/wechat/daystat';
const getUserListApi = '/wechat/qrys';
const getUserDetailApi = '/wechat/qry';
const getUserPublishApi = '/activity/qrys'; // publisher_id
const getUserPartApi = '/apply/qrys'; // parter_id
const getUserFavoApi = '/wechat/favorite';

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

export const getUserDetail = (options) => {
  const url = getUserDetailApi;
  return multiDispatch({
    api: get(url, options),
    type: GET_USER_DETAIL,
    options
  });
};

export const getUserPublishList = (options) => {
  const url = getUserPublishApi;
  return multiDispatch({
    api: get(url, options),
    type: GET_USER_PUBLISH_LIST,
    options
  });
};

export const getUserPartList = (options) => {
  const url = getUserPartApi;
  return multiDispatch({
    api: get(url, options),
    type: GET_USER_PART_LIST,
    options
  });
};

export const getUserFavoList = (options) => {
  const url = getUserFavoApi;
  return multiDispatch({
    api: get(url, options),
    type: GET_USER_FAVO_LIST,
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

  getUserDetailStarting: false,
  getUserDetailDone: false,
  getUserDetailError: null,
  userDetail: {},

  getUserPublishListStarting: false,
  getUserPublishListDone: false,
  getUserPublishListError: null,
  userPublishList: [],
  userPublishPage: {},

  getUserPartListStarting: false,
  getUserPartListDone: false,
  getUserPartListError: null,
  userPartList: [],
  userPartPage: {},

  getUserFavoListStarting: false,
  getUserFavoListDone: false,
  getUserFavoListError: null,
  userFavoList: [],
  userFavoPage: {},
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

  [GET_USER_DETAIL]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      getUserDetailStarting: true,
      getUserDetailError: null,
    }),
    () => ({
      ...state,
      getUserDetailStarting: false,
      getUserDetailDone: true,
      userDetail: action.result.data,
    }),
    () => ({
      ...state,
      getUserDetailError: action.error,
      getUserDetailStarting: false,
    })
  ),

  [GET_USER_PUBLISH_LIST]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      getUserPublishListStarting: true,
      getUserPublishListError: null,
    }),
    () => ({
      ...state,
      getUserPublishListStarting: false,
      getUserPublishListDone: true,
      userPublishList: action.result.data,
      userPublishPage: action.result.page
    }),
    () => ({
      ...state,
      getUserPublishListError: action.error,
      getUserPublishListStarting: false,
    })
  ),
  [GET_USER_PART_LIST]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      getUserPartListStarting: true,
      getUserPartListError: null,
    }),
    () => ({
      ...state,
      getUserPartListStarting: false,
      getUserPartListDone: true,
      userPartList: action.result.data,
      userPartPage: action.result.page
    }),
    () => ({
      ...state,
      getUserPartListError: action.error,
      getUserPartListStarting: false,
    })
  ),
  [GET_USER_FAVO_LIST]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      getUserFavoListStarting: true,
      getUserFavoListError: null,
    }),
    () => ({
      ...state,
      getUserFavoListStarting: false,
      getUserFavoListDone: true,
      userFavoList: action.result.data,
      userFavoPage: action.result.page
    }),
    () => ({
      ...state,
      getUserFavoListError: action.error,
      getUserFavoListStarting: false,
    })
  ),
});
