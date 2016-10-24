import { createReducer } from '../../store/reducers';

const namespace = 'root';
const WARMING_UP_STARTING = `${namespace}/WARMING_UP_STARTING`;
const WARMING_UP_DONE = `${namespace}/WARMING_UP_DONE`;

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

const initialState = {
  warmingUp: false
};

export default createReducer(initialState, {
  [WARMING_UP_STARTING]: (state, action) => ({ warmingUp: true }),
  [WARMING_UP_DONE]: (state, action) => ({ warmingUp: false })
});
