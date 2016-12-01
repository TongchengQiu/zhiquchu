import { createReducer } from '../../store/reducers';
import { multiDispatch, multiReducer } from '../../store/multi';
import { get } from '../../utils/api';

const namespace = 'activitys';
const GET_STAT = `${namespace}/GET_STAT`;
const GET_STAT_LIST = `${namespace}/GET_STAT_LIST`;

const GET_RLIST = `${namespace}/GET_RLIST`;
const GET_ULIST = `${namespace}/GET_ULIST`;

const CHANGE_OBJECT = `${namespace}/CHANGE_OBJECT`;

const GET_DETAIL = `${namespace}/GET_DETAIL`;

const GET_APPLYPAY_LIST = `${namespace}/GET_APPLYPAY_LIST`;
const GET_APPLYPART_LIST = `${namespace}/GET_APPLYPART_LIST`;
const GET_APPLYFINISH_LIST = `${namespace}/GET_APPLYFINISH_LIST`;

const GET_FAVO_LIST = `${namespace}/GET_FAVO_LIST`;

const getStatApi = '/activity/stat';
const getStatListApi = '/activity/daystat';

const getListApi = '/activity/qrys';

const changeApi = '/activity/mod';

const getDetailApi = '/activity/qry';

const getApplyListApi = '/apply/qrys';

const getFavoListApi = '/activity/favorite';

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

// 推荐活动列表
export const getRList = (options) => {
  const newOptions = options;
  const url = getListApi;
  newOptions.recommend = 1;
  return multiDispatch({
    api: get(url, newOptions),
    type: GET_RLIST,
    options: newOptions
  });
};

// 未推荐活动列表
export const getUList = (options) => {
  const newOptions = options;
  const url = getListApi;
  newOptions.recommend = '0';
  return multiDispatch({
    api: get(url, newOptions),
    type: GET_ULIST,
    options: newOptions
  });
};

// 改变
export const changeObject = (options) => {
  const url = changeApi;
  return multiDispatch({
    api: get(url, options),
    type: CHANGE_OBJECT,
    options
  });
};

// 获取详情
export const getDetail = (options) => {
  const url = getDetailApi;
  return multiDispatch({
    api: get(url, options),
    type: GET_DETAIL,
    options
  });
};

// 报名
// 待支付
export const getApplyPayList = (options) => {
  const url = getApplyListApi;
  const newOptions = options;
  newOptions.state = '0';
  return multiDispatch({
    api: get(url, newOptions),
    type: GET_APPLYPAY_LIST,
    options: newOptions
  });
};
// 待参与
export const getApplyPartList = (options) => {
  const url = getApplyListApi;
  const newOptions = options;
  newOptions.state = 1;
  return multiDispatch({
    api: get(url, newOptions),
    type: GET_APPLYPART_LIST,
    options: newOptions
  });
};
// 已完成
export const getApplyFinishList = (options) => {
  const url = getApplyListApi;
  const newOptions = options;
  newOptions.state = 2;
  return multiDispatch({
    api: get(url, newOptions),
    type: GET_APPLYFINISH_LIST,
    options: newOptions
  });
};

