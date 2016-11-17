import { createReducer } from '../../store/reducers';

const namespace = 'activitys';
const CHANGE_DATE = `${namespace}/CHANGE_DATE`;

const initialState = {
  getListStarting: false,
  getListDone: false,
  getListError: null,
  originalList: null,
  list: null,
};

export default createReducer(initialState, {
  [CHANGE_DATE]: (state, action) => ({
    ...state,
    selectDate: action.date
  })
});
