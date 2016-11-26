import { createReducer } from '../../store/reducers';
import { multiDispatch, multiReducer } from '../../store/multi';
import { get, post } from '../../utils/api';

const namespace = 'members';
const GET_LIST = `${namespace}/GET_LIST`;
const DELETE = `${namespace}/DELETE`;
const CREATE = `${namespace}/CREATE`;

const apiMemberListApi = '/qryusers';
const apiMemberDeleteApi = '/deluser';
const apiMemberCreateApi = '/adduser';

const initialState = {
  getListStarting: false,
  getListDone: false,
  getListError: null,
  originalList: null,
  list: [],
  page: {},

  deleteStarting: false,
  deleteDone: false,
  deleteError: null,

  createStarting: false,
  createDone: false,
  createError: null,
};

export const getList = (options) => {
  const url = apiMemberListApi;
  return multiDispatch({
    api: get(url, options),
    type: GET_LIST,
    options
  });
};

export const deleteItem = (id) => {
  const options = { id };
  const url = apiMemberDeleteApi;
  return multiDispatch({
    api: get(url, options),
    type: DELETE,
    id: options.id
  });
};

export const createItem = (options) => {
  const url = apiMemberCreateApi;
  return multiDispatch({
    api: post(url, options),
    type: CREATE,
    options
  });
};

export default createReducer(initialState, {
  [GET_LIST]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      getListStarting: true,
      getListError: null,
    }),
    () => ({
      ...state,
      getListStarting: false,
      getListDone: true,
      list: action.result.data,
      page: action.result.page
    }),
    () => ({
      ...state,
      getListStarting: false,
      getListError: action.error,
    })
  ),
  [DELETE]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      deleteStarting: true,
      deleteError: null,
    }),
    () => ({
      ...state,
      deleteStarting: false,
      deleteDone: true,
      originalList: state.list,
      list: state.list.filter(item => (item.id !== action.id)),
    }),
    () => ({
      ...state,
      deleteStarting: false,
      deleteError: action.error,
      list: state.originalList
    })
  ),
  [CREATE]: (state, action) => multiReducer(action,
    () => ({
      ...state,
      createStarting: true,
      createError: null,
    }),
    () => ({
      ...state,
      createStarting: false,
      createDone: true,
      list: [action.options].concat(state.list),
    }),
    () => ({
      ...state,
      createStarting: false,
      createError: action.error,
      list: state.originalList
    })
  ),
});