// 收藏
export const getFavoList = (options) => {
  const url = getFavoListApi;
  return multiDispatch({
    api: get(url, options),
    type: GET_FAVO_LIST,
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

  getRListStarting: false,
  getRListDone: false,
  getRListError: null,
  rlist: [],
  rpage: {},

  getUListStarting: false,
  getUListDone: false,
  getUListError: null,
  ulist: [],
  upage: {},

  changeStarting: false,
  changeDone: false,
  changeError: null,

  getDetailStarting: false,
  getDetailDone: false,
  getDetailError: null,
  detail: {},

  getApplyPayListStarting: false,
  getApplyPayListDone: false,
  getApplyPayListError: null,
  applyPayList: [],
  applyPayPage: {},

  getApplyPartListStarting: false,
  getApplyPartListDone: false,
  getApplyPartListError: null,
  applyPartList: [],
  applyPartPage: {},

  getApplyFinishListStarting: false,
  getApplyFinishListDone: false,
  getApplyFinishListError: null,
  applyFinishList: [],
  applyFinishPage: {},

  getFavoListStarting: false,
  getFavoListDone: false,
  getFavoListError: null,
  favoList: [],
  favoPage: {},
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

  [GET_RLIST]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      getRListStarting: true,
      getRListError: null,
    }),
    () => ({
      ...state,
      getRListStarting: false,
      getRListDone: true,
      rlist: action.result.data,
      rpage: action.result.page
    }),
    () => ({
      ...state,
      getRListError: action.error,
      getRListStarting: false,
    })
  ),
  [GET_ULIST]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      getUListStarting: true,
      getUListError: null,
    }),
    () => ({
      ...state,
      getUListStarting: false,
      getUListDone: true,
      ulist: action.result.data,
      upage: action.result.page
    }),
    () => ({
      ...state,
      getUListError: action.error,
      getUListStarting: false,
    })
  ),

  [CHANGE_OBJECT]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      changeStarting: true,
      changeError: null,
    }),
    () => ({
      ...state,
      changeStarting: false,
      changeDone: true,
      rlist: state.rlist.map((item) => {
        let nitem = item;
        if (item.id === action.options.id) {
          nitem = Object.assign(item, {
            ...action.options
          });
        }
        return nitem;
      }),
      ulist: state.ulist.map((item) => {
        let nitem = item;
        if (item.id === action.options.id) {
          nitem = Object.assign(item, {
            ...action.options
          });
        }
        return nitem;
      }),
      detail: Object.assign(state.detail, {
        ...action.options
      })
    }),
    () => ({
      ...state,
      changeError: action.error,
      changeStarting: false,
    })
  ),

  [GET_DETAIL]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      getDetailStarting: true,
      getDetailError: null,
    }),
    () => ({
      ...state,
      getDetailStarting: false,
      getDetailDone: true,
      detail: action.result.data,
    }),
    () => ({
      ...state,
      getDetailError: action.error,
      getDetailStarting: false,
    })
  ),


  [GET_APPLYPAY_LIST]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      getApplyPayListStarting: true,
      getApplyPayListError: null,
    }),
    () => ({
      ...state,
      getApplyPayListStarting: false,
      getApplyPayListDone: true,
      applyPayList: action.result.data,
      applyPayPage: action.result.page
    }),
    () => ({
      ...state,
      getApplyPayListError: action.error,
      getApplyPayListStarting: false,
    })
  ),

  [GET_APPLYPART_LIST]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      getApplyPartListStarting: true,
      getApplyPartListError: null,
    }),
    () => ({
      ...state,
      getApplyPartListStarting: false,
      getApplyPartListDone: true,
      applyPartList: action.result.data,
      applyPartPage: action.result.page
    }),
    () => ({
      ...state,
      getApplyPartListError: action.error,
      getApplyPartListStarting: false,
    })
  ),

  [GET_APPLYFINISH_LIST]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      getApplyFinishListStarting: true,
      getApplyFinishListError: null,
    }),
    () => ({
      ...state,
      getApplyFinishListStarting: false,
      getApplyFinishListDone: true,
      applyFinishList: action.result.data,
      applyFinishPage: action.result.page
    }),
    () => ({
      ...state,
      getApplyFinishListError: action.error,
      getApplyFinishListStarting: false,
    })
  ),

  [GET_FAVO_LIST]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      getFavoListStarting: true,
      getFavoListError: null,
    }),
    () => ({
      ...state,
      getFavoListStarting: false,
      getFavoListDone: true,
      favoList: action.result.data,
      favoPage: action.result.page
    }),
    () => ({
      ...state,
      getFavoListError: action.error,
      getFavoListStarting: false,
    })
  ),
});
