import { createReducer } from '../../store/reducers';

const namespace = 'root';
const WARMING_UP_STARTING = `${namespace}/WARMING_UP_STARTING`;
const WARMING_UP_DONE = `${namespace}/WARMING_UP_DONE`;

const CHANGE_SIDEBAR = `${namespace}/CHANGE_SIDEBAR`;

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

const initialState = {
  warmingUp: false,
  sidebarList: []
};

export default createReducer(initialState, {
  [WARMING_UP_STARTING]: (state, action) => ({ ...state, warmingUp: true }),
  [WARMING_UP_DONE]: (state, action) => ({ ...state, warmingUp: false }),
  [CHANGE_SIDEBAR]: (state, action) => ({
    ...state,
    sidebarList: action.list
  })
});
