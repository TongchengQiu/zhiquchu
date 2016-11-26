import { createReducer } from '../../store/reducers';
import { multiDispatch, multiReducer } from '../../store/multi';
import { get } from '../../utils/api';

const namespace = 'consumptions';
const GET_STAT = `${namespace}/GET_STAT`;
const GET_STAT_LIST = `${namespace}/GET_STAT_LIST`;

const GET_DETAIL_PAY = `${namespace}/GET_DETAIL_PAY`;
const GET_DETAIL_REFOUD = `${namespace}/GET_DETAIL_REFOUD`;

const GET_REFUND_LIST = `${namespace}/GET_REFUND_LIST`;
const CHACK_REFUND = `${namespace}/CHACK_REFUND`;

const getStatApi = '/capital/stat';
const getStatListApi = '/capital/daystat';
const getOrderApi = '/order/qrys';
const getRefundApi = '/refund/qrys';
const checkRefundApi = '/refund/check';

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

export const getDetailPay = (options) => {
  const url = getOrderApi;
  return multiDispatch({
    api: get(url, options),
    type: GET_DETAIL_PAY,
    options
  });
};

export const getDetailRefund = (options) => {
  const url = getRefundApi;
  return multiDispatch({
    api: get(url, options),
    type: GET_DETAIL_REFOUD,
    options
  });
};

export const getRefundList = (options) => {
  const url = getRefundApi;
  return multiDispatch({
    api: get(url, options),
    type: GET_REFUND_LIST,
    options
  });
};

export const checkRefund = (options) => {
  const url = checkRefundApi;
  return multiDispatch({
    api: get(url, options),
    type: CHACK_REFUND,
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

  getDetailPayStarting: false,
  getDetailPayDone: false,
  getDetailPayError: null,
  detailPayList: [],
  detailPayPage: {},

  getDetailRefundStarting: false,
  getDetailRefundDone: false,
  getDetailRefundError: null,
  detailRefundList: [],
  detailRefundPage: {},

  getRefundListStarting: false,
  getRefundListDone: false,
  getRefundListError: null,
  refundList: [],
  refundPage: {},

  checkRefundStarting: false,
  checkRefundDone: false,
  checkRefundError: null,
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

  [GET_DETAIL_REFOUD]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      getDetailRefundStarting: true,
      getDetailRefundError: null,
    }),
    () => ({
      ...state,
      getDetailRefundStarting: false,
      getDetailRefundDone: true,
      detailRefundList: action.result.data,
      detailRefundPage: action.result.page
    }),
    () => ({
      ...state,
      getDetailRefundError: action.error,
      getDetailRefundStarting: false,
    })
  ),
  [GET_DETAIL_PAY]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      getDetailPayStarting: true,
      getDetailPayError: null,
    }),
    () => ({
      ...state,
      getDetailPayStarting: false,
      getDetailPayDone: true,
      detailPayList: action.result.data,
      detailPayPage: action.result.page
    }),
    () => ({
      ...state,
      getDetailPayError: action.error,
      getDetailPayStarting: false,
    })
  ),
  [GET_REFUND_LIST]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      getRefundListStarting: true,
      getRefundListError: null,
    }),
    () => ({
      ...state,
      getRefundListStarting: false,
      getRefundListDone: true,
      refundList: action.result.data,
      refundPage: action.result.page
    }),
    () => ({
      ...state,
      getRefundListError: action.error,
      getRefundListStarting: false,
    })
  ),
  [CHACK_REFUND]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      checkRefundStarting: true,
      checkRefundError: null,
    }),
    () => ({
      ...state,
      checkRefundStarting: false,
      checkRefundDone: true,
      refundList: state.refundList.map((item) => {
        let newItem = item;
        if (+action.options.id === +newItem.id) {
          newItem = {
            ...item,
            state: action.options.state
          };
        }
        return newItem;
      })
    }),
    () => ({
      ...state,
      checkRefundError: action.error,
      checkRefundStarting: false,
    })
  ),
});
